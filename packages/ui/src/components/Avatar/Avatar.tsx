import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const avatarVariants = cva(
  [
    'acme-avatar',
    'relative inline-flex shrink-0 items-center justify-center',
    'overflow-hidden rounded-full',
    'bg-primary-100 text-primary-700 font-medium',
  ],
  {
    variants: {
      size: {
        xs: 'acme-avatar--xs h-6 w-6 text-[0.625rem]',
        sm: 'acme-avatar--sm h-8 w-8 text-xs',
        md: 'acme-avatar--md h-10 w-10 text-sm',
        lg: 'acme-avatar--lg h-12 w-12 text-base',
        xl: 'acme-avatar--xl h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// ── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === undefined) return '?';
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase();
  return `${(parts[0]?.[0] ?? '').toUpperCase()}${(parts[parts.length - 1]?.[0] ?? '').toUpperCase()}`;
}

// ── Avatar Types ─────────────────────────────────────────────────────────────
export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Full name used for initials fallback. */
  name?: string;
}

// ── Avatar Component ─────────────────────────────────────────────────────────
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, name, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="acme-avatar-initials" aria-label={name ?? 'Unknown'}>
            {name ? getInitials(name) : '?'}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';

// ── AvatarGroup Types ────────────────────────────────────────────────────────
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show before the +N overflow. */
  max?: number;
  /** Avatar size passed down to all children. */
  size?: VariantProps<typeof avatarVariants>['size'];
  children: React.ReactNode;
}

// ── AvatarGroup Component ────────────────────────────────────────────────────
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 5, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleCount = Math.min(childArray.length, max);
    const overflow = childArray.length - visibleCount;

    return (
      <div
        ref={ref}
        className={cn('acme-avatar-group inline-flex -space-x-2', className)}
        {...props}
      >
        {childArray.slice(0, visibleCount).map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<AvatarProps>,
                {
                  key: i,
                  size,
                  className: cn(
                    'ring-2 ring-white',
                    (child as React.ReactElement<AvatarProps>).props.className,
                  ),
                },
              )
            : child,
        )}
        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size }),
              'ring-2 ring-white bg-neutral-200 text-neutral-600',
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
