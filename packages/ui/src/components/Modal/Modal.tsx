import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── Close icon ───────────────────────────────────────────────────────────────
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Content size variants ────────────────────────────────────────────────────
export const modalContentVariants = cva(
  [
    'acme-modal-content',
    'fixed z-50',
    'bg-white rounded-lg shadow-xl',
    'flex flex-col',
    'focus:outline-none',
    // CSS-only enter animation
    'data-[state=open]:animate-modal-in',
    // CSS-only exit animation
    'data-[state=closed]:animate-modal-out',
  ],
  {
    variants: {
      size: {
        sm: 'acme-modal--sm w-full max-w-sm max-h-[85vh]',
        md: 'acme-modal--md w-full max-w-lg max-h-[85vh]',
        lg: 'acme-modal--lg w-full max-w-2xl max-h-[85vh]',
        xl: 'acme-modal--xl w-full max-w-4xl max-h-[90vh]',
        fullscreen: 'acme-modal--fullscreen w-screen h-screen max-w-none max-h-none rounded-none',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export type ModalSize = NonNullable<VariantProps<typeof modalContentVariants>['size']>;

export interface ModalProps extends RadixDialog.DialogProps {}
export interface ModalTriggerProps extends RadixDialog.DialogTriggerProps {}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof modalContentVariants> {
  /** Show the close button. @default true */
  showClose?: boolean;
  /** Container element to portal into. */
  container?: HTMLElement;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ModalTitleProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Title> {}
export interface ModalDescriptionProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Description> {}

// ── Modal Root ───────────────────────────────────────────────────────────────
export const Modal: React.FC<ModalProps> = (props) => (
  <RadixDialog.Root {...props} />
);
Modal.displayName = 'Modal';

// ── Trigger ──────────────────────────────────────────────────────────────────
export const ModalTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Trigger>,
  ModalTriggerProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Trigger ref={ref} className={className} {...props} />
));
ModalTrigger.displayName = 'ModalTrigger';

// ── Overlay ──────────────────────────────────────────────────────────────────
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      'acme-modal-overlay',
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-overlay-in',
      'data-[state=closed]:animate-overlay-out',
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = 'ModalOverlay';

// ── Content ──────────────────────────────────────────────────────────────────
export const ModalContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  ModalContentProps
>(({ className, size, showClose = true, container, children, ...props }, ref) => (
  <RadixDialog.Portal container={container}>
    <ModalOverlay />
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <RadixDialog.Content
        ref={ref}
        className={cn(modalContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            className={cn(
              'acme-modal-close',
              'absolute top-4 right-4',
              'inline-flex items-center justify-center',
              'rounded-sm p-1',
              'text-neutral-400 hover:text-neutral-600',
              'transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
            )}
            aria-label="Close"
          >
            <CloseIcon />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </div>
  </RadixDialog.Portal>
));
ModalContent.displayName = 'ModalContent';

// ── Header ───────────────────────────────────────────────────────────────────
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('acme-modal-header', 'px-6 pt-6 pb-2', className)}
      {...props}
    />
  ),
);
ModalHeader.displayName = 'ModalHeader';

// ── Body ─────────────────────────────────────────────────────────────────────
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('acme-modal-body', 'px-6 py-4 overflow-y-auto flex-1', className)}
      {...props}
    />
  ),
);
ModalBody.displayName = 'ModalBody';

// ── Footer ───────────────────────────────────────────────────────────────────
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'acme-modal-footer',
        'px-6 pb-6 pt-2',
        'flex items-center justify-end gap-2',
        'border-t border-neutral-100',
        className,
      )}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'ModalFooter';

// ── Title ────────────────────────────────────────────────────────────────────
export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn('acme-modal-title', 'text-lg font-semibold text-neutral-900', className)}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

// ── Description ──────────────────────────────────────────────────────────────
export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('acme-modal-description', 'text-sm text-neutral-500 mt-1', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';
