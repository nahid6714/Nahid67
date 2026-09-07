import { GitHubPortfolioItem, INITIAL_GITHUB_PORTFOLIO, GITHUB_OWNER } from '../data/githubPortfolioData';

const CACHE_KEY = 'nh_github_portfolio_cache_v2';
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes cache

interface CachePayload {
  timestamp: number;
  items: GitHubPortfolioItem[];
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return 'Unknown size';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function extractWhatsNew(body?: string): string[] {
  if (!body) return ['Direct APK build released on GitHub'];
  const lines = body
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*+]\s+/, '').replace(/^\s*#+\s*/, '').trim())
    .filter(Boolean)
    .filter((l) => !/^full changelog/i.test(l))
    .slice(0, 4);

  return lines.length > 0 ? lines : ['Direct APK build released on GitHub'];
}

function detectHostProvider(url: string): 'Vercel' | 'Netlify' | 'GitHub Pages' | 'Cloud' {
  const lower = url.toLowerCase();
  if (lower.includes('vercel.app') || lower.includes('.vercel.')) return 'Vercel';
  if (lower.includes('netlify.app') || lower.includes('.netlify.')) return 'Netlify';
  if (lower.includes('github.io')) return 'GitHub Pages';
  return 'Cloud';
}

/**
 * Scans a GitHub repository for:
 * 1. Live website URLs (via homepage, description, deployments API, environments API, or README markdown)
 * 2. Android APK releases (via GitHub releases API)
 *
 * Repositories that do not have a live website or a released APK are excluded from the portfolio.
 */
