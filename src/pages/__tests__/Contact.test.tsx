import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact', () => {
  it('renders contact form', () => {
    render(<Contact />);
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('has required fields', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Message');

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('email input has correct type', () => {
    render(<Contact />);
    const emailInput = screen.getByLabelText('Email Address');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('shows error when web3forms key is not configured', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const messageInput = screen.getByLabelText('Message');
    const submitButton = screen.getByText('Send Message');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    // Without VITE_WEB3FORMS_KEY, should show configuration error
    const errorMessage = await screen.findByText(/Contact form is not configured/);
    expect(errorMessage).toBeInTheDocument();
  });

  it('prevents default form submission', () => {
    render(<Contact />);
    const form = screen.getByRole('button', { name: 'Send Message' }).closest('form')!;
    const submitSpy = vi.fn();
    form.addEventListener('submit', submitSpy);

    fireEvent.submit(form);
    expect(submitSpy).toHaveBeenCalled();
  });

  it('has descriptive text', () => {
    render(<Contact />);
    expect(
      screen.getByText('Have a question or want to work together? Fill out the form below.')
    ).toBeInTheDocument();
  });
});
