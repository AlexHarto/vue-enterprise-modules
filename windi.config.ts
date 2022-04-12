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
          bg: '#d1ecf1',
          text: '#0c5460',
          border: '#bee5eb',
        },
        warning: {
          bg: '#fff3cd',
          text: '#856404',
          border: '#ffeeba',
        },
        error: {
          bg: '#f8d7da',
          text: '#721c24',
          border: '#f5c6cb',
        },
      },
    },
  },
  plugins: [],
});
