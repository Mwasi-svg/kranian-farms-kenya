
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import BlogSidebar from '@/components/BlogSidebar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const autoSlideRef = useRef<NodeJS.Timeout>();

  // Get featured posts (first 5 posts)
  const featuredPosts = blogPosts.slice(0, 5);

  useEffect(() => {
    if (categoryParam) {
      setFilteredPosts(
        blogPosts.filter(
          (post) => post.category.toLowerCase().replace(/\s+/g, '-') === categoryParam
        )
      );
    } else if (tagParam) {
      setFilteredPosts(
        blogPosts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === tagParam))
      );
    } else {
      setFilteredPosts(blogPosts.slice(5)); // Skip featured posts in main grid
    }

    setActiveFilter(
      categoryParam ? `Category: ${categoryParam}` :
      tagParam ? `Tag: ${tagParam}` : ''
    );

    window.scrollTo(0, 0);
  }, [categoryParam, tagParam, location.search]);

  // Auto-slide functionality
  useEffect(() => {
    if (!activeFilter) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
      }, 5000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [featuredPosts.length, activeFilter]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const categories = React.useMemo(() => {
    return Array.from(
      new Set(blogPosts.map((post) => post.category))
    ).map((category) => ({
      name: category,
      count: blogPosts.filter((post) => post.category === category).length,
    }));
  }, [blogPosts]);

  const allTags = React.useMemo(() => blogPosts.flatMap((post) => post.tags), [blogPosts]);

  const tagsWithCounts = React.useMemo(() => {
    return Array.from(
      allTags.reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) || 0) + 1);
        return acc;
      }, new Map<string, number>())
    ).map(([name, count]) => ({ name, count }));
  }, [allTags]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {location.pathname !== '/' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-20 left-4 z-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}

      {/* Hero Section with Featured Posts Carousel */}
      {!activeFilter && (
        <section className="relative h-[70vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${featuredPosts[currentSlide]?.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="container mx-auto px-4 text-center text-white">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <Badge className="mb-4 bg-kranian-600 hover:bg-kranian-700 text-white">
                        {featuredPosts[currentSlide]?.category}
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        {featuredPosts[currentSlide]?.title}
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                        {featuredPosts[currentSlide]?.excerpt}
                      </p>
                      <div className="flex items-center justify-center gap-6 text-sm mb-8">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {featuredPosts[currentSlide]?.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          {featuredPosts[currentSlide]?.readTime} min read
                        </div>
                      </div>
                      <Link
                        to={`/blog/${featuredPosts[currentSlide]?.slug}`}
                        className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                      >
                        Read More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{activeFilter}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {!activeFilter && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Latest Stories</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover insights, stories, and tips about sustainable farming and agricultural practices
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Grid */}
          <div className="lg:w-2/3">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-600 dark:text-gray-300 mb-4">No posts found matching your criteria.</p>
                <Link to="/blog" className="text-kranian-600 dark:text-kranian-400 hover:text-kranian-700 dark:hover:text-kranian-300 font-medium">
                  View all blog posts
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative pb-[60%] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="text-gray-600 dark:text-gray-400">{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name} 
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {post.author.name}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <BlogSidebar
              recentPosts={blogPosts.slice(0, 3)}
              categories={categories}
              tags={tagsWithCounts}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
