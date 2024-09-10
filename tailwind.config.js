/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to right, #7065F0, rgba(64, 58, 138, 0.7))",
      },
    },
  },
  plugins: [],
};
