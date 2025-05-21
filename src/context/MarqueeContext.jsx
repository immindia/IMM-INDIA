import React, { createContext, useState, useContext } from "react";

const MarqueeContext = createContext();

export const useMarquee = () => useContext(MarqueeContext);

export const MarqueeProvider = ({ children }) => {
  const [marqueeText, setMarqueeText] = useState(
    "Phase 3 Applications Closed for PGDM 2025-2027"
  );

  return (
    <MarqueeContext.Provider value={{ marqueeText, setMarqueeText }}>
      {children}
    </MarqueeContext.Provider>
  );
};
