import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from './Select';

// Mock ResizeObserver since Radix UI uses it for popovers/dropdowns
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe('Select', () => {
  it('renders trigger with placeholder and displays dropdown on click', async () => {
    const onValueChange = vi.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger aria-label="Choose fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole('combobox', { name: /choose fruit/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select a fruit');

    // Click trigger to open dropdown
    fireEvent.click(trigger);

    // Items should be displayed (Radix might render in Portal or asynchronously)
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    // Select 'Banana'
    fireEvent.click(screen.getByText('Banana'));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('respects defaultValue', () => {
    render(
      <Select defaultValue="banana">
        <SelectTrigger aria-label="Choose fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Banana');
  });

  it('supports trigger sizes and variant configurations', () => {
    const { rerender } = render(
      <Select>
        <SelectTrigger size="sm" variant="error" aria-label="Select">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('acme-select-trigger--error');
    expect(trigger).toHaveClass('h-8');

    rerender(
      <Select>
        <SelectTrigger size="lg" variant="default" aria-label="Select">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    const trigger2 = screen.getByRole('combobox');
    expect(trigger2).toHaveClass('acme-select-trigger--default');
    expect(trigger2).toHaveClass('h-12');
  });

  it('disables the trigger when disabled is true', () => {
    render(
      <Select disabled>
        <SelectTrigger aria-label="Choose fruit">
          <SelectValue />
        </SelectTrigger>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders labels and separators in dropdown correctly', async () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select group">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectSeparator data-testid="separator" />
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    // Open dropdown
    fireEvent.click(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  it('forwards ref correctly to components', () => {
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
      <Select>
        <SelectTrigger ref={triggerRef} aria-label="Select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent ref={contentRef}>
          <SelectItem value="1">One</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
  });
});
