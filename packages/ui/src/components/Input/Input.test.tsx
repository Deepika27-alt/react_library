import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Input } from './Input';

describe('Input', () => {
  it('renders native input with default classes', () => {
    render(<Input placeholder="Enter username" />);
    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('acme-input');
    expect(input).toHaveClass('acme-input--default');
    expect(input).toHaveClass('acme-input--md');
  });

  it('renders variant classes correctly', () => {
    const { rerender } = render(<Input variant="error" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('acme-input--error');

    rerender(<Input variant="success" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('acme-input--success');
  });

  it('renders size classes correctly', () => {
    const { rerender } = render(<Input size="sm" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('acme-input--sm');

    rerender(<Input size="lg" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('acme-input--lg');
  });

  it('renders slots (leftElement and rightElement)', () => {
    render(
      <Input
        leftElement={<span data-testid="left">🔍</span>}
        rightElement={<span data-testid="right">❌</span>}
        placeholder="Search"
      />,
    );

    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toHaveClass('pl-10');
    expect(screen.getByPlaceholderText('Search')).toHaveClass('pr-10');
  });

  it('triggers onChange handler when text changes', () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} placeholder="Type" />);
    const input = screen.getByPlaceholderText('Type');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Hello');
  });

  it('supports disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('passes through native HTML attributes', () => {
    render(<Input type="password" id="pass-field" placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('id', 'pass-field');
  });

  it('forwards ref correctly to native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has correct displayName', () => {
    expect(Input.displayName).toBe('Input');
  });
});
