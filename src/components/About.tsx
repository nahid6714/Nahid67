import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Code, 
  Smartphone, 
  Globe, 
  Github, 
  Cpu, 
  Wrench, 
  Sparkles, 
  Terminal, 
  CheckCircle2 
} from 'lucide-react';
import { PERSONAL_INFO, INTERESTS } from '../data/portfolioData';
import { SectionHeaderReveal, ScrollReveal, ScrollStagger } from './ScrollAnimation';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  smartphone: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  globe: <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  github: <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  cpu: <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  wrench: <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with dynamic scroll entrance & vanish */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800/40">
              <User className="w-3.5 h-3.5" />
              <span>Profile & Background</span>
            </div>
          }
          title="About Me"
          description="A dedicated technology enthusiast balancing academic pursuits and professional work to build impactful Android applications and software tools."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Biography Narrative - clean typography without unnecessary card box */}
          <ScrollReveal yOffset={40} className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Developer, Student & Worker</span>
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Hello! My name is <strong className="text-slate-900 dark:text-white font-semibold">{PERSONAL_INFO.name}</strong>. I am a student and worker living in <strong className="text-slate-900 dark:text-white font-semibold">{PERSONAL_INFO.country}</strong> who is genuinely passionate about computer technology, software development, Android applications, and building useful digital utilities.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                I spend my time developing practical software solutions—combining native Android technologies like Kotlin, Jetpack Compose, and Room Database with automated GitHub Actions workflows for continuous APK build and release management.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than theoretical mockups, my focus is on functional, real-world utility: building tools that assist with document scanning, expense tracking, daily calculations, and streamlined web experiences.
              </p>

              {/* Verified Profile Key Facts - Clean Flat Inline Bar */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Location
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{PERSONAL_INFO.country}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Current Role
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{PERSONAL_INFO.role}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Core Focus
                  </span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Android & Tools</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Currently Exploring / Interests - Clean List without heavy card boxes */}
          <div className="lg:col-span-6 space-y-4">
            <ScrollReveal yOffset={30}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Currently Exploring & Core Interests</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">6 Focus Areas</span>
              </div>
            </ScrollReveal>

            <ScrollStagger className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {INTERESTS.map((item) => (
                <div
                  key={item.title}
                  className="py-3.5 group flex items-start gap-3.5 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    {iconMap[item.icon] || <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollStagger>
          </div>

        </div>
      </div>
    </section>
  );
};
