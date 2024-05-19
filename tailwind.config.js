/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html, js}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto Condensed', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/img/bg.png')"
      }
    },
  },
  plugins: [],
}

