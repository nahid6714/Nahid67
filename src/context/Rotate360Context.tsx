import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface Rotate360ContextType {
  is360Active: boolean;
  autoRotate: boolean;
  rotateX: number;
  rotateY: number;
  zoom: number;
  shakeProgress: number; // 0 to 4
  activate360: () => void;
  exit360: () => void;
  toggle360: () => void;
  toggleAutoRotate: () => void;
  setAutoRotate: (val: boolean) => void;
  setRotateX: React.Dispatch<React.SetStateAction<number>>;
  setRotateY: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  resetOrientation: () => void;
}

const Rotate360Context = createContext<Rotate360ContextType | undefined>(undefined);

export const Rotate360Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [is360Active, setIs360Active] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(0);
  const [zoom, setZoom] = useState(0.85);
  const [shakeProgress, setShakeProgress] = useState(0);

  const shakeCountRef = useRef(0);
  const lastShakeTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const lastZRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  const activate360 = useCallback(() => {
    setIs360Active(true);
    setAutoRotate(true);
    setRotateX(12);
    setRotateY(0);
    setZoom(0.85);

    // Haptic vibration feedback
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 40, 100]);
      }
    } catch {
      // Ignore
    }
  }, []);

  const exit360 = useCallback(() => {
    setIs360Active(false);
    setAutoRotate(false);
    setRotateX(0);
    setRotateY(0);
    setZoom(1);
    setShakeProgress(0);
    shakeCountRef.current = 0;
  }, []);

  const toggle360 = useCallback(() => {
    if (is360Active) {
      exit360();
    } else {
      activate360();
    }
  }, [is360Active, exit360, activate360]);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const resetOrientation = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setZoom(0.88);
  }, []);

  // Automatic slow spin loop when autoRotate is true
  useEffect(() => {
    if (!is360Active || !autoRotate) return;

    let animId: number;
    const speed = 0.45; // Degrees per frame

    const spin = () => {
      setRotateY((prev) => (prev + speed) % 360);
      animId = requestAnimationFrame(spin);
    };

    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [is360Active, autoRotate]);

  // Mobile Shake Detection: 3 to 4 shakes unlocks 360 mode
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SHAKE_THRESHOLD = 17.5;
    const SHAKE_TIMEOUT = 1800; // Reset if inactive for 1.8s

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
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
        if (now - lastShakeTimeRef.current > 200) {
          lastShakeTimeRef.current = now;
          shakeCountRef.current += 1;
          setShakeProgress(shakeCountRef.current);

          if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
          resetTimerRef.current = window.setTimeout(() => {
            shakeCountRef.current = 0;
            setShakeProgress(0);
          }, SHAKE_TIMEOUT);

          // 3 or 4 shakes activates 360° mode!
          if (shakeCountRef.current >= 3) {
            shakeCountRef.current = 0;
            setShakeProgress(0);
            activate360();
          }
        }
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [activate360]);

  return (
    <Rotate360Context.Provider
      value={{
        is360Active,
        autoRotate,
        rotateX,
        rotateY,
        zoom,
        shakeProgress,
        activate360,
        exit360,
        toggle360,
        toggleAutoRotate,
        setAutoRotate,
        setRotateX,
        setRotateY,
        setZoom,
        resetOrientation,
      }}
    >
      {children}
    </Rotate360Context.Provider>
  );
};

export const useRotate360 = (): Rotate360ContextType => {
  const context = useContext(Rotate360Context);
  if (!context) {
    throw new Error('useRotate360 must be used within a Rotate360Provider');
  }
  return context;
};
