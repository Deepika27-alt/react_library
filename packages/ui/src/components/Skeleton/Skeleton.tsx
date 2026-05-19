import * as React from 'react';
import { cn } from '../../utils/cn';

// ── Base shimmer styles ──────────────────────────────────────────────────────
const shimmerBase = [
  'acme-skeleton',
  'relative overflow-hidden',
  'bg-neutral-200 rounded',
  'before:absolute before:inset-0',
  'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
  'before:animate-shimmer',
] as const;

// ── SkeletonText ─────────────────────────────────────────────────────────────
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of text lines to render. @default 1 */
  lines?: number;
  /** Width of the last line (CSS value). @default '75%' */
  lastLineWidth?: string;
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 1, lastLineWidth = '75%', style, ...props }, ref) => {
    if (lines === 1) {
      return (
        <div
          ref={ref}
          className={cn(...shimmerBase, 'acme-skeleton-text', 'h-4 w-full', className)}
          style={style}
          aria-hidden="true"
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn('acme-skeleton-text-group', 'flex flex-col gap-2', className)} aria-hidden="true" {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(...shimmerBase, 'acme-skeleton-text', 'h-4')}
            style={i === lines - 1 ? { width: lastLineWidth, ...style } : style}
          />
        ))}
      </div>
    );
  },
);

SkeletonText.displayName = 'SkeletonText';

// ── SkeletonCircle ───────────────────────────────────────────────────────────
export interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter of the circle (px). @default 40 */
  size?: number;
}

export const SkeletonCircle = React.forwardRef<HTMLDivElement, SkeletonCircleProps>(
  ({ className, size = 40, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(...shimmerBase, 'acme-skeleton-circle', 'rounded-full shrink-0', className)}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
      {...props}
    />
  ),
);

SkeletonCircle.displayName = 'SkeletonCircle';

// ── SkeletonRect ─────────────────────────────────────────────────────────────
export interface SkeletonRectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width (CSS value). @default '100%' */
  width?: string | number;
  /** Height (CSS value). @default '100px' */
  height?: string | number;
}

export const SkeletonRect = React.forwardRef<HTMLDivElement, SkeletonRectProps>(
  ({ className, width = '100%', height = '100px', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(...shimmerBase, 'acme-skeleton-rect', className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  ),
);

SkeletonRect.displayName = 'SkeletonRect';
