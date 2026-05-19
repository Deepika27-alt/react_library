import { render, screen, fireEvent } from '@testing-library/react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  modalContentVariants,
} from './Modal';

describe('Modal', () => {
  it('renders trigger and does not show content until opened', () => {
    render(
      <Modal>
        <ModalTrigger>
          <button>Open</button>
        </ModalTrigger>
        <ModalContent>
          <ModalBody>Modal content</ModalBody>
        </ModalContent>
      </Modal>,
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('opens when trigger is clicked', () => {
    render(
      <Modal>
        <ModalTrigger>
          <button>Open</button>
        </ModalTrigger>
        <ModalContent>
          <ModalBody>Modal content</ModalBody>
        </ModalContent>
      </Modal>,
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders all compound sub-components', () => {
    render(
      <Modal defaultOpen>
        <ModalContent showClose={false}>
          <ModalHeader data-testid="header">
            <ModalTitle>Title</ModalTitle>
            <ModalDescription>Description</ModalDescription>
          </ModalHeader>
          <ModalBody data-testid="body">Body</ModalBody>
          <ModalFooter data-testid="footer">Footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>,
    );

    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('hides close button when showClose=false', () => {
    render(
      <Modal defaultOpen>
        <ModalContent showClose={false}>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>,
    );

    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });
});

describe('modalContentVariants', () => {
  it('generates size classes', () => {
    expect(modalContentVariants({ size: 'sm' })).toContain('acme-modal--sm');
    expect(modalContentVariants({ size: 'md' })).toContain('acme-modal--md');
    expect(modalContentVariants({ size: 'lg' })).toContain('acme-modal--lg');
    expect(modalContentVariants({ size: 'xl' })).toContain('acme-modal--xl');
    expect(modalContentVariants({ size: 'fullscreen' })).toContain('acme-modal--fullscreen');
  });

  it('defaults to md size', () => {
    expect(modalContentVariants()).toContain('acme-modal--md');
  });
});
