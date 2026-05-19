/**
 * Theme context type definitions
 */

import type { Tokens } from '../tokens';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** The currently configured theme preference */
  theme: Theme;
  /** The actual rendered theme after resolving 'system' */
  resolvedTheme: ResolvedTheme;
  /** Update the theme preference */
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  /** Theme preference — 'light' | 'dark' | 'system' (default: 'system') */
  theme?: Theme;
  /** Partial token overrides for brand customisation */
  tokens?: DeepPartial<Tokens>;
  /** Persist theme selection to localStorage (default: true) */
  storageKey?: string;
  /** Element to inject CSS variables onto (default: document.documentElement) */
  target?: 'root' | 'self';
  children: React.ReactNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility type — recursive partial
// ─────────────────────────────────────────────────────────────────────────────
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T;
