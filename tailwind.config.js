/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3fb",
          100: "#e9e3f7",
          500: "#7c5cff", // premium light purple
        },
      },
      backdropBlur: {
        xs: "4px",
        sm: "6px",
        md: "12px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        glass: "0 8px 30px rgba(45, 30, 80, 0.12)", // soft premium shadow
      },
    },
  },
  plugins: [],
};
