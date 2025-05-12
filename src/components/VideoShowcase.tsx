
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoShowcaseProps {
  src: string;
  poster?: string;
  title: string;
  description: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ src, poster, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{description}</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative rounded-lg overflow-hidden shadow-xl">
          <div 
            className="relative aspect-video"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={poster}
              onClick={togglePlay}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play/Pause overlay button */}
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300",
                isPlaying ? "opacity-0" : "opacity-100"
              )}
            >
              <button
                onClick={togglePlay}
                className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all transform hover:scale-110"
              >
                <Play size={30} className="text-kranian-700 ml-1" />
              </button>
            </div>
            
            {/* Controls */}
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 flex items-center gap-4",
                (showControls || isPlaying) ? "opacity-100" : "opacity-0"
              )}
            >
              <button 
                onClick={togglePlay}
                className="text-white hover:text-kranian-300 transition"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <div className="flex items-center gap-2 ml-auto">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-kranian-300 transition"
                >
                  <VolumeIcon />
                </button>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-kranian-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
