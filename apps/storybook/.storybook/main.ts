import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, join, resolve } from 'path';

// Resolve from apps/storybook/.storybook/ → packages/ui/src
const uiSrc = resolve(__dirname, '../../../packages/ui/src');

const config: StorybookConfig = {
  stories: [
    '../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Point tsc at the ui package source so it can read prop types
      tsconfigPath: resolve(__dirname, '../../../packages/ui/tsconfig.json'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react()],
      resolve: {
        alias: {
          // Resolve @deepika27-alt/ui directly to source — no build step required
          '@deepika27-alt/ui': join(uiSrc, 'index.ts'),
          // Sub-path: @deepika27-alt/ui/tokens
          '@deepika27-alt/ui/tokens': join(uiSrc, 'tokens/index.ts'),
        },
      },
    });
  },
};

export default config;
