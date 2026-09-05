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

  // Calculate tilt and compression parameters based on selected mode
  const isSmartwatch = curveMode === 'smartwatch';
  const isCylinder = curveMode === 'cylinder';
  const isFlat = curveMode === 'flat';

  const bottomTilt = isFlat ? 0 : (isCylinder ? -26 : -15) * intensityMultiplier;
  const topTilt = isFlat ? 0 : (isCylinder ? 32 : 18) * intensityMultiplier;
  const bottomScale = isFlat ? 1 : (isCylinder ? 0.90 : 0.94);
  const topScale = isFlat ? 1 : (isCylinder ? 0.89 : 0.93);

  // RotateX: tilted away at bottom (-tilt), flat in center (0), tilted back at top (+tilt)
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [bottomTilt, 0, 0, topTilt]
  );

  // Opacity: vanishes at top and bottom rims, fully visible in reading area
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    isFlat ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  // Scale: optical foreshortening along the curved cylindrical axis
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [bottomScale, 1, 1, topScale]
  );

  // Y-axis translation: smooth roll trajectory
  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    isFlat ? [0, 0, 0, 0] : [30 * intensityMultiplier, 0, 0, -32 * intensityMultiplier]
  );

  // Filter blur: soft focal blur right as elements dissolve into the rim
  const filter = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    isFlat
      ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
      : ['blur(3px)', 'blur(0px)', 'blur(0px)', 'blur(4px)']
  );

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        opacity,
        scale,
        y,
        filter,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
