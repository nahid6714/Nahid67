import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Plus, Minus, RotateCcw, X } from 'lucide-react';
import { useRoadPerspective } from '../context/RoadPerspectiveContext';

export const Rotation3DControls: React.FC = () => {
  const { isEnabled, toggleEnabled, rotate, zoomIn, zoomOut, reset } = useRoadPerspective();

  if (!isEnabled) return null;

  const padBtn =
    'flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-blue-600 hover:border-blue-500 hover:text-white active:scale-95 transition-all shadow-md';

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-3 pointer-events-auto">
      {/* Close Button */}
      <button
        onClick={toggleEnabled}
        aria-label="৩৬০ ভিউ বন্ধ করুন"
        title="বন্ধ করুন"
        className="self-end flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-rose-600 hover:border-rose-500 hover:text-white transition-all shadow-md"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="p-3 rounded-2xl bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-50/95 backdrop-blur-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl flex items-center gap-3">
        {/* Directional Pad */}
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[132px]">
          <div />
          <button aria-label="উপরে ঘুরান" title="উপরে" className={padBtn} onClick={() => rotate('up')}>
            <ChevronUp className="w-5 h-5" />
          </button>
          <div />

          <button aria-label="বামে ঘুরান" title="বামে" className={padBtn} onClick={() => rotate('left')}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="রিসেট"
            title="রিসেট করুন"
            className={`${padBtn} bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-200`}
            onClick={reset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button aria-label="ডানে ঘুরান" title="ডানে" className={padBtn} onClick={() => rotate('right')}>
            <ChevronRight className="w-5 h-5" />
          </button>

          <div />
          <button aria-label="নিচে ঘুরান" title="নিচে" className={padBtn} onClick={() => rotate('down')}>
            <ChevronDown className="w-5 h-5" />
          </button>
          <div />
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col gap-1.5 border-l border-slate-800 dark:border-slate-800 light:border-slate-200 pl-3">
          <button aria-label="জুম ইন" title="জুম ইন" className={padBtn} onClick={zoomIn}>
            <Plus className="w-5 h-5" />
          </button>
          <button aria-label="জুম আউট" title="জুম আউট" className={padBtn} onClick={zoomOut}>
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
