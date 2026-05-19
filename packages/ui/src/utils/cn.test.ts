import { cn } from '../utils/cn';

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('deduplicates conflicting Tailwind utilities (last wins)', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn('a', undefined, null, 'b')).toBe('a b');
  });

  it('handles array inputs', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c');
  });

  it('handles object inputs', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });
});