async function inspectRepo(repo: any): Promise<GitHubPortfolioItem | null> {
  const repoName = repo.name;
  const owner = repo.owner?.login || GITHUB_OWNER;

  // Skip user meta profile repository (e.g. nahid6714/nahid6714) or forks
  if (repoName.toLowerCase() === owner.toLowerCase() || repo.fork) {
    return null;
  }

  let liveUrl: string | null = null;
  let hostProvider: 'Vercel' | 'Netlify' | 'GitHub Pages' | 'Cloud' | null = null;
  let latestApk: GitHubPortfolioItem['latestApk'] = null;
  let cleanDescription: string | null = null;

  // 1. Direct homepage field on repository
  if (repo.homepage && typeof repo.homepage === 'string' && /^https?:\/\//i.test(repo.homepage.trim())) {
    liveUrl = repo.homepage.trim();
    hostProvider = detectHostProvider(liveUrl);
  }

  // 2. Repo description check for Vercel/Netlify/Live links
  if (!liveUrl && repo.description && typeof repo.description === 'string') {
    const descMatch = repo.description.match(/https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/i);
    if (descMatch) {
      const candidate = descMatch[0].replace(/[).,;]+$/, '');
      if (/vercel\.app|netlify\.app|github\.io|pages\.dev|onrender\.com/i.test(candidate)) {
        liveUrl = candidate;
        hostProvider = detectHostProvider(candidate);
      }
    }
  }

  // 3. Query GitHub Releases API for APK assets
  try {
    const relRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/releases?per_page=10`);
    if (relRes.ok) {
      const releases = await relRes.json();
      if (Array.isArray(releases) && releases.length > 0) {
        for (const rel of releases) {
          if (rel.draft) continue;
          const apkAsset = (rel.assets || []).find((asset: any) => /\.apk$/i.test(asset.name));
          if (apkAsset) {
            latestApk = {
              version: rel.tag_name || rel.name || 'Latest',
              releaseDate: formatDate(rel.published_at || rel.created_at),
              apkSize: formatBytes(apkAsset.size),
              apkFileName: apkAsset.name,
              downloadUrl: apkAsset.browser_download_url,
              whatsNew: extractWhatsNew(rel.body),
            };
            break;
          }
        }
      }
    }
  } catch (err) {
    console.warn(`Could not fetch releases for ${repoName}:`, err);
  }

  // 4. Query GitHub Deployments API (where Vercel & Netlify register environment URLs)
  if (!liveUrl) {
    try {
      const depRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/deployments?per_page=5`);
      if (depRes.ok) {
        const deps = await depRes.json();
        if (Array.isArray(deps) && deps.length > 0) {
          for (const dep of deps) {
            if (dep.statuses_url) {
              const statRes = await fetch(dep.statuses_url);
              if (statRes.ok) {
                const statuses = await statRes.json();
                if (Array.isArray(statuses) && statuses.length > 0) {
                  const target = statuses[0]?.environment_url || statuses[0]?.target_url;
                  if (target && /^https?:\/\//i.test(target)) {
                    liveUrl = target;
                    hostProvider = detectHostProvider(target);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn(`Could not check deployments for ${repoName}:`, err);
    }
  }

  // 5. Query README for hosting links (e.g. Vercel or Netlify links in README markdown)
  // and extract meaningful description if repo.description is generic
  try {
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`);
    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      if (readmeData.content) {
        const decoded = atob(readmeData.content.replace(/\s/g, ''));
        
        // Find live link if still missing
        if (!liveUrl) {
          // Priority A: Explicit Live Website line (e.g. "Live Website: https://...")
          const liveLineMatch = decoded.match(/(?:Live Website|Live Demo|Live Site|Website|Demo|Hosted At|URL)[*:\s]+(https?:\/\/[^\s\n*)]+)/i);
          if (liveLineMatch && liveLineMatch[1]) {
            const extracted = liveLineMatch[1].replace(/[).,;]+$/, '');
            liveUrl = extracted;
            hostProvider = detectHostProvider(extracted);
          } else {
            // Priority B: Scan for known host domains in readme
            const urlMatches = decoded.match(/https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/g) || [];
            for (const rawUrl of urlMatches) {
              const cleanUrl = rawUrl.replace(/[).,;]+$/, '');
              if (/vercel\.app|netlify\.app|github\.io|pages\.dev|onrender\.com/i.test(cleanUrl)) {
                liveUrl = cleanUrl;
                hostProvider = detectHostProvider(cleanUrl);
                break;
              }
            }
          }
        }

        // Extract clean description from README if repo description is empty, "nothing", or "All ok"
        const isGenericDesc = !repo.description || 
          repo.description.trim().toLowerCase() === 'nothing' || 
          repo.description.trim().toLowerCase() === 'all ok' ||
          repo.description.trim().length < 5;

        if (isGenericDesc) {
          const lines = decoded
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l && !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('!') && !l.startsWith('[!') && !l.startsWith('🌐'));
          if (lines[0]) {
            cleanDescription = lines[0].replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
            if (cleanDescription.length > 200) {
              cleanDescription = cleanDescription.slice(0, 197) + '...';
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn(`Could not check README for ${repoName}:`, err);
  }

  // 6. STRICT REQUIREMENT:
  // Repositories must either be a released Android App (has latestApk) OR a live Website (has liveUrl).
  // Repositories without a live website URL and without an APK release are NOT displayed.
  const isAndroid = !!latestApk;
  const isWebsite = !isAndroid && !!liveUrl;

  if (!isAndroid && !isWebsite) {
    // Skip repositories that are not released websites or released apps
    return null;
  }

  const kind: 'website' | 'app' = isAndroid ? 'app' : 'website';
  const category: 'Web Development' | 'Android App' = isAndroid ? 'Android App' : 'Web Development';

  // Technologies list
  const technologies: string[] = [];
  if (repo.language) technologies.push(repo.language);
  if (hostProvider) technologies.push(hostProvider);
  if (isAndroid) {
    if (!technologies.includes('Android SDK')) technologies.push('Android SDK');
    if (latestApk) technologies.push('APK Releases');
  } else {
    if (!technologies.includes('React') && ['TypeScript', 'JavaScript'].includes(repo.language || '')) {
      technologies.push('React');
    }
    if (!technologies.includes('Tailwind CSS')) technologies.push('Tailwind CSS');
  }

  // Format readable name
  const formattedName = repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  const finalDescription = cleanDescription || 
    (repo.description && repo.description !== 'nothing' && repo.description !== 'All ok'
      ? repo.description
      : isAndroid
      ? `Native Android application developed and released on GitHub by ${owner}.`
      : `Responsive web application built and deployed live on ${hostProvider || 'the web'} by ${owner}.`);

  return {
    id: `${repoName.toLowerCase()}-${kind}`,
    name: formattedName,
    repoName: repo.name,
    repoOwner: owner,
    description: finalDescription,
    githubUrl: repo.html_url,
    kind,
    category,
    technologies,
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    updatedAt: repo.pushed_at || repo.updated_at,
    featured: true,
    liveUrl,
    hostProvider,
    latestApk,
  };
}

/**
 * Fetches real public repositories directly from GitHub for @nahid6714.
 * Uses cached localStorage data when fresh to preserve GitHub API rate limits.
 */
export async function syncGitHubPortfolio(forceRefresh: boolean = false): Promise<{
  items: GitHubPortfolioItem[];
  fromCache: boolean;
  lastSynced: Date;
  error?: string;
}> {
  // Check local storage cache first
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const parsed: CachePayload = JSON.parse(cachedRaw);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.items) && parsed.items.length > 0) {
          return {
            items: parsed.items,
            fromCache: true,
            lastSynced: new Date(parsed.timestamp),
          };
        }
      }
    } catch (e) {
      console.warn('Error reading GitHub cache:', e);
    }
  }

  // Fetch from GitHub REST API
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`);
    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Invalid repos response from GitHub');
    }

    // Process all user repos in parallel
    const analyzed = await Promise.all(repos.map((repo) => inspectRepo(repo)));
    const validItems = analyzed.filter((item): item is GitHubPortfolioItem => item !== null);

    if (validItems.length > 0) {
      // Merge with initial verified data to ensure complete metadata (like Any's Beauty Corner live link)
      const mergedItems = validItems.map((liveItem) => {
        const matchedInitial = INITIAL_GITHUB_PORTFOLIO.find(
          (init) => init.repoName.toLowerCase() === liveItem.repoName.toLowerCase()
        );
        if (matchedInitial) {
          return {
            ...matchedInitial,
            ...liveItem,
            name: matchedInitial.name || liveItem.name,
            description: liveItem.description && liveItem.description !== 'nothing' && liveItem.description !== 'All ok' 
              ? liveItem.description 
              : matchedInitial.description,
            liveUrl: liveItem.liveUrl || matchedInitial.liveUrl,
            hostProvider: liveItem.hostProvider || matchedInitial.hostProvider,
            latestApk: liveItem.latestApk || matchedInitial.latestApk,
          };
        }
        return liveItem;
      });

      // Save to cache
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), items: mergedItems })
          );
        } catch {}
      }

      return {
        items: mergedItems,
        fromCache: false,
        lastSynced: new Date(),
      };
    }
  } catch (err: any) {
    console.warn('GitHub live fetch encountered error, using high-fidelity fallback:', err);
  }

  // Fallback to initial verified dataset
  return {
    items: INITIAL_GITHUB_PORTFOLIO,
    fromCache: true,
    lastSynced: new Date(),
  };
}
