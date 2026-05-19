import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme } from '@acme/ui';

const ThemeSwitcher = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div style={{ fontFamily: 'system-ui', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ margin: 0 }}>ThemeProvider Demo</h2>
      <p>
        <strong>theme:</strong> {theme} &nbsp;|&nbsp; <strong>resolvedTheme:</strong>{' '}
        {resolvedTheme}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['light', 'dark', 'system'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: `2px solid ${theme === t ? '#3b82f6' : '#e2e8f0'}`,
              background: theme === t ? '#3b82f6' : 'transparent',
              color: theme === t ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Provides theme context (light/dark/system) and injects CSS custom properties. Use `useTheme()` to read and update the active theme.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  ),
};

export const WithBrandOverride: Story = {
  render: () => (
    <ThemeProvider
      theme="light"
      tokens={{ color: { primary: { 500: 'hsl(280, 70%, 50%)' } } }}
    >
      <ThemeSwitcher />
    </ThemeProvider>
  ),
};
