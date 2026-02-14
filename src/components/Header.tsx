import { Link, NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';

function Header() {
  const profileItems = [
    { label: 'Tra Ngo', path: '/profiles/tra-ngo' },
    { label: 'Amy Ngo', path: '/profiles/amy-ngo' },
  ];

  const miscItems = [{ label: 'SMI-FSM', path: '/misc/smi-fsm' }];

  const navLinkClasses =
    'text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium';
  const activeLinkClasses = 'text-gray-900 font-bold';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              NGO
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/about"
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              About
            </NavLink>
            <Dropdown title="Profiles" items={profileItems} />
            <Dropdown title="Misc" items={miscItems} />
            <NavLink
              to="/contact"
              className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
