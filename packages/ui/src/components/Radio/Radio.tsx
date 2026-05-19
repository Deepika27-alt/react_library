import * as React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── RadioGroup CVA ───────────────────────────────────────────────────────────
export const radioGroupVariants = cva(['acme-radio-group flex gap-2'], {
  variants: {
    orientation: {
      horizontal: 'acme-radio-group--horizontal flex-row',
      vertical: 'acme-radio-group--vertical flex-col',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

// ── RadioItem CVA ────────────────────────────────────────────────────────────
export const radioItemVariants = cva(
  [
    'acme-radio',
    'peer inline-flex shrink-0 items-center justify-center',
    'rounded-full border',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-primary-500',
    'data-[state=unchecked]:border-neutral-300',
  ],
  {
    variants: {
      size: {
        sm: 'acme-radio--sm h-4 w-4',
        md: 'acme-radio--md h-5 w-5',
        lg: 'acme-radio--lg h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ── RadioGroup Types ─────────────────────────────────────────────────────────
export interface RadioGroupProps
  extends Omit<RadixRadioGroup.RadioGroupProps, 'orientation'>,
    VariantProps<typeof radioGroupVariants> {}

// ── RadioGroup Component ─────────────────────────────────────────────────────
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => (
  <RadixRadioGroup.Root
    ref={ref}
    className={cn(radioGroupVariants({ orientation }), className)}
    orientation={orientation ?? 'vertical'}
    {...props}
  />
));

RadioGroup.displayName = 'RadioGroup';

// ── RadioGroupItem Types ─────────────────────────────────────────────────────
export interface RadioGroupItemProps
  extends RadixRadioGroup.RadioGroupItemProps,
    VariantProps<typeof radioItemVariants> {}

// ── RadioGroupItem Component ─────────────────────────────────────────────────
export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  RadioGroupItemProps
>(({ className, size, children, ...props }, ref) => (
  <RadixRadioGroup.Item
    ref={ref}
    className={cn(radioItemVariants({ size }), className)}
    {...props}
  >
    <RadixRadioGroup.Indicator className="flex items-center justify-center">
      <span className="block h-2.5 w-2.5 rounded-full bg-primary-500" />
    </RadixRadioGroup.Indicator>
  </RadixRadioGroup.Item>
));

RadioGroupItem.displayName = 'RadioGroupItem';
