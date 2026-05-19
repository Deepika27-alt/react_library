import { render, screen } from '@testing-library/react';
import { Stat } from './Stat';

describe('Stat', () => {
  it('renders label and value', () => {
    render(<Stat label="Revenue" value="$42,000" data-testid="stat" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$42,000')).toBeInTheDocument();
  });

  it('renders upward trend', () => {
    render(
      <Stat
        label="Users"
        value="1,234"
        trend={{ direction: 'up', value: '12.5%' }}
        data-testid="stat"
      />,
    );
    expect(screen.getByText('12.5%')).toBeInTheDocument();
    const trend = screen.getByText('12.5%').closest('.acme-stat-trend');
    expect(trend?.className).toContain('text-success-600');
  });

  it('renders downward trend', () => {
    render(
      <Stat
        label="Churn"
        value="5.2%"
        trend={{ direction: 'down', value: '3.1%' }}
        data-testid="stat"
      />,
    );
    expect(screen.getByText('3.1%')).toBeInTheDocument();
    const trend = screen.getByText('3.1%').closest('.acme-stat-trend');
    expect(trend?.className).toContain('text-danger-600');
  });

  it('renders icon slot', () => {
    render(
      <Stat
        label="Orders"
        value={99}
        icon={<span data-testid="icon">📦</span>}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render trend when not provided', () => {
    const { container } = render(<Stat label="Metric" value="100" />);
    expect(container.querySelector('.acme-stat-trend')).toBeNull();
  });

  it('forwards className', () => {
    render(<Stat label="X" value="Y" className="extra" data-testid="stat" />);
    expect(screen.getByTestId('stat').className).toContain('extra');
  });
});
