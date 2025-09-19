/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parchment': '#FDF6E3',
        'canvas': '#4F4F4F',
        'charcoal': '#36454F',
        'ink': '#708090',
        'verdigris': '#40B5A1',
        'sienna': '#A0522D',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        'mono': ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'sharp': '4px 4px 0px 0px rgba(112, 128, 144, 0.5)',
        'sharp-sm': '2px 2px 0px 0px rgba(112, 128, 144, 0.5)',
        'sharp-inset': 'inset 3px 3px 2px 0px rgba(54, 69, 79, 0.4)',
      },
      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.770, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}