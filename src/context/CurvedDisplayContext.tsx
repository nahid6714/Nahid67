import React, { createContext, useContext, useState } from 'react';

export type CurveMode = '76deg';

interface CurvedDisplayContextType {
  curveMode: CurveMode;
  isCurveActive: boolean;
}

const CurvedDisplayContext = createContext<CurvedDisplayContextType | undefined>(undefined);

export const CurvedDisplayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Permanent 76° circular drum roll mode
  const [curveMode] = useState<CurveMode>('76deg');

  return (
    <CurvedDisplayContext.Provider
      value={{
        curveMode,
        isCurveActive: true,
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
