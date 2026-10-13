# Vercel Deployment & Backend Infrastructure Guide
**Project:** Amandeep Kumar Portfolio  
**Target Domain:** `https://amandeepkumar.dev/`  
**Current Production Host:** Vercel  
**Notification Recipient:** `amandeep3583kr@gmail.com`  

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Step 1: One-Click / CLI Deployment to Vercel](#2-step-1-one-click--cli-deployment-to-vercel)
3. [Step 2: Vercel Serverless Contact Backend (`/api/contact`)](#3-step-2-vercel-serverless-contact-backend-apicontact)
4. [Step 3: Setting Up Email Dispatch (Resend API)](#4-step-3-setting-up-email-dispatch-resend-api)
5. [Step 4: Optional Instant Webhooks (Discord / Telegram)](#5-step-4-optional-instant-webhooks-discord--telegram)
6. [Step 5: Connecting Your Custom Domain (`amandeepkumar.dev`) on Vercel](#6-step-5-connecting-your-custom-domain-amandeepkumardev-on-vercel)
7. [Step 6: Security Headers, Performance & Caching (`vercel.json`)](#7-step-6-security-headers-performance--caching-verceljson)
8. [Step 7: Testing & Verification Checklist](#8-step-7-testing--verification-checklist)

---

## 1. Architecture Overview

Your portfolio follows an edge-accelerated Jamstack architecture hosted on **Vercel** with full SEO optimization for **`amandeepkumar.dev`**:

```mermaid
flowchart TD
    User([Portfolio Visitor]) -->|Fills Form: Name, Email, Message| FE[Frontend: index.html]
    FE -->|Client-side Validation & Honeypot Check| SUBMIT{Valid Input?}
    
    SUBMIT -->|No| ERR[Display Accessible Alert & Focus Field]
    SUBMIT -->|Yes| POST[Fetch POST /api/contact - JSON Payload]
    
    POST --> VFUNC[Vercel Serverless Function: api/contact.js]
    
    VFUNC -->|Anti-Bot Filter| BOT{Honeypot Triggered?}
    BOT -->|Yes| DROP[Silently Discard Bot Submission]
    BOT -->|No| DISPATCH[Process Payload]
    
    DISPATCH --> RESEND[Resend API / Transactional Email]
    RESEND -->|Instant Email Notification| GMAIL([amandeep3583kr@gmail.com])
    
    DISPATCH -.->|Optional Webhook Alert| DISCORD[Discord / Telegram Alert]
    
    VFUNC -->|Response: 200 OK| FE
    FE --> SUCCESS[Display Success Banner: Message Sent]
```

---

## 2. Step 1: One-Click / CLI Deployment to Vercel

### Option A: Via GitHub (Recommended)
1. Commit and push your local files to your GitHub repository (e.g. `HybridAmandeep/Portofolio-1`):
   ```powershell
   git add .
   git commit -m "Update portfolio: amandeepkumar.dev domain, Vercel serverless backend, distinct project cards"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New...** > **Project**.
4. Select your repository `Portofolio-1`.
5. In **Framework Preset**, select **Other** (pure static HTML, CSS, Vanilla JS, and Vercel functions).
6. Root Directory: `./` (leave default).
7. Click **Deploy**.
8. In ~15 seconds, your site will be live on Vercel's edge network!

### Option B: Via Vercel CLI (Direct from PowerShell)
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Run deployment from your project folder
cd "c:\Users\amand\Downloads\New folder"
vercel
```
Follow the interactive prompts:
- *Set up and deploy?* **Y**
- *Which scope?* Select your account
- *Link to existing project?* **N**
- *What's your project's name?* `amandeepkumar-portfolio`
- *In which directory is your code located?* `./`

To deploy directly to production:
```powershell
vercel --prod
```

---

## 3. Step 2: Vercel Serverless Contact Backend (`/api/contact`)

Unlike Netlify's HTML-parsing bot forms, Vercel natively executes serverless Node.js functions located in the `/api` directory.

We have created [`api/contact.js`](./api/contact.js) for you:
- **Location:** `api/contact.js`
- **Route:** `POST /api/contact`
- **Features:**
  1. **Strict CORS handling** (allows POST and preflight OPTIONS).
  2. **Honeypot defense:** Inspects the hidden `bot-field`. Automated bots filling this field receive a clean 200 response while the submission is discarded.
  3. **Input validation:** Validates name, RFC-compliant email, and message body.
  4. **Direct Email Dispatch:** Sends emails via Resend API when `RESEND_API_KEY` is provided.
  5. **Resilient Local Fallback:** If tested locally without environment variables, it logs the inquiry and responds with a success status so your UI functions without breaking.

---

## 4. Step 3: Setting Up Email Dispatch (Resend API)

To receive every contact message directly in your inbox (`amandeep3583kr@gmail.com`):

### 4.1 Get a Free Resend API Key (Takes 1 Minute)
1. Sign up at [resend.com](https://resend.com) (Free tier gives you 3,000 emails/month).
2. Go to **API Keys** > **Create API Key**.
3. Name it `Portfolio Vercel` and copy the key (starts with `re_...`).

### 4.2 Add Environment Variables to Vercel
1. Open your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings** > **Environment Variables**.
3. Add the following variables:
   - **Key:** `RESEND_API_KEY`  
     **Value:** `re_your_api_key_here`  
     **Environment:** Check *Production*, *Preview*, and *Development*.
   - **Key:** `CONTACT_EMAIL`  
     **Value:** `amandeep3583kr@gmail.com`  
     **Environment:** Check *Production*, *Preview*, and *Development*.
4. Click **Save**.
5. Redeploy (or trigger a new commit) for the environment variables to activate.

Whenever a visitor submits the form, you will receive a clean HTML email in your Gmail inbox with their name, email, timestamp, and message, with `reply-to` set to their email address so you can reply with one click!

---

## 5. Step 4: Optional Instant Webhooks (Discord / Telegram)

If you want an instant notification on your phone via Discord or Telegram:

### Discord Webhook (Push to your private channel)
1. In Discord: **Server Settings** > **Integrations** > **Webhooks** > **New Webhook**.
2. Copy the Webhook URL.
3. In Vercel: **Settings** > **Environment Variables** > Add `DISCORD_WEBHOOK_URL`.
4. Our `api/contact.js` will automatically post an embedded card with the visitor's message!

---

## 6. Step 5: Connecting Your Custom Domain (`amandeepkumar.dev`) on Vercel

When you are ready to link **`amandeepkumar.dev`** to Vercel:

### 6.1 Add Domain in Vercel Dashboard
1. Go to your project on [vercel.com](https://vercel.com).
2. Navigate to **Settings** > **Domains**.
3. Enter `amandeepkumar.dev` and click **Add**.
4. Vercel will prompt you to add both:
   - `amandeepkumar.dev` (Apex domain — recommended primary canonical)
   - `www.amandeepkumar.dev` (Subdomain — set to redirect to apex)

### 6.2 Configure DNS Records in Your Domain Registrar
Log in to where you registered `amandeepkumar.dev` (e.g. Google Domains/Squarespace, Cloudflare, Namecheap, Hostinger, GoDaddy) and add these records:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `76.76.21.21` | Automatic / 300 |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatic / 300 |

> [!TIP]
> **Why `.dev` is great for SEO and Security:**  
> The `.dev` top-level domain is managed by Google Registry and is on the **HSTS preload list by default**. This means all major browsers strictly require HTTPS connections to load it, perfectly matching Vercel's automated free SSL certificate provisioning.

---

## 7. Step 6: Security Headers, Performance & Caching (`vercel.json`)

The provided [`vercel.json`](./vercel.json) in your project root applies enterprise-grade security headers, 301 redirects, and edge caching:

- **`cleanUrls: true`**: Automatically serves `/about` instead of `/about.html`.
- **Automatic 301 Redirects**: Redirects `www.amandeepkumar.dev` and legacy domains to `https://amandeepkumar.dev/`.
- **Security Headers**: Protects against clickjacking, MIME-type sniffing, and cross-site scripting (XSS).
- **Immutable Asset Caching**: 1-year caching for images, SVGs, and fonts on Vercel's global CDN edge.

---

## 8. Step 7: Testing & Verification Checklist

Before and after deployment, verify:
- [x] **Canonical Domain**: `https://amandeepkumar.dev/` is configured in `index.html`, `sitemap.xml`, `robots.txt`, `vercel.json`, and `_redirects`.
- [x] **Uncropped Project Images**: All 8 project cards display full images with `object-contain` without clipping.
- [x] **Live Links**: Wonder AI (`https://wonder-ai-2-0.vercel.app/`), TaskFlow (`https://taskflow-pro-ux7u.onrender.com/`), and Mithila Makhana (`https://mithilamakhan.netlify.app/`) are fully active.
- [x] **Vercel Serverless Function**: `api/contact.js` handles POST requests with honeypot spam protection.
- [x] **Structured Data (JSON-LD)**: Schema.org `Person` and `WebSite` graph validated with `amandeepkumar.dev`.
- [x] **DNS & SSL**: Verify `https://amandeepkumar.dev/` once domain records propagate.
