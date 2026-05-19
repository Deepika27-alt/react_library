import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@deepika27-alt/ui';

export function renderWithTheme(
  ui: React.ReactElement,
  options?: Parameters<typeof render>[1],
): RenderResult {
  return render(React.createElement(ThemeProvider, null, ui), options);
}
