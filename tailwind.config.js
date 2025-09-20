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
        // Original OneLink colors
        'parchment': '#FDF6E3',
        'canvas': '#4F4F4F',
        'charcoal': '#36454F',
        'ink': '#708090',
        'verdigris': '#40B5A1',
        'sienna': '#A0522D',

        // Ethereal Glass Theme
        'ether-bg': '#E8F1F2',
        'ether-card': 'rgba(255, 255, 255, 0.4)',
        'ether-text-dark': '#2C3E50',
        'ether-text-light': '#7F8C8D',
        'ether-accent': '#8E44AD',
        'ether-border': 'rgba(255, 255, 255, 0.6)',

        // Neo-Brutalist Canvas Theme
        'brutal-bg': '#222222',
        'brutal-surface': '#444444',
        'brutal-text-main': '#FFFFFF',
        'brutal-text-secondary': '#BBBBBB',
        'brutal-accent': '#FF6B6B',
        'brutal-border': '#888888',

        // Cosmic Drift Theme
        'cosmic-start': '#1A0033',
        'cosmic-mid': '#330066',
        'cosmic-end': '#00001A',
        'cosmic-text-light': '#E0E0FF',
        'cosmic-text-dark': '#B0B0CC',
        'cosmic-accent': '#00FFFF',
        'cosmic-card': 'rgba(25, 0, 50, 0.7)',

        // Art Deco Revival Theme
        'deco-bg': '#1E282D',
        'deco-surface': '#2F3E46',
        'deco-text-gold': '#DAA520',
        'deco-text-silver': '#C0C0C0',
        'deco-text-main': '#F5F5F5',
        'deco-accent-emerald': '#008080',
        'deco-accent-sapphire': '#0F4C81',

        // Zen Garden Theme
        'zen-bg': '#F4F4EB',
        'zen-surface': '#EAE7DC',
        'zen-text-dark': '#3C403D',
        'zen-text-muted': '#7D807A',
        'zen-accent-green': '#6B8E23',
        'zen-border': '#D8D4CA',
      },
      fontFamily: {
        // Original fonts
        'serif': ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        'mono': ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],

        // Ethereal Glass fonts
        'ether-display': ['"Montserrat"', 'sans-serif'],
        'ether-ui': ['"Roboto"', 'sans-serif'],

        // Neo-Brutalist fonts
        'brutal-display': ['"Anton"', 'sans-serif'],
        'brutal-ui': ['"Space Mono"', 'monospace'],

        // Cosmic Drift fonts
        'cosmic-display': ['"Orbitron"', 'sans-serif'],
        'cosmic-ui': ['"Fira Code"', 'monospace'],

        // Art Deco fonts
        'deco-display': ['"Cinzel Decorative"', 'serif'],
        'deco-ui': ['"Gothic A1"', 'sans-serif'],

        // Zen Garden fonts
        'zen-display': ['"Noto Serif JP"', 'serif'],
        'zen-ui': ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        // Original shadows
        'sharp': '4px 4px 0px 0px rgba(112, 128, 144, 0.5)',
        'sharp-sm': '2px 2px 0px 0px rgba(112, 128, 144, 0.5)',
        'sharp-inset': 'inset 3px 3px 2px 0px rgba(54, 69, 79, 0.4)',

        // Theme-specific shadows
        'ether-glow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'ether-accent-glow': '0 0 15px rgba(142, 68, 173, 0.5)',
        'brutal-sharp': '6px 6px 0px 0px #FF6B6B',
        'brutal-inset': 'inset 4px 4px 0px 0px #222222',
        'cosmic-glow': '0 0 25px rgba(0, 255, 255, 0.6)',
        'cosmic-inner-glow': 'inset 0 0 10px rgba(0, 255, 255, 0.3)',
        'deco-bevel': 'inset 2px 2px 5px rgba(255, 255, 255, 0.2), inset -2px -2px 5px rgba(0, 0, 0, 0.4)',
        'deco-frame': '8px 8px 0px 0px #DAA520',
        'zen-soft': '0 5px 15px rgba(0, 0, 0, 0.1)',
        'zen-inset-subtle': 'inset 1px 1px 3px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'brutal-none': '0px',
      },
      backdropBlur: {
        'glass': '10px',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.770, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}