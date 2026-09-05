import React from 'react';
import { 
  ArrowDown, 
  Github, 
  Facebook, 
  Linkedin, 
  Mail, 
  FileText, 
  Smartphone, 
  Globe, 
  Terminal, 
  Layers,
  Sparkles,
  ExternalLink,
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
        
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 light:bg-blue-50 border border-slate-800 dark:border-slate-800 light:border-blue-100 text-slate-300 dark:text-slate-300 light:text-blue-900 text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software & Android Projects</span>
              <span className="text-slate-500">•</span>
              <span className="text-blue-400 font-semibold">{PERSONAL_INFO.country}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                Nahid Hossain
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-xl font-semibold text-blue-400 dark:text-blue-400 light:text-blue-600 tracking-wide mb-5">
              {PERSONAL_INFO.subtitle}
            </h2>

            {/* Professional Introduction */}
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed max-w-2xl mb-8 font-normal">
              "{PERSONAL_INFO.introduction}"
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResume}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Icons & Email Row */}
            <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider">
                  Connect:
                </span>
                
                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                  aria-label="GitHub Profile"
                  title="GitHub: nahid6714"
                >
                  <Github className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn (Placeholder)"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={PERSONAL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                  aria-label="Facebook Profile"
                  title="Facebook (Placeholder)"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                  aria-label={`Send email to ${PERSONAL_INFO.email}`}
                  title={PERSONAL_INFO.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Quick direct APK release link */}
              <button
                onClick={() => scrollToSection('apps')}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span>Jump to Android APK Releases</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Presentation */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 rounded-3xl blur-lg opacity-35 dark:opacity-40 animate-pulse duration-3000" />

              {/* Profile Card Container */}
              <div className="relative rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white p-4 border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl backdrop-blur-md">
                
                {/* Profile Image with subtle badge */}
                <div className="relative aspect-[4/4.2] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  {/* Identification in image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">Nahid Hossain</p>
                      <p className="text-xs text-blue-300 font-medium">Android & Web Developer</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/80 text-white uppercase tracking-wider backdrop-blur-sm">
                      BD
                    </span>
                  </div>
                </div>

                {/* Key Technical Highlights Badges below image */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/60">
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-200 truncate">Android & APK</p>
                      <p className="text-[10px] text-slate-400 truncate">Kotlin • Compose</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800/60">
                    <Github className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-slate-200 truncate">CI/CD Releases</p>
                      <p className="text-[10px] text-slate-400 truncate">GitHub Actions</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
