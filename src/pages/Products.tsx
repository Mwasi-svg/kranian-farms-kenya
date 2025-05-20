import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products as allProducts, getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import PageHeading from '@/components/PageHeading';
import SocialShareButtons from '@/components/SocialShareButtons';


const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [displayProducts, setDisplayProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    let filtered = selectedCategory ? getProductsByCategory(selectedCategory) : allProducts;
    
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
    { id: "intermediate-roses", name: "Intermediate Roses" },
    { id: "summer-flowers", name: "Summer Flowers" },
    { id: "premium-roses", name: "Premium Roses" },
    { id: "spray-roses", name: "Spray Roses" },
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" },
    { id: "herbs", name: "Herbs" }
  ];

  const handleCategoryChange = (category: string | null) => {
    if (category === null) {
      setSearchParams({}); // Remove category param for "All Products"
    } else {
      setSearchParams({ category });
    }
    setSelectedCategory(category); // Also update local state for immediate UI change
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Back Button - Conditionally rendered */}
      {location.pathname !== '/' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      )}
      
      {/* Page Header - Using standardized PageHeading with centered text */}
      <PageHeading 
        title={selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || "Products" : "All Products"}
        description="Explore our handpicked selection of fresh, quality products"
        centered={true}
      />
      
      {/* Products Section */}
      <section className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sticky top-24">
                <h3 className="font-medium text-lg border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 text-gray-800 dark:text-gray-100">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id || 'all'}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left py-2 px-3 rounded ${
                          selectedCategory === category.id 
                            ? 'bg-kranian-100 dark:bg-kranian-950 text-kranian-700 dark:text-kranian-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium text-lg border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 mt-8 text-gray-800 dark:text-gray-100">Price Range</h3>
                {/* This would normally be a price range slider or checkboxes, but we'll just show a placeholder */}
                <p className="text-gray-600 dark:text-gray-400 text-sm">
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
                <div className="mt-2 p-4 bg-white dark:bg-gray-800 shadow rounded-lg animate-fade-in">
                  <h3 className="font-medium text-base mb-2 text-gray-800 dark:text-gray-100">Categories</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                      <button
                        key={category.id || 'all'}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`py-1 px-3 rounded-full text-sm ${
                          selectedCategory === category.id 
                            ? 'bg-kranian-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  
                  <h3 className="font-medium text-base mb-2 text-gray-800 dark:text-gray-100">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price (USD): Low to High</option>
                    <option value="price-high">Price (USD): High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  
                  {/* Mobile Social Stats */}
                  <div className="mt-6 mb-4">
                    
                  </div>
                  
                  {/* Mobile Social Share Buttons */}
                  <h3 className="font-medium text-base mt-4 mb-2 text-gray-800 dark:text-gray-100">Share</h3>
                  <SocialShareButtons 
                    title="Check out these amazing products from Kranian Farms" 
                    url={window.location.href} 
                    className="justify-center"
                  />
                </div>
              )}
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 dark:text-gray-400">{displayProducts.length} products</p>
                
                {/* Sort - Desktop */}
                <div className="hidden md:block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price (USD): Low to High</option>
                    <option value="price-high">Price (USD): High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
              
              {displayProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 dark:text-gray-400">No products found in this category.</p>
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
