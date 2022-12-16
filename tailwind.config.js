/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter'],
      },

      colors: {
        orangeBg: '#fbba24',
        orangeText: '#FBBA24',
        greenBg: '#073F1A',
        inputBg: '#e2f3e7',
        greenHover: '#366345',
        greenButton: '#1B4E2C',
        greenSteps: '#023815',
        redError: '#C3252E'
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
