
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialStats: React.FC = () => {
  const stats = [
    { 
      platform: 'Facebook', 
      followers: '25K', 
      icon: <Facebook size={24} />,
      color: '#1877F2',
      username: '@kranianfarms'
    },
    { 
      platform: 'Instagram', 
      followers: '48K', 
      icon: <Instagram size={24} />,
      color: '#E1306C',
      username: '@kranianfarms'
    },
    { 
      platform: 'TikTok', 
      followers: '62K', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.321 7.272C17.63 7.272 16.185 6.15 15.769 4.582V4.334H12.621V15.683C12.621 17.178 11.409 18.39 9.914 18.39C8.419 18.39 7.207 17.178 7.207 15.683C7.207 14.188 8.419 12.976 9.914 12.976C10.177 12.976 10.428 13.011 10.668 13.082V9.829C10.421 9.798 10.171 9.781 9.914 9.781C6.656 9.781 4 12.435 4 15.683C4 18.93 6.656 21.586 9.914 21.586C13.171 21.586 15.827 18.93 15.827 15.683V9.706C17.059 10.585 18.537 11 20.037 11V7.805C19.794 7.821 19.563 7.823 19.321 7.272Z" fill="#EE1D52"/>
        </svg>
      ),
      color: '#EE1D52',
      username: '@kranianfarms'
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.a 
            key={stat.platform}
            href={`https://${stat.platform.toLowerCase()}.com/${stat.username.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <div className="p-2 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{stat.username}</p>
                <p className="text-xs text-gray-500">{stat.platform}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.followers}</p>
              <p className="text-xs text-gray-500">followers</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialStats;
