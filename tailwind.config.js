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
          deep: "#d4dde4",
        },
        forge: {
          DEFAULT: "#0d7377",
          deep: "#095456",
          bright: "#14919b",
        },
        brass: "#c4a35a",
      },
      fontFamily: {
        display: ['"Syne"', "ui-sans-serif", "sans-serif"],
        sans: ['"Figtree"', "ui-sans-serif", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        rise: "rise 0.8s ease-out both",
        "rise-delayed": "rise 0.8s ease-out 0.15s both",
        "rise-late": "rise 0.8s ease-out 0.3s both",
        drift: "drift 8s ease-in-out infinite",
        draw: "draw 1.6s ease-out 0.4s both",
      },
    },
  },
  plugins: [],
};
