#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');

const OWNER = process.env.GITHUB_OWNER || 'nahid6714';
const TOKEN = process.env.GITHUB_TOKEN || '';
const OUTPUT = path.resolve('src/data/appsData.ts');
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  'User-Agent': 'Nahid67-App-Registry-Sync',
};

async function github(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${res.status} ${endpoint}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'Unknown';
  const mb = bytes / 1_000_000;
  if (mb < 1) return `${Math.max(1, Math.round(bytes / 1000))} KB`;
  return `${mb.toFixed(2)} MB`;
}

function formatDate(value) {
  if (!value) return 'Unknown';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'app';
}

function uniqueId(base, used) {
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

function escapeTs(value) {
  return JSON.stringify(String(value ?? ''));
}

function releaseNotes(release) {
  const lines = String(release.body || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*+]\s+/, '').replace(/^\s*#+\s*/, '').trim())
    .filter(Boolean)
    .filter((line) => !/^full changelog/i.test(line))
    .slice(0, 5);
  return lines.length ? lines : [release.name || `APK release ${release.tag_name || ''}`.trim()];
}

function chooseLogo(tree, repo) {
  const imageExt = /\.(png|jpe?g|webp|gif|svg|ico)$/i;
  const ignored = /(screenshot|screenshots|banner|cover|background|wallpaper|mockup|preview|docs\/images?)/i;
  const candidates = tree
    .filter((item) => item.type === 'blob' && imageExt.test(item.path))
    .map((item) => {
      const p = item.path;
      const lower = p.toLowerCase();
      const base = lower.split('/').pop() || lower;
      let score = 0;
      if (/(^|[-_.])(logo|icon|favicon)([-_.]|$)/i.test(base)) score += 180;
      if (/(ic_launcher|launcher|app_icon|app-logo|appicon)/i.test(base)) score += 220;
      if (/(mipmap|drawable)/i.test(lower)) score += 110;
      if (/public\//i.test(lower)) score += 70;
      if (/assets?\//i.test(lower)) score += 25;
      if (ignored.test(lower)) score -= 160;
      if (/\.svg$/i.test(base)) score -= 10;
      if (/\.(png|webp)$/i.test(base)) score += 15;
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score || a.path.length - b.path.length);

  if (candidates.length) {
    const item = candidates[0];
    const encodedPath = item.path.split('/').map(encodeURIComponent).join('/');
    return `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${encodedPath}`;
  }

  // Last-resort visual fallback: GitHub's generated repository preview image.
  return `https://opengraph.githubassets.com/1/${repo.full_name}`;
}

async function findLatestApkRelease(repo) {
  const releases = await github(`/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/releases?per_page=30`);
  return releases
    .filter((release) => !release.draft)
    .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))
    .map((release) => ({
      release,
      apk: (release.assets || []).find((asset) => /\.apk$/i.test(asset.name)),
    }))
    .find((item) => item.apk)?.release || null;
}

async function processRepo(repo) {
  try {
    const release = await findLatestApkRelease(repo);
    if (!release) return null;

    const apk = (release.assets || []).find((asset) => /\.apk$/i.test(asset.name));
    if (!apk) return null;

    let tree = [];
    try {
      const treeData = await github(`/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/git/trees/${encodeURIComponent(repo.default_branch)}?recursive=1`);
      tree = treeData.tree || [];
    } catch (error) {
      console.warn(`Logo tree lookup failed for ${repo.full_name}: ${error.message}`);
    }

    const displayName = repo.name
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      id: `${slugify(repo.name)}-app`,
      appName: displayName,
      repoOwner: repo.owner.login,
      repoName: repo.name,
      category: 'Android Application',
      description: repo.description || `Android application published by ${repo.owner.login}.`,
      icon: 'smartphone',
      iconUrl: chooseLogo(tree, repo),
      githubUrl: repo.html_url,
      status: 'available',
      defaultRelease: {
        version: release.tag_name || release.name || 'Latest',
        releaseDate: formatDate(release.published_at || release.created_at),
        apkSize: formatSize(apk.size),
        apkFileName: apk.name,
        downloadUrl: apk.browser_download_url,
        whatsNew: releaseNotes(release),
      },
    };
  } catch (error) {
    console.warn(`Skipping ${repo.full_name}: ${error.message}`);
    return null;
  }
}

async function main() {
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const batch = await github(`/users/${encodeURIComponent(OWNER)}/repos?per_page=100&page=${page}&type=owner&sort=updated`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const results = [];
  const queue = [...repos.filter((repo) => !repo.fork && !repo.archived)];
  const workers = Array.from({ length: 5 }, async () => {
    while (queue.length) {
      const repo = queue.shift();
      const item = await processRepo(repo);
      if (item) results.push(item);
    }
  });
  await Promise.all(workers);

  const usedIds = new Set();
  const apps = results
    .sort((a, b) => a.appName.localeCompare(b.appName))
    .map((app) => ({ ...app, id: uniqueId(app.id, usedIds) }));

  const content = `import { AppRepoConfig } from '../types/portfolio';\n\n/**\n * AUTO-GENERATED APP REGISTRY\n *\n * This file is updated by .github/workflows/sync-app-registry.yml.\n * Only repositories owned by ${OWNER} with at least one non-draft GitHub Release\n * containing an APK asset are included. The website itself makes no GitHub API calls.\n */\nexport const APPS_DATA: AppRepoConfig[] = ${JSON.stringify(apps, null, 2)};\n\nexport default APPS_DATA;\n`;

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, content, 'utf8');
  console.log(`Generated ${apps.length} APK app(s) in ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
