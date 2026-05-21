import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = {
  title: 'Complex/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="primary">Click Me</Button>
        </PopoverTrigger>
        <PopoverContent align="center" showClose={true}>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-sm text-neutral-900">Popover Content</h4>
            <p className="text-xs text-neutral-500">
              This is a standard popover triggered on click. It supports custom alignment, side offset, and close buttons.
            </p>
            <div className="flex justify-end mt-2">
              <PopoverClose asChild>
                <Button size="sm" variant="ghost">Got it</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', justifyItems: 'center', padding: '4rem' }}>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="center">
          <p className="text-xs text-neutral-700">Top placement content</p>
        </PopoverContent>
      </Popover>
      <div />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" align="center">
          <p className="text-xs text-neutral-700">Left placement content</p>
        </PopoverContent>
      </Popover>
      <div className="text-center font-semibold text-neutral-400 text-xs py-2">Click to see placement</div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" align="center">
          <p className="text-xs text-neutral-700">Right placement content</p>
        </PopoverContent>
      </Popover>

      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
          <p className="text-xs text-neutral-700">Bottom placement content</p>
        </PopoverContent>
      </Popover>
      <div />
    </div>
  ),
};
