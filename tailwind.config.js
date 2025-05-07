/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          orchid: '#DA70D6',
          gold: '#FFD700',
          'dark-rose': '#1a001a',
          'rose-glow': '#ff8ed6',
        },
        fontFamily: {
          serif: ['Playfair Display', 'serif'],
        },
        boxShadow: {
          glow: '0 0 20px gold',
        },
        backgroundImage: {
          'black-orchid': 'linear-gradient(135deg, #0d0d0d, #1a001a)',
        },
      },
    },
    plugins: [],
  };
  