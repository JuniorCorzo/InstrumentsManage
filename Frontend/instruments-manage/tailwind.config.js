/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{tsx,jsx,ts,js}"],
  theme: {
    extend: {
      borderWidth: {
        0: 0.5,
      },
    },
  },
  plugins: [],
};
