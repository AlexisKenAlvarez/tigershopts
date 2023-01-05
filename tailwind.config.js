/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      textFillColor: theme => theme('borderColor'),
      textStrokeColor: theme => theme('borderColor'),
      textStrokeWidth: theme => theme('borderWidth'),
      paintOrder: {
        'fsm': { paintOrder: 'fill stroke markers' },
        'fms': { paintOrder: 'fill markers stroke' },
        'sfm': { paintOrder: 'stroke fill markers' },
        'smf': { paintOrder: 'stroke markers fill' },
        'mfs': { paintOrder: 'markers fill stroke' },
        'msf': { paintOrder: 'markers stroke fill' },
      },

      letterSpacing: {
        verytight: '-0.5rem',
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
        widest: '.25em',
      },

      variants: { // all the following default to ['responsive']
        textFillColor: ['responsive'],
        textStrokeColor: ['responsive'],
        textStrokeWidth: ['responsive'],
        paintOrder: ['responsive'],
      },

      fontFamily: {
        'inter': ['Inter'],
        'poppins': ['Poppins'],
        'raleway': ['Raleway']
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
      },
      boxShadow: {
        customBorder: '10px 10px 0px 0px rgba(0,120,41,1)'
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwindcss-text-fill-stroke')(), // no options to configure
  ],
}
