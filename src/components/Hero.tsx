import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Facebook, 
  Linkedin, 
  Mail, 
  Smartphone, 
  Globe, 
  Terminal, 
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  Download
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CurvedRollItem } from './CurvedRollItem';

interface HeroProps {
  theme: 'dark' | 'light';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
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
          
          {/* Left Hero Content with scroll-reactive fly in & vanish animations */}
          <CurvedRollItem className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-start text-left"
            >
            
            {/* Status / Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 mb-6 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">Based in {PERSONAL_INFO.country}</span>
              <span className="text-slate-600 dark:text-slate-600 light:text-slate-400">•</span>
              <span className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-semibold">Available for Work & Projects</span>
            </motion.div>

            {/* Greeting & Name */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 leading-[1.1] mb-4"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </motion.h1>

            {/* Subtitle / Roles */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 tracking-tight mb-6"
            >
              {PERSONAL_INFO.subtitle}
            </motion.h2>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              "{PERSONAL_INFO.introduction}"
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto"
            >
              <Link
                id="hero-view-projects-btn"
                to="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                id="hero-download-apk-btn"
                to="/apps"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>My Apps & APK</span>
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>Contact</span>
              </Link>
            </motion.div>

            {/* Social Icons & Email Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
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
                  title="LinkedIn Profile"
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
                  title="Facebook Profile"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                  aria-label="Send Email"
                  title={`Email: ${PERSONAL_INFO.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono">
                <code>git: nahid6714</code>
              </div>
            </motion.div>

          </motion.div>
        </CurvedRollItem>

        {/* Right Hero Visual - Clean Open Profile Showcase */}
        <CurvedRollItem className="lg:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-md flex flex-col items-start space-y-5"
          >
            {/* Avatar & Identification */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={theme === 'light' ? '/profile-light.jpg' : '/profile-dark.jpg'}
                  alt="Nahid Hossain Profile Avatar"
                  className="w-24 h-24 rounded-2xl object-cover shadow-sm"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" title="Active developer" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active & Building
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-xl">
                  Nahid Hossain
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                  github.com/nahid6714
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Bangladesh • Mobile & Web Dev
                </p>
              </div>
            </div>

            {/* Core Stack Spec - Open & Clean */}
            <div className="w-full py-3 border-y border-slate-200 dark:border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Core Platform:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Android (Kotlin)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Architecture:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Jetpack Compose + Room DB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">CI/CD Pipeline:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">GitHub Actions Auto APK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Featured Release:</span>
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">Tools App (v1.0.184)</span>
              </div>
            </div>

            {/* Direct Quick Links */}
            <div className="w-full flex items-center justify-between text-xs pt-1">
              <Link to="/skills" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Skills & Tech →</Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link to="/apps" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">Download APK →</Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link to="/contact" className="text-slate-600 dark:text-slate-300 font-medium hover:underline">Get in Touch →</Link>
            </div>

          </motion.div>
        </CurvedRollItem>

      </div>
      </div>
    </section>
  );
};
