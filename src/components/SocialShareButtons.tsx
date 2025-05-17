
import React from 'react';
import { Facebook, Twitter, Link, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareButtonsProps {
  title: string;
  url: string;
  compact?: boolean;
  className?: string;  // Added className prop
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ 
  title, 
  url, 
  compact = false,
  className = ''  // Added default value
}) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
  };
  
  const shareByEmail = () => {
    window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, '_blank');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  const buttonClass = compact ? 'w-8 h-8 p-0' : '';
  const iconSize = compact ? 16 : 18;
  
  return (
    <div className={`flex ${compact ? 'gap-2' : 'gap-3'} ${className}`}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={shareToFacebook}
        className={`hover:bg-blue-100 hover:text-blue-600 hover:border-blue-200 ${buttonClass}`}
        title="Share on Facebook"
      >
        <Facebook size={iconSize} />
        {!compact && <span className="ml-1">Facebook</span>}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={shareToTwitter}
        className={`hover:bg-sky-100 hover:text-sky-500 hover:border-sky-200 ${buttonClass}`}
        title="Share on Twitter"
      >
        <Twitter size={iconSize} />
        {!compact && <span className="ml-1">Twitter</span>}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={shareByEmail}
        className={`hover:bg-amber-100 hover:text-amber-600 hover:border-amber-200 ${buttonClass}`}
        title="Share via Email"
      >
        <Mail size={iconSize} />
        {!compact && <span className="ml-1">Email</span>}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={copyLink}
        className={`hover:bg-violet-100 hover:text-violet-600 hover:border-violet-200 ${buttonClass}`}
        title="Copy link"
      >
        <Link size={iconSize} />
        {!compact && <span className="ml-1">Copy Link</span>}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
