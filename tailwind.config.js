/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        success: "#4BB543",
        failure: "#cc0000",
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ]
}