
import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import VideoShowcase from '@/components/VideoShowcase';
import { Button } from '@/components/ui/button';
import { Globe, Truck, Clock, Award, ShoppingCart, Target, Telescope, Shield, Star } from 'lucide-react';
import { getBestsellerProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { getRecentBlogPosts } from '@/data/blogPosts';
import BlogPostCard from '@/components/BlogPostCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const Index = () => {
  const bestsellers = getBestsellerProducts().slice(0, 3);
  const recentBlogPosts = getRecentBlogPosts(6); // Get more blog posts for scrolling
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselApi, setCarouselApi] = React.useState<any>(null);
  const [bestsellerCarouselApi, setBestsellerCarouselApi] = React.useState<any>(null);

  // Auto-scroll the blog posts carousel
  useEffect(() => {
    if (carouselApi) {
      const interval = setInterval(() => {
        carouselApi.scrollNext();
      }, 8500); // 8.5 seconds per slide
      
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  // Auto-scroll the bestseller products carousel
  useEffect(() => {
    if (bestsellerCarouselApi) {
      const interval = setInterval(() => {
        bestsellerCarouselApi.scrollNext();
      }, 5000); // 5 seconds per slide
      
      return () => clearInterval(interval);
    }
  }, [bestsellerCarouselApi]);

  return (
    <div className="h-50 flex flex-col dark:bg-gray-900">
      <Hero />
      {/* Video Showcase */}
      
      <VideoShowcase
        src="https://www.youtube.com/watch?v=fyqttjeM8Ps" 
        poster="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        title="Welcome to Kranian Farms" 
        description="Experience our sustainable farming practices and premium quality produce in this short introduction to what makes Kranian Farms special."
      />
      
      {/* Why Choose Kranian Farms Section */}
      <section className="py-10 bg-white dark:bg-gray-900 dark:bg-opacity-90 shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold  dark:text-gray-100 text-gray-800 mb-6">Why Choose Kranian Farms?</h2>
          <p className="text-xl text-gray-600 max-w-3xl  dark:text-gray-300 mx-auto">
            Well, the answer is unexpectedly simple: we offer the best produce of the highest quality and at highly competitive prices.
          </p>
        </div>
      </section>

      {/* Company Values Section - Now with icons */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-90 dark:text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission and Vision */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 bg-kranian-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-kranian-600" />
                </div>
                <div>
                  <h3 className="text-xl  font-bold dark:text-white text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    To build a long term relationship with our customers and provide top quality products.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-kranian-100 p-3 rounded-full">
                  <Telescope className="h-6 w-6 text-kranian-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white  mb-3">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    To be a partner of choice in providing quality fresh fruits and vegetables and honey.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Core Values and Forte */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mr-4 bg-kranian-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-kranian-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white  mb-3">Our Core Values</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Integrity, trustworthiness and honesty are integral together with partnership. 
                    We insist on principles and ethical business practices.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-kranian-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-kranian-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white  mb-3">Our Forte</h3>
                  <ul className="list-disc space-y-1 text-gray-600 dark:text-gray-300">
                    <p>Strong and viable partnerships,
                    Quality and Timely delivery,
                    Industry knowledge,
                    Excellent Customer Service</p>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      {/* Bestsellers Section - Updated with auto-scroll */}
      <section className="py-16 bg-white dark:bg-gray-900 dark:bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 dark:text-gray-100">Customer Favorites</h2>
            <p className="text-gray-600 max-w-2xl dark:text-gray-300 mx-auto">
              Our most popular products that customers love and purchase again and again.
            </p>
          </div>
          
          <div className="mx-auto max-w-7xl">
            <Carousel
              setApi={setBestsellerCarouselApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {bestsellers.map(product => (
                  <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/70 hover:bg-white" />
              <CarouselNext className="bg-white/70 hover:bg-white" />
            </Carousel>
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
      
      {/* Latest Blog Posts - Updated with Carousel for auto-scroll */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-4">From Our Blog</h2>
            <p className="text-gray-600 max-w-2xl dark:text-gray-300 mx-auto">
              Discover farming tips, sustainability insights, and the latest news from Kranian Farms.
            </p>
          </div>
          
          <Carousel
            setApi={setCarouselApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {recentBlogPosts.map((post) => (
                <CarouselItem key={post.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <BlogPostCard post={post} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/70 hover:bg-white" />
            <CarouselNext className="bg-white/70 hover:bg-white" />
          </Carousel>
          
          <div className="text-center mt-12">
            <Link 
              to="/blog" 
              className="inline-block px-6 py-3 bg-kranian-600 text-white font-medium rounded-md hover:bg-kranian-700 transition-colors duration-200"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>
      
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
