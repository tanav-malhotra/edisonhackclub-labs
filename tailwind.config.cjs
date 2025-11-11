/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0B1D3A",
          800: "#0F2A54",
          700: "#12356B",
          600: "#17478D",
          500: "#1B58AE",
          400: "#3A78CF",
          300: "#6A9BE3",
          200: "#A7C3F1",
          100: "#D8E5FA"
        },
        slateink: "#1A2332"
      }
    },
  },
  plugins: [],
};


