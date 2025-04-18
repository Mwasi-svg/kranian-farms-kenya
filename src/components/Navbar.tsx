import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const flowersDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
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

            {/* Flowers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-kranian-600 hover:underline transition-colors flex items-center">
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
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-kranian-600 hover:underline transition-colors flex items-center">
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
