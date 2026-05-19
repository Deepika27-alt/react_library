import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from './Button';

describe('Button', () => {
  // ── Rendering ────────────────────────────────────────────────────────────
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('acme-button');
    expect(button).toHaveClass('acme-button--primary');
    expect(button).toHaveClass('acme-button--md');
  });

  it('renders children correctly', () => {
    render(
      <Button>
        <span data-testid="icon">🚀</span> Launch
      </Button>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Launch');
  });

  // ── Variants ─────────────────────────────────────────────────────────────
  it.each(['primary', 'secondary', 'ghost', 'danger', 'link'] as const)(
    'applies the %s variant class',
    (variant: any) => {
      render(<Button variant={variant}>Btn</Button>);
      expect(screen.getByRole('button')).toHaveClass(`acme-button--${variant}`);
    },
  );

  // ── Sizes ────────────────────────────────────────────────────────────────
  it.each(['sm', 'md', 'lg'] as const)(
    'applies the %s size class',
    (size: any) => {
      render(<Button size={size}>Btn</Button>);
      expect(screen.getByRole('button')).toHaveClass(`acme-button--${size}`);
    },
  );

  // ── Loading ──────────────────────────────────────────────────────────────
  it('shows spinner when loading', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-busy when loading', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('does not show spinner when not loading', () => {
    render(<Button>Click</Button>);
    expect(screen.queryByTestId('button-spinner')).not.toBeInTheDocument();
  });

  // ── Disabled ─────────────────────────────────────────────────────────────
  it('renders disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Events ───────────────────────────────────────────────────────────────
  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when loading', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Ref Forwarding ───────────────────────────────────────────────────────
  it('forwards ref to the button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // ── HTML Attribute Passthrough ────────────────────────────────────────────
  it('passes through native HTML attributes', () => {
    render(
      <Button
        type="submit"
        data-testid="submit-btn"
        aria-label="Submit form"
        id="submit"
      >
        Submit
      </Button>,
    );
    const button = screen.getByTestId('submit-btn');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
    expect(button).toHaveAttribute('id', 'submit');
  });

  // ── Custom ClassName ─────────────────────────────────────────────────────
  it('merges custom className', () => {
    render(<Button className="custom-class">Btn</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('acme-button');
    expect(button).toHaveClass('custom-class');
  });

  // ── asChild ──────────────────────────────────────────────────────────────
  it('renders as child element via Slot when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('acme-button');
  });

  // ── Display Name ─────────────────────────────────────────────────────────
  it('has correct displayName', () => {
    expect(Button.displayName).toBe('Button');
  });
});
