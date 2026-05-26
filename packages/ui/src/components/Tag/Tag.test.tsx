import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders label children correctly', () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<Tag icon={<span data-testid="icon">⚛️</span>}>React</Tag>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders remove button when onRemove is supplied and triggers callback on click', () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Dismissable</Tag>);

    const button = screen.getByRole('button', { name: /remove/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', 'tag-remove');

    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('applies sizes correctly', () => {
    const { container: containerSm } = render(<Tag size="sm">Small</Tag>);
    expect(containerSm.firstChild).toHaveClass('acme-tag--sm');

    const { container: containerLg } = render(<Tag size="lg">Large</Tag>);
    expect(containerLg.firstChild).toHaveClass('acme-tag--lg');
  });

  it('merges custom className', () => {
    render(<Tag className="custom-tag">Tag</Tag>);
    expect(screen.getByText('Tag').closest('.acme-tag')).toHaveClass('custom-tag');
  });

  it('forwards ref correctly to outer span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Ref</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has correct displayName', () => {
    expect(Tag.displayName).toBe('Tag');
  });
});
