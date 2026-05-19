import { render, screen, fireEvent } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';

describe('Popover', () => {
  it('renders trigger element', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('does not show content initially (uncontrolled)', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders controlled (open=true)', () => {
    render(
      <Popover open>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>Controlled content</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText('Controlled content')).toBeInTheDocument();
  });

  it('renders close button when showClose=true', () => {
    render(
      <Popover open>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent showClose>Close me</PopoverContent>
      </Popover>,
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });
});
