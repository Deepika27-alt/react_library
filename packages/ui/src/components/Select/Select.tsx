import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── Icons ────────────────────────────────────────────────────────────────────
const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12 10l-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11.5 3.5L5.25 9.75 2.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Trigger CVA ──────────────────────────────────────────────────────────────
export const selectTriggerVariants = cva(
  [
    'acme-select-trigger',
    'inline-flex items-center justify-between',
    'rounded-md border bg-transparent',
    'text-sm text-neutral-900 placeholder:text-neutral-400',
    'transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&>span]:line-clamp-1',
  ],
  {
    variants: {
      variant: {
        default: [
          'acme-select-trigger--default',
          'border-neutral-300',
          'focus:ring-primary-500',
        ],
        error: [
          'acme-select-trigger--error',
          'border-danger-500',
          'focus:ring-danger-500',
        ],
      },
      size: {
        sm: 'h-8 px-2.5 gap-1',
        md: 'h-10 px-3 gap-2',
        lg: 'h-12 px-4 gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

// ── Select (Root) ────────────────────────────────────────────────────────────
export const Select = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;

// ── SelectTrigger ────────────────────────────────────────────────────────────
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <ChevronDown className="shrink-0 text-neutral-400" />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));

SelectTrigger.displayName = 'SelectTrigger';

// ── SelectContent ────────────────────────────────────────────────────────────
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {}

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        'acme-select-content',
        'relative z-50 max-h-72 min-w-[8rem] overflow-hidden',
        'rounded-md border border-neutral-200 bg-white shadow-md',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <ChevronUp className="text-neutral-400" />
      </RadixSelect.ScrollUpButton>
      <RadixSelect.Viewport
        className={cn(
          'p-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </RadixSelect.Viewport>
      <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <ChevronDown className="text-neutral-400" />
      </RadixSelect.ScrollDownButton>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));

SelectContent.displayName = 'SelectContent';

// ── SelectItem ───────────────────────────────────────────────────────────────
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {}

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'acme-select-item',
      'relative flex w-full cursor-default select-none items-center',
      'rounded-sm py-1.5 pl-8 pr-2 text-sm',
      'outline-none',
      'focus:bg-primary-50 focus:text-primary-900',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixSelect.ItemIndicator>
        <CheckMark />
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));

SelectItem.displayName = 'SelectItem';

// ── SelectGroup + SelectLabel ────────────────────────────────────────────────
export const SelectGroup = RadixSelect.Group;

export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Label> {}

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <RadixSelect.Label
    ref={ref}
    className={cn('acme-select-label px-2 py-1.5 text-xs font-semibold text-neutral-500', className)}
    {...props}
  />
));

SelectLabel.displayName = 'SelectLabel';

// ── SelectSeparator ──────────────────────────────────────────────────────────
export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn('acme-select-separator -mx-1 my-1 h-px bg-neutral-100', className)}
    {...props}
  />
));

SelectSeparator.displayName = 'SelectSeparator';
