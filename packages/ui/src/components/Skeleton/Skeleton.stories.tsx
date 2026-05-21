import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SkeletonText, SkeletonCircle, SkeletonRect } from './Skeleton';

const meta: Meta<typeof SkeletonText> = {
  title: 'Complex/Skeleton',
  component: SkeletonText,
  tags: ['autodocs'],
};

export default meta;

export const Text: StoryObj<typeof SkeletonText> = {
  argTypes: {
    lines: { control: 'number' },
    lastLineWidth: { control: 'text' },
  },
  args: {
    lines: 3,
    lastLineWidth: '60%',
  },
  render: (args) => (
    <div className="w-80">
      <SkeletonText {...args} />
    </div>
  ),
};

export const Circle: StoryObj<typeof SkeletonCircle> = {
  render: () => <SkeletonCircle size={50} />,
};

export const Rect: StoryObj<typeof SkeletonRect> = {
  render: () => (
    <div className="w-80">
      <SkeletonRect width="100%" height="150px" />
    </div>
  ),
};

export const CombinedProfileCard: StoryObj = {
  render: () => (
    <div className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg max-w-sm">
      <SkeletonCircle size={48} />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonRect width="40%" height={16} />
        <SkeletonText lines={2} lastLineWidth="80%" />
      </div>
    </div>
  ),
};
