import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import VideoShowcase from '@/components/VideoShowcase';
import { Button } from '@/components/ui/button';
import { Globe, Truck, Clock, Award, ShoppingCart } from 'lucide-react';
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

  // Auto-scroll the blog posts carousel
  useEffect(() => {
    if (carouselApi) {
      const interval = setInterval(() => {
        carouselApi.scrollNext();
      }, 8500); // 8.5 seconds per slide
      
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Farm-Fresh Produce */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-md">
                <Clock className="h-6 w-6 text-kranian-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Farm-Fresh Produce</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Harvested same-day, straight from our fields to your table.
                </p>
              </div>
            </div>
            {/* Reliable Delivery */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-md">
                <Truck className="h-6 w-6 text-kranian-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Reliable Delivery</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Free local delivery on orders over KES 5,000.
                </p>
              </div>
            </div>
            {/* Trusted Quality */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-md">
                <Award className="h-6 w-6 text-kranian-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Trusted Quality</h3>
                <p className="mt-1 text-sm text-gray-500">Grown with care. 100% natural, no shortcuts.</p>
              </div>
            </div>
            {/* Sustainable Practices */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-md">
                <Globe className="h-6 w-6 text-kranian-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Sustainable Practices</h3>
                <p className="mt-1 text-sm text-gray-500">We farm with the planet in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase 
        src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
        poster="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        title="Welcome to Kranian Farms" 
        description="Experience our sustainable farming practices and premium quality produce in this short introduction to what makes Kranian Farms special."
      />
      
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
      
      {/* Latest Blog Posts - Updated with Carousel for auto-scroll */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">From Our Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
