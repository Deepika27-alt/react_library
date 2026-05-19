import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Resolve from apps/storybook/.storybook/ → packages/ui/src
const uiSrc = path.resolve(__dirname, '../../../packages/ui/src');

const config: StorybookConfig = {
  stories: [
    '../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)',
    './src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-dark-mode',
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
      tsconfigPath: path.resolve(__dirname, '../../../packages/ui/tsconfig.json'),
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
          // Resolve @acme/ui directly to source — no build step required
          '@acme/ui': path.join(uiSrc, 'index.ts'),
          // Sub-path: @acme/ui/tokens
          '@acme/ui/tokens': path.join(uiSrc, 'tokens/index.ts'),
        },
      },
    });
  },
};

export default config;
