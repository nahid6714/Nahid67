import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurveMode = 'smartwatch' | 'cylinder' | 'ultra' | 'flat';

interface CurvedDisplayContextType {
  curveMode: CurveMode;
  setCurveMode: (mode: CurveMode) => void;
  isCurveActive: boolean;
  toggleCurveMode: () => void;
}

const CurvedDisplayContext = createContext<CurvedDisplayContextType | undefined>(undefined);

export const CurvedDisplayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to enhanced smartwatch curve as requested ("একটু বাড়িয়ে দাও যেন সহজে বোঝা যায়")
  const [curveMode, setCurveModeState] = useState<CurveMode>('smartwatch');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nh_curve_mode') as CurveMode | null;
      if (saved && ['smartwatch', 'cylinder', 'ultra', 'flat'].includes(saved)) {
        setCurveModeState(saved);
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const setCurveMode = (mode: CurveMode) => {
    setCurveModeState(mode);
    try {
      localStorage.setItem('nh_curve_mode', mode);
    } catch {
      // Ignore
    }
  };

  const toggleCurveMode = () => {
    if (curveMode === 'smartwatch') setCurveMode('cylinder');
    else if (curveMode === 'cylinder') setCurveMode('ultra');
    else if (curveMode === 'ultra') setCurveMode('flat');
    else setCurveMode('smartwatch');
  };

  return (
    <CurvedDisplayContext.Provider
      value={{
        curveMode,
        setCurveMode,
        isCurveActive: curveMode !== 'flat',
        toggleCurveMode,
      }}
    >
      {children}
    </CurvedDisplayContext.Provider>
  );
};

export const useCurvedDisplay = () => {
  const context = useContext(CurvedDisplayContext);
  if (!context) {
    throw new Error('useCurvedDisplay must be used within a CurvedDisplayProvider');
  }
  return context;
};
