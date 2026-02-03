import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TraNgo from '../TraNgo';

const mockData = {
  aboutMe: {
    title: 'ABOUT ME',
    paragraphs: ['Test paragraph about me'],
    images: ['/test-image.jpg'],
    socials: {
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      googleScholar: 'https://scholar.google.com/test',
    },
  },
  papers: [
    {
      year: 2023,
      authors: 'Test Author',
      title: 'Test Paper',
      url: 'https://example.com/paper',
      journal: 'Test Journal',
    },
  ],
  talks: [{ year: 2023, description: 'Test talk description' }],
  awards: [{ year: 2023, name: 'Test Award', institution: 'Test Institution' }],
  miscellaneous: ['Test miscellaneous item'],
  timeline: [
    { title: 'Test Event', institution: 'Test Institution', date: '2023', side: 'left' as const },
  ],
  education: [
    {
      degree: 'Test Degree',
      institution: 'Test University',
      details: ['Detail 1', 'Detail 2'],
    },
  ],
  getInTouch: { email: 'test@example.com', text: 'Get in touch with me' },
};

describe('TraNgo', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('shows loading state initially', () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockImplementation(
      () =>
        new Promise(() => {
          /* never resolves */
        })
    );

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders page data after successful fetch', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test paragraph about me')).toBeInTheDocument();
    });

    expect(screen.getByText('ABOUT ME')).toBeInTheDocument();
    expect(screen.getByText(/Test Paper/i)).toBeInTheDocument();
    expect(screen.getByText('Test talk description')).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load page data/i)).toBeInTheDocument();
    });
  });

  it('handles non-ok response', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load page data/i)).toBeInTheDocument();
    });
  });

  it('renders social links when data is loaded', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(
      () => {
        const links = screen.getAllByRole('link');
        const githubLink = links.find(
          (link) => link.getAttribute('href') === 'https://github.com/test'
        );
        expect(githubLink).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('renders timeline when data is loaded', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Test Event')).toBeInTheDocument();
        const institutions = screen.getAllByText('Test Institution');
        expect(institutions.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('renders contact section', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <BrowserRouter>
        <TraNgo />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Get in touch with me')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
    });
  });
});
