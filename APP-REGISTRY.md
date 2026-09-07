# Automatic APK App Registry

The portfolio does **not** call the GitHub API from the browser.

A GitHub Actions workflow (`.github/workflows/sync-app-registry.yml`) periodically scans public repositories owned by `nahid6714` and updates `src/data/appsData.ts`.

## How to add a new app

1. Create a new public GitHub repository under `nahid6714`.
2. Put your Android source code in the repository.
3. Create a GitHub Release and upload the APK as a release asset (`.apk`).
4. Wait for the portfolio's scheduled **Sync APK App Registry** workflow, or run that workflow manually from the portfolio repository's Actions tab.
5. The workflow finds the newest release containing an APK, records the APK download URL/version/date/size/changelog, and searches the repository tree for a suitable logo/icon.
6. The workflow commits the generated registry file. Vercel then deploys the change automatically.

Only repositories with a non-draft release containing an APK are shown in the website's Apps section. Repositories without an APK release are not shown.

## Logo selection

The sync script searches the repository recursively and prefers files whose names look like `logo`, `icon`, `launcher`, or `favicon`, especially Android `mipmap`/`drawable` assets. It supports PNG, JPG/JPEG, WEBP, GIF, SVG and ICO. If no suitable image exists, it uses GitHub's generated repository preview as a last-resort visual fallback.

## Update frequency

The workflow runs automatically every 2 hours and can also be started manually. After a registry change is committed, the normal Vercel Git deployment updates the live portfolio.
