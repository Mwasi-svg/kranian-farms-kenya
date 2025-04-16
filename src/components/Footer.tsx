
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">Kranian Farms</h3>
            <p className="text-gray-400 mb-6">
              Growing the finest flowers, herbs, and vegetables with dedication and care since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/products?category=bouquet" className="text-gray-400 hover:text-white transition-colors">Bouquets</Link>
              </li>
              <li>
                <Link to="/products?category=herbs" className="text-gray-400 hover:text-white transition-colors">Herbs & Vegetables</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-kranian-300" />
                <span className="text-gray-400">123 Farm Road, Countryside, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-kranian-300" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-kranian-300" />
                <a href="mailto:info@kranianfarms.com" className="text-gray-400 hover:text-white transition-colors">
                  info@kranianfarms.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kranian Farms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
