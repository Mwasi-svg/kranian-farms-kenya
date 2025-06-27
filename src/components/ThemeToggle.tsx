
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { toast } = useToast();

  // Initialize theme on component mount
  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldBeDark = false;
    
    if (savedTheme === 'dark') {
      shouldBeDark = true;
    } else if (savedTheme === 'light') {
      shouldBeDark = false;
    } else {
      // No saved preference, use system preference
      shouldBeDark = prefersDark;
    }
    
    // Apply theme immediately without animation to prevent flash
    if (shouldBeDark) {
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
      // Switching to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      toast({
        title: "Dark mode enabled",
        description: "The website is now in dark mode.",
        duration: 2000
      });
    } else {
      // Switching to light mode
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
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
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
