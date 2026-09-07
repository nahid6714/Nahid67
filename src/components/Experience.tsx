import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  HelpCircle, 
  Edit3 
} from 'lucide-react';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeaderReveal, ScrollReveal } from './ScrollAnimation';

export const Experience: React.FC = () => {
  const [showHelper, setShowHelper] = useState(false);

  return (
    <section id="experience" className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800/40">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Pathway</span>
            </div>
          }
          title="Professional Experience"
          description='"Work experience details will be added here."'
        />

        <ScrollReveal yOffset={20} className="flex flex-col items-center mb-12 -mt-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Role status: <strong className="text-slate-700 dark:text-slate-300">{PERSONAL_INFO.role}</strong>
            </span>
            <button
              onClick={() => setShowHelper(!showHelper)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHelper ? 'Hide formatting details' : 'How to update this section'}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Developer Guide Callout if toggled */}
        {showHelper && (
          <ScrollReveal yOffset={20}>
            <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                <Edit3 className="w-4 h-4" />
                <span>Updating Experience Information</span>
              </div>
              <p>
                To update employment history or internships, simply edit <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">src/data/portfolioData.ts</code> in the <code className="font-mono bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">WORK_EXPERIENCE</code> array. Add real job titles, companies, durations, and key responsibilities.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Experience Timeline - Open Layout without heavy card box */}
        <div className="max-w-4xl mx-auto divide-y divide-slate-200 dark:divide-slate-800/80">
          {WORK_EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="py-8 first:pt-0 last:pb-0"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-1 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      {exp.position}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-left sm:text-right">
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2 mt-3 pl-11">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Responsibilities
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements if any */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-1.5 mt-3 pl-11">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Achievements & Highlights
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notice tag */}
              {exp.isPlaceholder && (
                <div className="mt-3 pl-11 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Structured placeholder ready for verified employer/organization details</span>
                  <span className="text-blue-400 font-semibold">Editable in portfolioData.ts</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
