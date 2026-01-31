import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Represents an item in the dropdown menu
 */
interface DropdownItem {
  /** Display text for the menu item */
  label: string;
  /** React Router path to navigate to */
  path: string;
}

/**
 * Props for the Dropdown component
 */
interface DropdownProps {
  /** Text displayed on the dropdown button */
  title: string;
  /** Array of navigation links to display in the menu */
  items: DropdownItem[];
}

/**
 * Dropdown navigation menu component with click-outside detection
 *
 * Features:
 * - Opens/closes on button click
 * - Automatically closes when clicking outside the menu
 * - Smooth rotation animation for the chevron icon
 * - Accessible with ARIA attributes
 *
 * @param props - Component props
 * @param props.title - Text displayed on the dropdown button
 * @param props.items - Array of navigation links to display in the menu
 *
 * @example
 * ```tsx
 * <Dropdown
 *   title="Profiles"
 *   items={[
 *     { label: 'Tra Ngo', path: '/profiles/tra-ngo' },
 *     { label: 'Amy Ngo', path: '/profiles/amy-ngo' }
 *   ]}
 * />
 * ```
 */
const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium focus:outline-none flex items-center"
      >
        {title}
        <svg
          className={`ml-1 h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
