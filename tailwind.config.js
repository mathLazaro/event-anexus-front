/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C2C54',       // dark indigo
        secondary: '#474787',     // deep purple-gray
        grayCool: '#C8CDDB',      // cool gray
        grayLight: '#E9ECF4',     // light gray
      },
    },
    screens: {
       // breakpoints padrão
       sm: '640px',
       md: '768px',
       lg: '1024px',
       xl: '1280px',
       // 👇 breakpoints por altura
       hsm: { raw: '(min-height: 500px)' },
       hmd: { raw: '(min-height: 680px)' },
       hlg: { raw: '(min-height: 800px)' },
       hxl: { raw: '(min-height: 1000px)' },
     },
  },
  plugins: [],
}

