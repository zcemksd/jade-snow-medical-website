/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'jade': {
          DEFAULT: '#0097b2',
          50: '#e6f7fa',
          100: '#cceff5',
          200: '#99dfeb',
          300: '#66cfe1',
          400: '#33bfd7',
          500: '#0097b2',  // Your main brand color
          600: '#00798e',
          700: '#005b6b',
          800: '#003d47',
          900: '#001f24',
        }
      }
    },
  },
  plugins: [],
}