import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Polyfill ResizeObserver for jsdom (needed by Radix UI popper components)
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.ResizeObserver;
}

// Add jest-axe matcher
expect.extend({ toHaveNoViolations });
