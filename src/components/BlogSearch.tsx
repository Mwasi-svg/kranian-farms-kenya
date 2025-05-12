
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const BlogSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = blogPosts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.excerpt.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
    );
    
    setSearchResults(results);
    setIsSearching(true);
    
    if (results.length === 0) {
      toast({
        title: "No results found",
        description: "Try different keywords or browse our categories",
        variant: "destructive"
      });
    }
  };

  const handleResultClick = (slug: string) => {
    setSearchResults([]);
    setSearchTerm('');
    setIsSearching(false);
    navigate(`/blog/${slug}`, { state: { fromSearch: true } });
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex">
        <Input 
          type="text" 
          placeholder="Search articles..." 
          className="flex-grow rounded-r-none focus-visible:ring-kranian-600" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" className="bg-kranian-600 hover:bg-kranian-700 rounded-l-none">
          <Search size={18} />
        </Button>
      </form>
      
      <AnimatePresence>
        {isSearching && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden max-h-96 overflow-y-auto"
          >
            <ul className="divide-y divide-gray-100">
              {searchResults.map(result => (
                <motion.li 
                  key={result.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="cursor-pointer"
                  onClick={() => handleResultClick(result.slug)}
                >
                  <div className="flex p-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                      <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{result.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{result.excerpt}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogSearch;
