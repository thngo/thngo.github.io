import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dropdown from '../Dropdown';

const mockItems = [
  { label: 'Item 1', path: '/item-1' },
  { label: 'Item 2', path: '/item-2' },
];

describe('Dropdown', () => {
  it('renders with title', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Menu')).toBeInTheDocument();
  });

  it('menu is closed by default', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Test Menu'));
    expect(screen.getByText('Item 1')).toBeVisible();
    expect(screen.getByText('Item 2')).toBeVisible();
  });

  it('closes menu when clicking button again', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    const button = screen.getByText('Test Menu');
    fireEvent.click(button);
    expect(screen.getByText('Item 1')).toBeVisible();
    fireEvent.click(button);
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('closes menu when clicking outside', () => {
    render(
      <div>
        <BrowserRouter>
          <Dropdown title="Test Menu" items={mockItems} />
        </BrowserRouter>
        <div data-testid="outside">Outside</div>
      </div>
    );
    fireEvent.click(screen.getByText('Test Menu'));
    expect(screen.getByText('Item 1')).toBeVisible();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('closes menu when clicking a menu item', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Test Menu'));
    expect(screen.getByText('Item 1')).toBeVisible();
    fireEvent.click(screen.getByText('Item 1'));
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(
      <BrowserRouter>
        <Dropdown title="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Test Menu'));
    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
