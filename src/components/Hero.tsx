
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Growing Quality, Harvesting Success",
    description: "At Kranian Farms, we're committed to sustainable farming practices that produce the finest crops while respecting our environment and local communities.",
    bgImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Fresh Produce, Delivered with Care",
    description: "Experience the difference of locally-grown, ethically harvested produce that goes from our farm to your table with minimal environmental impact.",
    bgImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  },
  {
    title: "Farming for a Sustainable Future",
    description: "Our innovative farming techniques focus on conservation, biodiversity, and reducing our carbon footprint while maximizing crop yield and quality.",
    bgImage: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[current].bgImage})`,
              height: '100vh',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
            >
              {slides[current].description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Button 
                onClick={() => navigate('/products')}
                className="bg-kranian-600 hover:bg-kranian-700 text-white px-8 py-6 text-lg"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/about')}
                className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
              >
                About Us
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <div className="absolute bottom-1/2 left-4 md:left-10 transform translate-y-1/2 z-20">
          <Button 
            onClick={prevSlide} 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute bottom-1/2 right-4 md:right-10 transform translate-y-1/2 z-20">
          <Button 
            onClick={nextSlide} 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
          >
            <ChevronRight />
          </Button>
        </div>
        
        {/* Dots navigation */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
