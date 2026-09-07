import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  School, 
  Sparkles,
  Award
} from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50 border-t border-slate-900 dark:border-slate-900 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3 border border-blue-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
            Education
          </h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full mt-3 mb-4"></div>
          <p className="max-w-2xl text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Formal studies in computer technology, software fundamentals, and practical mobile application development.
          </p>
        </div>

        {/* Education Timeline / Open Layout without heavy card box */}
        <div className="max-w-3xl mx-auto divide-y divide-slate-800/80 dark:divide-slate-800/80 light:divide-slate-200">
          {EDUCATION.map((edu) => (
            <div
              key={edu.id}
              className="py-8 first:pt-0 last:pb-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 mt-1 shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-blue-400 mt-0.5">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-600 mt-0.5">
                      Field: {edu.field}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{edu.year}</span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-3 pl-12">
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {edu.details}
                </p>
              </div>

              {edu.isPlaceholder && (
                <div className="mt-3 pl-12 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Structured placeholder fields ready for your institution name</span>
                  <span className="text-blue-400 font-medium">Editable in portfolioData.ts</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
