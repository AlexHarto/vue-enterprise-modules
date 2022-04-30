import { defineConfig } from 'windicss/helpers';

const withOpacityValue = (variable: string) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
};

const buildSet = (
  variable: string,
  variant: string | undefined = undefined
) => {
  const variantWithDash = variant ? '-' + variant : '';
  return {
    [`bg${variantWithDash}`]: withOpacityValue(
      `--color-${variable}-bg${variantWithDash}`
    ),
    [`text${variantWithDash}`]: withOpacityValue(
      `--color-${variable}-text${variantWithDash}`
    ),
    [`border${variantWithDash}`]: withOpacityValue(
      `--color-${variable}-border${variantWithDash}`
    ),
  };
};

const buildFullSet = (variable: string) => {
  return {
    ...buildSet(variable),
    ...buildSet(variable, 'hover'),
    ...buildSet(variable, 'focus'),
    ...buildSet(variable, 'active'),
  };
};

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
        base: {
          light: ({ opacityValue }) =>
            `hsl(var(--color-light) / ${opacityValue})`,
          dark: ({ opacityValue }) =>
            `hsl(var(--color-dark) / ${opacityValue})`,
        },
        info: buildSet('info'),
        warning: buildSet('warning'),
        error: buildSet('error'),
        primary: buildFullSet('primary'),
        secondary: buildFullSet('secondary'),
        section: {
          bg: ({ opacityValue }) =>
            `hsl(var(--color-hue) var(--color-section-bg-sl) / ${opacityValue})`,
          accent: ({ opacityValue }) =>
            `hsl(var(--color-hue) var(--color-section-accent-sl) / ${opacityValue})`,
          text: ({ opacityValue }) =>
            `hsl(var(--color-hue) var(--color-section-text-sl) / ${opacityValue})`,
          border: ({ opacityValue }) =>
            `hsl(var(--color-hue) var(--color-section-border-sl) / ${opacityValue})`,
        },
      },
    },
  },
  plugins: [],
});
