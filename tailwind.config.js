/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this is pointing to your source files
  theme: {
    extend: {
      fontFamily: {
        pathway: ["'Pathway Extreme'", "sans-serif"], // Add Pathway Extreme font
      },
    },
  },
  plugins: [],
}
