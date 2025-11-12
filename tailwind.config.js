/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { primary: "#2563eb" },
      fontFamily: { sans: ["Inter", "system-ui"] },
    },
  },
  plugins: [],
};
