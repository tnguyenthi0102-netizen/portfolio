import type { Config } from 'tailwindcss'
import { themeConfig } from './src/theme'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './src/**/*.css'],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
      },
      animation: {
        wave: 'wave 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
