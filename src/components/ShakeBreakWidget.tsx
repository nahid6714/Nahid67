import React, { useState } from 'react';
import { Smartphone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShakeEffect } from '../context/ShakeEffectContext';

export const ShakeBreakWidget: React.FC = () => {
  const { isTriggered, triggerShake, shakeProgress } = useShakeEffect();
  const [showTip, setShowTip] = useState(false);

  // If the screen is already broken/cracked, hide this button so it doesn't overlap with the repair button
  if (isTriggered) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 select-none">
      {/* Shake / Break Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerShake}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/80 dark:border-slate-800 light:border-slate-200 backdrop-blur-md shadow-lg shadow-black/20 hover:border-red-500/60 transition-all duration-200"
        title="মোবাইল ঝাঁকালে স্ক্রিন ফাটবে • ক্লিক করে টেস্ট করুন"
        aria-label="Test screen break shake effect"
      >
        <span className="w-6 h-6 rounded-xl bg-red-500/15 text-red-400 group-hover:bg-red-500 group-hover:text-white flex items-center justify-center transition-colors">
          <Zap className="w-3.5 h-3.5" />
        </span>

        <span className="text-xs font-semibold tracking-tight pr-0.5 group-hover:text-red-400 transition-colors">
          ঝাঁকুনি টেস্ট
        </span>

        {/* Live shake counter indicator if motion is active */}
        {shakeProgress > 0 && (
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white animate-pulse">
            {shakeProgress}/3
          </span>
        )}
      </motion.button>

      {/* Tooltip / Explanation badge on hover */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: -6, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/95 text-slate-300 text-[11px] font-medium border border-slate-800 shadow-xl backdrop-blur-md"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>মোবাইল ৩ বার ঝাঁকালে বা এখানে ক্লিক করলে স্ক্রিন ফেটে যাবে</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
