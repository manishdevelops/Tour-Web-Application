/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width: {
        'custom-256': 'calc(100vw - 270px)',
        'custom-1rem': 'calc(100vw - 6.5rem)',
      },
    },
  },
  plugins: [],
}

