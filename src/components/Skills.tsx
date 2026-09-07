import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Smartphone, 
  Globe, 
  GitBranch, 
  Layers, 
  Database, 
  PackageCheck, 
  Github, 
  PlayCircle, 
  Laptop, 
  Monitor, 
  FileCode, 
  Palette, 
  Braces, 
  Flame, 
  Code2
} from 'lucide-react';
import { SKILLS } from '../data/portfolioData';
import { SectionHeaderReveal, ScrollReveal, CurvedRollItem } from './ScrollAnimation';

const iconLookup: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  'code-2': <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  layers: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  database: <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  'package-check': <PackageCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  'git-branch': <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  github: <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  'play-circle': <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  laptop: <Laptop className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  monitor: <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  globe: <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  'file-code': <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  palette: <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  braces: <Braces className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  flame: <Flame className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  wrench: <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
};

const levelBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  Experienced: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/40',
  },
  Intermediate: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-200 dark:border-slate-700',
  },
  Learning: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
  },
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Android & Mobile', 'Workflow & Tools', 'Web & Frontend', 'Cloud & Backend'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with smooth entrance/vanish */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase border border-blue-500/20">
              <Wrench className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
          }
          title="Skills & Technologies"
          description="Practical competencies in Android app development, release packaging, Git automation, and responsive web technologies."
        />

        {/* Category Filter Pills with entrance */}
        <ScrollReveal yOffset={25} className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/70 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                    : 'text-slate-400 hover:text-slate-200 dark:text-slate-400 light:text-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Cards Grid with stagger & curved roll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const badge = levelBadgeStyles[skill.level] || levelBadgeStyles.Intermediate;
            return (
              <CurvedRollItem key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, y: 35, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.07,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-blue-400/60 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        {iconLookup[skill.icon] || <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{skill.category}</span>
                  </div>
                </motion.div>
              </CurvedRollItem>
            );
          })}
        </div>

        {/* Note on skills scalability */}
        <ScrollReveal yOffset={20} delay={0.2} className="mt-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-600">
            Skills are tracked transparently based on actual project development experience and actively expanding through coursework and hands-on coding.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
};
