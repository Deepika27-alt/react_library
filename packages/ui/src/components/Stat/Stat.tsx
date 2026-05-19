import * as React from 'react';
import { cn } from '../../utils/cn';

// ── Trend icons ──────────────────────────────────────────────────────────────
const TrendUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrendDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4L12 12M12 12H6M12 12V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
export type TrendDirection = 'up' | 'down';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Descriptive label for the statistic. */
  label: string;
  /** The main value to display. */
  value: string | number;
  /** Trend configuration. */
  trend?: {
    direction: TrendDirection;
    /** Percentage or display value (e.g. "12.5%"). */
    value: string;
  };
  /** Optional icon slot rendered at top-left. */
  icon?: React.ReactNode;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, trend, icon, ...props }, ref) => {
    const isPositive = trend?.direction === 'up';

    return (
      <div
        ref={ref}
        className={cn(
          'acme-stat',
          'flex flex-col gap-1',
          className,
        )}
        {...props}
      >
        {/* Top row: icon + label */}
        <div className="flex items-center gap-2">
          {icon && (
            <span className="acme-stat-icon shrink-0 text-neutral-400">
              {icon}
            </span>
          )}
          <span className="acme-stat-label text-sm font-medium text-neutral-500">
            {label}
          </span>
        </div>

        {/* Value */}
        <span className="acme-stat-value text-2xl font-semibold text-neutral-900 tracking-tight">
          {value}
        </span>

        {/* Trend */}
        {trend && (
          <span
            className={cn(
              'acme-stat-trend',
              'inline-flex items-center gap-0.5 text-sm font-medium',
              isPositive ? 'text-success-600' : 'text-danger-600',
            )}
          >
            {isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
            {trend.value}
          </span>
        )}
      </div>
    );
  },
);

Stat.displayName = 'Stat';
