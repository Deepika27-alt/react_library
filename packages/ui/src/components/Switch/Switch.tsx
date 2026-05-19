import * as React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

export const switchVariants = cva(
  [
    'acme-switch',
    'peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-full border-2 border-transparent',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary-500',
    'data-[state=unchecked]:bg-neutral-200',
  ],
  {
    variants: {
      size: {
        sm: 'acme-switch--sm h-5 w-9',
        md: 'acme-switch--md h-6 w-11',
        lg: 'acme-switch--lg h-7 w-[3.25rem]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const switchThumbVariants = cva(
  [
    'acme-switch-thumb',
    'pointer-events-none block rounded-full bg-white shadow-sm ring-0',
    'transition-transform',
    'data-[state=unchecked]:translate-x-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface SwitchProps
  extends RadixSwitch.SwitchProps,
    VariantProps<typeof switchVariants> {}

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(switchVariants({ size }), className)}
    {...props}
  >
    <RadixSwitch.Thumb className={cn(switchThumbVariants({ size }))} />
  </RadixSwitch.Root>
));

Switch.displayName = 'Switch';
