
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  return (
    <motion.div 
      className={`group bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700
                 ${featured ? 'md:col-span-2' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative pb-[56.25%] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-0 left-0 p-2">
            <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white">{post.category}</Badge>
          </div>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="inline-block">
          <h3 className={`font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors 
                         ${featured ? 'text-2xl' : 'text-xl'}`}>
            <span className="story-link">{post.title}</span>
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow leading-relaxed">{post.excerpt}</p>
        
        <div className="flex items-center mt-auto">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.author.name}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
