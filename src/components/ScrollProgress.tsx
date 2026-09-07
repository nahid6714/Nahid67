import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.65)]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
    </div>
  );
};
