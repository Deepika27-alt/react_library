import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders correctly unchecked by default', () => {
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('can be checked and unchecked via click', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Accept terms" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    // Toggle checked
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    
    // Toggle unchecked
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('renders disabled state', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Accept terms" disabled onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).toBeDisabled();
    
    // Clicking should not trigger state change
    fireEvent.click(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('applies sizes correctly', () => {
    const { container: containerSm } = render(<Checkbox size="sm" />);
    expect(containerSm.firstChild).toHaveClass('acme-checkbox--sm');

    const { container: containerLg } = render(<Checkbox size="lg" />);
    expect(containerLg.firstChild).toHaveClass('acme-checkbox--lg');
  });

  it('merges custom className', () => {
    render(<Checkbox className="custom-check" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-check');
  });

  it('forwards ref to the checkbox button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has correct displayName', () => {
    expect(Checkbox.displayName).toBe('Checkbox');
  });
});
