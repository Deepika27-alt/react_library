import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { FormField, FormFieldLabel, FormFieldControl, FormFieldDescription, FormFieldError, useFormField } from './FormField';

describe('FormField', () => {
  it('renders children correctly and provides context', () => {
    render(
      <FormField fieldId="custom-id">
        <FormFieldLabel>Username</FormFieldLabel>
        <FormFieldControl>
          <input data-testid="input-control" />
        </FormFieldControl>
        <FormFieldDescription>Please enter your username.</FormFieldDescription>
      </FormField>,
    );

    const label = screen.getByText('Username');
    const input = screen.getByTestId('input-control');
    const desc = screen.getByText('Please enter your username.');

    expect(label).toHaveAttribute('for', 'custom-id');
    expect(input).toHaveAttribute('id', 'custom-id');
    expect(input).toHaveAttribute('aria-describedby', 'custom-id-description');
    expect(desc).toHaveAttribute('id', 'custom-id-description');
  });

  it('auto-generates a field ID if not provided', () => {
    render(
      <FormField>
        <FormFieldLabel>Email</FormFieldLabel>
        <FormFieldControl>
          <input data-testid="input-control" />
        </FormFieldControl>
      </FormField>,
    );

    const label = screen.getByText('Email');
    const input = screen.getByTestId('input-control');
    const generatedId = label.getAttribute('for');

    expect(generatedId).toMatch(/^acme-field-\d+$/);
    expect(input).toHaveAttribute('id', generatedId);
  });

  it('integrates error messages and updates accessibility attributes', () => {
    render(
      <FormField fieldId="error-field" error="Invalid username">
        <FormFieldLabel>Username</FormFieldLabel>
        <FormFieldControl>
          <input data-testid="input-control" />
        </FormFieldControl>
        <FormFieldError />
      </FormField>,
    );

    const input = screen.getByTestId('input-control');
    const errorMsg = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'error-field-error');
    expect(errorMsg).toHaveAttribute('id', 'error-field-error');
    expect(errorMsg).toHaveTextContent('Invalid username');
  });

  it('renders custom error content when children are supplied', () => {
    render(
      <FormField fieldId="custom-err-field" error="Error from prop">
        <FormFieldError>Override message</FormFieldError>
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Override message');
  });

  it('does not render error node when error is undefined', () => {
    const { container } = render(
      <FormField>
        <FormFieldError />
      </FormField>,
    );
    expect(container.querySelector('.acme-form-field-error')).not.toBeInTheDocument();
  });

  it('propagates required and disabled states to components', () => {
    render(
      <FormField required disabled>
        <FormFieldLabel>Password</FormFieldLabel>
        <FormFieldControl>
          <input data-testid="input-control" />
        </FormFieldControl>
      </FormField>,
    );

    const label = screen.getByText('Password');
    const asterisk = screen.getByText('*');
    const input = screen.getByTestId('input-control');

    expect(label).toHaveClass('acme-label--disabled');
    expect(asterisk).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('throws error when useFormField is called outside provider', () => {
    const TestComponent = () => {
      useFormField();
      return null;
    };

    // Prevent React's double console errors logging in vitest output
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrowError(
      'useFormField must be used within a <FormField>.',
    );

    consoleError.mockRestore();
  });

  it('forwards refs correctly', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <FormField ref={ref}>
        <div>Field</div>
      </FormField>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
