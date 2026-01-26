#!/usr/bin/env bash
set -euo pipefail

#############################################
# CONFIG (all overridable from SSH env vars)
#############################################
APP_DIR="${APP_DIR:-/var/www/debarras/front}"
BRANCH="${BRANCH:-production}"
REPO_URL="${REPO_URL:-}"

ENV_FILE="$APP_DIR/.env"
ENV_PAYLOAD_PATH="${ENV_PAYLOAD_PATH:-/tmp/debarras.env}"

PM2_APP="${PM2_APP:-debarras}"
APP_PORT="${APP_PORT:-3000}"

# If you have nvm installed, pass NVM_DIR from workflow vars or default to $HOME/.nvm
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

#############################################
# Logger (no secrets in output)
#############################################
log() { printf '[%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

#############################################
# LOAD NODE (NVM)
#############################################
if [ -f "$NVM_DIR/nvm.sh" ]; then
  log "Loading NVM from $NVM_DIR"
  # shellcheck disable=SC1091
  source "$NVM_DIR/nvm.sh"
else
  log "NVM not found at $NVM_DIR, using system node"
fi

log "Node: $(node -v || echo 'Not found')"
log "NPM:  $(npm -v || echo 'Not found')"

#############################################
# FIRST DEPLOY OR UPDATE
#############################################
log "Using app directory: $APP_DIR"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [[ ! -d "$APP_DIR/.git" || ! -f "$APP_DIR/package.json" ]]; then
  if [[ -z "$REPO_URL" ]]; then
    log "ERROR: REPO_URL is empty. Provide REPO_URL via workflow."
    exit 1
  fi

  TMP_CLONE="/tmp/debarras_clone_$$"
  log "First deploy → cloning into: $TMP_CLONE"
  git clone --branch "$BRANCH" "$REPO_URL" "$TMP_CLONE"

  log "Copying project to $APP_DIR"
  rsync -a --delete "$TMP_CLONE/" "$APP_DIR/"
  rm -rf "$TMP_CLONE"
else
  log "Updating existing repo"
  git fetch --all
  git reset --hard "origin/$BRANCH"
  git clean -fd
fi

cd "$APP_DIR"

#############################################
# ENV SYNC (optional)
#############################################
if [[ -f "$ENV_PAYLOAD_PATH" ]]; then
  log "Applying .env updates"
  mv "$ENV_PAYLOAD_PATH" "$ENV_FILE"
else
  log "No env file provided (skipped)"
fi

# Ensure .env exists (Next.js may need it)
touch "$ENV_FILE"

#############################################
# INSTALL DEPENDENCIES
#############################################
log "Cleaning old build artifacts"
rm -rf .next

# Prefer npm ci if lockfile exists for reproducible builds
if [[ -f "package-lock.json" ]]; then
  log "Installing dependencies (npm ci)"
  npm ci --legacy-peer-deps
else
  log "No lockfile found, installing dependencies (npm install)"
  npm install --legacy-peer-deps
fi

#############################################
# BUILD PROJECT (Next.js)
#############################################
log "Building Next.js application"
npm run build

#############################################
# PM2: START/RESTART NEXT.JS
#############################################
log "Configuring PM2 for Next.js"

# Export PORT for Next.js runtime
export PORT="$APP_PORT"

# Check if ecosystem config exists (preferred method)
if [[ -f "ecosystem.config.cjs" ]]; then
  log "Using ecosystem.config.cjs for PM2"
  
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    log "Restarting existing PM2 process: $PM2_APP"
    pm2 restart ecosystem.config.cjs --env production
  else
    log "Starting PM2 process with ecosystem config"
    pm2 start ecosystem.config.cjs --env production
  fi
else
  # Fallback: run Next.js via npm start
  log "No ecosystem config found, using inline PM2 command"
  
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    log "Restarting existing PM2 process: $PM2_APP"
    pm2 restart "$PM2_APP"
  else
    log "Starting PM2 process for Next.js"
    pm2 start npm --name "$PM2_APP" -- start
  fi
fi

# Persist PM2 process list for reboot survival
pm2 save

log "Deployment completed successfully 🎉"
log "Next.js app '$PM2_APP' running on port $APP_PORT"
