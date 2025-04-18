import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  const flowersDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const [isFlowersOpen, setIsFlowersOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<'flowers' | 'products' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (hoveredDropdown === 'flowers') {
      setIsFlowersOpen(true);
      setIsProductsOpen(false);
    } else if (hoveredDropdown === 'products') {
      setIsFlowersOpen(false);
      setIsProductsOpen(true);
    } else {
      setIsFlowersOpen(false);
      setIsProductsOpen(false);
    }
  }, [hoveredDropdown]);

  const handleMouseEnter = (dropdown: 'flowers' | 'products') => {
    setHoveredDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="./kranian-logo.png" 
                alt="Kranian Farms Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-kranian-700 font-serif text-2xl font-bold">Kranian Farms</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-kranian-600 transition-colors">Home</Link>

            {/* Flowers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('flowers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-700 hover:text-kranian-600 hover:underline transition-colors flex items-center">
                Flowers <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isFlowersOpen && (
                <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-1"
                  >
                    <Link to="/products?category=summer-flowers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Summer Flowers</Link>
                    <Link to="/products?category=premium-roses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Premium Roses</Link>
                    <Link to="/products?category=spray-roses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Spray Roses</Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-700 hover:text-kranian-600 hover:underline transition-colors flex items-center">
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="py-1"
                  >
                    <Link to="/products?category=vegetables" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vegetables</Link>
                    <Link to="/products?category=herbs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Herbs</Link>
                    <Link to="/products?category=fruits" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fruits</Link>
                  </motion.div>
                </div>
              )}
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-kranian-600 transition-colors">Contacts</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <CartIcon />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <CartIcon />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products?category=summer-flowers" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Summer Flowers</Link>
              <Link to="/products?category=premium-roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Premium Roses</Link>
              <Link to="/products?category=spray-roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Spray Roses</Link>
              <Link to="/products?category=vegetables" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Vegetables</Link>
              <Link to="/products?category=herbs" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Herbs</Link>
              <Link to="/products?category=fruits" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Fruits</Link>
              <Link to="/contact" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Contacts</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
