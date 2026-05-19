import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── Spinner SVG ──────────────────────────────────────────────────────────────
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('acme-button-spinner', className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    data-testid="button-spinner"
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M8 2a6 6 0 0 1 6 6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="0.75s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const buttonVariants = cva(
  [
    'acme-button',
    'inline-flex items-center justify-center',
    'font-medium whitespace-nowrap select-none',
    'rounded-md border',
    'transition-colors transition-shadow',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'acme-button--primary',
          'bg-primary-500 text-white border-transparent',
          'hover:bg-primary-600',
          'focus-visible:ring-primary-500',
        ],
        secondary: [
          'acme-button--secondary',
          'bg-transparent text-primary-600 border-primary-300',
          'hover:bg-primary-50',
          'focus-visible:ring-primary-500',
        ],
        ghost: [
          'acme-button--ghost',
          'bg-transparent text-neutral-700 border-transparent',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-400',
        ],
        danger: [
          'acme-button--danger',
          'bg-danger-500 text-white border-transparent',
          'hover:bg-danger-600',
          'focus-visible:ring-danger-500',
        ],
        link: [
          'acme-button--link',
          'bg-transparent text-primary-600 border-transparent underline-offset-4',
          'hover:underline',
          'focus-visible:ring-primary-500',
          'p-0 h-auto',
        ],
      },
      size: {
        sm: 'acme-button--sm text-sm h-8 px-3 gap-1.5',
        md: 'acme-button--md text-sm h-10 px-4 gap-2',
        lg: 'acme-button--lg text-base h-12 px-6 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (Radix Slot). */
  asChild?: boolean;
  /** Show a loading spinner and disable interaction. */
  loading?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // When asChild=true, Radix Slot expects exactly one child element.
    // We cannot place <Spinner /> as a sibling. Instead, render a normal
    // <button> that wraps the child, or skip loading when asChild is used.
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

