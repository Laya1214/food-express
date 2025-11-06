import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Confirmation = () => {
  const { dispatch } = useCart();

  useEffect(() => {
    // Clear cart after successful order
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order. We're preparing your delicious meal.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Estimated Delivery</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">25-30 minutes</p>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/order-tracking"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 block"
            >
              Track Your Order
            </Link>
            <Link
              to="/"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Order #12345</p>
            <p>You will receive a confirmation email shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;