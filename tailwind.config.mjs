/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#E8DCCB',
        champagne: '#D6BFA2',
        espresso: '#201A17',
        ivory: '#FAF7F2',
        gold: '#BFA07A'
      },
      boxShadow: {
        luxury: '0 24px 80px rgba(32, 26, 23, 0.12)'
      }
    }
  },
  plugins: []
};
