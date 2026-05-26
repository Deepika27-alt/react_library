import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>New Feature</Badge>);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('applies default classes (subtle variant, neutral color)', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('acme-badge');
    expect(badge).toHaveClass('acme-badge--subtle');
    expect(badge).toHaveClass('bg-neutral-100');
    expect(badge).toHaveClass('text-neutral-700');
  });

  it('applies solid variant with success color correctly', () => {
    render(<Badge variant="solid" color="success">Solid Success</Badge>);
    const badge = screen.getByText('Solid Success');
    expect(badge).toHaveClass('acme-badge--solid');
    expect(badge).toHaveClass('bg-success-500');
    expect(badge).toHaveClass('text-white');
  });

  it('applies outline variant with danger color correctly', () => {
    render(<Badge variant="outline" color="danger">Outline Danger</Badge>);
    const badge = screen.getByText('Outline Danger');
    expect(badge).toHaveClass('acme-badge--outline');
    expect(badge).toHaveClass('border-danger-500');
    expect(badge).toHaveClass('text-danger-600');
  });

  it('merges custom className correctly', () => {
    render(<Badge className="custom-badge-class">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-badge-class');
  });

  it('forwards ref to the outer element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has correct displayName', () => {
    expect(Badge.displayName).toBe('Badge');
  });
});
