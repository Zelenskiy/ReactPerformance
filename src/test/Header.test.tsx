import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the header with title', () => {
    render(<Header />);
    
    expect(screen.getByText('Country Explorer')).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    render(<Header />);
    
    expect(screen.getByText('Click on a country to mark it as visited')).toBeInTheDocument();
  });

  it('is wrapped in a header element', () => {
    const { container } = render(<Header />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('has the correct CSS class', () => {
    const { container } = render(<Header />);
    
    expect(container.querySelector('header')).toHaveClass('app-header');
  });
});
