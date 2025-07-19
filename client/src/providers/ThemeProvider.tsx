import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import clsx from "clsx";

interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderRadius: "none" | "small" | "medium" | "large";
  setBorderRadius: (radius: "none" | "small" | "medium" | "large") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const colorPalettes = {
  blue: {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3",
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
  },
  purple: {
    50: "#f3e5f5",
    100: "#e1bee7",
    200: "#ce93d8",
    300: "#ba68c8",
    400: "#ab47bc",
    500: "#9c27b0",
    600: "#8e24aa",
    700: "#7b1fa2",
    800: "#691b9a",
    900: "#4a148c",
  },
  green: {
    50: "#e8f5e8",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
  },
  red: {
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
  },
};

const borderRadiusValues = {
  none: 0,
  small: 4,
  medium: 8,
  large: 16,
};

// Create RTL cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [borderRadius, setBorderRadius] = useState<"none" | "small" | "medium" | "large">("medium");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
    const savedColor = localStorage.getItem("primaryColor") || "blue";
    const savedRadius =
      (localStorage.getItem("borderRadius") as "none" | "small" | "medium" | "large") || "medium";

    setTheme(savedTheme);
    setPrimaryColor(savedColor);
    setBorderRadius(savedRadius);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const root = document.documentElement;
    const actualTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.className = clsx(actualTheme, `theme-${primaryColor}`, `radius-${borderRadius}`);

    // Set CSS custom properties for the selected color palette
    const palette = colorPalettes[primaryColor as keyof typeof colorPalettes];
    if (palette) {
      Object.entries(palette).forEach(([key, value]) => {
        root.style.setProperty(`--primary-${key}`, value);
      });
    }

    // Set border radius values
    const radiusValue = borderRadiusValues[borderRadius];
    root.style.setProperty("--theme-radius", `${radiusValue}px`);
    root.style.setProperty("--theme-radius-sm", `${Math.max(radiusValue / 2, 2)}px`);
    root.style.setProperty("--theme-radius-lg", `${radiusValue * 1.5}px`);
    root.style.setProperty("--theme-radius-xl", `${radiusValue * 2}px`);
  }, [theme, primaryColor, borderRadius]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem("borderRadius", borderRadius);
  }, [borderRadius]);

  // Create Material UI theme
  const actualTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const palette = colorPalettes[primaryColor as keyof typeof colorPalettes];
  const radiusValue = borderRadiusValues[borderRadius];

  const muiTheme = createTheme({
    direction: "rtl",
    palette: {
      mode: actualTheme,
      primary: {
        ...palette,
        main: palette[500],
        light: palette[300],
        dark: palette[700],
      },
      background: {
        default: actualTheme === "dark" ? "#121212" : "#fafafa",
        paper: actualTheme === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
    shape: {
      borderRadius: radiusValue,
    },
    typography: {
      fontFamily: ["Vazirmatn", "Vazir", "Roboto", "Arial", "sans-serif"].join(","),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: `${radiusValue}px`,
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: `${radiusValue * 1.5}px`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: `${Math.max(radiusValue / 2, 2)}px`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: `${radiusValue * 1.5}px`,
          },
        },
      },
    },
  });

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    primaryColor,
    setPrimaryColor,
    borderRadius,
    setBorderRadius,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <CacheProvider value={cacheRtl}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};
