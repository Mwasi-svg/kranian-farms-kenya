
import React, { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const InstagramSection: React.FC = () => {
  const [followerCount] = useState('2.1K'); // Placeholder - would be dynamic with API
  const instagramHandle = 'kranianfarmkenya';
  const instagramUrl = 'https://www.instagram.com/kranianfarmkenya/';

  // Mock Instagram posts data - would come from Instagram API
  const mockPosts = [
    {
      id: '1',
      image: '/instagram1.jpg',
      likes: 234,
      comments: 12,
      caption: 'Fresh vegetables from our farm 🥬🥕'
    },
    {
      id: '2',
      image: '/instagram2.jpg',
      likes: 187,
      comments: 8,
      caption: 'Seasonal fruits harvest 🍎🍊'
    },
    {
      id: '3',
      image: '/instagram3.jpg',
      likes: 156,
      comments: 15,
      caption: 'Aromatic herbs collection 🌿'
    },
    {
      id: '4',
      image: '/instagram4.jpg',
      likes: 298,
      comments: 23,
      caption: 'Kranian Farms - Quality you can trust 🌱'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-full">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Stay connected with our daily farm life and fresh produce updates
          </p>
          
          {/* Instagram Handle and Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <img 
                    src="/kranian-logo.png" 
                    alt="Kranian Farms" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              @{instagramHandle}
            </h3>
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{followerCount}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1.2K</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">450</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
              </div>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              onClick={() => window.open(instagramUrl, '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Follow on Instagram
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => window.open(instagramUrl, '_blank')}
            >
              <img 
                src={post.image} 
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-1" />
                    <span className="font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span className="font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Don't miss our latest updates and behind-the-scenes content!
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-kranian-600 text-kranian-600 hover:bg-kranian-600 hover:text-white dark:border-kranian-400 dark:text-kranian-400 dark:hover:bg-kranian-400 dark:hover:text-gray-900"
            onClick={() => window.open(instagramUrl, '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            View More on Instagram
          </Button>
        </motion.div>

        {/* Integration Note */}
        
      </div>
    </section>
  );
};

export default InstagramSection;
