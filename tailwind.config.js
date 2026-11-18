/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#486581',
          600: '#334E68',
          700: '#243B53',
          800: '#1E3E62',
          850: '#10223A',
          900: '#0B192C', // Signature deep navy
          950: '#060E18',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FFF9E6',
          200: '#FFF1BF',
          300: '#FFE58F',
          400: '#FFD666',
          500: '#F59E0B',
          600: '#D4AF37', // Metallic gold
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          metallic: '#D4AF37',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
