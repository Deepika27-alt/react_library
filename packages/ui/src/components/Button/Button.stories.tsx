import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Primary (default) ────────────────────────────────────────────────────────
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

// ── Secondary ────────────────────────────────────────────────────────────────
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

// ── Ghost ────────────────────────────────────────────────────────────────────
export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

// ── Danger ───────────────────────────────────────────────────────────────────
export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

// ── Link ─────────────────────────────────────────────────────────────────────
export const Link: Story = {
  args: { variant: 'link', children: 'Link Button' },
};

// ── Sizes ────────────────────────────────────────────────────────────────────
export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

// ── Loading ──────────────────────────────────────────────────────────────────
export const Loading: Story = {
  args: { loading: true, children: 'Saving…' },
};

// ── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

// ── With Icon ────────────────────────────────────────────────────────────────
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8 1v14M1 8h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Add Item
      </>
    ),
  },
};

// ── asChild (link) ───────────────────────────────────────────────────────────
export const AsChildLink: Story = {
  args: {
    asChild: true,
    children: <a href="#">I'm an anchor</a>,
  },
};

// ── All Variants Grid ────────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button loading variant="primary">Loading</Button>
        <Button loading variant="secondary">Loading</Button>
        <Button loading variant="danger">Loading</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Button disabled variant="primary">Disabled</Button>
        <Button disabled variant="secondary">Disabled</Button>
        <Button disabled variant="ghost">Disabled</Button>
      </div>
    </div>
  ),
};
