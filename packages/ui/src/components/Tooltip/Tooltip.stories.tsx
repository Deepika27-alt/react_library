import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Complex/Tooltip',
  component: Tooltip,
  decorators: [
    (Story: any) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    openDelay: { control: 'number' },
  },
  args: {
    content: 'This is a tooltip helper text.',
    side: 'top',
    align: 'center',
    openDelay: 200,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args: any) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Tooltip {...args}>
        <Button variant="secondary">Hover Over Me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '4rem' }}>
      <Tooltip content="Tooltip on Left" side="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>

      <Tooltip content="Tooltip on Top" side="top">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>

      <Tooltip content="Tooltip on Bottom" side="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>

      <Tooltip content="Tooltip on Right" side="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};
