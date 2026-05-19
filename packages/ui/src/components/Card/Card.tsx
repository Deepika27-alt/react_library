import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── Root CVA ─────────────────────────────────────────────────────────────────
export const cardVariants = cva(
  [
    'acme-card',
    'rounded-lg overflow-hidden',
    'transition-shadow',
  ],
  {
    variants: {
      variant: {
        elevated: [
          'acme-card--elevated',
          'bg-white border border-neutral-100',
          'shadow-md',
        ],
        outlined: [
          'acme-card--outlined',
          'bg-white border border-neutral-200',
          'shadow-none',
        ],
        filled: [
          'acme-card--filled',
          'bg-neutral-50 border border-transparent',
          'shadow-none',
        ],
      },
    },
    defaultVariants: {
      variant: 'elevated',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// ── Card.Header ──────────────────────────────────────────────────────────────
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('acme-card-header', 'px-6 pt-6 pb-0', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'Card.Header';

// ── Card.Body ────────────────────────────────────────────────────────────────
const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('acme-card-body', 'px-6 py-4', className)}
      {...props}
    />
  ),
);
CardBody.displayName = 'Card.Body';

// ── Card.Footer ──────────────────────────────────────────────────────────────
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'acme-card-footer',
        'px-6 pb-6 pt-0',
        'flex items-center gap-2',
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = 'Card.Footer';

// ── Card Root ────────────────────────────────────────────────────────────────
const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  ),
);
CardRoot.displayName = 'Card';

// ── Compound export ──────────────────────────────────────────────────────────
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
