import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Truck, Clock, Award } from 'lucide-react';
import { getBestsellerProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const bestsellers = getBestsellerProducts().slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center p-4">
              <Clock className="h-8 w-8 text-kranian-600 mr-3" />
              <div>
                <h3 className="font-medium">Fresh Daily</h3>
                <p className="text-sm text-gray-600">Hand-picked each morning</p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <Truck className="h-8 w-8 text-kranian-600 mr-3" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <ShoppingCart className="h-8 w-8 text-kranian-600 mr-3" />
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center p-4">
              <Award className="h-8 w-8 text-kranian-600 mr-3" />
              <div>
                <h3 className="font-medium">Quality Guaranteed</h3>
                <p className="text-sm text-gray-600">Fresh or your money back</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      
      {/* Bestsellers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Customer Favorites</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular products that customers love and purchase again and again.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-kranian-600 text-white font-medium rounded-md hover:bg-kranian-700 transition-colors duration-200"
            >
              Shop All Bestsellers
            </Link>
          </div>
        </div>
      </section>

      {/* Export/Shipping Banner */}
      <section className="py-12 bg-cover bg-center relative" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">We Ship Worldwide</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Kranian Farms proudly exports our premium flowers and specialty produce to Europe and the Middle East. Experience the freshness, no matter where you are.
          </p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <Link to="/products">
              Learn About Our Shipping
            </Link>
          </Button>
        </div>
      </section>
      
      <AboutSection />
      
      {/* Newsletter Section */}
      <section className="py-12 bg-kranian-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Subscribe to receive updates on new arrivals, special offers, and gardening tips.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kranian-500"
            />
            <Button className="bg-kranian-600 hover:bg-kranian-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
