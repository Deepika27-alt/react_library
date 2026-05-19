import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';

function ToastTester() {
  const toast = useToast();
  return (
    <div>
      <button onClick={() => toast.success('Success!')}>Show Success</button>
      <button onClick={() => toast.error('Error!')}>Show Error</button>
      <button onClick={() => toast.info('Info!', { description: 'Details' })}>Show Info</button>
      <button onClick={() => toast.dismissAll()}>Dismiss All</button>
    </div>
  );
}

describe('ToastProvider + useToast', () => {
  it('throws when used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ToastTester />)).toThrow();
    spy.mockRestore();
  });

  it('renders success toast', () => {
    render(<ToastProvider><ToastTester /></ToastProvider>);
    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders error toast', () => {
    render(<ToastProvider><ToastTester /></ToastProvider>);
    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('renders toast with description', () => {
    render(<ToastProvider><ToastTester /></ToastProvider>);
    fireEvent.click(screen.getByText('Show Info'));
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('dismisses all toasts', () => {
    render(<ToastProvider><ToastTester /></ToastProvider>);
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Dismiss All'));
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('respects maxVisible', () => {
    render(<ToastProvider maxVisible={1}><ToastTester /></ToastProvider>);
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });
});
