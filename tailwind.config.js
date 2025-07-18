// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#5b63d3",
            secondary: "#9ca1f9",
            background: "#ffffff",
          },
          fontFamily: {
            sans: ["Vazirmatn", "Vazir", "sans-serif"],
          },
        },
        dark: {
          colors: {
            primary: "#5b63d3",
            secondary: "#9ca1f9",
            background: "#18181b",
          },
          fontFamily: {
            sans: ["Vazirmatn", "Vazir", "sans-serif"],
          },
        },
      },
    }),
  ],
};
