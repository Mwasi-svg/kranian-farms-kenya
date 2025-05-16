
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { ArrowLeft, ChevronRight, Calendar } from 'lucide-react';
import BlogPostCard from '@/components/BlogPostCard';
import BlogSidebar from '@/components/BlogSidebar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeading from '@/components/PageHeading';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {location.pathname !== '/' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}

      <PageHeading
        title="Kranian Farms Blog"
        description="Insights, stories, and tips about sustainable farming, floriculture, and agricultural practices"
      />

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {activeFilter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{activeFilter}</h2>
                <p className="text-gray-600 dark:text-gray-300">
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
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
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
                    className="md:col-span-2 p-8 text-center bg-white dark:bg-gray-800 rounded-lg shadow"
                  >
                    <p className="text-gray-600 dark:text-gray-300 mb-2">No posts found matching your criteria.</p>
                    <Link to="/blog" className="text-kranian-600 dark:text-kranian-400 hover:text-kranian-700 dark:hover:text-kranian-300 font-medium">
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
