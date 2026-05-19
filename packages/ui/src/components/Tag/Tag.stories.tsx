import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { children: 'Tag' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const Dismissible: Story = {
  args: { children: 'Removable', onRemove: () => alert('Removed!') },
};

export const WithIcon: Story = {
  args: {
    children: 'React',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const DismissibleWithIcon: Story = {
  args: {
    children: 'TypeScript',
    onRemove: () => alert('Removed!'),
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <rect width="12" height="12" rx="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
};
