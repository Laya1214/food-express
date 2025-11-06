import React from 'react';
import { CheckCircle, Clock, Truck, ChefHat } from 'lucide-react';

const OrderTracking = () => {
  const orderStatus = [
    { id: 1, title: 'Order Confirmed', description: 'Your order has been received', icon: CheckCircle, completed: true },
    { id: 2, title: 'Preparing', description: 'Our chefs are preparing your food', icon: ChefHat, completed: true },
    { id: 3, title: 'Out for Delivery', description: 'Your order is on the way', icon: Truck, completed: false },
    { id: 4, title: 'Delivered', description: 'Enjoy your meal!', icon: CheckCircle, completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Track Your Order</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Order #12345</h2>
              <p className="text-gray-600">Estimated delivery: 25-30 minutes</p>
            </div>
            
            <div className="space-y-6">
              {orderStatus.map((status, index) => (
                <div key={status.id} className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    status.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <status.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${status.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                      {status.title}
                    </h3>
                    <p className={`text-sm ${status.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                      {status.description}
                    </p>
                  </div>
                  {status.completed && (
                    <div className="text-green-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                  {!status.completed && index === 2 && (
                    <div className="text-blue-600">
                      <Clock className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Address:</strong> 123 Main Street, City, State 12345</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Payment:</strong> Credit Card ending in 1234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;