import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="Toggle active" />);
    const sw = screen.getByRole('switch', { name: /toggle active/i });
    expect(sw).toBeInTheDocument();
    expect(sw).not.toBeChecked();
    expect(sw).toHaveAttribute('data-state', 'unchecked');
  });

  it('can be checked and unchecked via click', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle active" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole('switch');
    
    // Toggle checked
    fireEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(sw).toHaveAttribute('data-state', 'checked');

    // Toggle unchecked
    fireEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
    expect(sw).toHaveAttribute('data-state', 'unchecked');
  });

  it('supports disabled state and prevents click interaction', () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle active" disabled onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole('switch');

    expect(sw).toBeDisabled();
    
    fireEvent.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('applies size classes correctly', () => {
    const { container: containerSm } = render(<Switch size="sm" />);
    expect(containerSm.firstChild).toHaveClass('acme-switch--sm');

    const { container: containerLg } = render(<Switch size="lg" />);
    expect(containerLg.firstChild).toHaveClass('acme-switch--lg');
  });

  it('merges custom className', () => {
    render(<Switch className="custom-switch" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-switch');
  });

  it('forwards ref correctly to the switch button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has correct displayName', () => {
    expect(Switch.displayName).toBe('Switch');
  });
});
