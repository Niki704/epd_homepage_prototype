import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color carried over from the Download Archive prototype
        // (design system reference — see 01-design.md). Keep both prototypes
        // visually identical.
        brand: {
          DEFAULT: "#0a3d44",
          dark: "#072a2f",
          light: "#0f4d56",
        },
        navy: {
          // Dark navy used for the Quick Links sidebar + footer (MOE pattern)
          DEFAULT: "#0b1f33",
        },
      },
      fontFamily: {
        sans: ["var(--font-latin)", "sans-serif"],
        sinhala: ["var(--font-sinhala)", "sans-serif"],
        tamil: ["var(--font-tamil)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
