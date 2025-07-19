/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--primary-50, #e3f2fd)",
          100: "var(--primary-100, #bbdefb)",
          200: "var(--primary-200, #90caf9)",
          300: "var(--primary-300, #64b5f6)",
          400: "var(--primary-400, #42a5f5)",
          500: "var(--primary-500, #2196f3)",
          600: "var(--primary-600, #1e88e5)",
          700: "var(--primary-700, #1976d2)",
          800: "var(--primary-800, #1565c0)",
          900: "var(--primary-900, #0d47a1)",
        },
      },
      borderRadius: {
        theme: "var(--theme-radius, 8px)",
        "theme-sm": "var(--theme-radius-sm, 4px)",
        "theme-lg": "var(--theme-radius-lg, 12px)",
        "theme-xl": "var(--theme-radius-xl, 16px)",
      },
      fontFamily: {
        sans: ["Vazirmatn", "Vazir", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
