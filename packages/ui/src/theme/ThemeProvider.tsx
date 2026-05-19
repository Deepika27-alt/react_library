'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { tokens as defaultTokens, tokensToCss } from '../tokens';
import type { ThemeContextValue, ThemeProviderProps, ResolvedTheme, Theme } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY_DEFAULT = 'ui-theme';
const THEME_ATTR = 'data-theme';

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);
ThemeContext.displayName = 'ThemeContext';

// ─────────────────────────────────────────────────────────────────────────────
// SSR-safe layout effect
// ─────────────────────────────────────────────────────────────────────────────

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// ─────────────────────────────────────────────────────────────────────────────
// Resolve system preference
// ─────────────────────────────────────────────────────────────────────────────

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS injection helpers
// ─────────────────────────────────────────────────────────────────────────────

function injectStylesheet(id: string, css: string): void {
  if (typeof document === 'undefined') return;

  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

function applyThemeAttribute(resolved: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(THEME_ATTR, resolved);
  // Also set color-scheme for native scrollbars / form controls
  document.documentElement.style.colorScheme = resolved;
}

// ─────────────────────────────────────────────────────────────────────────────
// ThemeProvider
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ThemeProvider — wraps your application to provide theming.
 *
 * @example
 * // Basic usage
 * <ThemeProvider theme="system">
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * // Brand customisation with partial token overrides
 * <ThemeProvider
 *   theme="light"
 *   tokens={{ color: { primary: { 500: 'hsl(280, 70%, 50%)' } } }}
 * >
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  theme: themeProp = 'system',
  tokens: tokenOverrides,
  storageKey = STORAGE_KEY_DEFAULT,
  children,
}: ThemeProviderProps): React.ReactElement {
  // ── Initialise theme from storage or prop ────────────────────────────────
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof localStorage === 'undefined') return themeProp;
    return (localStorage.getItem(storageKey) as Theme | null) ?? themeProp;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(theme),
  );

  // Track previous overrides to avoid unnecessary style recalculations
  const prevOverridesRef = useRef<string>('');

  // ── Sync resolved theme + DOM attribute ──────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);
    applyThemeAttribute(resolved);
  }, [theme]);

  // ── React to system preference changes when theme === 'system' ───────────
  useEffect(() => {
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const next: ResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(next);
      applyThemeAttribute(next);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  // ── Inject CSS variables ─────────────────────────────────────────────────
  useIsomorphicLayoutEffect(() => {
    const overridesJson = JSON.stringify(tokenOverrides ?? {});
    if (overridesJson === prevOverridesRef.current) return;
    prevOverridesRef.current = overridesJson;

    const css = tokensToCss(tokenOverrides as Record<string, unknown> | undefined);
    injectStylesheet('ui-tokens', css);
  }, [tokenOverrides]);

  // ── setTheme ─────────────────────────────────────────────────────────────
  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        // Storage unavailable (private browsing, iframe sandbox, etc.)
      }
    },
    [storageKey],
  );

  // ── Context value ─────────────────────────────────────────────────────────
  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// useTheme hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useTheme — access and update the current theme.
 *
 * Must be used inside a <ThemeProvider />.
 *
 * @returns { theme, resolvedTheme, setTheme }
 *
 * @example
 * const { resolvedTheme, setTheme } = useTheme();
 * <button onClick={() => setTheme('dark')}>Dark mode</button>
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme() must be called inside a <ThemeProvider />');
  }
  return ctx;
}

// Re-export types so consumers don't need a separate import
export type { Theme, ResolvedTheme, ThemeProviderProps, ThemeContextValue };
