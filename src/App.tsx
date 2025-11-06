import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ChefHat } from 'lucide-react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import VegMenu from './pages/VegMenu';
import NonVegMenu from './pages/NonVegMenu';
import ChineseMenu from './pages/ChineseMenu';
import DessertsMenu from './pages/DessertsMenu';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/menu/veg" element={<VegMenu />} />
                <Route path="/menu/non-veg" element={<NonVegMenu />} />
                <Route path="/menu/chinese" element={<ChineseMenu />} />
                <Route path="/menu/desserts" element={<DessertsMenu />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-history" 
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-8 mt-auto">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <ChefHat className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-bold">Food Express</h3>
                    </div>
                    <p className="text-gray-300">
                      Delivering exceptional culinary experiences with fresh ingredients and authentic flavors.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
                    <div className="space-y-2">
                      <Link to="/menu/veg" className="block text-gray-300 hover:text-white transition-colors">Vegetarian</Link>
                      <Link to="/menu/non-veg" className="block text-gray-300 hover:text-white transition-colors">Non-Vegetarian</Link>
                      <Link to="/menu/chinese" className="block text-gray-300 hover:text-white transition-colors">Chinese</Link>
                      <Link to="/menu/desserts" className="block text-gray-300 hover:text-white transition-colors">Desserts</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
                    <p className="text-gray-300">
                      123 Culinary Avenue<br />
                      Food District, FD 12345<br />
                      Phone: 1234567890<br />
                      Email: hello@foodexpress.com
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Delivery Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 10:00 AM - 11:00 PM<br />
                      Saturday - Sunday: 9:00 AM - 12:00 AM<br />
                      <span className="text-green-400 font-semibold">Fast delivery in 30 mins!</span>
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                  <p>&copy; {new Date().getFullYear()} Food Express. All rights reserved. Made with ❤️ for food lovers.</p>
                </div>
              </div>
            </footer>
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;