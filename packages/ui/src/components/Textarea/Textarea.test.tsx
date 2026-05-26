import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders standard native textarea with correct classes', () => {
    render(<Textarea placeholder="Bio" />);
    const textarea = screen.getByPlaceholderText('Bio');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('acme-textarea');
    expect(textarea).toHaveClass('acme-textarea--default');
  });

  it('renders variant classes correctly', () => {
    const { rerender } = render(<Textarea variant="error" placeholder="Text" />);
    expect(screen.getByPlaceholderText('Text')).toHaveClass('acme-textarea--error');

    rerender(<Textarea variant="success" placeholder="Text" />);
    expect(screen.getByPlaceholderText('Text')).toHaveClass('acme-textarea--success');
  });

  it('triggers onChange and updates values', () => {
    const onChange = vi.fn();
    render(<Textarea placeholder="Enter text" onChange={onChange} />);
    const el = screen.getByPlaceholderText('Enter text');

    fireEvent.change(el, { target: { value: 'Hello World' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(el).toHaveValue('Hello World');
  });

  it('renders character count when showCounter and maxLength are supplied', () => {
    render(<Textarea placeholder="Text" showCounter maxLength={100} defaultValue="hello" />);
    
    const counter = screen.getByTestId('textarea-counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent('5/100');

    // Change text
    const textarea = screen.getByPlaceholderText('Text');
    fireEvent.change(textarea, { target: { value: 'testing counter' } });
    expect(counter).toHaveTextContent('15/100');
  });

  it('supports disabled state', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    expect(screen.getByPlaceholderText('Disabled textarea')).toBeDisabled();
  });

  it('supports autoResize option and calls height calculation', () => {
    // We mock element scrollHeight and scrollWidth properties since jsdom has no layout engine
    const { rerender } = render(<Textarea autoResize defaultValue="Row 1" placeholder="Resizing" />);
    const textarea = screen.getByPlaceholderText('Resizing');

    // Trigger input / change
    fireEvent.change(textarea, { target: { value: 'Row 1\nRow 2\nRow 3' } });
    expect(textarea.style.height).toMatch(/px$/);
  });

  it('forwards ref correctly to the native textarea', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('has correct displayName', () => {
    expect(Textarea.displayName).toBe('Textarea');
  });
});
