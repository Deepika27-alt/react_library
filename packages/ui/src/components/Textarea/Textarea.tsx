import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// ── CVA Variants ─────────────────────────────────────────────────────────────
export const textareaVariants = cva(
  [
    'acme-textarea',
    'w-full rounded-md border bg-transparent',
    'text-neutral-900 placeholder:text-neutral-400',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'text-sm px-3 py-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'acme-textarea--default',
          'border-neutral-300',
          'focus-visible:ring-primary-500 focus-visible:border-primary-500',
        ],
        error: [
          'acme-textarea--error',
          'border-danger-500 text-danger-900',
          'focus-visible:ring-danger-500',
        ],
        success: [
          'acme-textarea--success',
          'border-success-500',
          'focus-visible:ring-success-500',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Automatically resize the textarea to fit content. */
  autoResize?: boolean;
  /** Show a character counter when maxLength is set. */
  showCounter?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      autoResize = false,
      showCounter = false,
      maxLength,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [charCount, setCharCount] = React.useState(
      () => String(value ?? defaultValue ?? '').length,
    );

    // Merge external ref with internal ref
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref],
    );

    const handleAutoResize = React.useCallback(() => {
      const el = internalRef.current;
      if (el && autoResize) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [autoResize]);

    React.useEffect(() => {
      handleAutoResize();
    }, [handleAutoResize, value]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        handleAutoResize();
        onChange?.(e);
      },
      [onChange, handleAutoResize],
    );

    return (
      <div className="acme-textarea-wrapper relative">
        <textarea
          ref={mergedRef}
          className={cn(
            textareaVariants({ variant }),
            autoResize && 'resize-none overflow-hidden',
            className,
          )}
          maxLength={maxLength}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
        {showCounter && maxLength != null && (
          <div
            className="acme-textarea-counter mt-1 text-right text-xs text-neutral-400"
            data-testid="textarea-counter"
            aria-live="polite"
          >
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
