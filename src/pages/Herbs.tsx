
import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { products, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Herbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const herbProducts = getProductsByCategory('herbs');

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
          style={{ backgroundImage: "url('/herbs.jpg')" }}
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
            Herbs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-white"
          >
            Versatile, Colourful and Appealing!
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
              <div className="flex justify-center mb-8">
                <Leaf className="h-20 w-20 text-kranian-600" />
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                These leafy green savory plants have aromatic properties that are used for flavoring and garnishing food, they have medicinal purposes and exotic fragrances!
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-5">
                They enhance the flavour of virtually any dish including desserts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                <div className="bg-kranian-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-medium mb-3">Culinary Uses</h3>
                  <p className="text-gray-700">Enhance the flavor of any dish with our fresh herbs.</p>
                </div>
                
                <div className="bg-kranian-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-medium mb-3">Medicinal Benefits</h3>
                  <p className="text-gray-700">Many herbs offer natural healing properties.</p>
                </div>
                
                <div className="bg-kranian-50 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-medium mb-3">Aromatic Properties</h3>
                  <p className="text-gray-700">Enjoy the natural fragrances of our herb selection.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Herb Selection</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {herbProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Herbs;
