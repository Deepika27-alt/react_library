import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Label } from './Label';

describe('Label', () => {
  it('renders text correctly', () => {
    render(<Label>Email Address</Label>);
    const label = screen.getByText('Email Address');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('acme-label');
  });

  it('renders required asterisk indicator', () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText('Password')).toBeInTheDocument();
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-danger-500');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports disabled class application', () => {
    render(<Label disabled>Disabled Field</Label>);
    const label = screen.getByText('Disabled Field');
    expect(label).toHaveClass('acme-label--disabled');
    expect(label).toHaveClass('opacity-50');
  });

  it('merges custom class names', () => {
    render(<Label className="custom-lbl">Username</Label>);
    expect(screen.getByText('Username')).toHaveClass('custom-lbl');
  });

  it('forwards ref correctly to the label element', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('has correct displayName', () => {
    expect(Label.displayName).toBe('Label');
  });
});
