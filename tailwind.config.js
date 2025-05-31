// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        pink: {
          200: '#FBB6CE',
          300: '#F687B3',
        },
        dark: {
          900: '#1a001a',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
