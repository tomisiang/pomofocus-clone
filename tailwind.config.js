/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pomodoro: {
          red: 'rgb(186, 73, 73)',
          blue: 'rgb(57, 112, 151)',
          green: 'rgb(56, 133, 138)',
          gray: 'rgb(223, 223, 223)',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        '3d': 'rgb(235, 235, 235) 0px 6px 0px',
        'est-button': 'rgba(0, 0, 0, 0.2) 0px 2px 2px',
      },
    },
  },
  plugins: [],
}
