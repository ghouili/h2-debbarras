# GTM Conversion Tracking — Step-by-Step Setup Guide

> **Goal:** make Google Ads record a conversion every time a lead submits a form and
> lands on `/merci`. The website code is already done (every form redirects to `/merci`).
> This guide is the **dashboard work** that must be completed in Google Tag Manager and
> Google Ads. **Until this is finished, leads reach `/merci` but no conversion is counted.**

## Reference values

| Item | Value |
| --- | --- |
| GTM container | `GTM-P7RGSS2S` (already installed site-wide via `app/layout.tsx`) |
| Google Ads conversion ID | `AW-17933962840` |
| Conversion action — quote form | `devis form` |
| Conversion action — contact form | `contact form` *(shown as "conatct form" in the brief — a typo; use whatever name exists in your Google Ads account)* |
| Trigger page (URL) | `/merci` |
| Live site | `https://debarras-aurea.fr` |

You will need:
- Access to **tagmanager.google.com** for container `GTM-P7RGSS2S`.
- Access to **ads.google.com** (same/linked Google account) with edit rights on conversions.
- The site **deployed** so `/merci` is reachable on the live domain.

---

## ⚠️ Important: GTM container vs. the gtag.js base (read this first)

There are **two separate, independent** tracking mechanisms on this site. Don't confuse them
— mixing them up is the easiest way to double-count or duplicate tags.

| What | How it's loaded (`app/layout.tsx`) | What it does |
| --- | --- | --- |
| **GTM container `GTM-P7RGSS2S`** | The `gtm.js` snippet in `<head>` + `<noscript>` after `<body>`, driven by the `NEXT_PUBLIC_GTM_ID` env var | The container you configure in this guide. **It will own the conversion tags.** |
| **gtag.js base** — GA4 `G-W68ZFT3E37` + Google Ads `AW-17933962840` | A direct `gtag.js` `<script>` (separate from GTM) | Page views, GA4 analytics, Ads remarketing **base**. Fires **no conversions**. |

> **There is no `GT-TQK5TKSZ` tag.** An earlier brief referenced a container ID
> `GT-TQK5TKSZ` (note the `GT-` prefix). **It was never installed and does not exist in the
> code.** The real GTM container is **`GTM-P7RGSS2S`** (`GTM-` prefix). Everywhere you see
> instructions mentioning a "GT- tag handling GA4/Ads", that is actually the **gtag.js base**
> above, not a GTM container.

**Rules to avoid double-counting / double-loading:**
1. ✅ Configure conversions **only** in the `GTM-P7RGSS2S` container (this guide).
2. ❌ Do **not** add a GA4 *Configuration* tag or an Ads *Google tag* inside GTM — GA4 and the
   Ads base are already loaded by the gtag.js base. Adding them in GTM would load them twice.
   Keep the GTM container to **conversion tags only**.
3. ✅ The website code fires **zero** conversions itself (the old code-based pixel was
   removed), so each form submission = exactly **one** conversion, fired by the GTM tag.

---

## Overview (what you're building)

```
Form submitted  →  router.push('/merci')  →  page /merci loads
                                                   │
                                          GTM trigger "Page /merci" fires
                                                   │
                         ┌─────────────────────────┴─────────────────────────┐
              Tag: Google Ads — devis form              Tag: Google Ads — contact form
              (Conversion ID + label)                   (Conversion ID + label)
                                                   │
                                          Conversion recorded in Google Ads
```

