import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timeline from '../Timeline';
import { TimelineItem } from '../../types';

const mockTimelineItems: TimelineItem[] = [
  {
    title: 'Event 1',
    institution: 'Institution A',
    date: '2023',
    side: 'left',
  },
  {
    title: 'Event 2',
    institution: 'Institution B',
    date: '2024',
    side: 'right',
  },
  {
    title: 'Event 3',
    institution: 'Institution C',
    side: 'left',
  },
];

describe('Timeline', () => {
  it('renders all timeline items', () => {
    render(<Timeline items={mockTimelineItems} />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
  });

  it('renders institutions for each item', () => {
    render(<Timeline items={mockTimelineItems} />);
    expect(screen.getByText('Institution A')).toBeInTheDocument();
    expect(screen.getByText('Institution B')).toBeInTheDocument();
    expect(screen.getByText('Institution C')).toBeInTheDocument();
  });

  it('renders dates when provided', () => {
    render(<Timeline items={mockTimelineItems} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('handles items without dates', () => {
    render(<Timeline items={mockTimelineItems} />);
    // Event 3 has no date, but should still render
    expect(screen.getByText('Event 3')).toBeInTheDocument();
    expect(screen.getByText('Institution C')).toBeInTheDocument();
  });

  it('renders with empty items array', () => {
    const { container } = render(<Timeline items={[]} />);
    expect(container.querySelector('.relative')).toBeInTheDocument();
  });

  it('renders timeline structure', () => {
    const { container } = render(<Timeline items={mockTimelineItems} />);
    // Check for timeline line
    const timelineLine = container.querySelector('.bg-gray-300');
    expect(timelineLine).toBeInTheDocument();
  });
});
