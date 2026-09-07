import React, { useRef, useCallback, useState } from 'react';
import { Plus, Minus, RotateCcw, Smartphone, Sparkles, Layers, Play } from 'lucide-react';
import { useRoadPerspective } from '../context/RoadPerspectiveContext';
import { useShakeEffect, ShakeMode } from '../context/ShakeEffectContext';

const RANGE = 180; // -180 to +180 degrees

export const Rotation3DControls: React.FC = () => {
  const { isEnabled, rotateX, rotateY, setRotateX, setRotateY, reset, zoomIn, zoomOut } = useRoadPerspective();
  const { shakeMode, setShakeMode, triggerShake, shakeProgress, isMotionActive } = useShakeEffect();
  const [showSettings, setShowSettings] = useState(false);

  const vTrackRef = useRef<HTMLDivElement>(null);
  const hTrackRef = useRef<HTMLDivElement>(null);

  // Vertical bar: drag up/down -> controls rotateX
  const handleVerticalDrag = useCallback(
    (clientY: number) => {
      const track = vTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      // Top of track = +RANGE, bottom of track = -RANGE
      const value = RANGE - ratio * (RANGE * 2);
      setRotateX(value);
    },
    [setRotateX]
  );

  // Horizontal bar: drag left/right -> controls rotateY
  const handleHorizontalDrag = useCallback(
    (clientX: number) => {
      const track = hTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      // Left of track = -RANGE, right of track = +RANGE
      const value = ratio * (RANGE * 2) - RANGE;
      setRotateY(value);
    },
    [setRotateY]
  );

  const startVerticalDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    handleVerticalDrag(e.clientY);
    const onMove = (ev: PointerEvent) => handleVerticalDrag(ev.clientY);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const startHorizontalDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    handleHorizontalDrag(e.clientX);
    const onMove = (ev: PointerEvent) => handleHorizontalDrag(ev.clientX);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  if (!isEnabled) return null;

  // Thumb positions as percentages within their tracks
  const vThumbPercent = ((RANGE - rotateX) / (RANGE * 2)) * 100;
  const hThumbPercent = ((rotateY + RANGE) / (RANGE * 2)) * 100;

  return (
    <>
      {/* 3D Angle Indicator & Shake Animation Switcher Panel (Top Center) */}
      <div className="fixed top-18 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 shadow-xl backdrop-blur-md text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-800">
          {/* Real-time Angle Degrees */}
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>
              X: <strong className="text-blue-400">{Math.round(rotateX)}°</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span>
              Y: <strong className="text-indigo-400">{Math.round(rotateY)}°</strong>
            </span>
          </span>

          {/* Reset Angle Button */}
          {(Math.round(rotateX) !== 0 || Math.round(rotateY) !== 0) && (
            <button
              onClick={reset}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="ডিগ্রি রিসেট করুন (Reset 0°)"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}

          {/* Toggle Shake Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-sans font-medium transition-all ${
              showSettings
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3 text-amber-400" />
            <span>ঝাঁকুনি সুইচ</span>
          </button>
        </div>

        {/* Shake Mode Dropdown / Settings Panel */}
        {showSettings && (
          <div className="mt-2 w-72 p-3 rounded-2xl bg-slate-950/95 dark:bg-slate-950/95 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl backdrop-blur-xl text-xs space-y-2.5">
            <div className="flex items-center justify-between text-slate-300 dark:text-slate-300 light:text-slate-700 font-semibold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>মোবাইল ঝাঁকুনি ইফেক্ট (৩-৪ বার)</span>
              </span>
              {shakeProgress > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                  {shakeProgress}/4
                </span>
              )}
            </div>

            {/* Animation Options */}
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setShakeMode('cracked')}
                className={`flex flex-col items-start p-2 rounded-xl text-left border transition-all ${
                  shakeMode === 'cracked'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold text-[11px]">🔨 স্ক্রিন ফাটল</span>
                <span className="text-[10px] text-slate-400">ফাটা কাঁচের স্ক্রিন</span>
              </button>

              <button
                onClick={() => setShakeMode('collapse')}
                className={`flex flex-col items-start p-2 rounded-xl text-left border transition-all ${
                  shakeMode === 'collapse'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold text-[11px]">💥 লেখা ভেঙে পড়া</span>
                <span className="text-[10px] text-slate-400">নিচে ধ্বসে পড়বে</span>
              </button>
            </div>

            {/* Test Trigger Button */}
            <div className="pt-1 flex items-center justify-between border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <span className="text-[10px] text-slate-400">
                {isMotionActive ? 'অ্যাক্সিলারোমিটার সক্রিয়' : 'সরাসরি টেস্ট করতে বাটন চাপুন'}
              </span>
              <button
                onClick={() => triggerShake()}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] shadow transition-all active:scale-95"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>টেস্ট ঝাঁকুনি</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vertical Drag Bar (right side) — drag up/down to tilt the view */}
      <div
        ref={vTrackRef}
        onPointerDown={startVerticalDrag}
        aria-label="উপরে নিচে ঘোরানোর বার"
        title="উপরে নিচে ঘোরাতে টেনে ধরুন"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-[60] w-3 h-48 rounded-full bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-300/70 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-400/60 backdrop-blur-md cursor-grab active:cursor-grabbing touch-none"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-2 border-white/80 shadow-lg pointer-events-none"
          style={{ top: `calc(${vThumbPercent}% - 12px)` }}
        />
      </div>

      {/* Horizontal Drag Bar (bottom center) — drag left/right to spin the view */}
      <div
        ref={hTrackRef}
        onPointerDown={startHorizontalDrag}
        aria-label="ডানে বামে ঘোরানোর বার"
        title="ডানে বামে ঘোরাতে টেনে ধরুন"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] w-48 h-3 rounded-full bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-300/70 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-400/60 backdrop-blur-md cursor-grab active:cursor-grabbing touch-none"
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 border-2 border-white/80 shadow-lg pointer-events-none"
          style={{ left: `calc(${hThumbPercent}% - 12px)` }}
        />
      </div>

      {/* Zoom In / Out — bottom-right corner */}
      <div className="fixed bottom-5 right-3 z-[60] flex flex-col rounded-lg overflow-hidden border border-slate-700/60 dark:border-slate-700/60 light:border-slate-400/60 shadow-lg">
        <button
          onClick={zoomIn}
          aria-label="জুম ইন"
          title="জুম ইন (+)"
          className="flex items-center justify-center w-9 h-9 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/85 text-slate-200 dark:text-slate-200 light:text-slate-800 backdrop-blur-md hover:bg-blue-600 hover:text-white active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          aria-label="জুম আউট"
          title="জুম আউট (-)"
          className="flex items-center justify-center w-9 h-9 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/85 text-slate-200 dark:text-slate-200 light:text-slate-800 backdrop-blur-md hover:bg-blue-600 hover:text-white active:scale-95 transition-all border-t border-slate-700/60 dark:border-slate-700/60 light:border-slate-400/60"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
