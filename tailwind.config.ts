import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#101010",
        surfaceBorder: "#202020",
        surfaceHover: "#161616",
        accent: {
          DEFAULT: "#00E599",
          hover: "#00C583",
          glow: "rgba(0, 229, 153, 0.25)",
          cyan: "#00E5FF",
        },
        muted: "#8A8A8A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(0, 229, 153, 0.15)",
        glow: "0 0 25px rgba(0, 229, 153, 0.25)",
        "glow-lg": "0 0 40px rgba(0, 229, 153, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
