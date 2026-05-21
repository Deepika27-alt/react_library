import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

const meta: Meta = {
  title: 'Complex/Toast',
  decorators: [
    (Story: any) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

const ToastPlayground: React.FC = () => {
  const toast = useToast();

  const handlePromise = () => {
    const action = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve('Successfully saved database changes!');
        } else {
          reject(new Error('Failed to connect to database.'));
        }
      }, 2000);
    });

    toast.promise(action, {
      loading: 'Saving database changes...',
      success: (data) => String(data),
      error: (err) => (err instanceof Error ? err.message : 'An error occurred'),
    });
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button variant="secondary" onClick={() => toast.success('Successfully uploaded photo!')}>
        Success Toast
      </Button>
      <Button variant="danger" onClick={() => toast.error('Failed to sync settings.', { description: 'Please check your connection.' })}>
        Error Toast
      </Button>
      <Button variant="ghost" onClick={() => toast.info('System update available in 10 minutes.')}>
        Info Toast
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('High CPU usage detected.')}>
        Warning Toast
      </Button>
      <Button variant="primary" onClick={handlePromise}>
        Promise (Loading) Toast
      </Button>
    </div>
  );
};

export const Playground: StoryObj = {
  render: () => <ToastPlayground />,
};
