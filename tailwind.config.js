/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': "linear-gradient(to right, #8B5CF6, #3B82F6)",
        'gradient-primary-hover': "linear-gradient(to right, #7C3AED, #2563EB)",
      },
      colors: {
        'symbol-primary': "#F39E13",
      }
    },
  },
  plugins: [],
} 