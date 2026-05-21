import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stat } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Complex/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    label: 'Total Active Users',
    value: '12,483',
  },
};

export default meta;
type Story = StoryObj<typeof Stat>;

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14a6 6 0 0 0-12 0" />
    <circle cx="8" cy="5" r="3" />
  </svg>
);

export const Default: Story = {};

export const TrendUp: Story = {
  args: {
    label: 'Monthly Revenue',
    value: '$48,259.00',
    trend: {
      direction: 'up',
      value: '+14.2% from last month',
    },
  },
};

export const TrendDown: Story = {
  args: {
    label: 'Bounce Rate',
    value: '42.3%',
    trend: {
      direction: 'down',
      value: '-3.1% from last week',
    },
  },
};

export const WithIcon: Story = {
  args: {
    label: 'New Signups',
    value: '1,204',
    icon: <UserIcon />,
    trend: {
      direction: 'up',
      value: '+8.3% today',
    },
  },
};
