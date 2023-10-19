/** @type {import('tailwindcss').Config} */
module.exports = {
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
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
