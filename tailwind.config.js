/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.html", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 25px 50px -12px rgba(13,16,45,.1), 0px 12px 24px 0px rgba(13,16,45,.1)',
      },
      borderRadius: {
        '5xl': '5rem',
      },
    },
  },
  plugins: [    require('preline/plugin')],
};
