import React, { createContext, useContext, useState, useCallback } from 'react';

type RotateDirection = 'up' | 'down' | 'left' | 'right';

interface RoadPerspectiveContextType {
  isEnabled: boolean;
  toggleEnabled: () => void;
  rotateX: number;
  rotateY: number;
  zoom: number;
  rotate: (direction: RotateDirection) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

const ROTATE_STEP = 18;
const ZOOM_STEP = 0.15;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;

const RoadPerspectiveContext = createContext<RoadPerspectiveContextType | undefined>(undefined);

export const RoadPerspectiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [zoom, setZoom] = useState(1);

  const reset = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setZoom(1);
  }, []);

  const toggleEnabled = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      if (!next) {
        // Automatically revert to the normal flat view when turned off
        setRotateX(0);
        setRotateY(0);
        setZoom(1);
      }
      return next;
    });
  }, []);

  const rotate = useCallback((direction: RotateDirection) => {
    if (direction === 'left') setRotateY((prev) => prev - ROTATE_STEP);
    if (direction === 'right') setRotateY((prev) => prev + ROTATE_STEP);
    if (direction === 'up') setRotateX((prev) => prev - ROTATE_STEP);
    if (direction === 'down') setRotateX((prev) => prev + ROTATE_STEP);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(ZOOM_MAX, +(prev + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(ZOOM_MIN, +(prev - ZOOM_STEP).toFixed(2)));
  }, []);

  return (
    <RoadPerspectiveContext.Provider
      value={{
        isEnabled,
        toggleEnabled,
        rotateX,
        rotateY,
        zoom,
        rotate,
        zoomIn,
        zoomOut,
        reset,
      }}
    >
      {children}
    </RoadPerspectiveContext.Provider>
  );
};

export const useRoadPerspective = () => {
  const context = useContext(RoadPerspectiveContext);
  if (!context) {
    throw new Error('useRoadPerspective must be used within a RoadPerspectiveProvider');
  }
  return context;
};
