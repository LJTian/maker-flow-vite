/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14212b",
          soft: "#3d4f5c",
          mute: "#6b7c88",
        },
        mist: {
          DEFAULT: "#e8eef2",
          deep: "#dce7ee",
          card: "#f4f8fa",
        },
        forge: {
          DEFAULT: "#0d7377",
          deep: "#095456",
          bright: "#14919b",
          light: "#e6f4f5",
        },
        brass: "#c4a35a",
      },
      fontFamily: {
        display: ['"Syne"', "ui-sans-serif", "sans-serif"],
        sans: ['"Figtree"', "ui-sans-serif", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        draw: "draw 1.6s ease-out 0.4s both",
      },
    },
  },
  plugins: [],
};

