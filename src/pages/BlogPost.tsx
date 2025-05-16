import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { Calendar, Clock, Tag, ChevronRight, ChevronLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogPostCard from '@/components/BlogPostCard';
import CommentSection, { Comment } from '@/components/CommentSection';
import SocialShareButtons from '@/components/SocialShareButtons';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [commentCount, setCommentCount] = useState<number>(0);
  const fromSearch = location.state?.fromSearch;
  
  const post = slug ? getBlogPostBySlug(slug) : null;
  const relatedPosts = post ? getRelatedPosts(post.id, 2) : [];
  
  // Mock comments
  const initialComments: Comment[] = [
    {
      id: '1',
      name: 'Jane Smith',
      avatar: '/placeholder.svg',
      date: 'May 5, 2023',
      content: 'This was such an informative article! I\'ve been trying to implement sustainable practices in my small garden, and these tips will definitely help. Thank you for sharing your knowledge.',
      likes: 3,
      isLiked: false,
    },
    {
      id: '2',
      name: 'Michael Johnson',
      avatar: '/placeholder.svg',
      date: 'May 3, 2023',
      content: 'I\'ve been following Kranian Farms for a while now, and your commitment to sustainable farming is truly inspiring. Would love to see more content about water conservation techniques!',
      likes: 7,
      isLiked: true,
      replies: [
        {
          id: '2-1',
          name: 'Rachel Muturi',
          avatar: '/placeholder.svg',
          date: 'May 4, 2023',
          content: 'Thanks for your suggestion, Michael! We\'re actually working on a comprehensive guide about water conservation that should be published next month. Stay tuned!',
          likes: 2,
          isLiked: false,
        }
      ]
    }
  ];

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
    
    // Calculate comment count including replies
    const storedComments = localStorage.getItem(`blog-comments-${slug}`);
    const comments = storedComments ? JSON.parse(storedComments) : initialComments;
    
    const count = comments.reduce((total: number, comment: Comment) => 
      total + 1 + (comment.replies?.length || 0), 0);
    
    setCommentCount(count);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [post, navigate, slug, initialComments]);

  if (!post) {
    return null;
  }

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: fromSearch ? 0 : 1,
      y: fromSearch ? 20 : 0
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
    >
      {/* Post Header */}
      <div className="bg-kranian-100 dark:bg-gray-800 pt-16 pb-14">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/blog" className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link 
              to={`/blog?category=${post.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors"
            >
              {post.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{post.title}</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1" />
              <span>{post.category}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-lg overflow-hidden mb-8 shadow-lg"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover" 
            />
          </motion.div>
          
          {/* Social Share Buttons - Top */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <span className="mr-2">Share this article:</span>
              <SocialShareButtons 
                title={post.title} 
                url={window.location.href} 
                compact={true} 
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link key={tag} to={`/blog?tag=${tag}`}>
                    <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="prose lg:prose-lg prose-headings:font-serif prose-headings:text-gray-800 dark:prose-headings:text-gray-100 
                      prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-kranian-600 dark:prose-a:text-kranian-400 
                      prose-img:rounded-lg prose-li:text-gray-600 dark:prose-li:text-gray-300 
                      max-w-none mb-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.article>
          
          {/* Author Bio - Updated with link to contact page */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-10"
          >
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <Link to="/contact#team" className="story-link">
                  <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400">
                    About {post.author.name}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.author.name} is a director at Kranian Farms with over 10 years of experience in sustainable agriculture.
                  Their passion for innovative farming methods and environmental conservation drives the company's vision.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Social Share Buttons - Bottom */}
          <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Share this article</h3>
              <SocialShareButtons 
                title={post.title} 
                url={window.location.href} 
              />
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="block mb-2">Comments: {commentCount}</span>
              <span>Read time: {post.readTime} min</span>
            </div>
          </div>
          
          {/* Comments Section */}
          <CommentSection 
            postId={post.id} 
            postSlug={post.slug}
            comments={initialComments} 
          />
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-gray-100">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Post Navigation - Change button text */}
          <div className="flex justify-between mt-10 mb-16">
            <Button variant="outline" onClick={() => navigate('/blog')} className="dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
              <ChevronLeft className="mr-1" /> Back to Blog
            </Button>
            <Link to="#comments">
              <Button className="bg-kranian-600 hover:bg-kranian-700 dark:bg-kranian-500 dark:hover:bg-kranian-600">
                Request Quotation
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default BlogPost;
