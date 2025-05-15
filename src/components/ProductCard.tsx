
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.bestseller && (
            <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col items-center justify-center">
          <h3 className="font-medium text-lg mb-1 text-gray-800 text-center">{product.name}</h3>
          <p className="text-kranian-700 mb-2 text-center">Request Quotation</p>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <Button onClick={handleAddToCart} className="w-full bg-kranian-600 hover:bg-kranian-700 text-white">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
