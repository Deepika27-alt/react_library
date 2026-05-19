import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioGroup, RadioGroupItem } from './Radio';
import { Label } from '../Label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="a" id="h1" />
        <Label htmlFor="h1">A</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="b" id="h2" />
        <Label htmlFor="h2">B</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="c" id="h3" />
        <Label htmlFor="h3">C</Label>
      </div>
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: function ControlledRadio() {
    const [value, setValue] = React.useState('one');
    return (
      <div>
        <RadioGroup value={value} onValueChange={setValue}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="one" id="c1" />
            <Label htmlFor="c1">One</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RadioGroupItem value="two" id="c2" />
            <Label htmlFor="c2">Two</Label>
          </div>
        </RadioGroup>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Selected: {value}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="x" disabled>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="x" id="d1" />
        <Label htmlFor="d1" disabled>Disabled A</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <RadioGroupItem value="y" id="d2" />
        <Label htmlFor="d2" disabled>Disabled B</Label>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <RadioGroup defaultValue="s">
        <RadioGroupItem value="s" size="sm" />
      </RadioGroup>
      <RadioGroup defaultValue="m">
        <RadioGroupItem value="m" size="md" />
      </RadioGroup>
      <RadioGroup defaultValue="l">
        <RadioGroupItem value="l" size="lg" />
      </RadioGroup>
    </div>
  ),
};
