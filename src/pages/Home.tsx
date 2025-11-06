import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Leaf, Drumstick, BookDown as Bowl, Cookie } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-6xl font-bold mb-6 leading-tight">Welcome to <span className="text-blue-400">Food Express</span></h1>
              <p className="text-xl mb-8 leading-relaxed opacity-90">Experience the finest cuisine with our carefully crafted dishes made from the freshest ingredients. Delivered fresh to your doorstep.</p>
              <Link 
                to="/menu/veg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center space-x-2"
              >
                <ChefHat className="w-5 h-5" />
                <span>Explore Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our diverse selection of cuisines, each prepared with authentic flavors and premium ingredients</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/menu/veg" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto group-hover:bg-green-200 transition duration-300 group-hover:scale-110">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Vegetarian</h3>
              <p className="text-gray-600 text-center leading-relaxed">Fresh, flavorful plant-based dishes crafted with seasonal vegetables</p>
            </div>
          </Link>

          <Link to="/menu/non-veg" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 mx-auto group-hover:bg-red-200 transition duration-300 group-hover:scale-110">
                <Drumstick className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Non-Vegetarian</h3>
              <p className="text-gray-600 text-center leading-relaxed">Premium meat specialties prepared with traditional spices</p>
            </div>
          </Link>

          <Link to="/menu/chinese" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6 mx-auto group-hover:bg-yellow-200 transition duration-300 group-hover:scale-110">
                <Bowl className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Chinese</h3>
              <p className="text-gray-600 text-center leading-relaxed">Authentic Chinese flavors with a modern twist</p>
            </div>
          </Link>

          <Link to="/menu/desserts" className="group">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center justify-center w-20 h-20 bg-pink-100 rounded-full mb-6 mx-auto group-hover:bg-pink-200 transition duration-300 group-hover:scale-110">
                <Cookie className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-gray-800">Desserts</h3>
              <p className="text-gray-600 text-center leading-relaxed">Indulgent sweet treats to end your meal perfectly</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Food Express?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We're committed to delivering exceptional dining experiences with every order</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 mx-auto shadow-lg">
                <ChefHat className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Expert Chefs</h3>
              <p className="text-gray-600 leading-relaxed">Our experienced chefs create amazing dishes with passion, expertise, and years of culinary mastery.</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 mx-auto shadow-lg">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Fresh Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">We source only the freshest, highest quality ingredients from local farms and trusted suppliers.</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 mx-auto shadow-lg">
                <Bowl className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Diverse Menu</h3>
              <p className="text-gray-600 leading-relaxed">Explore our extensive range of cuisines and flavors designed to satisfy every palate and preference.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;