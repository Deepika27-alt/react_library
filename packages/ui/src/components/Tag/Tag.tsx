import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── Close Icon ───────────────────────────────────────────────────────────────
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── CVA ──────────────────────────────────────────────────────────────────────
export const tagVariants = cva(
  [
    'acme-tag',
    'inline-flex items-center gap-1',
    'rounded-md border border-neutral-200 bg-neutral-50',
    'text-xs font-medium text-neutral-700',
    'px-2 py-0.5',
    'transition-colors',
  ],
  {
    variants: {
      size: {
        sm: 'acme-tag--sm text-xs px-1.5 py-0.5',
        md: 'acme-tag--md text-sm px-2 py-0.5',
        lg: 'acme-tag--lg text-sm px-2.5 py-1',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Callback when the remove button is clicked. Renders dismiss button when provided. */
  onRemove?: () => void;
  /** Optional icon element rendered before the label. */
  icon?: React.ReactNode;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, size, onRemove, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ size }), className)}
      {...props}
    >
      {icon && <span className="acme-tag-icon flex shrink-0">{icon}</span>}
      <span className="acme-tag-label">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="acme-tag-remove ml-0.5 inline-flex items-center rounded-sm p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-label="Remove"
          data-testid="tag-remove"
        >
          <CloseIcon />
        </button>
      )}
    </span>
  ),
);

Tag.displayName = 'Tag';
