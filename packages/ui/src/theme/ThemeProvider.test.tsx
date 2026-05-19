import { render, renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';

// ── Helpers ────────────────────────────────────────────────────────────────

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider + useTheme', () => {
  beforeEach(() => {
    // Reset DOM state
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
    localStorage.clear();
    // Default system to light
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);
  });

  it('throws when used outside ThemeProvider', () => {
    // Suppress React error boundary output in test logs
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme() must be called inside a <ThemeProvider />',
    );
    spy.mockRestore();
  });

  it('provides default theme of "system"', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('system');
  });

  it('resolves system theme to "light" when prefers-color-scheme: light', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.resolvedTheme).toBe('light');
  });

  it('sets data-theme attribute on documentElement', () => {
    renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('setTheme() changes the active theme', async () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme('dark'));
    expect(result.current.theme).toBe('dark');
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('persists theme selection to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme('dark'));
    expect(localStorage.getItem('ui-theme')).toBe('dark');
  });

  it('accepts explicit theme prop', () => {
    const explicitWrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme="dark">{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper: explicitWrapper });
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('injects a style element with CSS variables', () => {
    render(<ThemeProvider><div /></ThemeProvider>);
    const styleEl = document.getElementById('ui-tokens');
    expect(styleEl).not.toBeNull();
    expect(styleEl?.textContent).toContain('--ui-');
  });
});
