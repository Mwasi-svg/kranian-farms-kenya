
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { Calendar, Clock, Tag, ChevronRight, ChevronLeft, User, ArrowLeft } from 'lucide-react';
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
      name: 'Jane Wangui',
      avatar: '/placeholder.svg',
      date: 'May 5, 2023',
      content: 'This was such an informative article! I\'ve been trying to implement sustainable practices in my small garden, and these tips will definitely help. Thank you for sharing your knowledge.',
      likes: 3,
      isLiked: false,
    },
    {
      id: '2',
      name: 'Michael Omondi',
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

  // Enhanced content with better formatting
  const enhancedContent = post.content
    .replace(/^([A-Z][^.!?]*[.!?])/gm, '<p class="drop-cap">$1</p>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-100">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800 dark:text-gray-200">$1</em>')
    .replace(/_(.*?)_/g, '<u class="underline decoration-kranian-600 decoration-2 underline-offset-2">$1</u>')
    .replace(/#{1,6}\s*(.*)/g, (match, p1) => {
      const level = match.indexOf(' ');
      return `<h${level} class="text-${4-level}xl font-serif font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 leading-tight">${p1}</h${level}>`;
    });

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="relative pt-24 pb-16 bg-gradient-to-br from-white via-kranian-50 to-kranian-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-28 left-4 z-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link to="/" className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/blog" className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link 
              to={`/blog?category=${post.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors"
            >
              {post.category}
            </Link>
          </div>
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Badge className="bg-kranian-600 hover:bg-kranian-700 text-white px-4 py-2 text-sm">
              {post.category}
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <div className="flex items-center text-base font-medium text-gray-800 dark:text-gray-200">
                  <User size={16} className="mr-2" />
                  <span>{post.author.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center text-base">
              <Calendar size={18} className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center text-base">
              <Clock size={18} className="mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover" 
            />
          </motion.div>
          
          {/* Social Share Buttons - Top */}
          <div className="flex justify-between items-center mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <span className="mr-4 font-medium">Share this article:</span>
              <SocialShareButtons 
                title={post.title} 
                url={window.location.href} 
                compact={true} 
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-3 font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link key={tag} to={`/blog?tag=${tag}`}>
                    <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-300 transition-colors">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12"
          >
            <div className="p-10 lg:p-16">
              <div 
                className="enhanced-content prose prose-lg lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: enhancedContent }} 
              />
            </div>
          </motion.article>
          
          {/* Author Bio */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gradient-to-r from-kranian-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg mb-12"
          >
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-20 h-20 rounded-full mr-6 object-cover border-4 border-white shadow-lg"
              />
              <div>
                <Link to="/contact#team" className="story-link">
                  <h3 className="font-bold text-2xl mb-2 text-gray-800 dark:text-gray-200 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                    About {post.author.name}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {post.author.name} is a director at Kranian Farms with over 10 years of experience in sustainable agriculture.
                  Their passion for innovative farming methods and environmental conservation drives the company's vision.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Social Share Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-12">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">Share this article</h3>
                <SocialShareButtons 
                  title={post.title} 
                  url={window.location.href} 
                />
              </div>
              <div className="text-right text-gray-500 dark:text-gray-400">
                <div className="text-lg font-medium mb-2">Comments: {commentCount}</div>
                <div className="text-base">Read time: {post.readTime} min</div>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
            <CommentSection 
              postId={post.id} 
              postSlug={post.slug}
              comments={initialComments} 
            />
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map(relatedPost => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Button 
              variant="outline" 
              onClick={() => navigate('/blog')} 
              className="dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 px-6 py-3"
            >
              <ChevronLeft className="mr-2" /> Back to Blog
            </Button>
            <Link to="/contact">
              <Button className="bg-kranian-600 hover:bg-kranian-700 dark:bg-kranian-500 dark:hover:bg-kranian-600 px-6 py-3">
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
