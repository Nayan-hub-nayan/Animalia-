const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "src/**/*.{js,jsx}", 
    "components/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        'custom-inset': 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
      },
    },
    
  },
  plugins: [require("tailwindcss-animate")],
}
