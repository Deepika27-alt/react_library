import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'subtle', 'outline'] },
    color: { control: 'select', options: ['success', 'warning', 'danger', 'info', 'neutral'] },
  },
  args: { children: 'Badge' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => {
    const colors = ['success', 'warning', 'danger', 'info', 'neutral'] as const;
    const variants = ['solid', 'subtle', 'outline'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {variants.map((v) => (
          <div key={v} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ width: 60, fontSize: 12, color: '#888' }}>{v}</span>
            {colors.map((c) => (
              <Badge key={`${v}-${c}`} variant={v} color={c}>
                {c}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
