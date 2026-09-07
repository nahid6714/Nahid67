import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Sparkles, AlertTriangle } from 'lucide-react';
import { useShakeEffect } from '../context/ShakeEffectContext';
import { playGlassCrackSound } from '../utils/shakeSounds';

interface CrackPoint {
  id: number;
  x: number;
  y: number;
}

export const CrackedGlassOverlay: React.FC = () => {
  const { isTriggered, resetShake } = useShakeEffect();
  const [extraCracks, setExtraCracks] = useState<CrackPoint[]>([]);

  if (!isTriggered) {
    return null;
  }

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only add a crack if clicking on the overlay itself, not the repair button
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    playGlassCrackSound();
    setExtraCracks((prev) => [...prev.slice(-6), { id: Date.now(), x, y }]);
  };

  const handleRepair = () => {
    setExtraCracks([]);
    resetShake();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cracked-glass-layer"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={handleScreenClick}
        className="fixed inset-0 z-[100] pointer-events-auto cursor-crosshair overflow-hidden select-none bg-black/20 backdrop-contrast-125"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.6)',
        }}
      >
        {/* Violent initial flash */}
        <motion.div
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white pointer-events-none"
        />

        {/* Realistic SVG Master Crack Pattern (Impact Center at 45% x 40%) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <radialGradient id="impact-glow" cx="45%" cy="38%" r="25%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="20%" stopColor="rgba(200,230,255,0.4)" />
              <stop offset="60%" stopColor="rgba(100,160,255,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Impact Core Shard Whiteout */}
          <circle cx="450" cy="380" r="28" fill="url(#impact-glow)" />
          <polygon points="450,370 465,385 445,395 435,380" fill="rgba(255,255,255,0.7)" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
          <polygon points="465,385 480,375 470,395" fill="rgba(220,240,255,0.6)" stroke="#fff" strokeWidth="1.5" />
          <polygon points="435,380 420,390 440,402" fill="rgba(240,250,255,0.6)" stroke="#fff" strokeWidth="1.5" />

          {/* Primary Sharp Fracture Lines with Light Reflection Glow */}
          <g stroke="rgba(255,255,255,0.85)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="miter">
            {/* Crack Ray 1: Top-Left */}
            <path d="M450,380 L380,310 L310,260 L240,190 L160,110 L80,40 L0,0" />
            <path d="M380,310 L350,240 L310,180 L280,110 L250,0" strokeWidth="1.6" />
            <path d="M310,260 L240,270 L170,240 L90,210 L0,180" strokeWidth="1.4" />
            
            {/* Crack Ray 2: Top-Right */}
            <path d="M450,380 L540,290 L630,220 L730,150 L840,90 L950,20 L1000,0" />
            <path d="M540,290 L590,210 L640,140 L710,60 L760,0" strokeWidth="1.6" />
            <path d="M630,220 L720,240 L810,230 L910,260 L1000,270" strokeWidth="1.4" />

            {/* Crack Ray 3: Right and Bottom-Right */}
            <path d="M450,380 L570,390 L680,420 L790,470 L890,530 L970,610 L1000,680" />
            <path d="M680,420 L750,360 L840,320 L940,300 L1000,310" strokeWidth="1.5" />
            <path d="M570,390 L630,480 L710,590 L790,700 L880,820 L960,940 L1000,1000" />
            <path d="M710,590 L810,640 L910,700 L1000,740" strokeWidth="1.3" />

            {/* Crack Ray 4: Bottom and Bottom-Left */}
            <path d="M450,380 L440,490 L420,600 L390,720 L360,840 L340,950 L330,1000" />
            <path d="M440,490 L510,580 L560,700 L610,810 L640,930 L660,1000" strokeWidth="1.7" />
            <path d="M420,600 L340,680 L260,780 L190,880 L140,970 L120,1000" strokeWidth="1.4" />

            {/* Crack Ray 5: Left and Bottom-Left */}
            <path d="M450,380 L350,420 L250,460 L160,510 L90,580 L30,660 L0,710" />
            <path d="M350,420 L300,500 L240,600 L170,710 L100,820 L50,910 L0,960" strokeWidth="1.5" />
            <path d="M250,460 L190,420 L110,400 L40,380 L0,370" strokeWidth="1.3" />
            <path d="M450,380 L330,370 L210,350 L110,340 L0,330" strokeWidth="1.6" />
          </g>

          {/* Secondary Hairline Concentric Spiderweb Rings */}
          <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" fill="none">
            {/* Ring 1 - Close to impact */}
            <path d="M390,340 Q450,320 510,335 Q535,390 515,440 Q455,465 395,435 Q375,385 390,340 Z" />
            {/* Ring 2 - Medium distance */}
            <path d="M320,290 Q440,240 590,270 Q640,390 590,520 Q440,560 310,490 Q280,380 320,290 Z" />
            {/* Ring 3 - Outer spiderweb */}
            <path d="M240,210 Q450,150 710,190 Q810,400 720,650 Q460,730 220,620 Q160,400 240,210 Z" strokeWidth="0.9" />
          </g>

          {/* Dark Glass Shadow Underlays (Adds 3D Physical Depth to fractures) */}
          <g stroke="rgba(0,10,30,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="miter">
            <path d="M452,382 L382,312 L312,262 L242,192 L162,112" />
            <path d="M452,382 L542,292 L632,222 L732,152" />
            <path d="M452,382 L572,392 L682,422 L792,472" />
            <path d="M452,382 L442,492 L422,602 L392,722" />
            <path d="M452,382 L352,422 L252,462 L162,512" />
          </g>

          {/* Micro Glass Debris & Dust Shards */}
          <g fill="rgba(255,255,255,0.7)">
            <polygon points="460,340 464,342 462,346" />
            <polygon points="430,330 435,334 431,338" />
            <polygon points="480,410 484,414 478,416" />
            <polygon points="410,410 415,413 412,418" />
            <polygon points="510,360 514,363 511,368" />
            <polygon points="380,370 384,374 381,379" />
          </g>
        </svg>

        {/* Dynamic Extra Cracks when User Taps Screen */}
        {extraCracks.map((crack) => (
          <div
            key={crack.id}
            className="absolute pointer-events-none"
            style={{ left: crack.x - 75, top: crack.y - 75, width: 150, height: 150 }}
          >
            <svg viewBox="0 0 150 150" className="w-full h-full">
              <circle cx="75" cy="75" r="8" fill="rgba(255,255,255,0.8)" />
              <g stroke="rgba(255,255,255,0.9)" strokeWidth="1.8">
                <path d="M75,75 L20,30 M75,75 L130,25 M75,75 L140,110 M75,75 L80,145 M75,75 L25,120 M75,75 L10,75" />
                <path d="M40,50 Q75,35 110,45 Q120,95 80,120 Q35,105 40,50" strokeWidth="1" fill="none" />
              </g>
            </svg>
          </div>
        ))}

        {/* Glass Edge Glare & Iridescent Rainbow Refraction */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(180,220,255,0.1) 60%, rgba(255,180,220,0.1) 80%, transparent 100%)',
          }}
        />

        {/* Floating Controls Bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-red-500/40 shadow-2xl shadow-red-950/50 pointer-events-auto text-white"
        >
          <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          </div>

          <div className="text-left pr-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
              <span>স্ক্রিন ফেটে গেছে!</span>
              <span className="text-[10px] font-normal text-red-300">(Cracked Screen)</span>
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5">
              স্ক্রিনে ট্যাপ করলে আরও ফাটল ধরবে
            </p>
          </div>

          <button
            onClick={handleRepair}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/30 active:scale-95 transition-all"
            title="Fix and repair cracked glass"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>স্ক্রিন ঠিক করুন</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
