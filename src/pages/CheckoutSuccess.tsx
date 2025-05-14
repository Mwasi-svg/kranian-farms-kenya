import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Assuming lucide-react for icons

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="container mx-auto px-4 py-8">
      {!isHomePage && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold text-center mb-4">Checkout Success</h1>
      <p className="text-center text-gray-600">Your order has been placed successfully!</p>
      {/* Add more content here */}
    </div>
  );
};

export default CheckoutSuccess;