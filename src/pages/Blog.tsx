
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import BlogPostCard from '@/components/BlogPostCard';
import BlogSidebar from '@/components/BlogSidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ChevronRight, Calendar } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('');
  
  useEffect(() => {
    if (categoryParam) {
      setFilteredPosts(blogPosts.filter(post => 
        post.category.toLowerCase().replace(/\s+/g, '-') === categoryParam
      ));
      setActiveFilter(`Category: ${categoryParam}`);
    } else if (tagParam) {
      setFilteredPosts(blogPosts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === tagParam)
      ));
      setActiveFilter(`Tag: ${tagParam}`);
    } else {
      setFilteredPosts(blogPosts);
      setActiveFilter('');
    }
  }, [categoryParam, tagParam]);

  // Generate categories for sidebar
  const categories = Array.from(
    new Set(blogPosts.map(post => post.category))
  ).map(category => ({
    name: category,
    count: blogPosts.filter(post => post.category === category).length
  }));

  // Generate tags for sidebar
  const allTags: string[] = blogPosts.flatMap(post => post.tags);
  const tagsWithCounts = Array.from(
    allTags.reduce((acc, tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count }));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Page Header */}
      <div className="bg-kranian-100 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">Kranian Farms Blog</h1>
            <p className="text-gray-600 text-lg">
              Insights, stories, and tips about sustainable farming, floriculture, and agricultural practices
            </p>
            
            {/* Breadcrumb */}
            <div className="flex justify-center items-center mt-6 text-sm text-gray-500">
              <Link to="/" className="hover:text-kranian-600 transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-700 font-medium">Blog</span>
              {activeFilter && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span className="text-kranian-600 font-medium">{activeFilter}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {activeFilter && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{activeFilter}</h2>
                <p className="text-gray-600">
                  Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} 
                  {' '} for {activeFilter}
                </p>
              </div>
            )}
            
            {/* Featured Post */}
            {!activeFilter && filteredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                  <Calendar className="mr-2" />
                  Featured Post
                </h2>
                <BlogPostCard post={filteredPosts[0]} featured={true} />
              </div>
            )}
            
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.length === 0 ? (
                <div className="md:col-span-2 p-8 text-center bg-white rounded-lg shadow">
                  <p className="text-gray-600 mb-2">No posts found matching your criteria.</p>
                  <Link 
                    to="/blog" 
                    className="text-kranian-600 hover:text-kranian-700 font-medium"
                  >
                    View all blog posts
                  </Link>
                </div>
              ) : (
                filteredPosts.slice(activeFilter ? 0 : 1).map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <BlogSidebar 
              recentPosts={blogPosts.slice(0, 3)} 
              categories={categories}
              tags={tagsWithCounts}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
