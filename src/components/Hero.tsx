
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-48 flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
          Beautiful Blooms, <br className="hidden sm:block" /> Fresh from Our Farm
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mb-8">
          Kranian Farms delivers the freshest flowers, herbs, and vegetables locally and internationally. Grown with love, delivered with care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-kranian-600 hover:bg-kranian-700 text-white">
            <Link to="/products">
              Shop Our Collection
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
            <Link to="/products?category=bouquet">
              Browse Bouquets
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
