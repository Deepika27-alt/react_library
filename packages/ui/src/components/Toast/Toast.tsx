import * as React from 'react';
import { cn } from '../../utils/cn';

// ── Icons ────────────────────────────────────────────────────────────────────
const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" fillOpacity="0.15" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12.5 7.5l-5 5M7.5 7.5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" fillOpacity="0.15" />
    <path d="M10 14v-4M10 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="currentColor" fillOpacity="0.15" />
    <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading' | 'default';
export type ToastPosition = 'top-right' | 'bottom-right' | 'top-center';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  description?: string | undefined;
  duration?: number | undefined;
  /** Timestamp when the toast was created. */
  createdAt: number;
  /** Whether auto-dismiss is paused (e.g. on hover). */
  paused?: boolean | undefined;
}

export interface ToastAPI {
  success: (title: string, options?: ToastOptions) => string;
  error: (title: string, options?: ToastOptions) => string;
  info: (title: string, options?: ToastOptions) => string;
  warning: (title: string, options?: ToastOptions) => string;
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    },
    options?: ToastOptions,
  ) => Promise<T>;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export interface ToastOptions {
  description?: string;
  /** Duration in ms before auto-dismiss. @default 5000 */
  duration?: number;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of the toast container. @default 'top-right' */
  position?: ToastPosition;
  /** Maximum number of visible toasts. @default 5 */
  maxVisible?: number;
}

// ── Internals ────────────────────────────────────────────────────────────────
let toastCounter = 0;
function generateId(): string {
  return `toast-${++toastCounter}-${Date.now()}`;
}

type ToastAction =
  | { type: 'ADD'; toast: ToastData }
  | { type: 'UPDATE'; id: string; updates: Partial<ToastData> }
  | { type: 'DISMISS'; id: string }
  | { type: 'DISMISS_ALL' };

function toastReducer(state: ToastData[], action: ToastAction): ToastData[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'UPDATE':
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action.updates } : t,
      );
    case 'DISMISS':
      return state.filter((t) => t.id !== action.id);
    case 'DISMISS_ALL':
      return [];
    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────
const ToastContext = React.createContext<ToastAPI | null>(null);

export function useToast(): ToastAPI {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast() must be used inside <ToastProvider>');
  }
  return ctx;
}

// ── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{
  duration: number;
  paused: boolean;
  onComplete: () => void;
  type: ToastType;
}> = ({ duration, paused, onComplete, type }) => {
  const [progress, setProgress] = React.useState(100);
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>();
  const progressRef = React.useRef(100);

  React.useEffect(() => {
    if (paused || duration <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const step = 100 / (duration / 50); // Update every 50ms
    intervalRef.current = setInterval(() => {
      progressRef.current -= step;
      if (progressRef.current <= 0) {
        progressRef.current = 0;
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        onComplete();
      } else {
        setProgress(progressRef.current);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, paused, onComplete]);

  const colorMap: Record<ToastType, string> = {
    success: 'bg-success-500',
    error: 'bg-danger-500',
    info: 'bg-info-500',
    warning: 'bg-warning-500',
    loading: 'bg-primary-500',
    default: 'bg-neutral-500',
  };

  return (
    <div className="acme-toast-progress absolute bottom-0 left-0 right-0 h-1 bg-black/5 rounded-b-lg overflow-hidden">
      <div
        className={cn('h-full transition-none', colorMap[type])}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// ── Single Toast ─────────────────────────────────────────────────────────────
const iconMap: Record<ToastType, React.FC<{ className?: string }>> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
  loading: InfoIcon,
  default: InfoIcon,
};

const colorClasses: Record<ToastType, string> = {
  success: 'text-success-600',
  error: 'text-danger-600',
  info: 'text-info-600',
  warning: 'text-warning-600',
  loading: 'text-primary-600',
  default: 'text-neutral-600',
};

const ToastItem: React.FC<{
  toast: ToastData;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  const [paused, setPaused] = React.useState(false);
  const Icon = iconMap[toast.type];
  const duration = toast.duration ?? 5000;

  const handleComplete = React.useCallback(() => {
    onDismiss(toast.id);
  }, [onDismiss, toast.id]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'acme-toast',
        'relative flex items-start gap-3',
        'w-80 p-4 pr-10',
        'bg-white border border-neutral-200 rounded-lg shadow-lg',
        'animate-toast-in',
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className={cn('shrink-0 mt-0.5', colorClasses[toast.type])}>
        <Icon />
      </span>

      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-semibold text-neutral-900 leading-snug">
          {toast.title}
        </p>
        {toast.description && (
          <p className="text-xs text-neutral-500 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className={cn(
          'acme-toast-close',
          'absolute top-3 right-3',
          'inline-flex items-center justify-center',
          'rounded-sm p-0.5',
          'text-neutral-400 hover:text-neutral-600',
          'transition-colors',
        )}
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>

      {toast.type !== 'loading' && duration > 0 && (
        <ProgressBar
          duration={duration}
          paused={paused}
          onComplete={handleComplete}
          type={toast.type}
        />
      )}
    </div>
  );
};

// ── Position classes ─────────────────────────────────────────────────────────
const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'bottom-right': 'bottom-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
};

// ── Provider ─────────────────────────────────────────────────────────────────
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxVisible = 5,
}) => {
  const [toasts, dispatch] = React.useReducer(toastReducer, []);

  const api = React.useMemo<ToastAPI>(() => {
    function addToast(type: ToastType, title: string, options?: ToastOptions): string {
      const id = generateId();
      dispatch({
        type: 'ADD',
        toast: {
          id,
          type,
          title,
          description: options?.description,
          duration: options?.duration ?? 5000,
          createdAt: Date.now(),
        },
      });
      return id;
    }

    return {
      success: (title, opts) => addToast('success', title, opts),
      error: (title, opts) => addToast('error', title, opts),
      info: (title, opts) => addToast('info', title, opts),
      warning: (title, opts) => addToast('warning', title, opts),

      promise: async <T,>(
        promise: Promise<T>,
        messages: {
          loading: string;
          success: string | ((data: T) => string);
          error: string | ((err: unknown) => string);
        },
        options?: ToastOptions,
      ): Promise<T> => {
        const id = addToast('loading', messages.loading, {
          ...options,
          duration: 0, // Don't auto-dismiss loading toasts
        });

        try {
          const result = await promise;
          const successMsg = typeof messages.success === 'function'
            ? messages.success(result)
            : messages.success;
          dispatch({
            type: 'UPDATE',
            id,
            updates: {
              type: 'success',
              title: successMsg,
              duration: options?.duration ?? 5000,
              createdAt: Date.now(),
            },
          });
          return result;
        } catch (err) {
          const errorMsg = typeof messages.error === 'function'
            ? messages.error(err)
            : messages.error;
          dispatch({
            type: 'UPDATE',
            id,
            updates: {
              type: 'error',
              title: errorMsg,
              duration: options?.duration ?? 5000,
              createdAt: Date.now(),
            },
          });
          throw err;
        }
      },

      dismiss: (id) => dispatch({ type: 'DISMISS', id }),
      dismissAll: () => dispatch({ type: 'DISMISS_ALL' }),
    };
  }, []);

  const visibleToasts = toasts.slice(-maxVisible);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Toast viewport */}
      <div
        className={cn(
          'acme-toast-viewport',
          'fixed z-[200] flex flex-col gap-2 pointer-events-none',
          positionClasses[position],
        )}
        aria-label="Notifications"
      >
        {visibleToasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={api.dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
