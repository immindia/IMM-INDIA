import React, { createContext, useState, useContext } from "react";

const MarqueeContext = createContext();

export const useMarquee = () => useContext(MarqueeContext);

export const MarqueeProvider = ({ children }) => {
  const [marqueeText, setMarqueeText] = useState(
    "PGDM Session 2025-27 Commences from July 7, 2025, onwards for Batch 1*"
  );
  const [isBBAPage, setIsBBAPage] = useState(false);

  return (
    <MarqueeContext.Provider
      value={{ marqueeText, setMarqueeText, isBBAPage, setIsBBAPage }}
    >
      {children}
    </MarqueeContext.Provider>
  );
};
