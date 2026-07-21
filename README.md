# Immunodermatology Masterclass 2026

Event site built from the [Google Drive assets](https://drive.google.com/drive/folders/1jRt127m5x5GrU9pnDteQova2uZJChP3A) and [slide deck](https://docs.google.com/presentation/d/1I3Kc1hnMeJQ_j0oTo6QoDl6cx--dli47kgvfQpwLTbQ/edit).

## Run locally

```bash
npm install
npm run dev
```

## Add speaker photos

Place images in `public/images/speakers/` using the filenames listed in `public/images/speakers/README.md`. Until a file exists, the site shows a styled placeholder with the expected path.

## Brand assets

Official logos, hero artwork, pattern, and registration graphics live in `public/images/assets/` (synced from Google Drive). See `public/images/assets/README.md`.

## Deploy

Manual deploy:

```bash
npm run deploy
```

### Automatic deploy (GitHub Actions)

Pushes to `main` or `cursor/psoriasis-conference-site-bf05` trigger a deploy to [immunodermatology-masterclass.web.app](https://immunodermatology-masterclass.web.app).

One-time setup — add a repo secret:

1. Run `firebase login:ci` locally and copy the token.
2. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
3. Name: `FIREBASE_TOKEN`, value: the token from step 1.

To disable auto-deploy later (e.g. when gating changes behind review), remove the branch from `.github/workflows/firebase-hosting.yml` or delete the workflow file.
