import React from 'react';
import { useCurvedDisplay } from '../context/CurvedDisplayContext';

export const CurvedScreenOverlay: React.FC = () => {
  const { isCurveActive } = useCurvedDisplay();

  return (
    <>
      {/* Visual Top Curved Glass Rim & Horizon Shade (only active when curve mode is on) */}
      {isCurveActive && (
        <div 
          className="pointer-events-none fixed top-0 left-0 right-0 z-30 h-20 sm:h-28 transition-opacity duration-500 overflow-hidden"
          aria-hidden="true"
        >
          {/* Horizon Gradient Vignette (softened so blurred content behind remains clearly legible and recognized) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/15 to-transparent dark:from-slate-950/40 dark:via-slate-950/15 light:from-slate-100/40 light:via-slate-100/15" />
          
          {/* Curved Lens Arc Reflection */}
          <svg
            className="absolute top-0 left-0 w-full h-10 sm:h-14 text-blue-500/35 dark:text-blue-400/30 light:text-slate-400/40"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="topCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="25%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
                <stop offset="75%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Curved lens border line */}
            <path
              d="M 0,0 Q 600,34 1200,0"
              fill="none"
              stroke="url(#topCurveGlow)"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      )}

      {/* Visual Bottom Curved Glass Rim & Horizon Shade */}
      {isCurveActive && (
        <div 
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 h-20 sm:h-28 transition-opacity duration-500 overflow-hidden"
          aria-hidden="true"
        >
          {/* Horizon Gradient Vignette (softened so blurred content behind remains clearly legible and recognized) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/15 to-transparent dark:from-slate-950/40 dark:via-slate-950/15 light:from-slate-100/40 light:via-slate-100/15" />
          
          {/* Curved Lens Arc Reflection */}
          <svg
            className="absolute bottom-0 left-0 w-full h-10 sm:h-14 text-blue-500/35 dark:text-blue-400/30 light:text-slate-400/40"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bottomCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="25%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
                <stop offset="75%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Curved bottom lens border line */}
            <path
              d="M 0,40 Q 600,6 1200,40"
              fill="none"
              stroke="url(#bottomCurveGlow)"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      )}
    </>
  );
};

