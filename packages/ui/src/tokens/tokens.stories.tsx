import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { tokens, colorPrimary, colorNeutral, colorSuccess, colorWarning, colorDanger, colorInfo } from '@acme/ui';

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const Swatch = ({ label, scale }: { label: string; scale: Record<number, string> }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <p style={{ margin: '0 0 8px', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'system-ui' }}>
      {label}
    </p>
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {SCALES.map((step) => (
        <div key={step} title={`${label}-${step}: ${scale[step]}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: scale[step], border: '1px solid rgba(0,0,0,0.08)' }} />
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#666' }}>{step}</span>
        </div>
      ))}
    </div>
  </div>
);

const TokensPalette = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', fontFamily: 'system-ui' }}>
    <h2 style={{ margin: '0 0 8px' }}>🎨 Design Token Colour Palettes</h2>
    <Swatch label="primary" scale={colorPrimary} />
    <Swatch label="neutral" scale={colorNeutral} />
    <Swatch label="success" scale={colorSuccess} />
    <Swatch label="warning" scale={colorWarning} />
    <Swatch label="danger" scale={colorDanger} />
    <Swatch label="info" scale={colorInfo} />
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colour Palettes',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'All colour palettes (50–900 scale) defined in the design token system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  render: () => <TokensPalette />,
};
