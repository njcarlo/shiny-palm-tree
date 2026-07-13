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

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) (or use an existing one).
2. Enable **Hosting** in that project.
3. Update `.firebaserc` with your Firebase project ID if it differs from `psoriasis-conference-2025`.
4. Authenticate and deploy:

```bash
npx firebase login
npx firebase use --add
npm run deploy
```

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
