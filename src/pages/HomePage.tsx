import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Smartphone, 
  Download, 
  Sparkles, 
  FolderGit2, 
  Wrench, 
  Mail, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Code2,
  Radio,
  Globe
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { PERSONAL_INFO, SKILLS } from '../data/portfolioData';
import { useGitHubPortfolio } from '../context/GitHubPortfolioContext';
import { triggerDirectApkDownload } from '../utils/apkDownload';
import { ScrollReveal, ScrollStagger } from '../components/ScrollAnimation';

interface HomePageProps {
  theme: 'dark' | 'light';
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ theme, onShowToast }) => {
  const { websites, apps } = useGitHubPortfolio();

  // Dynamically select featured app from live GitHub portfolio
  const featuredApp = apps.find((app) => app.repoName.toLowerCase() === 'tools') || apps[0];
  // Dynamically select featured website from live GitHub portfolio
  const featuredWebsite = websites.find((w) => w.featured) || websites[0];
  const topSkills = SKILLS.slice(0, 8);

  const handleQuickApkDownload = () => {
    if (featuredApp?.latestApk) {
      onShowToast(`Downloading ${featuredApp.latestApk.apkFileName} (${featuredApp.latestApk.apkSize})...`, 'success');
      triggerDirectApkDownload(featuredApp.latestApk.downloadUrl, featuredApp.latestApk.apkFileName);
    } else {
      onShowToast('APK download preparing...', 'info');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <Hero theme={theme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Featured App Spotlight Banner - Dynamically Synced with GitHub */}
        {featuredApp && (
          <ScrollReveal yOffset={50}>
            <section className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-10 shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-200 dark:border-blue-800/40">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Featured Android App • GitHub Release</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                    {featuredApp.name}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {featuredApp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700 dark:text-slate-300">
                    {featuredApp.latestApk && (
                      <>
                        <span className="bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          Version: <strong className="text-blue-600 dark:text-blue-400">{featuredApp.latestApk.version}</strong>
                        </span>
                        <span className="bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                          APK Size: <strong className="text-slate-900 dark:text-slate-100">{featuredApp.latestApk.apkSize}</strong>
                        </span>
                      </>
                    )}
                    <span className="bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Direct Signed APK</span>
                    </span>
                  </div>
                </div>

                {/* Actions for this app */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                  {featuredApp.latestApk && (
                    <button
                      onClick={handleQuickApkDownload}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-sm shadow-blue-500/20 transition-all duration-200 active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download APK ({featuredApp.latestApk.apkSize})</span>
                    </button>
                  )}

                  <Link
                    to="/apps"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <span>View All Android Apps & Changelog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* 3. Section Teaser Grid: About & Featured Project */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* About Teaser */}
          <ScrollReveal yOffset={40} delay={0.05}>
            <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  About Nahid Hossain
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Driven by Software & Android Innovation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Student and worker from Bangladesh with hands-on experience building practical Android applications, publishing APK releases on GitHub, and crafting clean web interfaces.
                </p>
                
                <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Passionate about building real, useful utilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Experience with Git, GitHub Actions, and APK pipelines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Continuously learning modern Android and web stacks</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <span>Read Full Biography & Background</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Featured Project Teaser (Live Website) */}
          {featuredWebsite && (
            <ScrollReveal yOffset={40} delay={0.15}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Featured Live Website
                    </span>
                    {featuredWebsite.hostProvider ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                        <Radio className="w-2.5 h-2.5 animate-pulse" />
                        <span>Hosted on {featuredWebsite.hostProvider}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                        {featuredWebsite.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {featuredWebsite.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {featuredWebsite.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredWebsite.technologies.slice(0, 5).map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    <span>Browse All Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {featuredWebsite.liveUrl && (
                      <a
                        href={featuredWebsite.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Website</span>
                      </a>
                    )}

                    {featuredWebsite.githubUrl && (
                      <a
                        href={featuredWebsite.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                        aria-label="GitHub Repo"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>

        {/* 4. Core Skills Bar */}
        <ScrollReveal yOffset={45}>
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  Technical Expertise
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Core Technologies & Tools
                </h3>
              </div>

              <Link
                to="/skills"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
              >
                <span>Explore All {SKILLS.length} Skills</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <ScrollStagger className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {topSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {skill.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 font-semibold">
                    {skill.level}
                  </span>
                </div>
              ))}
            </ScrollStagger>
          </div>
        </ScrollReveal>

        {/* 5. Direct Collaboration Banner */}
        <ScrollReveal yOffset={50}>
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-sm text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Have a project or opportunity in mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              Feel free to get in touch for software collaboration, Android tool building, or technical discussions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Nahid Directly</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
