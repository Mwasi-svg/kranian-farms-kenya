import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';
import { Newsletter } from '@/components/Newsletter';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ recentPosts, categories, tags }) => {
  return (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">About Kranian Farms</h3>
        <div className="flex items-center mb-4">
          <img 
            src="/public/rachel.png" 
            alt="Rachel Muturi" 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100">Rachel Muturi</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Director</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          At Kranian Farms, we're passionate about delivering fresh, quality produce while building sustainable farming practices for the future.
        </p>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
              <div className="flex items-start space-x-3">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/blog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-kranian-600 dark:group-hover:text-kranian-400">
                {category.name}
              </span>
              <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <Link 
              key={tag.name}
              to={`/blog?tag=${tag.name.toLowerCase()}`}
              className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-kranian-100 dark:hover:bg-kranian-800 text-gray-700 dark:text-gray-300 hover:text-kranian-600 dark:hover:text-kranian-400 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};

export default BlogSidebar;
