import { createContext, useState, useContext } from "react";

const MarqueeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMarquee = () => useContext(MarqueeContext);

export const MarqueeProvider = ({ children }) => {
  const [marqueeText, setMarqueeText] = useState(
    "PGDM Session 2025-27 Commences from August 18, 2025, onwards for Batch 2* | Phase-4 Applications Closed"
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
