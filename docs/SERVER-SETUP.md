# New Server Setup — Production (AlmaLinux / Rocky / RHEL, root)

Runbook for standing up a fresh production box for `debarras-aurea.fr` so the
GitHub Actions pipeline (`.github/workflows/deploy-production.yml` → `deploy.sh`)
can deploy to it. Run everything **as `root`** on the new server unless noted.

**What the pipeline expects (don't change these names):**
- Deploy user: **root**, app dir **`/var/www/debarras/front`**, PM2 process **`debarras`**, port **3000**.
- Node **20** via **nvm** at **`/root/.nvm`** (deploy.sh sources `$NVM_DIR/nvm.sh`).
- Server pulls the repo over SSH (`git@github.com:ghouili/h2-debbarras.git`) → needs a **deploy key**.
- GitHub Actions SSHes into the server → needs a **CI key** in `authorized_keys`.

Do the steps in order. Steps 5–7 are the two keys you asked about.

---

## 0. Prereqs before you start
- DNS: point `debarras-aurea.fr` and `www.debarras-aurea.fr` **A records to the new server IP** now (needed before SSL in step 8; propagation can take a while).
- Make sure you can SSH in as root with your current key/password.

## 1. Base packages
```bash
dnf update -y
dnf install -y git rsync curl tar policycoreutils-python-utils
```

## 2. Swap (skip if the box has ≥ 4 GB RAM)
`next build` runs **on the server** and can OOM on small VPSes. Add 2 GB swap:
```bash
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h
```

## 3. Node 20 via nvm  (NVM_DIR = /root/.nvm — must match GitHub var)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 20
nvm alias default 20
node -v && npm -v      # expect v20.x
```

## 4. PM2 + boot persistence
```bash
npm install -g pm2
pm2 startup systemd -u root --hp /root     # sets up the systemd unit
# (pm2 save is run automatically by deploy.sh after the first deploy)
```

## 5. App directory
```bash
mkdir -p /var/www/debarras/front
```

## 6. Deploy key  (server → GitHub, so it can pull the repo)
```bash
ssh-keygen -t ed25519 -C "deploy@debarras-server" -f /root/.ssh/id_ed25519 -N ""
ssh-keyscan github.com >> /root/.ssh/known_hosts     # trust github for non-interactive git
cat /root/.ssh/id_ed25519.pub
```
- Copy that **public** key → GitHub → repo **Settings → Deploy keys → Add deploy key**.
  Title `debarras-prod-server`, paste the key, **leave "Allow write access" UNCHECKED** (read-only).
- Test:
```bash
ssh -T git@github.com     # expect: "Hi ghouili/h2-debbarras! You've successfully authenticated..."
```

## 7. CI key  (GitHub Actions → server, this is SSH_PRIVATE_KEY)
```bash
ssh-keygen -t ed25519 -C "github-actions@debarras" -f /root/.ssh/gha_deploy -N ""
cat /root/.ssh/gha_deploy.pub >> /root/.ssh/authorized_keys
chmod 700 /root/.ssh && chmod 600 /root/.ssh/authorized_keys
echo "----- COPY EVERYTHING BELOW INTO GitHub secret SSH_PRIVATE_KEY -----"
cat /root/.ssh/gha_deploy
```
- Copy the **private** key (the whole block incl. `-----BEGIN/END-----`).
- Ensure root key login is allowed: in `/etc/ssh/sshd_config`, `PermitRootLogin prohibit-password`
  (key-only) and `PubkeyAuthentication yes`; then `systemctl restart sshd`.
- You can `rm /root/.ssh/gha_deploy` afterward (the private half only needs to live in GitHub).

## 8. nginx + SSL (Let's Encrypt)
```bash
dnf install -y nginx epel-release
dnf install -y certbot python3-certbot-nginx
systemctl enable --now nginx

# firewall (firewalld) — open web ports
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# SELinux — CRITICAL on RHEL: allow nginx to proxy to the app on localhost:3000
setsebool -P httpd_can_network_connect 1
```
Create `/etc/nginx/conf.d/debarras.conf`:
```nginx
server {
    listen 80;
    server_name debarras-aurea.fr www.debarras-aurea.fr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Then (DNS must already point here):
```bash
nginx -t && systemctl reload nginx
certbot --nginx -d debarras-aurea.fr -d www.debarras-aurea.fr    # adds 443 + auto-renew
```

## 9. Update GitHub (repo → Settings → Environments → **deploy**)
**Secrets** (update for the new box):
- `SSH_PRIVATE_KEY` → the private key from step 7
- `SSH_HOST` → new server IP/hostname
- `SSH_USERNAME` → `root`
- `SSH_PORT` → `22` (or your custom port)
- `SSH_KNOWN_HOSTS` → *(optional; leave unset and the workflow auto-scans)*

**Variables** (confirm they match this server):
- `DEPLOY_PATH` = `/var/www/debarras/front`
- `NVM_DIR` = `/root/.nvm`   ← must match step 3
- `NODE_VERSION` = `20`  ·  `PM2_APP` = `debarras`  ·  `APP_PORT` = `3000`
- App env still comes from here too: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_API_URL`, `API_URL`,
  and the `SMTP_*` secrets — verify they're still present (unchanged by the server move).

## 10. Deploy + verify
- GitHub → **Actions → "Deploy H2 Débarras (Production)" → Run workflow** (or push to `production`).
- The first run clones into `/var/www/debarras/front`, `npm install`, `npm run build`, `pm2 start`.
- On the server:
```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
pm2 list                    # 'debarras' should be online
pm2 logs debarras --lines 50
curl -I http://127.0.0.1:3000
```
- Browse **https://debarras-aurea.fr**.

## Troubleshooting
- **502 Bad Gateway** → app not up on :3000 (`pm2 logs debarras`), or SELinux (`setsebool -P httpd_can_network_connect 1`).
- **Actions can't SSH** → `SSH_HOST/USERNAME/PORT` wrong, or CI public key not in `/root/.ssh/authorized_keys`, or root login disabled in sshd.
- **deploy.sh: "Not found" node / pm2** → `NVM_DIR` var ≠ `/root/.nvm`, or `nvm alias default 20` not set.
- **git clone permission denied** → deploy key not added to the repo, or `ssh -T git@github.com` fails.
- **Build killed / OOM** → add swap (step 2).
- **certbot fails** → DNS not pointing to this server yet; wait for propagation and retry.
