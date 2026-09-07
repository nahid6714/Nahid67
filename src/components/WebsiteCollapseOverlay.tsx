import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, AlertOctagon, RotateCcw } from 'lucide-react';
import { useShakeEffect } from '../context/ShakeEffectContext';

interface FallingShard {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
}

const SHARD_WORDS = [
  'Nahid Hossain', 'Full-Stack', 'Android', 'Kotlin', 'Jetpack Compose',
  'Tools App', 'APK Release', 'Vercel', 'Netlify', 'React', 'TypeScript',
  'Code Error 404', 'DOM Crash', 'Fragment', 'Gravity Fall', 'Broken State',
  'Student & Worker', 'Portfolio', 'Broken UI', 'Crash!!'
];

const COLORS = [
  'text-blue-400', 'text-amber-400', 'text-rose-400', 'text-emerald-400',
  'text-indigo-300', 'text-purple-400', 'text-slate-300'
];

export const WebsiteCollapseOverlay: React.FC = () => {
  const { isTriggered, activeAnimation, resetShake } = useShakeEffect();
  const [shards, setShards] = useState<FallingShard[]>([]);

  useEffect(() => {
    if (isTriggered && activeAnimation === 'collapse') {
      const generated: FallingShard[] = [];
      for (let i = 0; i < 28; i++) {
        generated.push({
          id: i,
          text: SHARD_WORDS[i % SHARD_WORDS.length],
          x: Math.random() * 90 + 5, // 5% to 95%
          y: Math.random() * 40 + 10,
          rotation: (Math.random() - 0.5) * 180,
          delay: Math.random() * 0.4,
          color: COLORS[i % COLORS.length],
        });
      }
      setShards(generated);
    } else {
      setShards([]);
    }
  }, [isTriggered, activeAnimation]);

  if (!isTriggered || activeAnimation !== 'collapse') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="collapse-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden bg-black/40 backdrop-blur-[2px]"
      >
        {/* Screen Tremor & Earthquake Visual Flash */}
        <motion.div
          animate={{
            x: [0, -12, 14, -8, 10, -5, 0],
            y: [0, 10, -12, 8, -6, 4, 0],
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Falling text chunks and shattered site letters */}
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            initial={{
              top: `${shard.y}%`,
              left: `${shard.x}%`,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              top: ['30%', '110%'],
              rotate: [0, shard.rotation * 3],
              opacity: [1, 1, 0.8],
              scale: [1, 0.9],
            }}
            transition={{
              duration: 1.8 + (shard.id % 5) * 0.25,
              delay: shard.delay,
              ease: [0.55, 0.055, 0.675, 0.19], // Gravity accelerating curve
            }}
            className={`absolute font-black tracking-wider text-sm sm:text-base ${shard.color} drop-shadow-lg px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700/60 pointer-events-none whitespace-nowrap`}
          >
            {shard.text}
          </motion.div>
        ))}

        {/* Floating Debris Particles */}
        {Array.from({ length: 18 }).map((_, idx) => (
          <motion.div
            key={`debris-${idx}`}
            initial={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.8,
            }}
            animate={{
              top: '120%',
              rotate: Math.random() * 720 - 360,
              opacity: 0,
            }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              delay: Math.random() * 0.3,
              ease: 'easeIn',
            }}
            className="absolute w-3 h-3 rounded-sm bg-slate-400 border border-slate-200 pointer-events-none"
          />
        ))}

        {/* Floating Repair Bar */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl shadow-amber-950/60 pointer-events-auto text-white"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5 animate-pulse" />
          </div>

          <div className="text-left pr-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
              <span>লেখাগুলো ভেঙে নিচে পড়ে গেছে!</span>
              <span className="text-[10px] font-normal text-amber-300">(Website Collapsed)</span>
            </h4>
            <p className="text-[10px] text-slate-300 mt-0.5">
              মোবাইল ঝাঁকানোর কারণে ওয়েবসাইট ভেঙে নিচে পড়ে গেছে
            </p>
          </div>

          <button
            onClick={resetShake}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-md shadow-amber-500/30 active:scale-95 transition-all shrink-0"
            title="Restore and fix collapsed website"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>জোড়া লাগান</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
