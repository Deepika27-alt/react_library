// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve from apps/storybook/.storybook/ → packages/ui/src
const uiSrc = resolve(__dirname, '../../../packages/ui/src');

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
    getAbsolutePath("@chromatic-com/storybook")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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

  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react()],
      resolve: {
        alias: {
          // Sub-path: @deepika27-alt/ui/styles
          '@deepika27-alt/ui/styles': resolve(__dirname, '../../../packages/ui/dist/tokens.css'),
          // Resolve @deepika27-alt/ui directly to source — no build step required
          '@deepika27-alt/ui': join(uiSrc, 'index.ts'),
          // Sub-path: @deepika27-alt/ui/tokens
          '@deepika27-alt/ui/tokens': join(uiSrc, 'tokens/index.ts'),
        },
      },
    });
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
