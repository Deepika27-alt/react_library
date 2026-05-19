import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — merge class names with full Tailwind conflict resolution.
 *
 * Combines clsx (conditional class logic) with tailwind-merge (deduplication
 * of conflicting Tailwind utilities, e.g. `p-4 p-6` → `p-6`).
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
