import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Email address',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
export const Required: Story = { args: { required: true, children: 'Password' } };
export const Disabled: Story = { args: { disabled: true, children: 'Disabled field' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Label>Default Label</Label>
      <Label required>Required Label</Label>
      <Label disabled>Disabled Label</Label>
      <Label required disabled>Required + Disabled</Label>
    </div>
  ),
};
