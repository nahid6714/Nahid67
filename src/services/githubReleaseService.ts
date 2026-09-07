import { AppReleaseInfo } from '../types/portfolio';

// In-memory cache to prevent hitting GitHub API rate limits
const cache = new Map<string, { data: AppReleaseInfo; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

/**
 * Parses markdown release body into clean bullet points
 */
function parseReleaseNotes(body: string | undefined): string[] {
  if (!body) return ['General improvements and bug fixes.'];
  
  const lines = body
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('##') && !line.startsWith('**Build Number'));

  const cleanNotes: string[] = [];
  for (const line of lines) {
    // Remove markdown list markers and bold tags
    let cleaned = line.replace(/^[-*•]\s*/, '').trim();
    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
    if (cleaned.length > 0) {
      cleanNotes.push(cleaned);
    }
  }

  return cleanNotes.length > 0 ? cleanNotes.slice(0, 6) : ['Continuous stability and maintenance updates.'];
}

/**
 * Formats ISO date string to readable format e.g. "Aug 18, 2026"
 */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Fetches the latest release for a GitHub repository
 * Automatically extracts the .apk file asset, size, version, and changelog.
 */
export async function fetchLatestRelease(
  owner: string,
  repo: string,
  fallback: AppReleaseInfo
): Promise<{ release: AppReleaseInfo; isLive: boolean; error?: string }> {
  const cacheKey = `${owner}/${repo}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { release: cached.data, isLive: true };
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Repository has no published releases yet
        return { release: fallback, isLive: false, error: 'No releases published yet' };
      }
      if (response.status === 403) {
        // Rate limit reached
        return { release: fallback, isLive: false, error: 'GitHub API rate limit reached' };
      }
      return { release: fallback, isLive: false, error: `GitHub API status ${response.status}` };
    }

    const data = await response.json();
    
    // Find APK asset
    const assets = Array.isArray(data.assets) ? data.assets : [];
    const apkAsset = assets.find((asset: { name?: string; content_type?: string }) => {
      const name = asset.name?.toLowerCase() || '';
      return name.endsWith('.apk') || asset.content_type === 'application/vnd.android.package-archive';
    });

    const releaseDate = data.published_at ? formatDate(data.published_at) : fallback.releaseDate;
    const version = data.tag_name || data.name || fallback.version;
    const whatsNew = parseReleaseNotes(data.body);

    let apkSize = fallback.apkSize;
    let apkFileName = fallback.apkFileName;
    let downloadUrl = fallback.downloadUrl;

    if (apkAsset) {
      const bytes = apkAsset.size || 0;
      apkSize = bytes > 0 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : fallback.apkSize;
      apkFileName = apkAsset.name || fallback.apkFileName;
      downloadUrl = apkAsset.browser_download_url || fallback.downloadUrl;
    } else if (data.html_url) {
      downloadUrl = data.html_url;
    }

    const liveRelease: AppReleaseInfo = {
      version,
      releaseDate,
      apkSize,
      apkFileName,
      downloadUrl,
      whatsNew,
      tagCommit: data.target_commitish ? data.target_commitish.slice(0, 7) : fallback.tagCommit,
    };

    cache.set(cacheKey, { data: liveRelease, timestamp: Date.now() });
    return { release: liveRelease, isLive: true };
  } catch (err) {
    console.warn(`[GitHub Service] Failed to fetch release for ${owner}/${repo}, using fallback:`, err);
    return { release: fallback, isLive: false, error: 'Network unavailable' };
  }
}

/**
 * Triggers direct APK download in browser without redirecting visitor to GitHub webpage
 */
export function triggerDirectApkDownload(downloadUrl: string, fileName: string): boolean {
  try {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to trigger direct download:', err);
    window.location.href = downloadUrl;
    return false;
  }
}


export interface DiscoveredGitHubApp {
  id: string;
  appName: string;
  repoOwner: string;
  repoName: string;
  category: string;
  description: string;
  icon: string;
  iconUrl?: string;
  githubUrl: string;
  status: 'available';
  defaultRelease: AppReleaseInfo;
}

const MY_GITHUB_USERNAME = 'nahid6714';
const ICON_PATHS = [
  'public/logo.png',
  'public/logo.jpg',
  'public/logo.jpeg',
  'public/icon.png',
  'public/icon.jpg',
  'public/favicon.png',
  'app/src/main/res/drawable/app_logo_foreground.jpg',
  'app/src/main/res/drawable/app_logo_foreground.png',
  'app/src/main/res/drawable/ic_launcher_foreground.png',
  'app/src/main/res/drawable/ic_launcher_foreground.jpg',
  'app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
  'app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
  'app/src/main/res/mipmap-xhdpi/ic_launcher.png',
  'app/src/main/res/mipmap-hdpi/ic_launcher.png',
  'app/src/main/res/mipmap-mdpi/ic_launcher.png',
];

function humanizeRepoName(repoName: string): string {
  return repoName
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function categoryFromRepo(repoName: string, description?: string): string {
  const text = `${repoName} ${description || ''}`.toLowerCase();
  if (/(game|gaming)/.test(text)) return 'Games & Entertainment';
  if (/(education|library|school|study|learn)/.test(text)) return 'Education & Library';
  if (/(expense|budget|finance|money|invoice|bill)/.test(text)) return 'Finance & Productivity';
  if (/(calculator|math|converter)/.test(text)) return 'Mathematics & Utility';
  if (/(tool|utility|scanner|pdf)/.test(text)) return 'Productivity & Utilities';
  return 'Android Application';
}

async function resolveRepositoryIcon(owner: string, repo: string): Promise<string | undefined> {
  // HEAD checks avoid downloading image bytes and let the browser load the first valid asset.
  for (const path of ICON_PATHS) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) return url;
    } catch {
      // Continue with the next conventional location.
    }
  }
  return undefined;
}

/**
 * Discovers Android apps automatically from the owner's public GitHub repositories.
 * A repository is shown only when it belongs to MY_GITHUB_USERNAME and has a published
 * GitHub Release containing an APK asset. This means new repositories/releases appear
 * without adding another entry to appsConfig.ts.
 */
export async function discoverMyReleasedApps(
  configuredApps: AppRepoConfig[] = []
): Promise<DiscoveredGitHubApp[]> {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${MY_GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );

    if (!reposResponse.ok) throw new Error(`GitHub repositories API ${reposResponse.status}`);
    const repos = await reposResponse.json();
    if (!Array.isArray(repos)) return [];

    const ownedRepos = repos.filter((repo: any) => {
      const ownerLogin = repo?.owner?.login?.toLowerCase();
      return ownerLogin === MY_GITHUB_USERNAME.toLowerCase() && repo?.name && repo?.fork !== true;
    });

    const results = await Promise.all(
      ownedRepos.map(async (repo: any) => {
        const configured = configuredApps.find(
          (app) => app.repoOwner.toLowerCase() === MY_GITHUB_USERNAME.toLowerCase() &&
            app.repoName.toLowerCase() === String(repo.name).toLowerCase()
        );

        try {
          const releaseResponse = await fetch(
            `https://api.github.com/repos/${MY_GITHUB_USERNAME}/${encodeURIComponent(repo.name)}/releases/latest`,
            { headers: { Accept: 'application/vnd.github.v3+json' } }
          );
          if (!releaseResponse.ok) return null;

          const release = await releaseResponse.json();
          const apkAsset = Array.isArray(release.assets)
            ? release.assets.find((asset: any) => {
                const name = String(asset?.name || '').toLowerCase();
                return name.endsWith('.apk') || asset?.content_type === 'application/vnd.android.package-archive';
              })
            : null;

          // Only repositories that actually publish an APK are portfolio apps.
          if (!apkAsset) return null;

          const fallback = configured?.defaultRelease || {
            version: release.tag_name || release.name || 'Latest',
            releaseDate: release.published_at ? formatDate(release.published_at) : 'Latest',
            apkSize: apkAsset.size ? `${(apkAsset.size / (1024 * 1024)).toFixed(2)} MB` : 'Unknown',
            apkFileName: apkAsset.name || 'app.apk',
            downloadUrl: apkAsset.browser_download_url || release.html_url,
            whatsNew: parseReleaseNotes(release.body),
          };

          const liveRelease: AppReleaseInfo = {
            version: release.tag_name || release.name || fallback.version,
            releaseDate: release.published_at ? formatDate(release.published_at) : fallback.releaseDate,
            apkSize: apkAsset.size ? `${(apkAsset.size / (1024 * 1024)).toFixed(2)} MB` : fallback.apkSize,
            apkFileName: apkAsset.name || fallback.apkFileName,
            downloadUrl: apkAsset.browser_download_url || fallback.downloadUrl,
            whatsNew: parseReleaseNotes(release.body),
            tagCommit: release.target_commitish ? String(release.target_commitish).slice(0, 7) : fallback.tagCommit,
          };

          const iconUrl = configured?.iconUrl || await resolveRepositoryIcon(MY_GITHUB_USERNAME, repo.name);

          return {
            id: configured?.id || `github-${repo.name}`,
            appName: configured?.appName || repo.name,
            repoOwner: MY_GITHUB_USERNAME,
            repoName: repo.name,
            category: configured?.category || categoryFromRepo(repo.name, repo.description),
            description: configured?.description || repo.description || `Android application published by ${MY_GITHUB_USERNAME}.`,
            icon: configured?.icon || 'smartphone',
            iconUrl,
            githubUrl: repo.html_url || `https://github.com/${MY_GITHUB_USERNAME}/${repo.name}`,
            status: 'available' as const,
            defaultRelease: liveRelease,
          };
        } catch {
          return null;
        }
      })
    );

    return results
      .filter((app): app is DiscoveredGitHubApp => Boolean(app))
      .sort((a, b) => a.appName.localeCompare(b.appName));
  } catch (error) {
    console.warn('[GitHub Discovery] Failed to discover released apps:', error);
    return [];
  }
}
