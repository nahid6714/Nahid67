import React, { useRef, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useRoadPerspective } from '../context/RoadPerspectiveContext';

const RANGE = 180; // -180 to +180 degrees

export const Rotation3DControls: React.FC = () => {
  const { isEnabled, rotateX, rotateY, setRotateX, setRotateY, zoomIn, zoomOut } = useRoadPerspective();

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
