
import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, ArrowLeft, ShoppingCart, Tag, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const stemLengths = [50, 60, 70, 80, 90, 100];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const product = id ? getProductById(Number(id)) : null;
  const [quantity, setQuantity] = useState(300);
  const [inputQuantity, setInputQuantity] = useState(String(300));
  const [stemLength, setStemLength] = useState<number>(60); // Default to 60cm

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Button asChild className="dark:bg-kranian-600 dark:hover:bg-kranian-700 dark:text-white">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const validateAndSetQuantity = (value: number) => {
    const newQuantity = Math.max(300, Math.min(30000, value));
    setQuantity(newQuantity);
    setInputQuantity(String(newQuantity));
  };

  const handleQuantityChange = (value: number) => {
    validateAndSetQuantity(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const relatedProducts = getProductsByCategory(product.category)
    .filter(item => item.id !== product.id)
    .slice(0, 3);

  const shuffledRelatedProducts = [...relatedProducts];
  for (let i = shuffledRelatedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledRelatedProducts[i], shuffledRelatedProducts[j]] = [
      shuffledRelatedProducts[j],
      shuffledRelatedProducts[i],
    ];
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 relative">
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img 
                src={`/${product.image}`}
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="dark:text-gray-100">
            <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h1>
            
            {/* Category Badge */}
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-kranian-100 text-kranian-700 dark:bg-kranian-800 dark:text-kranian-300">
              <Tag className="h-4 w-4 mr-1" />
              {capitalizeFirstLetter(product.category)}
            </div>
            
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 my-6">
              {/* Modern styled description */}
              <Card className="mb-6 bg-gray-50 dark:bg-gray-800 border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-kranian-600 mr-2 mt-0.5 dark:text-kranian-400" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center mb-6">
                <div className="mr-6">
                  <span className="font-medium dark:text-gray-300">Availability:</span>{' '}
                  <span className={product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Stem Length Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stem Length
                </label>
                <Select 
                  value={String(stemLength)} 
                  onValueChange={(value) => setStemLength(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-40 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {stemLengths.map(length => (
                      <SelectItem key={length} value={String(length)} className="dark:text-gray-200 dark:hover:bg-gray-700">
                        {length} cm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="text-gray-500 dark:text-gray-400 hover:text-kranian-600 dark:hover:text-kranian-400 disabled:text-gray-300 dark:disabled:text-gray-600"
                    disabled={quantity <= 300}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>

                  {/* Input field for direct quantity editing */}
                  <input
                    type="number"
                    min="300"
                    max="30000"
                    className="w-12 text-center font-medium border-none focus:ring-0 dark:bg-gray-800 dark:text-gray-100"
                    style={{ pointerEvents: 'auto' }}
                    value={inputQuantity}
                    onChange={handleInputChange}
                    onBlur={() => {
                      const value = parseInt(inputQuantity, 10);
                      validateAndSetQuantity(isNaN(value) ? 300 : value);
                    }}
                  />

                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="text-gray-500 dark:text-gray-400 hover:text-kranian-600 dark:hover:text-kranian-400 disabled:text-gray-300 dark:disabled:text-gray-600"
                    disabled={quantity >= 30000}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={handleAddToCart}
                  className="bg-kranian-600 hover:bg-kranian-700 text-white flex-grow sm:flex-grow-0 dark:bg-kranian-600 dark:hover:bg-kranian-700"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> 
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2 dark:text-gray-200">Delivery Information</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Local delivery available within 24 hours</li>
                <li>• International shipping to select countries</li>
                <li>• All flowers are fresh-cut and arranged the day of delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledRelatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
