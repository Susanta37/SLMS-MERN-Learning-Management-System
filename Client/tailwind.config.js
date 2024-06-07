/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      transitionDelay: {
        '0': '0ms',
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      colors: {
        customColor: 'rgb(41, 48, 59)', // Define custom color with your RGB values
      },
    },
    fontFamily: {
      'italianno': ['"Italianno"', 'cursive']
    }
  },
  plugins: [],
}

