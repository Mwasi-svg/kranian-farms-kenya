
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 z-0">
        <img 
          src="/placeholder.svg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
        />
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 dark:text-white mb-4"
        >
          Growing Quality, <br />Harvesting Success
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
        >
          At Kranian Farms, we're committed to sustainable farming practices that produce the finest crops while respecting our environment and local communities.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Button 
            onClick={() => navigate('/products')}
            className="bg-kranian-600 hover:bg-kranian-700 text-white dark:bg-kranian-500 dark:hover:bg-kranian-600 px-8 py-6 text-lg"
          >
            Explore Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/about')}
            className="border-kranian-600 text-kranian-600 hover:bg-kranian-50 dark:border-kranian-400 dark:text-kranian-400 dark:hover:bg-kranian-900/50 px-8 py-6 text-lg"
          >
            About Us
          </Button>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
