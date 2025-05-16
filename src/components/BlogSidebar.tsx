
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import BlogSearch from './BlogSearch';
import SocialStats from './SocialStats';
import Newsletter from './Newsletter';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ recentPosts, categories, tags }) => {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Search</h3>
        <BlogSearch />
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <div key={post.id} className="flex items-start">
              <Link to={`/blog/${post.slug}`} className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </Link>
              <div className="ml-3">
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="text-sm font-medium hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors line-clamp-2 story-link"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.name} className="flex justify-between items-center">
              <Link 
                to={`/blog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-700 dark:text-gray-300 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors story-link"
              >
                {category.name}
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link key={tag.name} to={`/blog?tag=${tag.name.toLowerCase()}`}>
              <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 cursor-pointer">
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Social Stats - Updated for dark mode consistency */}
      <SocialStats />

      {/* Newsletter - Already has consistent styling */}
      <Newsletter />
    </div>
  );
};

export default BlogSidebar;
