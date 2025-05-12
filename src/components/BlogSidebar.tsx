
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ recentPosts, categories, tags }) => {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Search</h3>
        <div className="flex">
          <Input 
            type="text" 
            placeholder="Search articles..." 
            className="flex-grow rounded-r-none focus-visible:ring-kranian-600" 
          />
          <Button className="bg-kranian-600 hover:bg-kranian-700 rounded-l-none">
            <Search size={18} />
          </Button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <div key={post.id} className="flex items-start">
              <Link to={`/blog/${post.slug}`} className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </Link>
              <div className="ml-3">
                <Link to={`/blog/${post.slug}`} className="text-sm font-medium hover:text-kranian-600 transition-colors line-clamp-2">
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.name} className="flex justify-between items-center">
              <Link 
                to={`/blog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-700 hover:text-kranian-600 transition-colors"
              >
                {category.name}
              </Link>
              <span className="text-sm text-gray-500">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link key={tag.name} to={`/blog?tag=${tag.name.toLowerCase()}`}>
              <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer">
                {tag.name} ({tag.count})
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-kranian-100 shadow-md rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-sm text-gray-600 mb-4">Get the latest posts delivered straight to your inbox.</p>
        <Input 
          type="email" 
          placeholder="Your email address" 
          className="mb-3 focus-visible:ring-kranian-600" 
        />
        <Button className="w-full bg-kranian-600 hover:bg-kranian-700">Subscribe</Button>
      </div>
    </div>
  );
};

export default BlogSidebar;
