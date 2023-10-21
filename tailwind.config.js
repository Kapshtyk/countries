/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        singleCountryView: '1210px'
      },
      maxHeight: {
        'screen-without-header': 'calc(100vh - 80px)'
      },
      keyframes: {
        appear: {
          '0%': { width: 0 },
          '100%': { width: '100%' }
        },
        mobMenu: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        underline: 'appear 0.5s linear forwards',
        mobMenu: 'mobMenu 0.2s linear forwards',
        pingOnce: 'ping 0.5s linear forwards'
      },
      colors: {
        main: {
          100: 'rgb(var(--main-color-100) / <alpha-value>)',
          200: 'rgb(var(--main-color-200) / <alpha-value>)',
          300: 'rgb(var(--main-color-300) / <alpha-value>)',
          400: 'rgb(var(--main-color-400) / <alpha-value>)',
          500: 'rgb(var(--main-color-500) / <alpha-value>)'
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        additional: {
          100: 'rgb(var(--additional-color-100) / <alpha-value>)',
          200: 'rgb(var(--additional-color-200) / <alpha-value>)',
          400: 'rgb(var(--additional-color-400) / <alpha-value>)'
        },
        error: {
          500: 'rgb(var(--error-color-500) / <alpha-value>)'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
