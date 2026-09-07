import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { playGlassCrackSound, playCollapseSound } from '../utils/shakeSounds';

export type ShakeMode = 'cracked' | 'collapse' | 'disabled';

interface ShakeEffectContextType {
  shakeMode: ShakeMode;
  setShakeMode: (mode: ShakeMode) => void;
  isTriggered: boolean;
  activeAnimation: 'cracked' | 'collapse' | null;
  triggerShake: (specificMode?: 'cracked' | 'collapse') => void;
  resetShake: () => void;
  shakeProgress: number; // 0 to 4 (shakes counted)
  isMotionActive: boolean;
}

const ShakeEffectContext = createContext<ShakeEffectContextType | undefined>(undefined);

export const ShakeEffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User selected mode (stored in localStorage for persistence)
  const [shakeMode, setShakeModeState] = useState<ShakeMode>(() => {
    const saved = localStorage.getItem('nh_shake_mode');
    return (saved as ShakeMode) || 'cracked';
  });

  const [isTriggered, setIsTriggered] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<'cracked' | 'collapse' | null>(null);
  const [shakeProgress, setShakeProgress] = useState(0);
  const [isMotionActive, setIsMotionActive] = useState(false);

  const shakeCountRef = useRef(0);
  const lastShakeTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const lastZRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  const setShakeMode = (mode: ShakeMode) => {
    setShakeModeState(mode);
    localStorage.setItem('nh_shake_mode', mode);
  };

  const triggerShake = useCallback((specificMode?: 'cracked' | 'collapse') => {
    const targetMode = specificMode || (shakeMode === 'disabled' ? 'cracked' : shakeMode);
    setActiveAnimation(targetMode);
    setIsTriggered(true);

    // Haptic feedback
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([80, 40, 160]);
      }
    } catch {
      // Ignored
    }

    // Audio feedback
    if (targetMode === 'cracked') {
      playGlassCrackSound();
    } else if (targetMode === 'collapse') {
      playCollapseSound();
    }
  }, [shakeMode]);

  const resetShake = useCallback(() => {
    setIsTriggered(false);
    setActiveAnimation(null);
    setShakeProgress(0);
    shakeCountRef.current = 0;
  }, []);

  // Motion shake detector
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SHAKE_THRESHOLD = 18.5; // Acceleration delta threshold
    const SHAKE_TIMEOUT = 1400;   // Reset count if no shake within 1.4s

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (shakeMode === 'disabled' || isTriggered) return;

      setIsMotionActive(true);

      const accel = e.accelerationIncludingGravity || e.acceleration;
      if (!accel || accel.x === null || accel.y === null || accel.z === null) return;

      const now = Date.now();
      const deltaX = Math.abs(accel.x - lastXRef.current);
      const deltaY = Math.abs(accel.y - lastYRef.current);
      const deltaZ = Math.abs(accel.z - lastZRef.current);

      lastXRef.current = accel.x;
      lastYRef.current = accel.y;
      lastZRef.current = accel.z;

      const totalDelta = deltaX + deltaY + deltaZ;

      if (totalDelta > SHAKE_THRESHOLD) {
        // Prevent registering multiple peaks in under 200ms
        if (now - lastShakeTimeRef.current > 200) {
          lastShakeTimeRef.current = now;
          shakeCountRef.current += 1;
          setShakeProgress(shakeCountRef.current);

          // Reset shake count if inactive for 1.4s
          if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
          resetTimerRef.current = window.setTimeout(() => {
            shakeCountRef.current = 0;
            setShakeProgress(0);
          }, SHAKE_TIMEOUT);

          // If shaken 3 to 4 times, fire the animation!
          if (shakeCountRef.current >= 3) {
            shakeCountRef.current = 0;
            setShakeProgress(0);
            triggerShake();
          }
        }
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [shakeMode, isTriggered, triggerShake]);

  return (
    <ShakeEffectContext.Provider
      value={{
        shakeMode,
        setShakeMode,
        isTriggered,
        activeAnimation,
        triggerShake,
        resetShake,
        shakeProgress,
        isMotionActive
      }}
    >
      {children}
    </ShakeEffectContext.Provider>
  );
};

export const useShakeEffect = (): ShakeEffectContextType => {
  const context = useContext(ShakeEffectContext);
  if (!context) {
    throw new Error('useShakeEffect must be used within a ShakeEffectProvider');
  }
  return context;
};
