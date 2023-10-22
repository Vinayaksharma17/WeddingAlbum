/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow: {
      "3xl": "10px 0px 20px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
}

