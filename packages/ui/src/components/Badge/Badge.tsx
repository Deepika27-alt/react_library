import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

export const badgeVariants = cva(
  [
    'acme-badge',
    'inline-flex items-center',
    'rounded-full font-medium',
    'text-xs px-2.5 py-0.5',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        solid: 'acme-badge--solid',
        subtle: 'acme-badge--subtle',
        outline: 'acme-badge--outline border',
      },
      color: {
        success: '',
        warning: '',
        danger: '',
        info: '',
        neutral: '',
      },
    },
    compoundVariants: [
      // ── Solid ──
      { variant: 'solid', color: 'success', className: 'bg-success-500 text-white' },
      { variant: 'solid', color: 'warning', className: 'bg-warning-500 text-white' },
      { variant: 'solid', color: 'danger', className: 'bg-danger-500 text-white' },
      { variant: 'solid', color: 'info', className: 'bg-info-500 text-white' },
      { variant: 'solid', color: 'neutral', className: 'bg-neutral-500 text-white' },
      // ── Subtle ──
      { variant: 'subtle', color: 'success', className: 'bg-success-100 text-success-700' },
      { variant: 'subtle', color: 'warning', className: 'bg-warning-100 text-warning-700' },
      { variant: 'subtle', color: 'danger', className: 'bg-danger-100 text-danger-700' },
      { variant: 'subtle', color: 'info', className: 'bg-info-100 text-info-700' },
      { variant: 'subtle', color: 'neutral', className: 'bg-neutral-100 text-neutral-700' },
      // ── Outline ──
      { variant: 'outline', color: 'success', className: 'border-success-500 text-success-600 bg-transparent' },
      { variant: 'outline', color: 'warning', className: 'border-warning-500 text-warning-600 bg-transparent' },
      { variant: 'outline', color: 'danger', className: 'border-danger-500 text-danger-600 bg-transparent' },
      { variant: 'outline', color: 'info', className: 'border-info-500 text-info-600 bg-transparent' },
      { variant: 'outline', color: 'neutral', className: 'border-neutral-300 text-neutral-600 bg-transparent' },
    ],
    defaultVariants: {
      variant: 'subtle',
      color: 'neutral',
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color }), className)}
      {...props}
    />
  ),
);

Badge.displayName = 'Badge';
