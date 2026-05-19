import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
} from './FormField';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Primitives/FormField',
  component: FormField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField fieldId="email">
      <FormFieldLabel>Email</FormFieldLabel>
      <FormFieldControl>
        <Input placeholder="you@example.com" />
      </FormFieldControl>
      <FormFieldDescription>We'll never share your email.</FormFieldDescription>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField fieldId="username" error="Username is already taken">
      <FormFieldLabel>Username</FormFieldLabel>
      <FormFieldControl>
        <Input variant="error" placeholder="johndoe" />
      </FormFieldControl>
      <FormFieldError />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField fieldId="password" required>
      <FormFieldLabel>Password</FormFieldLabel>
      <FormFieldControl>
        <Input type="password" placeholder="••••••••" />
      </FormFieldControl>
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField fieldId="bio" disabled>
      <FormFieldLabel>Bio</FormFieldLabel>
      <FormFieldControl>
        <Textarea placeholder="Tell us about yourself…" />
      </FormFieldControl>
    </FormField>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <FormField fieldId="name" required>
        <FormFieldLabel>Full Name</FormFieldLabel>
        <FormFieldControl>
          <Input placeholder="Jane Doe" />
        </FormFieldControl>
      </FormField>

      <FormField fieldId="email2" required error="Please enter a valid email">
        <FormFieldLabel>Email</FormFieldLabel>
        <FormFieldControl>
          <Input variant="error" placeholder="jane@example.com" />
        </FormFieldControl>
        <FormFieldError />
      </FormField>

      <FormField fieldId="notes">
        <FormFieldLabel>Notes</FormFieldLabel>
        <FormFieldControl>
          <Textarea placeholder="Optional notes…" />
        </FormFieldControl>
        <FormFieldDescription>Any additional context.</FormFieldDescription>
      </FormField>
    </div>
  ),
};
