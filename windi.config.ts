import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    // accepts globs and file paths relative to project root
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        info: {
          bg: '#D0E2F1',
          text: '#020F1B',
          border: '#B6D3EC',
        },
        warning: {
          bg: '#FFF2DB',
          text: '#2A1B00',
          border: '#F0DFC1',
        },
        error: {
          bg: '#FFDCD9',
          text: '#2A0300',
          border: '#F0C4C1',
        },
      },
    },
  },
  plugins: [],
});
