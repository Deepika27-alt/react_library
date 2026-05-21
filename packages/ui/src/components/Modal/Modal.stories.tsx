import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDescription } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Complex/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="primary">Open Modal</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This description explains what this modal represents.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-neutral-700">
            This is the body content of the modal. You can place forms, text, or any custom content here.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalTrigger asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </ModalTrigger>
          <Button variant="primary" size="sm">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'>('md');
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(['sm', 'md', 'lg', 'xl', 'fullscreen'] as const).map((s) => (
          <Button
            key={s}
            variant="secondary"
            onClick={() => {
              setSize(s);
              setOpen(true);
            }}
          >
            Size: {s.toUpperCase()}
          </Button>
        ))}

        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent size={size}>
            <ModalHeader>
              <ModalTitle>Modal Size: {size.toUpperCase()}</ModalTitle>
              <ModalDescription>
                This modal adapts to the size option chosen.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-neutral-700">
                You chose size: <strong>{size}</strong>.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  },
};
