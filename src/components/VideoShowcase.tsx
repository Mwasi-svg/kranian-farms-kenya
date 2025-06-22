
import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoShowcaseProps {
  src: string;
  poster?: string;
  title: string;
  description: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ src, poster, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Check if the src is an Instagram URL
  const isInstagramUrl = src.includes('instagram.com');

  const handleClick = () => {
    if (isInstagramUrl) {
      // Open Instagram video in new tab
      window.open(src, '_blank');
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 dark:text-gray-300">{description}</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative rounded-lg overflow-hidden shadow-xl">
          <div 
            className="relative aspect-video cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            {isInstagramUrl ? (
              // Instagram preview with click to open
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center relative">
                <img 
                  src={poster || "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"}
                  alt={title}
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Instagram overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div 
                      className={cn(
                        "w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center mb-4 mx-auto transition-all transform",
                        isHovered ? "scale-110 bg-opacity-100" : "scale-100"
                      )}
                    >
                      <Play size={36} className="text-pink-600 ml-1" />
                    </div>
                    <p className="text-lg font-medium mb-2">Watch on Instagram</p>
                    <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                      <ExternalLink size={16} />
                      <span>Click to open</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Regular video player for non-Instagram URLs
              <video 
                className="w-full h-full object-cover"
                poster={poster}
                controls
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {isInstagramUrl && (
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Click the video above to watch our latest content on Instagram
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoShowcase;
