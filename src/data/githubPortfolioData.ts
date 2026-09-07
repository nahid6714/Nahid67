/**
 * Real GitHub Repositories Snapshot for @nahid6714
 * 
 * Only verified repositories from github.com/nahid6714 are included.
 * Non-existent / mock projects have been completely removed.
 * Websites include real Vercel and Netlify hosted links.
 * Android applications include direct APK release downloads.
 */

export interface GitHubPortfolioItem {
  id: string;
  name: string;
  repoName: string;
  repoOwner: string;
  description: string;
  githubUrl: string;
  kind: 'website' | 'app' | 'tool';
  category: 'Web Development' | 'Android App' | 'Software Tool';
  technologies: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  featured: boolean;
  // Hosted website details
  liveUrl?: string | null;
  hostProvider?: 'Vercel' | 'Netlify' | 'GitHub Pages' | 'Cloud' | null;
  // Android APK release details
  latestApk?: {
    version: string;
    releaseDate: string;
    apkSize: string;
    apkFileName: string;
    downloadUrl: string;
    whatsNew: string[];
  } | null;
}

export const GITHUB_OWNER = 'nahid6714';

export const INITIAL_GITHUB_PORTFOLIO: GitHubPortfolioItem[] = [
  // 1. Nahid67 - Live Website on Vercel
  {
    id: 'nahid67-website',
    name: 'Nahid67 Portfolio & Web App',
    repoName: 'Nahid67',
    repoOwner: 'nahid6714',
    description: 'Modern portfolio and interactive web platform built with TypeScript, React, and Tailwind CSS, deployed live on Vercel.',
    githubUrl: 'https://github.com/nahid6714/Nahid67',
    kind: 'website',
    category: 'Web Development',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Vercel'],
    stars: 0,
    forks: 0,
    updatedAt: '2026-08-20',
    featured: true,
    liveUrl: 'https://nahid67.vercel.app',
    hostProvider: 'Vercel',
  },

  // 2. Any's Beauty Corner - Live E-Commerce Website on Netlify
  {
    id: 'anys-beauty-corner-website',
    name: "Any's Beauty Corner",
    repoName: 'Anysbeautycornerok',
    repoOwner: 'nahid6714',
    description: "Modern beauty & cosmetics storefront website with dynamic catalog showcases, order tracking, and clean responsive UI deployed on Netlify.",
    githubUrl: 'https://github.com/nahid6714/Anysbeautycornerok',
    kind: 'website',
    category: 'Web Development',
    technologies: ['TypeScript', 'React', 'Netlify', 'Tailwind CSS', 'Responsive Design'],
    stars: 0,
    forks: 0,
    updatedAt: '2026-08-07',
    featured: true,
    liveUrl: 'https://Anysbeautycorner.netlify.app',
    hostProvider: 'Netlify',
  },

  // 3. Tools - Native Android Application with APK Releases
  {
    id: 'tools-app',
    name: 'Tools Android Utility',
    repoName: 'tools',
    repoOwner: 'nahid6714',
    description: 'All-in-one productivity Android utility featuring Food Bill Manager, Smart Document Scanner for NID/ID cards, PDF export, and Room Database.',
    githubUrl: 'https://github.com/nahid6714/tools',
    kind: 'app',
    category: 'Android App',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Android SDK', 'GitHub Actions CI/CD'],
    stars: 0,
    forks: 0,
    updatedAt: '2026-09-02',
    featured: true,
    latestApk: {
      version: 'v1.0.212',
      releaseDate: 'Sep 02, 2026',
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

  // 4. Edu Library - Native Android Application with APK Releases
  {
    id: 'edu-library-app',
    name: 'Edu Library',
    repoName: 'Edu-library-',
    repoOwner: 'nahid6714',
    description: 'Android educational library and resource manager application with automated GitHub Actions release packaging and offline support.',
    githubUrl: 'https://github.com/nahid6714/Edu-library-',
    kind: 'app',
    category: 'Android App',
    technologies: ['Kotlin', 'Android SDK', 'Jetpack', 'GitHub Releases'],
    stars: 0,
    forks: 0,
    updatedAt: '2026-09-07',
    featured: true,
    latestApk: {
      version: 'v1.0.30',
      releaseDate: 'Sep 07, 2026',
      apkSize: '8.28 MB',
      apkFileName: 'EduLibrary-latest.apk',
      downloadUrl: 'https://github.com/nahid6714/Edu-library-/releases/download/v1.0.30/EduLibrary-latest.apk',
      whatsNew: [
        'Latest published APK release on GitHub',
        'Auto APK build and signed asset packaging',
      ],
    },
  },
];
