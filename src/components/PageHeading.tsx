
import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  centered?: boolean;
}

const PageHeading: React.FC<PageHeadingProps> = ({ 
  title, 
  description, 
  centered = true 
}) => {
  return (
    <div className={`bg-kranian-100 dark:bg-gray-800 py-8 ${centered ? 'text-center' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
