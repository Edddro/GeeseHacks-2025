import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Friends', path: '/friends' },
    { name: 'Account', path: '/account' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-medium text-gray-900">Geese Buds</span>
            </Link>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search Location"
                className="px-3 py-2 border rounded-full focus:ring-blue-500 focus:border-blue-500 text-black pl-10"
              />
              <Search className="absolute left-3 h-5 w-5 text-gray-500" />
              <button className="absolute right-3 flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <MapPin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
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
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600
                    transform origin-bottom scale-x-0 transition-transform duration-300 ease-out
                    ${location.pathname === item.path ? 'scale-x-100' : 'group-hover:scale-x-100'}`}
                ></span>
              </Link>
            ))}
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

      {/* Mobile Menu */}
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
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;