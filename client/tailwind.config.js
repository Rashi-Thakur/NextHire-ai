/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(59,130,246,0.22) 50%, rgba(16,185,129,0.18) 100%)",
      },
    },
  },
  plugins: [],
};
