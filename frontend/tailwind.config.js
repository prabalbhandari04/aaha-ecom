module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      'primary': '#EEEEEE',
      'neutral': '#393E46',
      'secondary': '#222831',
      'sub': '#D1CECE',
      'disable': '#9E9E9E',
      'inverse': '#fff'
    },
    fontFamily: {
      'main': 'Quicksand',
      'secondary': 'Allura',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
