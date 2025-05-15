/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        orchid: '#DA70D6',
        'dark-rose': '#1a001a',
        'rose-glow': '#ff8ed6',
        rose: {
          200: '#fbb6ce',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
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
