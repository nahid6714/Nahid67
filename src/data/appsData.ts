import { AppRepoConfig } from '../types/portfolio';

/**
 * AUTO-GENERATED APP REGISTRY
 *
 * This file is updated by .github/workflows/sync-app-registry.yml.
 * Only repositories owned by nahid6714 with at least one non-draft GitHub
 * Release containing an APK asset are included. The website itself makes
 * no GitHub API calls at runtime.
 */
export const APPS_DATA: AppRepoConfig[] = [
  {
    id: 'tools-app',
    appName: 'Tools',
    repoOwner: 'nahid6714',
    repoName: 'tools',
    category: 'Android Application',
    description: 'Android utility application published by nahid6714.',
    icon: 'smartphone',
    iconUrl: 'https://raw.githubusercontent.com/nahid6714/tools/main/app/src/main/res/drawable/app_logo_foreground.jpg',
    githubUrl: 'https://github.com/nahid6714/tools',
    status: 'available',
    defaultRelease: {
      version: 'v1.0.212',
      releaseDate: 'Sep 2, 2026',
      apkSize: '2.44 MB',
      apkFileName: 'app-release.apk',
      downloadUrl: 'https://github.com/nahid6714/tools/releases/download/v1.0.212/app-release.apk',
      whatsNew: [
        'Automated CI/CD build package from GitHub Actions',
        'Direct signed APK asset distribution',
        'Food bill presets & document scanner enhancements',
      ],
    },
  },
  {
    id: 'edu-library-app',
    appName: 'Edu Library',
    repoOwner: 'nahid6714',
    repoName: 'Edu-library-',
    category: 'Android Application',
    description: 'Android education library application published by nahid6714.',
    icon: 'smartphone',
    iconUrl: '/app-logos/edu-library.png',
    githubUrl: 'https://github.com/nahid6714/Edu-library-',
    status: 'available',
    defaultRelease: {
      version: 'v1.0.30',
      releaseDate: 'Sep 7, 2026',
      apkSize: '8.28 MB',
      apkFileName: 'EduLibrary-latest.apk',
      downloadUrl: 'https://github.com/nahid6714/Edu-library-/releases/download/v1.0.30/EduLibrary-latest.apk',
      whatsNew: [
        'Latest published APK release',
        'Direct APK distribution through GitHub Releases',
      ],
    },
  },
];

export default APPS_DATA;
