import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Reset the menu if screen is large
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Friends', path: '/setup' },
    { name: 'Account', path: '/resources' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-medium text-gray-900">Make Friends</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-lg font-medium relative
                    ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
                    transition-all duration-300
                    group`}
                >
                  {item.name}
                  {/* Hover animation for underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600
                      transform origin-bottom scale-x-0 transition-transform duration-300 ease-out
                      ${location.pathname === item.path ? 'scale-x-100' : 'group-hover:scale-x-100'}`}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isMobile && isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium
                ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
                transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
              {/* Mobile underline animation */}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600
                  transform ${location.pathname === item.path ? 'translate-x-0' : '-translate-x-full'}
                  transition-transform duration-300 ease-out`}
              ></span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
