
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [sortBy, setSortBy] = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    let filtered = selectedCategory ? getProductsByCategory(selectedCategory) : products;
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setDisplayProducts(filtered);
  }, [selectedCategory, sortBy]);

  const categories = [
    { id: null, name: "All Products" },
    { id: "bouquet", name: "Bouquets" },
    { id: "roses", name: "Roses" },
    { id: "herbs", name: "Herbs" },
    { id: "vegetables", name: "Vegetables" }
  ];

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // This would normally change the URL query param, but for simplicity we'll just set the state
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-kranian-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-2">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "All Products"}
          </h1>
          <p className="text-gray-600">
            Explore our handpicked selection of fresh, quality products
          </p>
        </div>
      </div>
      
      {/* Products Section */}
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white shadow rounded-lg p-6 sticky top-24">
                <h3 className="font-medium text-lg border-b border-gray-200 pb-4 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id || 'all'}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left py-2 px-3 rounded ${
                          selectedCategory === category.id 
                            ? 'bg-kranian-100 text-kranian-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium text-lg border-b border-gray-200 pb-4 mb-4 mt-8">Price Range</h3>
                {/* This would normally be a price range slider or checkboxes, but we'll just show a placeholder */}
                <p className="text-gray-600 text-sm">
                  Price filters coming soon...
                </p>
              </div>
            </div>
            
            {/* Mobile Filters */}
            <div className="md:hidden mb-4">
              <Button 
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} 
                variant="outline" 
                className="w-full flex items-center justify-between"
              >
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {mobileFiltersOpen && (
                <div className="mt-2 p-4 bg-white shadow rounded-lg animate-fade-in">
                  <h3 className="font-medium text-base mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <button
                        key={category.id || 'all'}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`py-1 px-3 rounded-full text-sm ${
                          selectedCategory === category.id 
                            ? 'bg-kranian-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="font-medium text-base mb-2">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              )}
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{displayProducts.length} products</p>
                
                {/* Sort - Desktop */}
                <div className="hidden md:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
              
              {displayProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600">No products found in this category.</p>
                  <Button 
                    onClick={() => setSelectedCategory(null)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    View All Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
