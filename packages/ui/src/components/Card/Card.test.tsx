import { render, screen } from '@testing-library/react';
import { Card, cardVariants } from './Card';

describe('Card', () => {
  it('renders with default "elevated" variant', () => {
    render(<Card data-testid="card">Content</Card>);
    const el = screen.getByTestId('card');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('acme-card--elevated');
    expect(el.textContent).toBe('Content');
  });

  it('applies outlined variant', () => {
    render(<Card variant="outlined" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('acme-card--outlined');
  });

  it('applies filled variant', () => {
    render(<Card variant="filled" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('acme-card--filled');
  });

  it('forwards className', () => {
    render(<Card className="extra" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('extra');
  });
});

describe('Card.Header', () => {
  it('renders with acme-card-header class', () => {
    render(<Card.Header data-testid="hdr">Title</Card.Header>);
    const el = screen.getByTestId('hdr');
    expect(el.className).toContain('acme-card-header');
    expect(el.textContent).toBe('Title');
  });
});

describe('Card.Body', () => {
  it('renders with acme-card-body class', () => {
    render(<Card.Body data-testid="body">Body</Card.Body>);
    const el = screen.getByTestId('body');
    expect(el.className).toContain('acme-card-body');
  });
});

describe('Card.Footer', () => {
  it('renders with acme-card-footer class', () => {
    render(<Card.Footer data-testid="footer">Footer</Card.Footer>);
    const el = screen.getByTestId('footer');
    expect(el.className).toContain('acme-card-footer');
  });
});

describe('Card compound composition', () => {
  it('renders all sub-components together', () => {
    render(
      <Card data-testid="card">
        <Card.Header data-testid="hdr">Header</Card.Header>
        <Card.Body data-testid="body">Body</Card.Body>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('hdr').textContent).toBe('Header');
    expect(screen.getByTestId('body').textContent).toBe('Body');
    expect(screen.getByTestId('footer').textContent).toBe('Footer');
  });
});

describe('cardVariants', () => {
  it('generates class string for each variant', () => {
    expect(cardVariants({ variant: 'elevated' })).toContain('acme-card--elevated');
    expect(cardVariants({ variant: 'outlined' })).toContain('acme-card--outlined');
    expect(cardVariants({ variant: 'filled' })).toContain('acme-card--filled');
  });
});
