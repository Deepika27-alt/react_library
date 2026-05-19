declare module 'jest-axe' {
  export function axe(node: HTMLElement): Promise<any>;
  export function toHaveNoViolations(): any;
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): void;
  }
}
