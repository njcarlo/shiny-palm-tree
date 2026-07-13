# Psoriasis Conference 2025

Event landing page for **Psoriasis Conference 2025: “Transforming Care: The Future of Psoriasis Management”** — inspired by the PDS conference event site.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Firebase Hosting

Your live URL will be:

**`https://<project-id>.web.app`**

No custom domain needed. The URL is only as clean as the **project ID** you choose when creating the Firebase project — there are no random characters unless Firebase auto-generates the ID for you.

### Get a clean URL

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. When asked for a **Project ID**, type your own (e.g. `psoriasis-conference`) instead of accepting the auto-generated one like `psoriasis-conference-a1b2c`.
3. Enable **Hosting** in that project.
4. If your project ID differs from `psoriasis-conference`, update `.firebaserc`.
5. Deploy:

```bash
npx firebase login
npx firebase use --add
npm run deploy
```

Your site will be live at e.g. `https://psoriasis-conference.web.app` (and `https://psoriasis-conference.firebaseapp.com`).

> **Note:** Project IDs must be globally unique. If `psoriasis-conference` is taken, try something close like `pds-psoriasis-conference` or `psoriasis-conference-ph`. Avoid preview-channel deploys for production — those add extra suffixes to the URL.

### GitHub Actions deploy

Add these repository secrets/variables in GitHub:

- `FIREBASE_SERVICE_ACCOUNT` — JSON from Firebase Console → Project settings → Service accounts → Generate new private key
- `FIREBASE_PROJECT_ID` (repository variable, optional) — overrides the default project ID in the workflow

Pushes to `main` or `cursor/psoriasis-conference-site-bf05` will then deploy automatically.

## Contents

- Hero with date, venue, and registration CTA
- Event details (CPD / CME credits)
- Speaker highlights
- Abstract submission callout
- Novartis lunch symposium
- Sponsor tiers
- Organizing team / footer
