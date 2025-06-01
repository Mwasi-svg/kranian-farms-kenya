
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
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
  const location = useLocation();
  const navigate = useNavigate();

  // Get featured posts (first 3 posts for hero cards)
  const featuredPosts = blogPosts.slice(0, 3);

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
      setFilteredPosts(blogPosts.slice(3)); // Skip featured posts in main grid
    }

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-20">
        {location.pathname !== '/' && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-24 left-4 z-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Hero Section with Featured Posts Cards */}
        {!activeFilter && (
          <section className="relative py-20 bg-gradient-to-br from-kranian-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Latest Stories
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                >
                  Discover insights, stories, and tips about sustainable farming and agricultural practices
                </motion.p>
              </div>

              {/* Featured Posts Scrolling Animation */}
              <div className="relative overflow-hidden">
                <motion.div 
                  className="flex space-x-8"
                  animate={{ x: [0, -120, 0] }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {[...featuredPosts, ...featuredPosts].map((post, index) => (
                    <motion.div
                      key={`${post.id}-${index}`}
                      className="flex-shrink-0 w-96 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                      whileHover={{ y: -8 }}
                    >
                      <Link to={`/blog/${post.slug}`}>
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-6 left-6">
                            <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-3 py-1 text-sm">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <Calendar size={16} className="mr-2" />
                            <span>{post.date}</span>
                            <span className="mx-3">•</span>
                            <Clock size={16} className="mr-2" />
                            <span>{post.readTime} min read</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-base leading-relaxed">
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
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16 flex-grow">
          {activeFilter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{activeFilter}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content Grid */}
            <div className="lg:w-2/3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">No posts found matching your criteria.</p>
                  <Link to="/blog" className="text-kranian-600 dark:text-kranian-400 hover:text-kranian-700 dark:hover:text-kranian-300 font-medium">
                    View all blog posts
                  </Link>
                </div>
              ) : (
                <>
                  {/* First post - Large featured */}
                  {filteredPosts.length > 0 && (
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-12 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to={`/blog/${filteredPosts[0].slug}`}>
                        <div className="relative h-96 overflow-hidden">
                          <img 
                            src={filteredPosts[0].image} 
                            alt={filteredPosts[0].title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-8 left-8">
                            <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-4 py-2">
                              {filteredPosts[0].category}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-10">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <Calendar size={18} className="mr-2" />
                            <span>{filteredPosts[0].date}</span>
                            <span className="mx-3">•</span>
                            <Clock size={18} className="mr-2" />
                            <span>{filteredPosts[0].readTime} min read</span>
                          </div>
                          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                            {filteredPosts[0].title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed mb-8">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center">
                            <img 
                              src={filteredPosts[0].author.avatar} 
                              alt={filteredPosts[0].author.name} 
                              className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <span className="font-medium text-gray-700 dark:text-gray-300 text-lg">
                              {filteredPosts[0].author.name}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  )}

                  {/* Remaining posts - 2 column grid */}
                  {filteredPosts.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {filteredPosts.slice(1).map((post, index) => (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (index + 1) * 0.1 }}
                          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Link to={`/blog/${post.slug}`} className="block">
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
                          
                          <div className="p-8">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <Calendar size={16} className="mr-2" />
                              <span>{post.date}</span>
                              <span className="mx-2">•</span>
                              <Clock size={16} className="mr-2" />
                              <span>{post.readTime} min read</span>
                            </div>
                            
                            <Link to={`/blog/${post.slug}`} className="block">
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center">
                              <img 
                                src={post.author.avatar} 
                                alt={post.author.name} 
                                className="w-10 h-10 rounded-full mr-3 object-cover"
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
                </>
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
    </div>
  );
};

export default Blog;
