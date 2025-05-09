import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [navbarColor, setNavbarColor] = useState("bg-primary-color");
  const [footerColor, setFooterColor] = useState("bg-primary-color");

  const updateColors = (navColor, footColor) => {
    setNavbarColor(navColor);
    setFooterColor(footColor);
  };

  return (
    <ThemeContext.Provider value={{ navbarColor, footerColor, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
