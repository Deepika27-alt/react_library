import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../../utils/cn';

// ── Types ────────────────────────────────────────────────────────────────────
export interface TooltipProviderProps extends RadixTooltip.TooltipProviderProps {}

export interface TooltipProps extends RadixTooltip.TooltipProps {
  /** Content to display inside the tooltip. */
  content: React.ReactNode;
  /** Side placement. @default 'top' */
  side?: RadixTooltip.TooltipContentProps['side'];
  /** Alignment relative to the trigger. @default 'center' */
  align?: RadixTooltip.TooltipContentProps['align'];
  /** Delay before opening (ms). @default 200 */
  openDelay?: number;
  /** Delay before closing (ms). @default 0 */
  closeDelay?: number;
  /** Additional className for the content. */
  contentClassName?: string;
  /** The trigger element. */
  children: React.ReactNode;
}

// ── Provider (wrap app once) ─────────────────────────────────────────────────
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  delayDuration = 200,
  skipDelayDuration = 300,
  ...props
}) => (
  <RadixTooltip.Provider
    delayDuration={delayDuration}
    skipDelayDuration={skipDelayDuration}
    {...props}
  />
);
TooltipProvider.displayName = 'TooltipProvider';

// ── Tooltip ──────────────────────────────────────────────────────────────────
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  openDelay,
  closeDelay,
  contentClassName,
  ...rootProps
}) => (
  <RadixTooltip.Root
    {...(openDelay !== undefined ? { delayDuration: openDelay } : {})}
    {...rootProps}
  >
    <RadixTooltip.Trigger asChild>
      {children}
    </RadixTooltip.Trigger>
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        side={side}
        align={align}
        sideOffset={6}
        className={cn(
          'acme-tooltip',
          'z-[100] max-w-xs',
          'rounded-md px-3 py-1.5',
          'bg-neutral-900 text-white text-xs font-medium',
          'shadow-lg',
          // Animations
          'data-[state=delayed-open]:animate-tooltip-in',
          'data-[state=closed]:animate-tooltip-out',
          // Hide on touch devices — Radix handles pointer type,
          // but we also hide via CSS media query as extra safety
          'touch-none pointer-coarse:hidden',
          contentClassName,
        )}
        // Close after delay on mouse leave
        {...(closeDelay !== undefined ? { onPointerDownOutside: undefined } : {})}
      >
        {content}
        <RadixTooltip.Arrow className="fill-neutral-900" width={10} height={5} />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  </RadixTooltip.Root>
);
Tooltip.displayName = 'Tooltip';
