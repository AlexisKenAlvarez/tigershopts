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
        redError: '#C3252E',
        redLight: '#FCE3E4',
        redNew: '#E12D3C',
        maroonText: '#850008',
        cancel: '#627D98',
        heroOrange: '#EA9801',
        lightg: '#40C96D'
      },
      boxShadow: {
        customBorder: '10px 10px 0px 0px rgba(0,120,41,1)',
        customInset: '0px -120px 101px 0px rgba(0,0,0,0.75) inset',
        imageInset: '0px 61px 204 px -11px rgba(0,0,0,0.75) inset'
      },

      backgroundImage: {
        "gradientGreen": "url('https://ik.imagekit.io/efpqj5mis/GradientBg_EEtP0iRJK.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1673331587114')"
      },
      screens: {
        '3xl': '1800px'
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('tailwindcss-text-fill-stroke')(), // no options to configure
    require('@tailwindcss/line-clamp'),
  ],
}
