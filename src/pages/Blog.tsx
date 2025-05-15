import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, ChevronRight, Calendar } from 'lucide-react';
import BlogPostCard from '@/components/BlogPostCard';
import BlogSidebar from '@/components/BlogSidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';


const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

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
      setFilteredPosts(blogPosts);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {location.pathname !== '/' && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition-colors duration-200 shadow-md"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
      )}

      <div className="bg-kranian-100 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4"
            >
              Kranian Farms Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              Insights, stories, and tips about sustainable farming, floriculture, and agricultural practices
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-center mt-6 text-sm text-gray-500"
            >
              <Link to="/" className="hover:text-kranian-600 transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Blog</span>
              {activeFilter && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="text-kranian-600 font-medium">{activeFilter}</span>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {activeFilter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-semibold mb-2">{activeFilter}</h2>
                <p className="text-gray-600">
                  Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for {activeFilter}
                </p>
              </motion.div>
            )}

            {!activeFilter && filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                  <Calendar className="mr-2" />
                  Featured Post
                </h2>
                <BlogPostCard post={filteredPosts[0]} featured={true} />
              </motion.div>
            )}

            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredPosts.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="md:col-span-2 p-8 text-center bg-white rounded-lg shadow"
                  >
                    <p className="text-gray-600 mb-2">No posts found matching your criteria.</p>
                    <Link to="/blog" className="text-kranian-600 hover:text-kranian-700 font-medium">
                      View all blog posts
                    </Link>
                  </motion.div>
                ) : (
                  filteredPosts.slice(activeFilter ? 0 : 1).map((post) => (
                    <motion.div key={post.id} variants={itemVariants}>
                      <BlogPostCard post={post} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3 mt-8 lg:mt-0"
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
