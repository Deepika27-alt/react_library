const { resolve } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Scan all stories and component source files in packages/ui
    resolve(__dirname, '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'),
    // Scan storybook internal items if any
    resolve(__dirname, './.storybook/**/*.{js,ts,jsx,tsx}'),
  ],
  presets: [
    // Inherit the design tokens theme mapping
    require('../../packages/ui/tailwind.preset.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
