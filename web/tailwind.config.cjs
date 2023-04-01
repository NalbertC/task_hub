/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      "2xl": 32,
    },
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        background: "#0d1016",
        back: "#060607",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
      flex: {
        2: "2 1 0",
        3: "3 1 0",
      },
    },
  },
  plugins: [],
};
