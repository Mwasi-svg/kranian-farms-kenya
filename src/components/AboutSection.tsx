
import React from 'react';
import { Truck, Globe, LeafyGreen, Heart } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">About Kranian Farms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From our fields to your doorstep, we're passionate about delivering nature's beauty and bounty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/instagram4.jpg" 
              alt="Kranian Farms" 
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-6">
              Kranian Farms was founded with a simple mission:
             </p>
             <p className="text-gray-700 mb-6"> 
              To share the joy of beautiful flowers and fresh produce with our community. What began as a small family garden has grown into a thriving farm that serves customers locally and internationally.
            </p>
            <p className="text-gray-600">
              We pride ourselves on sustainable growing practices that respect both nature and our customers. Every flower bouquet is arranged with care, and every vegetable is harvested at peak freshness—because we believe quality matters.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="bg-kranian-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LeafyGreen className="h-8 w-8 text-kranian-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Fresh Products</h3>
            <p className="text-gray-600">Handpicked daily for maximum freshness and longevity.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-kranian-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-kranian-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Local Delivery</h3>
            <p className="text-gray-600">Delivery available for local customers.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-kranian-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-kranian-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">International Shipping</h3>
            <p className="text-gray-600">We export to European and Middle Eastern countries.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-kranian-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-kranian-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Grown with Love</h3>
            <p className="text-gray-600">Sustainable and ethical farming practices.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
