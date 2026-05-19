import * as React from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const labelVariants = cva(
  [
    'acme-label',
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  {
    variants: {
      disabled: {
        true: 'acme-label--disabled opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root>,
    VariantProps<typeof labelVariants> {
  /** Show a red asterisk to indicate required field. */
  required?: boolean;
  /** Visually disable the label. */
  disabled?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Label = React.forwardRef<
  React.ElementRef<typeof RadixLabel.Root>,
  LabelProps
>(({ className, required, disabled = false, children, ...props }, ref) => (
  <RadixLabel.Root
    ref={ref}
    className={cn(labelVariants({ disabled: disabled || undefined }), className)}
    {...props}
  >
    {children}
    {required && (
      <span className="acme-label-asterisk ml-0.5 text-danger-500" aria-hidden="true">
        *
      </span>
    )}
  </RadixLabel.Root>
));

Label.displayName = 'Label';
