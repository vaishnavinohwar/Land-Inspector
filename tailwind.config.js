/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Include files in the app directory (if using Next.js app router)
  ],
  theme: {
    extend: {
      colors: {
        primary: "#121212", // Black
        secondary: "#BB86FC", // Purple
        accent: "#03DAC5", // Teal
        background: "#1F1F1F", // Dark Gray
        text: "#FFFFFF", // White
      },
    },
  },
  plugins: [],
};
