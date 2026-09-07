import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Building2, 
  ShieldCheck, 
  Eye,
  Calendar
} from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';
import { CertificateItem } from '../types/portfolio';
import { SectionHeaderReveal, ScrollReveal } from './ScrollAnimation';

export const Certificates: React.FC = () => {
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);

  // Template sample to show how certificate cards render when populated
  const templateSample: CertificateItem = {
    id: 'template-cert',
    name: 'Android App Development & Kotlin Specialization',
    organization: 'Recognized Tech Academy / Platform',
    date: 'Verification Pending',
    credentialUrl: '#',
    isPlaceholder: true,
  };

  const hasCertificates = CERTIFICATES.length > 0;

  return (
    <section id="certificates" className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeaderReveal
          badge={
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase border border-blue-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Credentials & Accreditations</span>
            </div>
          }
          title="Certifications"
          description="Verified course certifications, workshops, and technical credentials."
        />

        {/* Dynamic Empty State or Actual List */}
        {!hasCertificates ? (
          <ScrollReveal yOffset={40} className="max-w-2xl mx-auto">
            {/* Clean Open Status Display */}
            <div className="text-center py-10 px-4">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Award className="w-7 h-7" />
              </div>

              {/* Exact requested text */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Certificates will be added here.
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
                Nahid Hossain is currently completing coursework in software technologies and Android application development. Official credentials and certificates will be uploaded upon completion.
              </p>

              <button
                onClick={() => setShowTemplatePreview(!showTemplatePreview)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showTemplatePreview ? 'Hide Sample Format' : 'Preview Certificate Format'}</span>
              </button>
            </div>

            {/* Optional Sample Preview Structure if toggled */}
            {showTemplatePreview && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-3">
                  <span>Layout Format Sample</span>
                  <span className="bg-blue-500/10 px-2 py-0.5 rounded">Ready for PDF / Image</span>
                </div>

                <div className="flex items-center gap-3.5 py-2">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {templateSample.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-blue-500" />
                        {templateSample.organization}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {templateSample.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </ScrollReveal>
        ) : (
          <div className="max-w-3xl mx-auto divide-y divide-slate-200 dark:divide-slate-800/80">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cert.organization} • {cert.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
