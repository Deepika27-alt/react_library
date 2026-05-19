import { tokens, tokensToCss, spacing, borderRadius, motionDuration } from '../tokens';

describe('Design Tokens', () => {
  describe('token structure', () => {
    it('has all top-level categories', () => {
      expect(tokens).toHaveProperty('color');
      expect(tokens).toHaveProperty('typography');
      expect(tokens).toHaveProperty('spacing');
      expect(tokens).toHaveProperty('borderRadius');
      expect(tokens).toHaveProperty('motion');
      expect(tokens).toHaveProperty('shadow');
    });

    it('has all colour palettes', () => {
      const { color } = tokens;
      expect(color).toHaveProperty('primary');
      expect(color).toHaveProperty('neutral');
      expect(color).toHaveProperty('success');
      expect(color).toHaveProperty('warning');
      expect(color).toHaveProperty('danger');
      expect(color).toHaveProperty('info');
    });

    it('has all colour steps 50-900', () => {
      const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
      for (const step of steps) {
        expect(tokens.color.primary).toHaveProperty(String(step));
        expect(tokens.color.neutral).toHaveProperty(String(step));
      }
    });

    it('spacing scale has 16 steps with 4px base', () => {
      expect(spacing[1]).toBe('0.25rem');  // 4px
      expect(spacing[2]).toBe('0.5rem');   // 8px
      expect(spacing[4]).toBe('1rem');     // 16px
      expect(spacing[16]).toBe('4rem');    // 64px
    });

    it('border radius has all named sizes', () => {
      expect(borderRadius).toHaveProperty('sm');
      expect(borderRadius).toHaveProperty('md');
      expect(borderRadius).toHaveProperty('lg');
      expect(borderRadius).toHaveProperty('xl');
      expect(borderRadius).toHaveProperty('full');
    });

    it('motion has fast/normal/slow durations', () => {
      expect(motionDuration).toHaveProperty('fast');
      expect(motionDuration).toHaveProperty('normal');
      expect(motionDuration).toHaveProperty('slow');
    });
  });

  describe('tokensToCss()', () => {
    it('generates a CSS string starting with :root', () => {
      const css = tokensToCss();
      expect(css).toMatch(/^:root \{/);
      expect(css).toMatch(/\}\s*$/);
    });

    it('contains --ui- prefixed custom properties', () => {
      const css = tokensToCss();
      expect(css).toContain('--ui-');
    });

    it('respects custom selector', () => {
      const css = tokensToCss({}, '.custom-scope');
      expect(css).toMatch(/^\.custom-scope \{/);
    });

    it('merges partial token overrides', () => {
      const css = tokensToCss({
        color: { primary: { 500: 'hsl(280, 70%, 50%)' } },
      });
      expect(css).toContain('hsl(280, 70%, 50%)');
    });
  });
});
