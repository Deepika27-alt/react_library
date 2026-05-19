import * as React from 'react';
import { cn } from '../../utils/cn';
import { Label } from '../Label';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

// ── Context ──────────────────────────────────────────────────────────────────
interface FormFieldContextValue {
  id: string;
  descriptionId: string;
  errorId: string;
  error?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export function useFormField(): FormFieldContextValue {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) {
    throw new Error('useFormField must be used within a <FormField>.');
  }
  return ctx;
}

// ── FormField (root wrapper) ─────────────────────────────────────────────────
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique field id — auto-wired to htmlFor, aria-describedby, etc. */
  fieldId?: string;
  /** Error message. Sets aria-invalid on the control. */
  error?: string;
  /** Mark the field as required. */
  required?: boolean;
  /** Disable the field and its children. */
  disabled?: boolean;
  children: React.ReactNode;
}

let fieldCounter = 0;

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { fieldId, error, required, disabled, className, children, ...props },
    ref,
  ) => {
    const generatedId = React.useMemo(() => {
      fieldCounter += 1;
      return fieldId ?? `acme-field-${fieldCounter}`;
    }, [fieldId]);

    const contextValue = React.useMemo<FormFieldContextValue>(
      () => ({
        id: generatedId,
        descriptionId: `${generatedId}-description`,
        errorId: `${generatedId}-error`,
        error,
        required,
        disabled,
      }),
      [generatedId, error, required, disabled],
    );

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('acme-form-field flex flex-col gap-1.5', className)}
          {...props}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  },
);

FormField.displayName = 'FormField';

// ── FormField.Label ──────────────────────────────────────────────────────────
export interface FormFieldLabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Label>, 'required' | 'disabled'> {}

export const FormFieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormFieldLabelProps
>(({ children, ...props }, ref) => {
  const { id, required, disabled } = useFormField();
  return (
    <Label ref={ref} htmlFor={id} required={required ?? false} disabled={disabled ?? false} {...props}>
      {children}
    </Label>
  );
});

FormFieldLabel.displayName = 'FormFieldLabel';

// ── FormField.Control ────────────────────────────────────────────────────────
export interface FormFieldControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}

export const FormFieldControl = React.forwardRef<HTMLDivElement, FormFieldControlProps>(
  ({ children, ...props }, ref) => {
    const { id, descriptionId, errorId, error, disabled } = useFormField();
    const child = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          id,
          'aria-describedby': error ? errorId : descriptionId,
          'aria-invalid': error ? true : undefined,
          disabled: disabled || undefined,
        })
      : children;

    return (
      <div ref={ref} {...props}>
        {child}
      </div>
    );
  },
);

FormFieldControl.displayName = 'FormFieldControl';

// ── FormField.Description ────────────────────────────────────────────────────
export interface FormFieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormFieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FormFieldDescriptionProps
>(({ className, children, ...props }, ref) => {
  const { descriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn('acme-form-field-description text-xs text-neutral-500', className)}
      {...props}
    >
      {children}
    </p>
  );
});

FormFieldDescription.displayName = 'FormFieldDescription';

// ── FormField.Error ──────────────────────────────────────────────────────────
export interface FormFieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormFieldError = React.forwardRef<
  HTMLParagraphElement,
  FormFieldErrorProps
>(({ className, children, ...props }, ref) => {
  const { errorId, error } = useFormField();
  const message = children ?? error;
  if (!message) return null;
  return (
    <p
      ref={ref}
      id={errorId}
      role="alert"
      className={cn('acme-form-field-error text-xs text-danger-500', className)}
      {...props}
    >
      {message}
    </p>
  );
});

FormFieldError.displayName = 'FormFieldError';
