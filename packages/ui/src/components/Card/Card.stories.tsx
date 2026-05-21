import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Complex/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
  },
  args: {
    variant: 'elevated',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => (
    <Card {...args} className="max-w-md">
      <Card.Header>
        <h3 className="text-lg font-semibold">Elevated Card</h3>
        <p className="text-sm text-neutral-500">Subtext describing card contents</p>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-700">
          This is the card body. It provides detailed text, controls, or data.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Submit</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => (
    <Card {...args} className="max-w-md">
      <Card.Header>
        <h3 className="text-lg font-semibold">Outlined Card</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-700">
          This card has a subtle border instead of a shadow.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" size="sm" className="w-full">Action</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => (
    <Card {...args} className="max-w-md">
      <Card.Header>
        <h3 className="text-lg font-semibold">Filled Card</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-700">
          This card uses a background color fill instead of shadows or strong borders.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" size="sm" className="w-full">Action</Button>
      </Card.Footer>
    </Card>
  ),
};
