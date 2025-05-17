
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send, ArrowUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="relative">
          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="absolute -top-12 right-0 bg-kranian-600 hover:bg-kranian-700 p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center mb-4">
              <span className="h-8 w-8 bg-kranian-500 rounded-full flex items-center justify-center mr-3">
                <span className="font-serif font-bold text-xl">K</span>
              </span>
              <h3 className="text-2xl font-serif">Kranian Farms</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Growing the finest flowers, herbs, and vegetables with dedication and care since 2010. From seed to bouquet, we bring nature's beauty to your doorstep.
            </p>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ y: -3 }} className="text-gray-400 hover:text-kranian-400 transition-colors">
                <Facebook size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-gray-400 hover:text-kranian-400 transition-colors">
                <Instagram size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3 }} className="text-gray-400 hover:text-kranian-400 transition-colors">
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 pb-2 border-b border-gray-800">Quick Links</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=intermediate-roses" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Roses
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=herbs" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Herbs & Vegetables
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 pb-2 border-b border-gray-800">Customer Service</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Shipping Policy
                    <ExternalLink size={14} className="ml-1 opacity-70" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Returns & Refunds
                    <ExternalLink size={14} className="ml-1 opacity-70" />
                  </a>
                </li>
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 h-0.5 bg-kranian-400 mr-0 group-hover:mr-2"></span>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-5 pb-2 border-b border-gray-800">Stay Connected</h4>
            <form onSubmit={handleSubscribe} className="mb-6">
              <p className="text-gray-400 mb-3">Subscribe for garden tips and exclusive offers</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-kranian-500"
                  required
                />
                <Button type="submit" size="icon" className="bg-kranian-600 hover:bg-kranian-700">
                  <Send size={16} />
                </Button>
              </div>
            </form>
            
            <h5 className="font-medium mb-3">Contact Information</h5>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin size={18} className="mr-2 text-kranian-400 flex-shrink-0" />
                <span>123 Farm Road, Countryside, Country</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2 text-kranian-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2 text-kranian-400 flex-shrink-0" />
                <a href="mailto:info@kranianfarms.com" className="hover:text-white transition-colors">
                  info@kranianfarms.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Kranian Farms. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
