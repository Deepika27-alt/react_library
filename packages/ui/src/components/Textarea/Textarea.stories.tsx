import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'error', 'success'] },
    autoResize: { control: 'boolean' },
    showCounter: { control: 'boolean' },
  },
  args: {
    placeholder: 'Type something…',
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Error: Story = { args: { variant: 'error' } };
export const Success: Story = { args: { variant: 'success' } };

export const AutoResize: Story = {
  args: { autoResize: true, placeholder: "Start typing and I'll grow…" },
};

export const WithCounter: Story = {
  args: { showCounter: true, maxLength: 140, placeholder: 'Max 140 chars…' },
};

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 400 }}>
      <Textarea variant="default" placeholder="Default" />
      <Textarea variant="error" placeholder="Error state" />
      <Textarea variant="success" placeholder="Success state" />
      <Textarea autoResize placeholder="Auto-resize" />
      <Textarea showCounter maxLength={200} placeholder="With counter" />
      <Textarea disabled placeholder="Disabled" />
    </div>
  ),
};
