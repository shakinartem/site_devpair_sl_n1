/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f4ede3',
        sand: '#e4d4be',
        taupe: '#c6b29a',
        graphite: '#1f1a17',
        charcoal: '#2b2420',
        bronze: '#b89466'
      },
      boxShadow: {
        luxury: '0 28px 90px rgba(31, 26, 23, 0.11)'
      }
    }
  },
  plugins: []
};
