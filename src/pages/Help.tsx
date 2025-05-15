// src/pages/Help.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Help: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-kranian-700 mb-8">Help & Support</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-700 mb-6">
          Welcome to our Help & Support page. Here you can find answers to frequently asked questions or get in touch with our support team.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {/* Placeholder FAQs - Replace with actual content */}
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">How do I place an order?</h3>
            <p className="text-sm text-gray-600">
              To place an order, simply browse our products, add items to your cart, and proceed to checkout.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">What are your delivery options?</h3>
            <p className="text-sm text-gray-600">
              We offer various delivery options, including standard and express shipping. You can select your preferred option at checkout.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-700">How can I contact customer support?</h3>
            <p className="text-sm text-gray-600">
              You can contact our customer support team via email at support@kranianfarms.com or by phone at (123) 456-7890.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any further questions or need assistance, please don't hesitate to reach out to us.
          </p>
          <Button asChild className="mt-4 bg-kranian-600 hover:bg-kranian-700 text-white">
            <Link to="/contact">Go to Contact Page</Link>  {/* Assuming you have a Contact page */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Help;