import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';


const Blog: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar is typically included in App.tsx, but adding here if needed */}
      {/* <Navbar /> */}

      {/* Page Header */}
      <div className="bg-kranian-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-2">Our Blog</h1>
          <p className="text-gray-600">
            Stay updated with the latest news, tips, and stories from Kranian Farms.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* You will add your blog post listing here */}
      </div>

      <Footer /> {/* Include your Footer component */}
    </div>
  );
};

export default Blog;