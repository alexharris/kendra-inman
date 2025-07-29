/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir', 'system-ui', 'sans-serif'],
      },
    },
  },
}
