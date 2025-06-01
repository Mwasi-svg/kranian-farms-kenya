
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
      className={`group bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700
                 ${featured ? 'md:col-span-2' : ''}`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? 'pb-[45%]' : 'pb-[60%]'}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-3 py-1.5 text-sm font-medium">
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
      <div className={`p-6 flex flex-col flex-grow ${featured ? 'p-8' : ''}`}>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center mr-6">
            <Calendar size={16} className="mr-2" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="inline-block">
          <h3 className={`font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-kranian-600 dark:group-hover:text-kranian-400 transition-colors leading-tight
                         ${featured ? 'text-3xl' : 'text-xl'}`}>
            <span className="story-link"><span>{post.title}</span></span>
          </h3>
        </Link>
        
        <p className={`text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed ${featured ? 'text-lg' : 'text-base'}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className={`rounded-full mr-3 object-cover ${featured ? 'w-12 h-12' : 'w-10 h-10'}`}
          />
          <span className={`font-medium text-gray-700 dark:text-gray-300 ${featured ? 'text-base' : 'text-sm'}`}>
            {post.author.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
