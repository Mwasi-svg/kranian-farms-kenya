
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';

// Navigation menu item with dropdown
interface NavMenuItemProps {
  label: string;
  children: React.ReactNode;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative" 
      ref={ref} 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors flex items-center"
      >
        {label} <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    if (query) {
      const results = products.filter(product =>
        product.name.toLowerCase().startsWith(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="./kranian-logo.png" 
                alt="Kranian Farms Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-kranian-700 dark:text-white font-serif text-2xl font-bold">Kranian Farms</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Home</Link>

            {/* Flowers Dropdown */}
            <NavMenuItem label="Flowers">
              <Link to="/products?category=summer-flowers" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Summer Flowers
              </Link>
              <Link to="/products?category=premium-roses" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Premium Roses
              </Link>
              <Link to="/products?category=spray-roses" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Spray Roses
              </Link>
              <Link to="/products?category=intermediate-roses" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Intermediate Roses
              </Link>
            </NavMenuItem>
            
            <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Blog</Link>
            
            {/* Products Dropdown */}
            <NavMenuItem label="Products">
              <Link to="/products?category=vegetables" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Vegetables
              </Link>
              <Link to="/products?category=herbs" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Herbs
              </Link>
              <Link to="/products?category=fruits" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Fruits
              </Link>
            </NavMenuItem>

            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Contacts</Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center relative space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-kranian-500 text-sm w-64"
              />
              {searchResults.length > 0 && (
                <ul className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                  {searchResults.map(product => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => handleSearchResultClick(product.id)}
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ThemeToggle />
            <CartIcon />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <CartIcon />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 pb-4">
                <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/products?category=summer-flowers" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Summer Flowers</Link>
                <Link to="/products?category=premium-roses" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Premium Roses</Link>
                <Link to="/products?category=spray-roses" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Spray Roses</Link>
                <Link to="/products?category=intermediate-roses" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Intermediate Roses</Link>
                <Link to="/products?category=vegetables" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Vegetables</Link>
                <Link to="/products?category=herbs" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Herbs</Link>
                <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Contacts</Link>
                <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
