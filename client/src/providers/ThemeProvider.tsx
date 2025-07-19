import { useState, useEffect, type PropsWithChildren } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { getPrimaryColor, getBorderRadius } from "../utils";
import { ThemeContext } from "../context/ThemeContext";

// Create RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

// Theme provider component
export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [borderRadius, setBorderRadius] = useState<"none" | "small" | "medium" | "large">("medium");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";
    const savedPrimaryColor = localStorage.getItem("primaryColor");
    const savedBorderRadius = localStorage.getItem("borderRadius") as
      | "none"
      | "small"
      | "medium"
      | "large";

    if (savedTheme) setTheme(savedTheme);
    if (savedPrimaryColor) setPrimaryColor(savedPrimaryColor);
    if (savedBorderRadius) setBorderRadius(savedBorderRadius);
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("borderRadius", borderRadius);
  }, [borderRadius]);

  // Create MUI theme
  const muiTheme = createTheme({
    direction: "rtl",
    palette: {
      mode: theme === "system" ? "light" : theme,
      primary: {
        main: getPrimaryColor(primaryColor),
      },
    },
    shape: {
      borderRadius: getBorderRadius(borderRadius),
    },
    typography: {
      fontFamily: "Vazirmatn, Arial, sans-serif",
    },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
          primaryColor,
          setPrimaryColor,
          borderRadius,
          setBorderRadius,
        }}
      >
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
