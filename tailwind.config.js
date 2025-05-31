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
      },
    },
  },
  plugins: [],
};
