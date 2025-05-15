
import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { products, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Vegetables: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vegetableProducts = getProductsByCategory('vegetables');

  return (
    <div className="min-h-screen flex flex-col">
      {location.pathname !== '/' && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition-colors duration-200 shadow-md"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
      )}

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/vegetables.png')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Vegetables
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-white"
          >
            Exciting Taste Experience!
          </motion.p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="prose prose-lg mx-auto"
            >
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                It is said that we feast with our eyes, before we taste the bounty which lies before us. Certainly how else should one describe the colourful array and radiance of the fresh vegetables Kranian Farms offers your customers.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                With thousands of varieties, shapes, colours, flavours and sizes – beans and peas represent a significant component of the world's vegetables and underpin all of the major cuisines. They have a history which dates back to ancient times.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                From tender young broad beans (or fava beans) to snappy, juicy pods of snow peas – these vegetables offer an exciting taste experience for consumers of every nationality and palate.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                Vegetables are the staple of our life, no matter which cuisine we prefer. They are nutritionally dense and provide many a health and dietary benefits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Vegetable Selection</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vegetableProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vegetables;
