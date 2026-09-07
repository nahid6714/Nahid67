import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { playGlassCrackSound } from '../utils/shakeSounds';

interface ShakeEffectContextType {
  isTriggered: boolean;
  triggerShake: () => void;
  resetShake: () => void;
  shakeProgress: number; // 0 to 3
  isMotionActive: boolean;
}

const ShakeEffectContext = createContext<ShakeEffectContextType | undefined>(undefined);

export const ShakeEffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [shakeProgress, setShakeProgress] = useState(0);
  const [isMotionActive, setIsMotionActive] = useState(false);

  const shakeCountRef = useRef(0);
  const lastShakeTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const lastZRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  const triggerShake = useCallback(() => {
    setIsTriggered(true);

    // Haptic feedback
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([80, 40, 160]);
      }
    } catch {
      // Ignored
    }

    // Audio feedback: realistic shatter/crack sound
    playGlassCrackSound();
  }, []);

  const resetShake = useCallback(() => {
    setIsTriggered(false);
    setShakeProgress(0);
    shakeCountRef.current = 0;
  }, []);

  // Motion shake detector for mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SHAKE_THRESHOLD = 18.5; // Acceleration delta threshold
    const SHAKE_TIMEOUT = 1400;   // Reset count if no shake within 1.4s

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      if (isTriggered) return;

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

          // If shaken 3 times, break the screen!
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
  }, [isTriggered, triggerShake]);

  return (
    <ShakeEffectContext.Provider
      value={{
        isTriggered,
        triggerShake,
        resetShake,
        shakeProgress,
        isMotionActive,
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
