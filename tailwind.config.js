/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#060816",
        cyan: "#59f3ff",
        magenta: "#ff4fd8",
        lime: "#76ff9d",
        gold: "#f9d66b",
        panel: "#0a1129"
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 20px rgba(89, 243, 255, 0.25)",
        magenta: "0 0 24px rgba(255, 79, 216, 0.22)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(89,243,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,79,216,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
