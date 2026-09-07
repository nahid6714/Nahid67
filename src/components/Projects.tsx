import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  Github, 
  ExternalLink, 
  Smartphone, 
  Download, 
  Globe, 
  Sparkles,
  RefreshCw,
  Layers,
  Radio,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useGitHubPortfolio } from '../context/GitHubPortfolioContext';
import { triggerDirectApkDownload } from '../utils/apkDownload';
import { SectionHeaderReveal, CurvedRollItem } from './ScrollAnimation';

interface ProjectsProps {
  onSelectProjectForApk?: (projectId: string) => void;
  onOpenAppSection?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAppSection }) => {
  const { items, websites, apps, isRefreshing, lastSynced, refresh } = useGitHubPortfolio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'website' | 'app'>('all');

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'website') return item.kind === 'website';
    if (activeFilter === 'app') return item.kind === 'app';
    return true;
  });

  const handleDownloadApk = (url: string, fileName: string) => {
    triggerDirectApkDownload(url, fileName);
  };

  return (
    <section id="projects" className="py-20 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase border border-blue-500/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Live GitHub Showcase</span>
            </div>
          }
          title="Websites & Android Applications"
          description="Directly synced with @nahid6714 GitHub repositories. Real live-hosted websites (Vercel & Netlify) and native Android apps with direct APK release downloads."
        />

        {/* GitHub Live Sync Status & Control Bar */}
        <div className="mt-8 mb-10 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Connected to GitHub @nahid6714
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 font-semibold">
                  Auto-Detect Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Detects Vercel/Netlify hosted links, APK releases, and new repositories automatically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {lastSynced && (
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline-block">
                Last checked: {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={() => refresh(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
              title="Query GitHub API for newly created websites or apps"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
              <span>{isRefreshing ? 'Checking GitHub...' : 'Sync from GitHub'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            All Creations ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter('website')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              activeFilter === 'website'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Websites ({websites.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('app')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
              activeFilter === 'app'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Apps ({apps.length})</span>
          </button>
        </div>

        {/* Projects Grid with scroll fly-in & curved roll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((project, index) => {
            const isWebsite = project.kind === 'website';
            const isApp = project.kind === 'app';
            const isTools = project.repoName.toLowerCase() === 'tools';

            return (
              <CurvedRollItem key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: (index % 3) * 0.1,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="project-card relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group h-full bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 hover:border-blue-400/60 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
                >
                  {/* Host or Category Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    {project.hostProvider && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                        <Radio className="w-2.5 h-2.5 animate-pulse" />
                        <span>Hosted on {project.hostProvider}</span>
                      </span>
                    )}
                    {isApp && project.latestApk && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                        <ShieldCheck className="w-3 h-3" />
                        <span>APK {project.latestApk.version}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    {/* Category & Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        {isApp ? (
                          <Smartphone className="w-6 h-6" />
                        ) : isWebsite ? (
                          <Globe className="w-6 h-6" />
                        ) : (
                          <FolderGit2 className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                          {isWebsite ? 'Live Website' : isApp ? 'Android Application' : project.category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Live hosting URL / APK status callout */}
                    {project.liveUrl && (
                      <div className="mb-4 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-700 dark:text-blue-300 flex items-center justify-between">
                        <span className="truncate font-mono">
                          {project.liveUrl.replace(/^https?:\/\//i, '')}
                        </span>
                        <span className="shrink-0 font-semibold uppercase text-[9px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                          {project.hostProvider || 'Live'}
                        </span>
                      </div>
                    )}

                    {isApp && project.latestApk && (
                      <div className="mb-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
                        <span className="font-mono">{project.latestApk.apkFileName}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {project.latestApk.apkSize}
                        </span>
                      </div>
                    )}

                    {/* Technologies Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                    {/* Live Website Button */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Website</span>
                      </a>
                    )}

                    {/* Direct APK Download Button */}
                    {project.latestApk && (
                      <button
                        onClick={() => handleDownloadApk(project.latestApk!.downloadUrl, project.latestApk!.apkFileName)}
                        className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition-colors"
                        title={`Download ${project.latestApk.apkFileName} (${project.latestApk.apkSize})`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download APK</span>
                      </button>
                    )}

                    {/* GitHub Repo Button */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[95px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}

                    {/* Deep dive into My Apps link */}
                    {isApp && onOpenAppSection && (
                      <button
                        onClick={onOpenAppSection}
                        className="w-full mt-2 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                      >
                        <span>View releases & changelog in My Apps</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </CurvedRollItem>
            );
          })}
        </div>

      </div>
    </section>
  );
};
