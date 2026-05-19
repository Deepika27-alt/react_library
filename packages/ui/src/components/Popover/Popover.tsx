import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

// ── Close icon ───────────────────────────────────────────────────────────────
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface PopoverProps extends RadixPopover.PopoverProps {}

export interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Trigger> {}

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Content> {
  /** Show a close button inside the popover. @default false */
  showClose?: boolean;
  /** Container element to portal into. */
  container?: HTMLElement;
}

export interface PopoverCloseProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Close> {}

// ── Popover Root (controlled + uncontrolled) ─────────────────────────────────
export const Popover: React.FC<PopoverProps> = (props) => (
  <RadixPopover.Root {...props} />
);
Popover.displayName = 'Popover';

// ── Trigger ──────────────────────────────────────────────────────────────────
export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Trigger>,
  PopoverTriggerProps
>(({ className, ...props }, ref) => (
  <RadixPopover.Trigger ref={ref} className={className} {...props} />
));
PopoverTrigger.displayName = 'PopoverTrigger';

// ── Anchor ───────────────────────────────────────────────────────────────────
export const PopoverAnchor = RadixPopover.Anchor;

// ── Content ──────────────────────────────────────────────────────────────────
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(({
  className,
  showClose = false,
  container,
  align = 'center',
  sideOffset = 8,
  children,
  ...props
}, ref) => (
  <RadixPopover.Portal container={container}>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'acme-popover-content',
        'z-50 min-w-[12rem] max-w-sm',
        'rounded-lg border border-neutral-200 bg-white p-4',
        'shadow-lg',
        'outline-none',
        // Animations
        'data-[state=open]:animate-popover-in',
        'data-[state=closed]:animate-popover-out',
        // Side-aware slide-in
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        className,
      )}
      {...props}
    >
      {children}
      {showClose && (
        <RadixPopover.Close
          className={cn(
            'acme-popover-close',
            'absolute top-3 right-3',
            'inline-flex items-center justify-center',
            'rounded-sm p-0.5',
            'text-neutral-400 hover:text-neutral-600',
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
          )}
          aria-label="Close"
        >
          <CloseIcon />
        </RadixPopover.Close>
      )}
      <RadixPopover.Arrow className="fill-white stroke-neutral-200 stroke-1" />
    </RadixPopover.Content>
  </RadixPopover.Portal>
));
PopoverContent.displayName = 'PopoverContent';

// ── Close ────────────────────────────────────────────────────────────────────
export const PopoverClose = RadixPopover.Close;
