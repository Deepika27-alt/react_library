import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    placeholder: 'Enter text…',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = { args: { variant: 'error', placeholder: 'Invalid input' } };
export const Success: Story = { args: { variant: 'success', placeholder: 'Valid input' } };

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const WithLeftElement: Story = {
  args: {
    leftElement: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      </svg>
    ),
    placeholder: 'Search…',
  },
};

export const WithRightElement: Story = {
  args: {
    rightElement: <span style={{ fontSize: '0.75rem', color: 'var(--ui-color-neutral-400)' }}>✓</span>,
    variant: 'success',
    placeholder: 'Verified',
  },
};

export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 320 }}>
      <Input variant="default" placeholder="Default" />
      <Input variant="error" placeholder="Error state" />
      <Input variant="success" placeholder="Success state" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
};
