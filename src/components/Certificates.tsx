import React, { useState } from 'react';
import { 
  Award, 
  FileCheck2, 
  ExternalLink, 
  Calendar, 
  Building2, 
  PlusCircle, 
  Sparkles,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';
import { CertificateItem } from '../types/portfolio';

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
    <section id="certificates" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-3 border border-blue-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>Credentials & Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900">
            Certifications
          </h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full mt-3 mb-4"></div>
          
          <p className="max-w-2xl text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            Verified course certifications, workshops, and technical credentials.
          </p>
        </div>

        {/* Dynamic Empty State or Actual Cards */}
        {!hasCertificates ? (
          <div className="max-w-2xl mx-auto">
            {/* Elegant Modern Empty State */}
            <div className="text-center p-8 sm:p-12 rounded-2xl bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border-2 border-dashed border-slate-800 dark:border-slate-800 light:border-slate-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-800">
                <Award className="w-8 h-8 text-blue-400/80" />
              </div>

              {/* Exact requested text */}
              <h3 className="text-lg font-bold text-slate-200 dark:text-slate-200 light:text-slate-800 mb-2">
                Certificates will be added here.
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                Nahid Hossain is currently completing coursework in software technologies and Android application development. Official credentials and certificates will be uploaded upon completion.
              </p>

              <button
                onClick={() => setShowTemplatePreview(!showTemplatePreview)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-850 text-xs font-semibold text-blue-400 border border-slate-800 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showTemplatePreview ? 'Hide Card Format' : 'Preview Certificate Card Format'}</span>
              </button>
            </div>

            {/* Optional Card Preview Structure if toggled */}
            {showTemplatePreview && (
              <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-6 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-blue-500/30 shadow-lg">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-4">
                    <span>Card Layout Structure</span>
                    <span className="bg-blue-500/10 px-2 py-0.5 rounded">Ready for PDF / Image</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                          {templateSample.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-indigo-400" />
                            {templateSample.organization}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-400" />
                            {templateSample.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 opacity-80 cursor-not-allowed"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    {cert.organization}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-end">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Certificate</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
