import React, { createContext, useState, useContext } from "react";

const MetaContext = createContext();

// Default metadata (e.g., for homepage or as a fallback)
const DEFAULT_TITLE =
  "IMM - Best MBA Colleges in Delhi NCR | PGDM Colleges in India";
const DEFAULT_DESCRIPTION =
  "Institute of marketing & management is a top-ranked MBA college in Delhi. Industry-focused curriculum, excellent placements, and strong alumni network.";

export const MetaProvider = ({ children }) => {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);

  return (
    <MetaContext.Provider
      value={{ title, setTitle, description, setDescription }}
    >
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => {
  const context = useContext(MetaContext);
  if (context === undefined) {
    throw new Error("useMeta must be used within a MetaProvider");
  }
  return context;
};
