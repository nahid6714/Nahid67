import React, { useRef, useEffect } from 'react';
import { useRoadPerspective } from '../context/RoadPerspectiveContext';

interface RoadPerspectiveStageProps {
  children: React.ReactNode;
}

export const RoadPerspectiveStage: React.FC<RoadPerspectiveStageProps> = ({ children }) => {
  const { rotateX, rotateY, zoom, isEnabled } = useRoadPerspective();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Expose scroll container globally so ScrollToTop works smoothly
  useEffect(() => {
    const handleCustomScrollTop = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('app-scroll-to-top', handleCustomScrollTop);
    return () => {
      window.removeEventListener('app-scroll-to-top', handleCustomScrollTop);
    };
  }, []);

  return (
    <div
      id="road-perspective-viewport"
      className="fixed inset-0 overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-100"
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* The 3D Rotatable Plane (Includes Header + Main Content + Footer) */}
      <div
        id="road-tilt-plane"
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: isEnabled
            ? `scale(${zoom}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : 'none',
          transformOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* The Native Scroll Container */}
        <div
          id="road-scroll-view"
          ref={scrollContainerRef}
          className="w-full h-full overflow-y-auto overflow-x-hidden relative"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Page Content (Navbar, Main Route, Footer) */}
          <div className="relative min-h-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