> **Note — single trigger, two tags:** both conversion tags fire on the same `/merci`
> page. That is intentional and standard for this account setup. See
> [§7 "Should both tags really fire?"](#7-should-both-tags-really-fire) for the nuance and
> the optional way to separate them.

---

## Step 1 — Create the trigger in GTM

1. Go to **https://tagmanager.google.com** and open the **`GTM-P7RGSS2S`** container.
2. Left menu → **Triggers** → **New** (top right).
3. Click the pencil/box **Trigger Configuration** → choose **Page View**.
4. Select **Some Page Views** (not "All Page Views").
5. Configure the condition:
   - First dropdown: **Page URL**
   - Second dropdown: **contains**
   - Value: `/merci`
6. Name it (top left): **`Page /merci`**.
7. Click **Save**.

✅ You now have a trigger that fires on any URL containing `/merci`
(e.g. `https://debarras-aurea.fr/merci`).

---

## Step 2 — Get the conversion label(s) from Google Ads

You need a **Conversion label** for each conversion action. Do this **once per action**
(`devis form`, then `contact form`).

1. Go to **https://ads.google.com**.
2. Top menu → **Tools** (wrench icon) → under **Measurement** → **Conversions**.
3. In the list, click the conversion action **`devis form`**.
4. Click **Tag setup** (or **Set up tag** / **Use Google Tag Manager**).
5. Choose the **Use Google Tag Manager** option.
6. You will see two values — **copy both**:
   - **Conversion ID** → should be `17933962840` (this is the `AW-17933962840` number without the `AW-` prefix).
   - **Conversion label** → a short string like `AbC-D1efGhIjkLmN` (format: 11+ characters).
7. **Repeat steps 3–6** for the **`contact form`** action and copy **its own** label
   (the ID is the same; the **label is different per action**).

> 📋 Write them down:
> ```
> devis form    → ID 17933962840  label: ____________________
> contact form  → ID 17933962840  label: ____________________
> ```

---

## Step 3 — Create the conversion tag(s) in GTM

Do this **twice** — once for `devis form`, once for `contact form`.

### Tag A — devis form

1. In GTM (`GTM-P7RGSS2S`) → left menu → **Tags** → **New**.
2. **Tag Configuration** → **Google Ads Conversion Tracking**.
3. Fill in:
   - **Conversion ID:** `17933962840`
   - **Conversion Label:** *(paste the `devis form` label from Step 2)*
   - **Conversion Value:** leave empty (or type `1`).
   - **Currency:** `EUR` (optional).
4. **Triggering** → click and select **`Page /merci`** (created in Step 1).
5. Name the tag: **`Google Ads — Conversion devis form`**.
6. Click **Save**.

### Tag B — contact form

Repeat the steps above with:
- **Conversion Label:** the **`contact form`** label from Step 2.
- Same trigger: **`Page /merci`**.
- Name: **`Google Ads — Conversion contact form`**.

✅ You should now have **2 tags**, both triggered by **`Page /merci`**.

---

## Step 4 — Publish the container

> ⚠️ **Nothing is live until you publish.** Saving tags only saves a draft.

1. In GTM, click **Submit** (top right).
2. **Submission Configuration** → keep **Publish and Create Version**.
3. **Version Name:** `Ads LP conversion tracking — <today's date>`
   (e.g. `Ads LP conversion tracking — 2026-06-04`).
4. **Version Description** (optional): "Adds devis + contact conversion tags firing on /merci".
5. Click **Publish**.

✅ The conversion tags are now live on the production site.

---

## Step 5 — Test with Tag Assistant

This proves the conversion actually fires before you trust the data.

1. Go to **Google Ads → Tools → Conversions** → click **`devis form`** →
   **Troubleshoot** → **Test your conversion action with Tag Assistant**.
   *(Or open https://tagassistant.google.com → "Add domain" → `https://debarras-aurea.fr`.)*
2. A new tab opens the live site in a Tag Assistant debugging session (a "Connected" badge appears).
3. Inside that session, navigate to a landing page, e.g.
   `https://debarras-aurea.fr/lp/succession-apres-deces`.
4. **Fill in and submit the form** (use a real-format phone, e.g. `06 12 34 56 78`).
5. You will be redirected to **`/merci`**.
6. In the **Tag Assistant** panel, select the **`/merci`** event in the timeline and confirm:
   - **`Page /merci`** trigger fired, and
   - **`Google Ads — Conversion devis form`** appears under **Tags Fired**.
7. Optionally check the **Network** tab for a request to
   `googleadservices.com/.../conversion/` returning 200.

✅ If Tag Assistant shows the conversion tag fired on `/merci` → tracking is working.
The conversion action status in Google Ads will switch to **"Recording conversions" / Active**
within **up to 24 hours**. Then the campaign can launch / be optimised.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Tag Assistant shows no `/merci` event | Form POST failed (no redirect) | Check `/api/leads` works on the live site; the form only redirects on a successful (200) response. |
| `/merci` loads but tag didn't fire | Trigger value wrong | Trigger must be **Page URL contains `/merci`** — re-check Step 1. |
| Nothing fires at all on the site | Container not published, or GTM ID mismatch | Confirm Step 4 was published, and that the live page source loads `gtm.js?id=GTM-P7RGSS2S`. |
| Tag fires but Ads shows no conversions after 24–48h | Wrong/blank conversion label | Re-copy the **label per action** in Step 2; the ID is shared but each label is unique. |
| Conversions counted **twice** | A second conversion mechanism is active | The old code-based pixel was removed in this project. Make sure you didn't also keep a "conversion linker"/duplicate tag, and that only one tag per action exists. |
| `/merci` is indexed by Google | — | It's set to `noindex` in code; that's expected and does not affect conversions. |

---

## 7. Should both tags really fire? {#7-should-both-tags-really-fire}

With the current setup, **every** form (quote funnel, contact form, and all 3 Ads landing
pages) redirects to the **same** `/merci`. The trigger can't tell which form was submitted,
so **both** conversion tags fire on every submission — i.e. each lead is counted once under
`devis form` **and** once under `contact form`.

**If that double attribution is acceptable** (you just want "a lead happened"), do nothing —
the setup above is fine. Pick **one** of the two actions as your campaign's "primary"
conversion in Google Ads so bidding optimises on a single number.

**If you need to distinguish devis vs contact conversions**, the cleanest option is to push a
distinguishing value into the `dataLayer` and gate each tag on it. The site already pushes a
`lead_form_submit` event with a `form` field from the legacy analytics component, but the
**simplest reliable approach** is to differentiate by **landing path or a query param** on
`/merci`. Ask the developer to either:

- redirect to `/merci?type=devis` vs `/merci?type=contact`, then make each GTM tag's trigger
  require **Page URL contains `type=devis`** (or `type=contact`); **or**
- push `dataLayer.push({ event: 'lead_submit', form: 'devis' })` before the redirect and use a
  **Custom Event** trigger + a Data Layer Variable to gate each tag.

This is an optional refinement — the conversion **count** is correct either way; only the
per-action attribution changes.

---

## Quick checklist

- [ ] Trigger `Page /merci` created (Page URL contains `/merci`)
- [ ] `devis form` label copied from Google Ads
- [ ] `contact form` label copied from Google Ads
- [ ] Tag `Google Ads — Conversion devis form` created + triggered by `Page /merci`
- [ ] Tag `Google Ads — Conversion contact form` created + triggered by `Page /merci`
- [ ] Container **published**
- [ ] Tag Assistant test passed (tag fires on `/merci`)
- [ ] Conversion status shows **Active** in Google Ads (within 24h)
