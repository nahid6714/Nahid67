import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useCurvedDisplay } from '../context/CurvedDisplayContext';

interface CurvedRollItemProps {
  children: React.ReactNode;
  className?: string;
  intensityMultiplier?: number;
}

/**
 * CurvedRollItem:
 * Simulates a vertical cylindrical display (like a curved smartwatch or top/bottom curved mobile screen).
 * As elements approach the top edge, they tilt backwards (rotateX), scale down slightly, and fade/blur
 * into the top curvature. As they emerge from the bottom edge, they roll up from the bottom curvature into flat view.
 */
export const CurvedRollItem: React.FC<CurvedRollItemProps> = ({
  children,
  className = '',
  intensityMultiplier = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { curveMode } = useCurvedDisplay();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate tilt, Z-depth, and compression parameters based on selected mode
  const isFlat = curveMode === 'flat';
  const isCylinder = curveMode === 'cylinder';
  const isUltra = curveMode === 'ultra';

  // Significantly increased values so the curvature is unmistakably recognizable
  const bottomTilt = isFlat ? 0 : (isUltra ? -48 : isCylinder ? -38 : -28) * intensityMultiplier;
  const topTilt = isFlat ? 0 : (isUltra ? 52 : isCylinder ? 42 : 32) * intensityMultiplier;
  const bottomZ = isFlat ? 0 : (isUltra ? -130 : isCylinder ? -95 : -65) * intensityMultiplier;
  const topZ = isFlat ? 0 : (isUltra ? -150 : isCylinder ? -110 : -75) * intensityMultiplier;
  const bottomScale = isFlat ? 1 : (isUltra ? 0.84 : isCylinder ? 0.88 : 0.92);
  const topScale = isFlat ? 1 : (isUltra ? 0.80 : isCylinder ? 0.85 : 0.90);

  // RotateX: tilted away at bottom (-tilt), flat in center (0), tilted back at top (+tilt)
  // [0, 0.28, 0.64, 0.95] ensures the tilt and vanish is clearly visible in the upper and lower screen thirds
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.28, 0.64, 0.95],
    [bottomTilt, 0, 0, topTilt]
  );

  // Z-axis recession: creates realistic physical curvature depth into the screen
  const z = useTransform(
    scrollYProgress,
    [0, 0.28, 0.64, 0.95],
    [bottomZ, 0, 0, topZ]
  );

  // Opacity: content does NOT vanish completely (retains 45-55% visibility so user clearly sees the blurred roll effect)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.80, 1],
    isFlat ? [1, 1, 1, 1] : [0.55, 1, 1, 0.45]
  );

  // Scale: optical foreshortening along the curved cylindrical axis
  const scale = useTransform(
    scrollYProgress,
    [0, 0.28, 0.64, 0.95],
    [bottomScale, 1, 1, topScale]
  );

  // Y-axis translation: smooth roll trajectory
  const y = useTransform(
    scrollYProgress,
    [0, 0.28, 0.64, 0.95],
    isFlat ? [0, 0, 0, 0] : [35 * intensityMultiplier, 0, 0, -35 * intensityMultiplier]
  );

  // Filter blur: prominent focal blur (0px in center reading zone, strongly blurred 6px - 7px at top and bottom edges)
  const filter = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    isFlat
      ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
      : ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(7px)']
  );

  return (
    <motion.div
      ref={ref}
      style={{
        transformPerspective: 800,
        rotateX,
        z,
        opacity,
        scale,
        y,
        filter,
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50%',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
