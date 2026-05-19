/**
 * Design Tokens — single source of truth
 *
 * All token values are plain JS so they can be consumed in:
 *   1. TypeScript/JS at runtime
 *   2. Injected as CSS custom properties via ThemeProvider
 *   3. Exported to tokens.css at build time via tsup onSuccess
 */

// ─────────────────────────────────────────────────────────────────────────────
// Color Palettes (50–900 scale, HSL)
// ─────────────────────────────────────────────────────────────────────────────

export const colorPrimary = {
  50: 'hsl(221, 100%, 96%)',
  100: 'hsl(221, 96%, 90%)',
  200: 'hsl(221, 90%, 80%)',
  300: 'hsl(221, 85%, 70%)',
  400: 'hsl(221, 80%, 60%)',
  500: 'hsl(221, 76%, 50%)',
  600: 'hsl(221, 76%, 42%)',
  700: 'hsl(221, 76%, 34%)',
  800: 'hsl(221, 76%, 26%)',
  900: 'hsl(221, 76%, 18%)',
} as const;

export const colorNeutral = {
  50: 'hsl(220, 20%, 97%)',
  100: 'hsl(220, 16%, 92%)',
  200: 'hsl(220, 14%, 84%)',
  300: 'hsl(220, 12%, 72%)',
  400: 'hsl(220, 10%, 58%)',
  500: 'hsl(220, 9%, 46%)',
  600: 'hsl(220, 10%, 36%)',
  700: 'hsl(220, 12%, 26%)',
  800: 'hsl(220, 14%, 16%)',
  900: 'hsl(220, 18%, 8%)',
} as const;

export const colorSuccess = {
  50: 'hsl(142, 76%, 96%)',
  100: 'hsl(142, 72%, 88%)',
  200: 'hsl(142, 68%, 76%)',
  300: 'hsl(142, 64%, 62%)',
  400: 'hsl(142, 60%, 50%)',
  500: 'hsl(142, 64%, 42%)',
  600: 'hsl(142, 68%, 34%)',
  700: 'hsl(142, 72%, 26%)',
  800: 'hsl(142, 76%, 18%)',
  900: 'hsl(142, 80%, 10%)',
} as const;

export const colorWarning = {
  50: 'hsl(38, 100%, 96%)',
  100: 'hsl(38, 96%, 88%)',
  200: 'hsl(38, 92%, 76%)',
  300: 'hsl(38, 88%, 64%)',
  400: 'hsl(38, 92%, 52%)',
  500: 'hsl(38, 96%, 44%)',
  600: 'hsl(38, 92%, 36%)',
  700: 'hsl(32, 90%, 28%)',
  800: 'hsl(28, 86%, 20%)',
  900: 'hsl(24, 82%, 12%)',
} as const;

export const colorDanger = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 96%, 92%)',
  200: 'hsl(0, 90%, 82%)',
  300: 'hsl(0, 84%, 70%)',
  400: 'hsl(0, 80%, 60%)',
  500: 'hsl(0, 76%, 50%)',
  600: 'hsl(0, 76%, 42%)',
  700: 'hsl(0, 76%, 34%)',
  800: 'hsl(0, 76%, 26%)',
  900: 'hsl(0, 76%, 18%)',
} as const;

export const colorInfo = {
  50: 'hsl(198, 100%, 96%)',
  100: 'hsl(198, 96%, 88%)',
  200: 'hsl(198, 90%, 76%)',
  300: 'hsl(198, 84%, 62%)',
  400: 'hsl(198, 80%, 50%)',
  500: 'hsl(198, 80%, 42%)',
  600: 'hsl(198, 80%, 34%)',
  700: 'hsl(198, 80%, 26%)',
  800: 'hsl(198, 80%, 18%)',
  900: 'hsl(198, 80%, 10%)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

export const fontFamily = {
  sans: "'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
  display: "'Cal Sans', 'Inter', sans-serif",
} as const;

export const fontSize = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  base: '1rem',    // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing — 4px base unit, scale 1–16
// ─────────────────────────────────────────────────────────────────────────────

export const spacing = {
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  13: '3.25rem',  // 52px
  14: '3.5rem',   // 56px
  15: '3.75rem',  // 60px
  16: '4rem',     // 64px
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Border Radius
// ─────────────────────────────────────────────────────────────────────────────

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Motion — durations + easing curves
// ─────────────────────────────────────────────────────────────────────────────

export const motionDuration = {
  instant: '50ms',
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  slower: '600ms',
} as const;

export const motionEasing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shadow
// ─────────────────────────────────────────────────────────────────────────────

export const shadow = {
  none: 'none',
  xs: '0 1px 2px 0 hsl(220 14% 8% / 0.05)',
  sm: '0 1px 3px 0 hsl(220 14% 8% / 0.10), 0 1px 2px -1px hsl(220 14% 8% / 0.10)',
  md: '0 4px 6px -1px hsl(220 14% 8% / 0.10), 0 2px 4px -2px hsl(220 14% 8% / 0.10)',
  lg: '0 10px 15px -3px hsl(220 14% 8% / 0.10), 0 4px 6px -4px hsl(220 14% 8% / 0.10)',
  xl: '0 20px 25px -5px hsl(220 14% 8% / 0.10), 0 8px 10px -6px hsl(220 14% 8% / 0.10)',
  '2xl': '0 25px 50px -12px hsl(220 14% 8% / 0.25)',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Composed token object (used for CSS var generation and ThemeProvider)
// ─────────────────────────────────────────────────────────────────────────────

export const tokens = {
  color: {
    primary: colorPrimary,
    neutral: colorNeutral,
    success: colorSuccess,
    warning: colorWarning,
    danger: colorDanger,
    info: colorInfo,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
  },
  spacing,
  borderRadius,
  motion: {
    duration: motionDuration,
    easing: motionEasing,
  },
  shadow,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript helpers
// ─────────────────────────────────────────────────────────────────────────────

export type Tokens = typeof tokens;
export type ColorScale = typeof colorPrimary;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type MotionDuration = keyof typeof motionDuration;
export type MotionEasing = keyof typeof motionEasing;

// ─────────────────────────────────────────────────────────────────────────────
// CSS variable generation utility
// ─────────────────────────────────────────────────────────────────────────────

type FlatRecord = Record<string, string | number>;

function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
  result: FlatRecord = {},
): FlatRecord {
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = `${prefix}-${kebabCase(String(key))}`;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value as Record<string, unknown>, cssKey, result);
    } else {
      result[cssKey] = String(value);
    }
  }
  return result;
}

/**
 * Convert the tokens object into a CSS string of custom properties.
 * @param overrides - Partial token overrides to merge before generating CSS
 * @param selector - CSS selector to scope variables (default: `:root`)
 */
export function tokensToCss(
  overrides: Record<string, unknown> = {},
  selector = ':root',
): string {
  const merged = deepMerge(tokens as unknown as Record<string, unknown>, overrides);
  const flat = flattenObject(merged, '--ui');
  const declarations = Object.entries(flat)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `${selector} {\n${declarations}\n}\n`;
}

function deepMerge(
  base: Record<string, unknown>,
  overrides: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      typeof result[key] === 'object' &&
      result[key] !== null
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}
