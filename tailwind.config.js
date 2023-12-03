/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",  
  ],
  theme: {
    extend: {
      backgroundColor: {
        'secondary': '#C683D7',
      },
      textColor: {
        'custom': '#FFC7C7',
      },
    },
  },
  plugins: [],
}

