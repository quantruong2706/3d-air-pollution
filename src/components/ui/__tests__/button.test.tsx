import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole('button', { name: /destructive button/i });
    expect(button).toHaveClass('bg-destructive');
  });

  it('applies size classes correctly', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('h-8');
  });

  it('passes additional props to the button element', () => {
    render(<Button data-testid="test-button">Test Button</Button>);
    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
  });
});
