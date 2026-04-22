/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0dccf2",
        secondary: "#a855f7",
        "background-dark": "#111718",
        "surface-dark": "#1a2325",
        "accent-red": "#ff4d4d",
        "accent-green": "#0bda54",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}