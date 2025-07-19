import { createContext } from "react";

// Theme context type
export interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderRadius: "none" | "small" | "medium" | "large";
  setBorderRadius: (radius: "none" | "small" | "medium" | "large") => void;
}

// Create context
export const ThemeContext = createContext<ThemeContextType | null>(null);
