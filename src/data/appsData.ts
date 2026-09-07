import { AppRepoConfig } from '../types/portfolio';

/**
 * LOCAL APP REGISTRY
 *
 * The portfolio reads APK links, versions, sizes, changelogs and logo URLs
 * from this file. No GitHub API request is required to render the Apps section.
 *
 * To publish another APK app, add one object here with:
 * - repoOwner / repoName
 * - appName / category / description
 * - iconUrl (optional but recommended)
 * - defaultRelease.downloadUrl pointing to the APK
 *
 * The website will keep working even if GitHub API/network access is unavailable.
 */
export const APPS_DATA: AppRepoConfig[] = [
  {
    id: 'tools-app',
    appName: 'Tools',
    repoOwner: 'nahid6714',
    repoName: 'tools',
    category: 'Productivity & Utilities',
    description:
      'A collection of useful Android tools and utilities developed as a practical software project. Includes Food Bill Manager, Smart Document & NID Scanner, and PDF Export.',
    icon: 'wrench',
    // Tools uses its Android launcher artwork under app/src/main/res/drawable.
    // Keep the real app logo visible in the portfolio instead of the fallback icon.
    iconUrl: 'https://raw.githubusercontent.com/nahid6714/tools/main/app/src/main/res/drawable/app_logo_foreground.jpg',
    githubUrl: 'https://github.com/nahid6714/tools',
    status: 'available',
    defaultRelease: {
      version: 'v1.0.184',
      releaseDate: 'August 18, 2026',
      apkSize: '2.44 MB',
      apkFileName: 'app-release.apk',
      downloadUrl: 'https://github.com/nahid6714/tools/releases/download/v1.0.184/app-release.apk',
      whatsNew: [
        'Add drag-to-reorder for quick presets and bill items',
        'Enhanced NID and ID card document scanner contrast',
        'Direct PDF export and thermal printer compatibility',
        'Offline Room database local caching performance optimizations',
      ],
      tagCommit: '4045b45',
    },
  },
  {
    id: 'edu-library-app',
    appName: 'Edu Library',
    repoOwner: 'nahid6714',
    repoName: 'Edu-library-',
    category: 'Education & Digital Library',
    description:
      'A modern Android education library for accessing study resources, notes, books, and learning materials in one place.',
    icon: 'book-open',
    iconUrl: '/app-logos/edu-library.png',
    githubUrl: 'https://github.com/nahid6714/Edu-library-',
    status: 'available',
    defaultRelease: {
      version: 'v1.0.30',
      releaseDate: 'Sep 7, 2026',
      apkSize: '7.90 MB',
      apkFileName: 'EduLibrary-latest.apk',
      downloadUrl: 'https://github.com/nahid6714/Edu-library-/releases/download/v1.0.30/EduLibrary-latest.apk',
      whatsNew: [
        'Latest signed Edu Library Android release',
        'Updated app features and stability improvements',
        'Direct APK distribution through GitHub Releases',
      ],
    },
  },
  {
    id: 'calculator-app',
    appName: 'Smart Calculator & Unit Converter',
    repoOwner: 'nahid6714',
    repoName: 'calculator-app',
    category: 'Mathematics & Daily Utility',
    description:
      'Modern Android calculator with real-time currency conversion, unit conversions, and calculation history log using Jetpack Compose.',
    icon: 'calculator',
    githubUrl: 'https://github.com/nahid6714/calculator-app',
    status: 'in-development',
    defaultRelease: {
      version: 'v0.9.2-beta',
      releaseDate: 'Coming Soon',
      apkSize: '3.1 MB',
      apkFileName: 'calculator-preview.apk',
      downloadUrl: 'https://github.com/nahid6714/calculator-app/releases',
      whatsNew: [
        'Scientific math formula evaluation',
        'History tape with exportable calculation logs',
        'Dark and Light theme automatic synchronization',
      ],
    },
  },
  {
    id: 'expense-manager',
    appName: 'Daily Expense & Budget Manager',
    repoOwner: 'nahid6714',
    repoName: 'expense-manager',
    category: 'Finance & Budgeting',
    description:
      'Personal finance tracking application built for offline-first privacy. Log daily expenses, categorize transactions, and view clean monthly summaries.',
    icon: 'wallet',
    githubUrl: 'https://github.com/nahid6714/expense-manager',
    status: 'planned',
    defaultRelease: {
      version: 'v0.1.0-alpha',
      releaseDate: 'In Roadmap',
      apkSize: '4.5 MB',
      apkFileName: 'expense-manager.apk',
      downloadUrl: 'https://github.com/nahid6714/expense-manager',
      whatsNew: [
        'Initial prototype architecture with Jetpack Compose',
        'Room database schema for multi-category transactions',
        'Local encrypted backup export to storage',
      ],
    },
  },
];

export default APPS_DATA;
