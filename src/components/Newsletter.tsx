
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter",
      });
    }, 800);
  };

  return (
    <div className="bg-kranian-100 shadow-md rounded-lg p-5">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">Get the latest posts delivered straight to your inbox.</p>
      
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center justify-center"
          >
            <span className="bg-green-100 rounded-full p-1 mr-2">
              <Check size={16} className="text-green-600" />
            </span>
            <span className="text-green-800 font-medium">Success! Thank you for subscribing.</span>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
          >
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="mb-3 focus-visible:ring-kranian-600" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit"
              className="w-full bg-kranian-600 hover:bg-kranian-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Newsletter;
