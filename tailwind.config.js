/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2DC653",
        "hover-color": "#25A244",
        "border-color": "#383838",
        "background-contain-color": "#383838",
        "background-cards-color": "#202021",
        "background-color": "#1E1E1E",
        "background-container-color": "#1E1E1E",
      },
      boxShadow: {
        "card-shadow": "0px 0px 4px 2px rgb(17, 17, 17, 0.25)",
      }
    },
  },
  plugins: [],
}