import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const checkboxVariants = cva(
  [
    'acme-checkbox',
    'peer inline-flex shrink-0 items-center justify-center',
    'rounded border',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary-500 data-[state=checked]:text-white data-[state=checked]:border-primary-500',
    'data-[state=unchecked]:border-neutral-300 data-[state=unchecked]:bg-transparent',
  ],
  {
    variants: {
      size: {
        sm: 'acme-checkbox--sm h-4 w-4',
        md: 'acme-checkbox--md h-5 w-5',
        lg: 'acme-checkbox--lg h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ── Checkmark Icon ───────────────────────────────────────────────────────────
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface CheckboxProps
  extends Omit<RadixCheckbox.CheckboxProps, 'children'>,
    VariantProps<typeof checkboxVariants> {}

// ── Component ────────────────────────────────────────────────────────────────
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, size, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <RadixCheckbox.Indicator className="flex items-center justify-center">
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));

Checkbox.displayName = 'Checkbox';
