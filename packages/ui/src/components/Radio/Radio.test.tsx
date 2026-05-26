import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { RadioGroup, RadioGroupItem } from './Radio';

describe('RadioGroup & RadioGroupItem', () => {
  it('renders standard unchecked group and handles clicks', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="option-1" aria-label="Option One" />
        <RadioGroupItem value="option-2" aria-label="Option Two" />
      </RadioGroup>,
    );

    const radio1 = screen.getByRole('radio', { name: 'Option One' });
    const radio2 = screen.getByRole('radio', { name: 'Option Two' });

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio1).not.toBeChecked();

    // Click item 1
    fireEvent.click(radio1);
    expect(onValueChange).toHaveBeenCalledWith('option-1');
  });

  it('renders orientation classes correctly', () => {
    const { container: containerVert } = render(
      <RadioGroup orientation="vertical">
        <RadioGroupItem value="1" />
      </RadioGroup>,
    );
    expect(containerVert.firstChild).toHaveClass('acme-radio-group--vertical');

    const { container: containerHoriz } = render(
      <RadioGroup orientation="horizontal">
        <RadioGroupItem value="1" />
      </RadioGroup>,
    );
    expect(containerHoriz.firstChild).toHaveClass('acme-radio-group--horizontal');
  });

  it('respects default initial values', () => {
    render(
      <RadioGroup defaultValue="option-2">
        <RadioGroupItem value="option-1" aria-label="Option One" />
        <RadioGroupItem value="option-2" aria-label="Option Two" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Option One' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option Two' })).toBeChecked();
  });

  it('supports disabled radio state', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="option-1" aria-label="Option One" disabled />
        <RadioGroupItem value="option-2" aria-label="Option Two" />
      </RadioGroup>,
    );

    const radio1 = screen.getByRole('radio', { name: 'Option One' });
    expect(radio1).toBeDisabled();

    fireEvent.click(radio1);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('supports disabled group state', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="option-1" aria-label="Option One" />
        <RadioGroupItem value="option-2" aria-label="Option Two" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Option One' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Option Two' })).toBeDisabled();
  });

  it('applies sizes to items correctly', () => {
    const { container: containerSm } = render(
      <RadioGroup>
        <RadioGroupItem value="1" size="sm" />
      </RadioGroup>,
    );
    expect(containerSm.querySelector('.acme-radio')).toHaveClass('acme-radio--sm');

    const { container: containerLg } = render(
      <RadioGroup>
        <RadioGroupItem value="1" size="lg" />
      </RadioGroup>,
    );
    expect(containerLg.querySelector('.acme-radio')).toHaveClass('acme-radio--lg');
  });

  it('forwards ref correctly to group and item', () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();

    render(
      <RadioGroup ref={groupRef}>
        <RadioGroupItem ref={itemRef} value="option-1" />
      </RadioGroup>,
    );

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has correct displayNames', () => {
    expect(RadioGroup.displayName).toBe('RadioGroup');
    expect(RadioGroupItem.displayName).toBe('RadioGroupItem');
  });
});
