import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, Calendar, Clock, TrendingUp, Star } from 'lucide-react';
import BlogSidebar from '@/components/BlogSidebar';
import Footer from '@/components/Footer';
import InstagramSection from '@/components/InstagramSection';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Get featured posts (first 4 posts for hero cards)
  const featuredPosts = blogPosts.slice(0, 4);
  const trendingPosts = blogPosts.slice(0, 6);

  // Animated headlines
  const headlines = [
    "Stories & Insights from the Farm",
    "Discover Sustainable Agriculture",
    "From Seed to Harvest Tales",
    "Innovation in Modern Farming"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  useEffect(() => {
    let posts = blogPosts;
    
    if (categoryParam) {
      posts = posts.filter(
        (post) => post.category.toLowerCase().replace(/\s+/g, '-') === categoryParam
      );
    } else if (tagParam) {
      posts = posts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === tagParam));
    }

    setFilteredPosts(posts);
    setActiveFilter(
      categoryParam ? `Category: ${categoryParam}` :
      tagParam ? `Tag: ${tagParam}` : ''
    );

    window.scrollTo(0, 0);
  }, [categoryParam, tagParam, location.search]);

  const categories = React.useMemo(() => {
    return Array.from(
      new Set(blogPosts.map((post) => post.category))
    ).map((category) => ({
      name: category,
      count: blogPosts.filter((post) => post.category === category).length,
    }));
  }, []);

  const allTags = React.useMemo(() => blogPosts.flatMap((post) => post.tags), []);

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
      {/* Modern Green Gradient Background - Replaces white strip */}
      <div className="w-full h-32 bg-gradient-to-b from-green-600 via-green-500 to-green-400 dark:from-green-700 dark:via-green-600 dark:to-green-500"></div>
      
      {/* Hero Section - Now seamlessly connected */}
      <section className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 dark:from-green-500 dark:via-emerald-600 dark:to-teal-700 text-white py-24 -mt-32">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10 pt-32">
          <div className="text-center mb-16">
            {/* Animated Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 h-20 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentHeadlineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  {headlines[currentHeadlineIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12"
            >
              Discover the latest trends in sustainable agriculture and farming innovation
            </motion.p>
          </div>

          {/* Featured Posts Scrolling Animation */}
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex space-x-8"
              animate={{ x: [0, -120, 0] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "linear"
              }}
            >
              {[...featuredPosts, ...featuredPosts].map((post, index) => (
                <motion.div
                  key={`${post.id}-${index}`}
                  className="flex-shrink-0 w-80 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-3 py-1 text-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-2" />
                        <span>{post.readTime} min</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Filter Header */}
            {activeFilter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{activeFilter}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
            )}

            {/* Trending Section */}
            {!activeFilter && (
              <div className="mb-12">
                <div className="flex items-center mb-8">
                  <TrendingUp className="h-6 w-6 text-kranian-600 mr-3" />
                  <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-100">Trending Now</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {trendingPosts.slice(0, 3).map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <Calendar size={12} className="mr-1" />
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <Clock size={12} className="mr-1" />
                            <span>{post.readTime} min</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}

            {/* Main Articles */}
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800 dark:text-gray-100">
                {activeFilter ? 'Results' : 'Latest Articles'}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">No posts found matching your criteria.</p>
                  <Button asChild variant="outline">
                    <Link to="/blog">
                      View all blog posts
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* First post - Large featured */}
                  {filteredPosts.length > 0 && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <Link to={`/blog/${filteredPosts[0].slug}`}>
                            <div className="relative h-64 md:h-full overflow-hidden">
                              <img 
                                src={filteredPosts[0].image} 
                                alt={filteredPosts[0].title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-6 left-6">
                                <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-4 py-2">
                                  {filteredPosts[0].category}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="md:w-1/2 p-8 flex flex-col justify-center">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Calendar size={16} className="mr-2" />
                            <span>{filteredPosts[0].date}</span>
                            <span className="mx-3">•</span>
                            <Clock size={16} className="mr-2" />
                            <span>{filteredPosts[0].readTime} min read</span>
                          </div>
                          <Link to={`/blog/${filteredPosts[0].slug}`}>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors">
                              {filteredPosts[0].title}
                            </h2>
                          </Link>
                          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center">
                            <img 
                              src={filteredPosts[0].author.avatar} 
                              alt={filteredPosts[0].author.name} 
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {filteredPosts[0].author.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )}

                  {/* Grid of remaining posts */}
                  {filteredPosts.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredPosts.slice(1).map((post, index) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (index + 1) * 0.1 }}
                          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link to={`/blog/${post.slug}`}>
                            <div className="relative h-56 overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-3 py-1">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                          
                          <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <Calendar size={14} className="mr-2" />
                              <span>{post.date}</span>
                              <span className="mx-2">•</span>
                              <Clock size={14} className="mr-2" />
                              <span>{post.readTime} min</span>
                            </div>
                            
                            <Link to={`/blog/${post.slug}`}>
                              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
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
              )}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <BlogSidebar
              recentPosts={blogPosts.slice(0, 5)}
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
