
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for user's preference on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
                      (!localStorage.getItem('theme') && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      toast({
        title: "Dark mode enabled",
        description: "The website is now in dark mode.",
        duration: 2000
      });
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      toast({
        title: "Light mode enabled",
        description: "The website is now in light mode.",
        duration: 2000
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {isDark ? 
        <Sun className="h-5 w-5 text-yellow-400" /> : 
        <Moon className="h-5 w-5" />
      }
    </Button>
  );
};

export default ThemeToggle;
