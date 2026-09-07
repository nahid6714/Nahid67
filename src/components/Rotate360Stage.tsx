import React, { useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, X, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRotate360 } from '../context/Rotate360Context';

interface Rotate360StageProps {
  children: React.ReactNode;
}

export const Rotate360Stage: React.FC<Rotate360StageProps> = ({ children }) => {
  const {
    is360Active,
    autoRotate,
    rotateX,
    rotateY,
    zoom,
    setRotateX,
    setRotateY,
    setZoom,
    setAutoRotate,
    toggleAutoRotate,
    resetOrientation,
    exit360,
  } = useRotate360();

  const viewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const pinchStartDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef(zoom);

  // Stop autoRotate on user gesture so manual finger rotation is smooth
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // 2 fingers: Pinch to zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      initialZoomRef.current = zoom;
      setAutoRotate(false);
    } else if (e.touches.length === 1) {
      // 1 finger: Drag to rotate in any direction
      const t = e.touches[0];
      lastPointerRef.current = { x: t.clientX, y: t.clientY };
      isDraggingRef.current = true;
      pinchStartDistRef.current = null;
      setAutoRotate(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      // Pinch Zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const scaleFactor = currentDist / pinchStartDistRef.current;
      const newZoom = Math.min(2.4, Math.max(0.35, initialZoomRef.current * scaleFactor));
      setZoom(newZoom);
    } else if (e.touches.length === 1 && isDraggingRef.current) {
      // Rotate in any direction (X and Y axis)
      const t = e.touches[0];
      const deltaX = t.clientX - lastPointerRef.current.x;
      const deltaY = t.clientY - lastPointerRef.current.y;

      lastPointerRef.current = { x: t.clientX, y: t.clientY };

      setRotateY((prev) => (prev + deltaX * 0.45) % 360);
      setRotateX((prev) => (prev - deltaY * 0.45) % 360);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    pinchStartDistRef.current = null;
  };

  // Mouse Drag (Desktop)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only if left mouse button and not clicking interactive controls
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) return;

    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - lastPointerRef.current.x;
      const deltaY = e.clientY - lastPointerRef.current.y;

      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      setRotateY((prev) => (prev + deltaX * 0.4) % 360);
      setRotateX((prev) => (prev - deltaY * 0.4) % 360);
    },
    [setRotateX, setRotateY]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoom((prev) => Math.min(2.4, Math.max(0.35, prev - e.deltaY * 0.0015)));
  };

  useEffect(() => {
    if (!is360Active) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [is360Active, handleMouseMove, handleMouseUp]);

  // If 360 is not active, render standard clean website flow
  if (!is360Active) {
    return <>{children}</>;
  }

  return (
    <div
      id="viewport-360-stage"
      ref={viewportRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      className="fixed inset-0 z-50 overflow-hidden select-none touch-none bg-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Rotatable Canvas Frame */}
      <div
        id="plane-360"
        className="w-[94vw] max-w-6xl h-[88vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950 text-slate-100 transition-transform duration-75 ease-out origin-center"
        style={{
          transform: `scale(${zoom}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.15)',
        }}
      >
        {/* Scrollable interior of the website */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden touch-pan-y">
          {children}
        </div>
      </div>

      {/* Minimal Floating Controls (Clean, Compact, No Heavy Text) */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/80 backdrop-blur-xl shadow-2xl"
        >
          {/* 360 Badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>360°</span>
          </div>

          <div className="h-4 w-px bg-slate-700/70" />

          {/* Auto Rotate Toggle */}
          <button
            onClick={toggleAutoRotate}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${
              autoRotate
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title={autoRotate ? 'Pause Auto-Spin' : 'Start Auto-Spin'}
            aria-label="Toggle auto rotate"
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Reset Orientation */}
          <button
            onClick={resetOrientation}
            className="p-2 rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            title="Reset Angle"
            aria-label="Reset angle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Exit 360 Mode */}
          <button
            onClick={exit360}
            className="p-2 rounded-full text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            title="Close 360 Mode"
            aria-label="Exit 360 mode"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
