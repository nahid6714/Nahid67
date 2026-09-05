import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface CurvedRollItemProps {
  children: React.ReactNode;
  className?: string;
  intensityMultiplier?: number;
}

/**
 * CurvedRollItem:
 * Simulates a true 3D Revolving Cylinder / Drum Wheel (একেবারে গোল).
 * As you scroll:
 * - Elements curve continuously along a giant 3D circular drum.
 * - The front surface rotates forward and downward.
 * - Elements coming from below swing up from underneath the cylinder, curving towards the viewer.
 * - Elements moving past the center curve back and over the top into the distance.
 * - Uses a deep rotation pivot (transformOrigin: 50% 50% -Rpx) so elements physically follow the circular arc!
 */
export const CurvedRollItem: React.FC<CurvedRollItemProps> = ({
  children,
  className = '',
  intensityMultiplier = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 76° Circular Drum Curvature (76 ডিগ্রী মোড স্থায়ী রাখা হয়েছে, বাকিগুলো বাদ দেওয়া হয়েছে)
  const maxTilt = 76 * intensityMultiplier;
  const maxZ = -130 * intensityMultiplier;

  // 7 continuous progression keyframes across the vertical scroll:
  // Rolling from underneath (-76°) -> Apex Center (0°, 100% normal size) -> Curving over the top (+76°)
  const rotateX = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.35, 0.50, 0.65, 0.82, 1.0],
    [
      -maxTilt,
      -maxTilt * 0.65,
      -maxTilt * 0.28,
      0,
      maxTilt * 0.28,
      maxTilt * 0.65,
      maxTilt,
    ]
  );

  // Z-axis recession: always <= 0 so elements NEVER zoom in or bulge forward
  const z = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.35, 0.50, 0.65, 0.82, 1.0],
    [
      maxZ,
      maxZ * 0.60,
      maxZ * 0.20,
      0,
      maxZ * 0.20,
      maxZ * 0.60,
      maxZ,
    ]
  );

  // Y-axis translation: smooth natural tangent roll along the 76° cylinder
  const y = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.35, 0.50, 0.65, 0.82, 1.0],
    [
      32 * intensityMultiplier,
      18 * intensityMultiplier,
      7 * intensityMultiplier,
      0,
      -7 * intensityMultiplier,
      -18 * intensityMultiplier,
      -32 * intensityMultiplier,
    ]
  );

  // Scale: strictly normal (1.0 at center, never zoomed in or enlarged)
  const scale = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.35, 0.50, 0.65, 0.82, 1.0],
    [0.92, 0.97, 1.0, 1.0, 1.0, 0.97, 0.92]
  );

  // Opacity: content stays visible throughout the 76° roll
  const opacity = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.50, 0.82, 1.0],
    [0.60, 0.95, 1.0, 0.95, 0.60]
  );

  // Blur & Brightness: clear and normal at center, gentle optical blur at 76° edges
  const filter = useTransform(
    scrollYProgress,
    [0.0, 0.18, 0.32, 0.50, 0.68, 0.82, 1.0],
    [
      'blur(5px)',
      'blur(2px)',
      'blur(0px)',
      'blur(0px)',
      'blur(0px)',
      'blur(2px)',
      'blur(5px)',
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        transformPerspective: 1600,
        rotateX,
        z,
        y,
        scale,
        opacity,
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
