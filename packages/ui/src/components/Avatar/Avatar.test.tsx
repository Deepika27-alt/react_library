import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders standard fallback indicator when no name or src is provided', () => {
    render(<Avatar />);
    const avatar = screen.getByText('?');
    expect(avatar).toBeInTheDocument();
  });

  it('renders correct initials for name with multiple parts', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByLabelText('John Doe')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles name with leading/trailing whitespaces', () => {
    render(<Avatar name="  bob Smith  " />);
    expect(screen.getByText('BS')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(img).toHaveAttribute('alt', 'Test User');
  });

  it('falls back to initials when image fail to load', () => {
    render(<Avatar src="invalid-url" name="Error User" />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    
    // Simulate load error
    fireEvent.error(img);
    
    // Image should be removed and initials displayed
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('EU')).toBeInTheDocument();
  });

  it('applies sizes correctly', () => {
    const { container } = render(<Avatar size="lg" />);
    expect(container.firstChild).toHaveClass('acme-avatar--lg');
  });

  it('forwards ref to the outer element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has correct displayName', () => {
    expect(Avatar.displayName).toBe('Avatar');
  });
});

describe('AvatarGroup', () => {
  it('renders children and wraps them in group spacing classes', () => {
    render(
      <AvatarGroup>
        <Avatar name="User A" />
        <Avatar name="User B" />
      </AvatarGroup>,
    );
    expect(screen.getByText('UA')).toBeInTheDocument();
    expect(screen.getByText('UB')).toBeInTheDocument();
  });

  it('respects the max limit and shows overflow count', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User A" />
        <Avatar name="User B" />
        <Avatar name="User C" />
        <Avatar name="User D" />
      </AvatarGroup>,
    );
    expect(screen.getByText('UA')).toBeInTheDocument();
    expect(screen.getByText('UB')).toBeInTheDocument();
    expect(screen.queryByText('UC')).not.toBeInTheDocument();
    expect(screen.queryByText('UD')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getByLabelText('2 more')).toBeInTheDocument();
  });

  it('forwards ref to group wrapper', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <AvatarGroup ref={ref}>
        <Avatar name="User A" />
      </AvatarGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct displayName', () => {
    expect(AvatarGroup.displayName).toBe('AvatarGroup');
  });
});
