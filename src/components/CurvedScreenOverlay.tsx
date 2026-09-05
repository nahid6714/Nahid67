import React, { useState } from 'react';
import { Watch, Sparkles, Sliders, Check } from 'lucide-react';
import { useCurvedDisplay, CurveMode } from '../context/CurvedDisplayContext';

export const CurvedScreenOverlay: React.FC = () => {
  const { curveMode, setCurveMode, isCurveActive } = useCurvedDisplay();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Visual Top Curved Glass Rim & Horizon Shade (only active when curve mode is on) */}
      {isCurveActive && (
        <div 
          className="pointer-events-none fixed top-0 left-0 right-0 z-30 h-16 sm:h-24 transition-opacity duration-500 overflow-hidden"
          aria-hidden="true"
        >
          {/* Horizon Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent dark:from-slate-950/80 dark:via-slate-950/30 light:from-slate-100/80 light:via-slate-100/30" />
          
          {/* Curved Lens Arc Reflection */}
          <svg
            className="absolute top-0 left-0 w-full h-8 sm:h-12 text-blue-500/25 dark:text-blue-400/20 light:text-slate-400/30"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="topCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="30%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="70%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Curved lens border line */}
            <path
              d="M 0,0 Q 600,32 1200,0"
              fill="none"
              stroke="url(#topCurveGlow)"
              strokeWidth={curveMode === 'cylinder' ? '2.5' : '1.5'}
            />
          </svg>
        </div>
      )}

      {/* Visual Bottom Curved Glass Rim & Horizon Shade */}
      {isCurveActive && (
        <div 
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 h-16 sm:h-24 transition-opacity duration-500 overflow-hidden"
          aria-hidden="true"
        >
          {/* Horizon Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent dark:from-slate-950/85 dark:via-slate-950/35 light:from-slate-100/85 light:via-slate-100/35" />
          
          {/* Curved Lens Arc Reflection */}
          <svg
            className="absolute bottom-0 left-0 w-full h-8 sm:h-12 text-blue-500/25 dark:text-blue-400/20 light:text-slate-400/30"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bottomCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="30%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="70%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Curved bottom lens border line */}
            <path
              d="M 0,40 Q 600,8 1200,40"
              fill="none"
              stroke="url(#bottomCurveGlow)"
              strokeWidth={curveMode === 'cylinder' ? '2.5' : '1.5'}
            />
          </svg>
        </div>
      )}

      {/* Floating Curved Display Control Widget */}
      <div className="fixed bottom-5 left-5 z-40">
        <div className="relative">
          {/* Control Toggle Pill */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 shadow-xl text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-blue-500/50 transition-all group"
            title="Curved Display Settings"
            aria-label="Toggle Curved Screen Settings"
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400">
              <Watch className="w-2.5 h-2.5 animate-pulse" />
            </div>
            <span className="hidden sm:inline text-[11px] text-slate-400">Display:</span>
            <span className="text-[11px] font-bold text-blue-400 capitalize">
              {curveMode === 'smartwatch' ? 'Watch Curve' : curveMode === 'cylinder' ? '3D Cylinder' : 'Flat'}
            </span>
            <Sliders className="w-3 h-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
          </button>

          {/* Settings Menu Popover */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowMenu(false)} 
              />
              <div className="absolute bottom-12 left-0 z-50 w-64 p-3 rounded-2xl bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 backdrop-blur-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-900">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Vertical Curvature Mode</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Top/Bottom Curve</span>
                </div>

                <div className="space-y-1">
                  {/* Option 1: Smartwatch Curve (Default - Subtle as requested) */}
                  <button
                    onClick={() => {
                      setCurveMode('smartwatch');
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                      curveMode === 'smartwatch'
                        ? 'bg-blue-600/15 border border-blue-500/30 text-blue-300'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <Watch className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Smartwatch Curve (Default)</span>
                        {curveMode === 'smartwatch' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Gentle vertical roll like a curved smartwatch display. Text tilts & vanishes smoothly into top/bottom rim.
                      </p>
                    </div>
                  </button>

                  {/* Option 2: 3D Cylinder Curve (Pronounced) */}
                  <button
                    onClick={() => {
                      setCurveMode('cylinder');
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                      curveMode === 'cylinder'
                        ? 'bg-blue-600/15 border border-blue-500/30 text-blue-300'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <Sliders className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Deep 3D Cylinder</span>
                        {curveMode === 'cylinder' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Deeper 3D perspective curvature with stronger tilt angle and horizon foreshortening.
                      </p>
                    </div>
                  </button>

                  {/* Option 3: Flat Mode */}
                  <button
                    onClick={() => {
                      setCurveMode('flat');
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                      curveMode === 'flat'
                        ? 'bg-blue-600/15 border border-blue-500/30 text-blue-300'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-0.5 bg-slate-400" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Flat Screen</span>
                        {curveMode === 'flat' && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Standard flat 2D viewport without 3D rotation or top/bottom vanishing curve.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
