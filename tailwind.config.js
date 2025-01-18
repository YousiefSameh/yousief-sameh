/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary and Hover Colors
        "primary-color": "#2DC653",
        "hover-color": "#25A244",

        // Dark Mode Colors
        "dark-background-color": "#1E1E1E",
        "dark-border-color": "#383838",
        "dark-card-color": "#202021",
        "dark-container-color": "#1E1E1E",

        // Light Mode Colors
        "light-background-color": "#ffffff",
        "light-border-color": "#E5E5E5",
        "light-card-color": "#F9F9F9",
        "light-container-color": "#F3F3F3",
      },
      boxShadow: {
        "card-shadow": "0px 0px 4px 2px rgb(17, 17, 17, 0.25)",
      },
      fontFamily: {
        "tajawal": ["Tajawal", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
};
