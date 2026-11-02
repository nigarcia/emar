/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#FAF8F5',
          sand: '#E8E2D9',
          beige: '#D9CEBD',
          brown: '#5C4033',
          chocolate: '#3D2A21',
          gold: '#C5A059',
          charcoal: '#1A1A1A'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
