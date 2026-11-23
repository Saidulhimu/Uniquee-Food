/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-latte': {
          DEFAULT: '#FFF8E7',
          light: '#FFFCF5',
          dark: '#F7EED6',
        },
        'mocha-cream': {
          DEFAULT: '#E8D8C3',
          dark: '#D8C3A5',
          light: '#F4ECE1',
        },
        'deep-burgundy': {
          DEFAULT: '#5C162E',
          dark: '#4A0E22',
          light: '#7A2240',
          hover: '#3F0B1C',
        },
        'organic-leaf': {
          DEFAULT: '#2E5A36',
          light: '#42784D',
          dark: '#1F3F25',
          soft: '#EAF3EC',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        bengali: ['Hind Siliguri', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 10px 30px -10px rgba(92, 22, 46, 0.1)',
        'organic-lg': '0 20px 40px -15px rgba(92, 22, 46, 0.15)',
        'glass': '0 8px 32px 0 rgba(74, 14, 34, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
