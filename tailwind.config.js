/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        laptop: "949px",
      },
    },
  },
  plugins: [require("daisyui")],
};
