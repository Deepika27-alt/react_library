import { render, screen } from '@testing-library/react';
import { SkeletonText, SkeletonCircle, SkeletonRect } from './Skeleton';

describe('SkeletonText', () => {
  it('renders a single skeleton line by default', () => {
    render(<SkeletonText data-testid="skel" />);
    const el = screen.getByTestId('skel');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.className).toContain('acme-skeleton-text');
  });

  it('renders multiple lines', () => {
    render(<SkeletonText lines={3} data-testid="group" />);
    const group = screen.getByTestId('group');
    expect(group.className).toContain('acme-skeleton-text-group');
    const lines = group.querySelectorAll('.acme-skeleton-text');
    expect(lines).toHaveLength(3);
  });

  it('applies custom lastLineWidth to the last line', () => {
    render(<SkeletonText lines={2} lastLineWidth="50%" data-testid="group" />);
    const group = screen.getByTestId('group');
    const lines = group.querySelectorAll('.acme-skeleton-text');
    expect(lines[1]).toHaveStyle({ width: '50%' });
  });

  it('forwards className', () => {
    render(<SkeletonText className="custom-class" data-testid="skel" />);
    expect(screen.getByTestId('skel').className).toContain('custom-class');
  });
});

describe('SkeletonCircle', () => {
  it('renders with default size of 40px', () => {
    render(<SkeletonCircle data-testid="circle" />);
    const el = screen.getByTestId('circle');
    expect(el).toHaveStyle({ width: '40px', height: '40px' });
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('respects custom size', () => {
    render(<SkeletonCircle size={64} data-testid="circle" />);
    const el = screen.getByTestId('circle');
    expect(el).toHaveStyle({ width: '64px', height: '64px' });
  });

  it('has rounded-full class', () => {
    render(<SkeletonCircle data-testid="circle" />);
    expect(screen.getByTestId('circle').className).toContain('rounded-full');
  });
});

describe('SkeletonRect', () => {
  it('renders with default dimensions', () => {
    render(<SkeletonRect data-testid="rect" />);
    const el = screen.getByTestId('rect');
    expect(el).toHaveStyle({ width: '100%', height: '100px' });
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom width and height', () => {
    render(<SkeletonRect width="200px" height="50px" data-testid="rect" />);
    const el = screen.getByTestId('rect');
    expect(el).toHaveStyle({ width: '200px', height: '50px' });
  });

  it('has the acme-skeleton-rect class', () => {
    render(<SkeletonRect data-testid="rect" />);
    expect(screen.getByTestId('rect').className).toContain('acme-skeleton-rect');
  });
});
