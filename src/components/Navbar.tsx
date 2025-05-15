import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';
import ThemeToggle from './ThemeToggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { products } from '@/data/products';

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 hover:underline transition-colors flex items-center">
                  Flowers <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 rounded-md">
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=summer-flowers" className="w-full">
                    Summer Flowers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=premium-roses" className="w-full">
                    Premium Roses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=spray-roses" className="w-full">
                    Spray Roses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=intermediate-roses" className="w-full">
                    Intermedieate Roses
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Blog</Link>
            
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 hover:underline transition-colors flex items-center">
                  Products <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 rounded-md">
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=vegetables" className="w-full">Vegetables</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=herbs" className="w-full">Herbs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-geist hover:bg-gray-100 focus:bg-gray-100">
                  <Link to="/products?category=fruits" className="w-full">Fruits</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {searchResults.map(product => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => handleSearchResultClick(product.id)}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
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
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products?category=summer-flowers" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Summer Flowers</Link>
              <Link to="/products?category=premium-roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Premium Roses</Link>
              <Link to="/products?category=spray-roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Spray Roses</Link>
              <Link to="/products?category=intermediate-roses" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Intermedieate Roses</Link>
              <Link to="/products?category=vegetables" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Vegetables</Link>
              <Link to="/products?category=herbs" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Herbs</Link>
              <Link to="/contact" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Contacts</Link>
              <Link to="/blog" className="text-gray-700 hover:text-kranian-600 transition-colors text-lg py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
