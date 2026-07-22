import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kingdom: {
          navy: "#1e3a5f",
          gold: "#d4a853",
          cream: "#faf7f2",
          sage: "#6b8f71",
          wine: "#7c3a4a",
          plum: "#5c4a6e",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
