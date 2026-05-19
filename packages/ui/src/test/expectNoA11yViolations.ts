import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with jest-axe matcher
expect.extend({ toHaveNoViolations });

export async function expectNoA11yViolations(container: HTMLElement) {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
