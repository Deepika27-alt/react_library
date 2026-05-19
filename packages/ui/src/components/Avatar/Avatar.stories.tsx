import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=acme1',
    alt: 'User avatar',
    name: 'Jane Doe',
  },
};

export const WithInitials: Story = {
  args: { name: 'John Smith' },
};

export const Unknown: Story = {
  args: {},
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-link.example/img.jpg',
    name: 'Fallback User',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Avatar size="xs" name="A B" />
      <Avatar size="sm" name="C D" />
      <Avatar size="md" name="E F" />
      <Avatar size="lg" name="G H" />
      <Avatar size="xl" name="I J" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3} size="md">
      <Avatar src="https://i.pravatar.cc/150?u=a1" name="Alice" />
      <Avatar src="https://i.pravatar.cc/150?u=a2" name="Bob" />
      <Avatar src="https://i.pravatar.cc/150?u=a3" name="Charlie" />
      <Avatar src="https://i.pravatar.cc/150?u=a4" name="Diana" />
      <Avatar src="https://i.pravatar.cc/150?u=a5" name="Eve" />
    </AvatarGroup>
  ),
};

export const GroupNoOverflow: Story = {
  render: () => (
    <AvatarGroup max={10} size="sm">
      <Avatar name="Alpha" />
      <Avatar name="Beta" />
      <Avatar name="Gamma" />
    </AvatarGroup>
  ),
};
