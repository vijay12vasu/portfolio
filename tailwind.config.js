/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030305',
        surface: '#0a0a0f',
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: {
          DEFAULT: '#3b82f6',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          magenta: '#d946ef',
          green: '#10b981',
          amber: '#f59e0b',
        },
        text: {
          main: '#f8fafc',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
