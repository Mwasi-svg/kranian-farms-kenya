
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/products" className="text-gray-700 hover:text-kranian-600 transition-colors">All Products</Link>
            <Link to="/products?category=bouquet" className="text-gray-700 hover:text-kranian-600 transition-colors">Bouquets</Link>
            <Link to="/products?category=roses" className="text-gray-700 hover:text-kranian-600 transition-colors">Roses</Link>
            <Link to="/products?category=herbs" className="text-gray-700 hover:text-kranian-600 transition-colors">Herbs</Link>
            <Link to="/products?category=vegetables" className="text-gray-700 hover:text-kranian-600 transition-colors">Vegetables</Link>
          </div>

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

        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>All Products</Link>
              <Link to="/products?category=bouquet" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Bouquets</Link>
              <Link to="/products?category=roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Roses</Link>
              <Link to="/products?category=herbs" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Herbs</Link>
              <Link to="/products?category=vegetables" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Vegetables</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
