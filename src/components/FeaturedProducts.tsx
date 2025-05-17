
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/data/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4); // Only show 4 products

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 dark:text-gray-100">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Discover our handpicked selection of seasonal favorites, expertly curated for their beauty and freshness.
          </p>
        </div>
        
        {/* Non-auto-scrolling Carousel */}
        <div className="mx-auto lg:max-w-7xl">
          <Carousel className="w-full">
            <CarouselContent>
              {featuredProducts.map(product => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/70 hover:bg-white" />
            <CarouselNext className="bg-white/70 hover:bg-white" />
          </Carousel>
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 bg-transparent border-2 border-kranian-400 text-kranian-400 font-medium rounded-md hover:bg-kranian-50 transition-colors duration-200 dark:hover:bg-kranian-600 dark:hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
