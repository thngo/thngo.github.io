import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About', () => {
  it('renders page title', () => {
    render(<About />);
    expect(screen.getByText('About This Site')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<About />);
    const description = screen.getByText(/This is a personal website built with React/i);
    expect(description).toBeInTheDocument();
  });

  it('mentions tech stack', () => {
    render(<About />);
    expect(screen.getByText(/React, TypeScript, and Tailwind CSS/i)).toBeInTheDocument();
  });

  it('describes site purpose', () => {
    render(<About />);
    expect(screen.getByText(/professional portfolio and a hub/i)).toBeInTheDocument();
  });

  it('mentions dynamic content loading', () => {
    render(<About />);
    expect(screen.getByText(/dynamically loaded/i)).toBeInTheDocument();
  });

  it('mentions responsive design', () => {
    render(<About />);
    expect(screen.getByText(/fully responsive/i)).toBeInTheDocument();
  });
});
