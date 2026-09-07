import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Download, 
  Github, 
  RefreshCw, 
  Calendar, 
  HardDrive, 
  Tag, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  GitPullRequest,
  Info
} from 'lucide-react';
import { APPS_DATA } from '../data/appsData';
import { AppRepoConfig, AppReleaseInfo } from '../types/portfolio';
import { useGitHubPortfolio } from '../context/GitHubPortfolioContext';
import { triggerDirectApkDownload } from '../utils/apkDownload';
import { SectionHeaderReveal, ScrollReveal, CurvedRollItem } from './ScrollAnimation';

interface AppsSectionProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const AppsSection: React.FC<AppsSectionProps> = ({ onShowToast }) => {
  const { apps: ghApps, isRefreshing, refresh } = useGitHubPortfolio();
  const [apps, setApps] = useState<AppRepoConfig[]>(() => APPS_DATA.filter((app) => app.status === 'available'));
  const [appReleases, setAppReleases] = useState<Record<string, AppReleaseInfo>>(() =>
    Object.fromEntries(APPS_DATA.map((app) => [app.id, app.defaultRelease]))
  );
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [iconFallbackIndex, setIconFallbackIndex] = useState<Record<string, number>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  // Synchronize dynamic GitHub releases whenever ghApps updates
  React.useEffect(() => {
    if (ghApps && ghApps.length > 0) {
      setApps((prevApps) => {
        const updated = [...prevApps];
        for (const ghApp of ghApps) {
          const existingIndex = updated.findIndex(
            (a) => a.repoName.toLowerCase() === ghApp.repoName.toLowerCase()
          );
          if (existingIndex >= 0 && ghApp.latestApk) {
            updated[existingIndex] = {
              ...updated[existingIndex],
              defaultRelease: {
                version: ghApp.latestApk.version,
                releaseDate: ghApp.latestApk.releaseDate,
                apkSize: ghApp.latestApk.apkSize,
                apkFileName: ghApp.latestApk.apkFileName,
                downloadUrl: ghApp.latestApk.downloadUrl,
                whatsNew: ghApp.latestApk.whatsNew,
              },
            };
          } else if (existingIndex === -1 && ghApp.latestApk) {
            // New app discovered dynamically on GitHub!
            updated.push({
              id: `${ghApp.repoName.toLowerCase()}-app`,
              appName: ghApp.name,
              repoOwner: ghApp.repoOwner,
              repoName: ghApp.repoName,
              category: 'Android Application',
              description: ghApp.description,
              icon: 'smartphone',
              githubUrl: ghApp.githubUrl,
              status: 'available',
              defaultRelease: {
                version: ghApp.latestApk.version,
                releaseDate: ghApp.latestApk.releaseDate,
                apkSize: ghApp.latestApk.apkSize,
                apkFileName: ghApp.latestApk.apkFileName,
                downloadUrl: ghApp.latestApk.downloadUrl,
                whatsNew: ghApp.latestApk.whatsNew,
              },
            });
          }
        }
        return updated;
      });

      // Update release map
      setAppReleases((prev) => {
        const next = { ...prev };
        for (const ghApp of ghApps) {
          if (ghApp.latestApk) {
            const appId = `${ghApp.repoName.toLowerCase()}-app`;
            next[appId] = {
              version: ghApp.latestApk.version,
              releaseDate: ghApp.latestApk.releaseDate,
              apkSize: ghApp.latestApk.apkSize,
              apkFileName: ghApp.latestApk.apkFileName,
              downloadUrl: ghApp.latestApk.downloadUrl,
              whatsNew: ghApp.latestApk.whatsNew,
            };
          }
        }
        return next;
      });
    }
  }, [ghApps]);

  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    try {
      await refresh(true);
      onShowToast('Synced latest Android APK releases from GitHub @nahid6714.', 'success');
    } catch {
      onShowToast('Refreshed local APK registry.', 'info');
    } finally {
      setIsRefreshingAll(false);
    }
  };

  const handleDownloadApk = (app: AppRepoConfig) => {
    const release = appReleases[app.id] || app.defaultRelease;

    if (app.status !== 'available') {
      onShowToast(
        `${app.appName} is currently in development. Pre-release builds will be published soon!`,
        'info'
      );
      return;
    }

    onShowToast(`Initiating direct download for ${release.apkFileName} (${release.apkSize})...`, 'success');
    triggerDirectApkDownload(release.downloadUrl, release.apkFileName);
  };

  const toggleNotes = (appId: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  return (
    <section
      id="apps"
      className="py-24 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 light:from-white light:via-slate-50 light:to-white border-t border-b border-slate-900 dark:border-slate-900 light:border-slate-200 relative overflow-hidden"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide uppercase border border-emerald-500/25">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Dedicated Android Distribution</span>
            </div>
          }
          title="My Apps & APK Releases"
          description="Native Android applications developed by Nahid Hossain with direct APK downloads powered by a local app registry."
        />

        {/* Local app registry controls */}
        <ScrollReveal yOffset={25} className="mt-6 mb-16 flex flex-wrap items-center justify-center gap-3">
          <button
            id="refresh-app-registry-btn"
            onClick={handleRefreshAll}
            disabled={isRefreshingAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white hover:bg-slate-800 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-semibold border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-sm transition-all hover:border-slate-700 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isRefreshingAll ? 'animate-spin' : ''}`} />
            <span>{isRefreshingAll ? 'Loading App Registry...' : 'Reload App Registry'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 px-3 py-2 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct APK Download • Auto-Synced Registry</span>
          </div>
        </ScrollReveal>

        {/* Apps Cards Grid with 3D Curvature */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {apps.map((app, index) => {
            const release = appReleases[app.id] || app.defaultRelease;
            const isNotesExpanded = expandedNotes[app.id] || false;
            const isTools = app.id === 'tools-app';
            const isFeaturedApp = isTools || app.id === 'edu-library-app';

            return (
              <CurvedRollItem key={app.id}>
                <motion.div
                  initial={{ opacity: 0, y: 55, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.12 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.12,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="app-card relative p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 h-full hover:bg-slate-100/80 dark:hover:bg-slate-900/50"
                >
                {/* Header badge for featured release */}
                {isFeaturedApp && (
                  <div className="pb-3 mb-2 flex items-center justify-between text-slate-600 dark:text-slate-300 text-[11px]">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured APK Release
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {release.version}
                    </span>
                  </div>
                )}

                <div>
                  
                  {/* App Icon & Basic Identification */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      {/* App Icon */}
                      <div className="w-13 h-13 rounded-2xl bg-blue-500/10 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden">
                          {(() => {
                            return app.iconUrl && (iconFallbackIndex[app.id] ?? 0) === 0 ? (
                              <img
                                src={app.iconUrl}
                                alt={`${app.appName} logo`}
                                className="w-full h-full object-cover rounded-[14px]"
                                loading="lazy"
                                onError={() => {
                                  setIconFallbackIndex((prev) => ({ ...prev, [app.id]: 1 }));
                                }}
                              />
                            ) : (
                              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            );
                          })()}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {app.appName}
                          </h3>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          Android Application
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {app.category}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${
                        app.status === 'available'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                      }`}
                    >
                      {app.status === 'available' ? 'Available' : 'In Dev'}
                    </span>
                  </div>

                  {/* App Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 min-h-[44px]">
                    {app.description}
                  </p>

                  {/* Technical Metadata - Clean Open Spec */}
                  <div className="py-3 border-y border-slate-200 dark:border-slate-800/80 mb-4 space-y-2 font-mono text-xs">
                    
                    {/* Latest Version */}
                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 font-sans text-slate-500 dark:text-slate-400 text-[11px]">
                        <Tag className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        Latest Version:
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {release.version}
                      </span>
                    </div>

                    {/* Release Date */}
                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 font-sans text-slate-500 dark:text-slate-400 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        Updated:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">
                        {release.releaseDate}
                      </span>
                    </div>

                    {/* APK Size */}
                    <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                      <span className="flex items-center gap-1.5 font-sans text-slate-500 dark:text-slate-400 text-[11px]">
                        <HardDrive className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        APK Size:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {release.apkSize}
                      </span>
                    </div>

                    {/* Repository indicator */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[10px] font-sans text-slate-500">
                      <span>Repo: {app.repoOwner}/{app.repoName}</span>
                      {release.tagCommit && <span>commit: {release.tagCommit}</span>}
                    </div>
                  </div>

                  {/* What's New / Changelog Accordion */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleNotes(app.id)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        What's New in {release.version}
                      </span>
                      {isNotesExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>

                    {isNotesExpanded && (
                      <div className="mt-2 py-2 px-3 text-xs space-y-1.5 border-l-2 border-blue-500/50">
                        {release.whatsNew.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 leading-snug">
                            <span className="text-blue-500 dark:text-blue-400 font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Primary Action Buttons: [Download APK] and [GitHub] */}
                <div className="pt-2 space-y-2.5">
                  <button
                    id={`download-apk-${app.id}`}
                    onClick={() => handleDownloadApk(app)}
                    disabled={app.status !== 'available'}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                      app.status === 'available'
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-[0.98]'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {app.status === 'available' ? 'Download APK' : 'Coming Soon'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </CurvedRollItem>
          );
        })}
        </div>

        {/* Architecture Spotlight: Clean Open Layout */}
        <ScrollReveal yOffset={40} className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-1">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>Local Distribution Architecture</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Local App Registry & APK Distribution
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                No API Dependency
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-4xl">
              This portfolio uses <code className="text-blue-600 dark:text-blue-400 font-mono text-[11px] bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">src/data/appsData.ts</code> as a generated local registry. A GitHub Actions workflow periodically scans Nahid67's public repositories and writes only repositories that have a non-draft GitHub Release containing an APK. The website itself never calls the GitHub API. After a new repository publishes an APK release, the workflow updates this file and Vercel deploys the changed registry automatically.
            </p>

            {/* Workflow Steps - Clean Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">1. Build & Push</span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Create a repository under <strong className="text-slate-800 dark:text-slate-200">nahid6714</strong> and publish an APK in a GitHub Release.
                </span>
              </div>

              <div>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">2. GitHub Release</span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The scheduled GitHub Action finds the newest release containing an APK and writes it into the local registry file.
                </span>
              </div>

              <div>
                <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">3. Auto Detection</span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Vercel serves the generated registry as normal application code; there is no runtime GitHub API dependency.
                </span>
              </div>

              <div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">4. Direct Download</span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Visitors click Download APK and receive the exact APK asset from that GitHub Release.
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
