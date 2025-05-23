import { createContext, useContext, useState } from "react";

const VisibilityContext = createContext();

export const useVisibility = () => useContext(VisibilityContext);

