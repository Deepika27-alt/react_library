import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const inputVariants = cva(
  [
    'acme-input',
    'w-full rounded-md border bg-transparent',
    'text-neutral-900 placeholder:text-neutral-400',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'acme-input--default',
          'border-neutral-300',
          'focus-visible:ring-primary-500 focus-visible:border-primary-500',
        ],
        error: [
          'acme-input--error',
          'border-danger-500 text-danger-900',
          'focus-visible:ring-danger-500 focus-visible:border-danger-500',
        ],
        success: [
          'acme-input--success',
          'border-success-500',
          'focus-visible:ring-success-500 focus-visible:border-success-500',
        ],
      },
      size: {
        sm: 'acme-input--sm text-sm h-8 px-2.5',
        md: 'acme-input--md text-sm h-10 px-3',
        lg: 'acme-input--lg text-base h-12 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Element rendered on the left side of the input (icon, label, etc.). */
  leftElement?: React.ReactNode;
  /** Element rendered on the right side of the input (icon, button, etc.). */
  rightElement?: React.ReactNode;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftElement,
      rightElement,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const hasSlots = leftElement || rightElement;

    const inputElement = (
      <input
        ref={ref}
        type={type}
        className={cn(
          inputVariants({ variant, size }),
          leftElement && 'pl-10',
          rightElement && 'pr-10',
          !hasSlots && className,
        )}
        {...props}
      />
    );

    if (!hasSlots) return inputElement;

    return (
      <div
        className={cn('acme-input-wrapper relative inline-flex w-full items-center', className)}
      >
        {leftElement && (
          <span
            className="acme-input-left pointer-events-none absolute left-3 flex items-center text-neutral-400"
            data-testid="input-left-element"
          >
            {leftElement}
          </span>
        )}
        {inputElement}
        {rightElement && (
          <span
            className="acme-input-right absolute right-3 flex items-center text-neutral-400"
            data-testid="input-right-element"
          >
            {rightElement}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
