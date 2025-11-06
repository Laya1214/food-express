import React from 'react';
import { Cookie } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const DessertsMenu = () => {
  const dessertItems = [
    {
      id: 'dessert-1',
      name: 'Gulab Jamun',
      description: 'Soft milk dumplings in sweet rose syrup',
      price: 65,
      image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1'
    },
    {
      id: 'dessert-2',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center',
      price: 85,
      image: 'https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&'
    },
    {
      id: 'dessert-3',
      name: 'Kulfi',
      description: 'Traditional Indian ice cream with cardamom',
      price: 50,
      image: 'https://www.sharmispassions.com/wp-content/uploads/2016/06/MalaiKulfi2.jpg'
    },
    {
      id: 'dessert-4',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone',
      price: 95,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'dessert-5',
      name: 'Ras Malai',
      description: 'Soft cheese dumplings in cardamom milk',
      price: 70,
      image: 'https://palatesdesire.com/wp-content/uploads/2022/09/Rasmalai-recipe@palates-desire.jpg'
    },
    {
      id: 'dessert-6',
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake with berry compote',
      price: 60,
      image: 'https://www.kingarthurbaking.com/sites/default/files/2025-06/Easy-Cheesecake-6.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Cookie className="w-12 h-12 text-pink-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Desserts Menu</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            End your meal on a sweet note with our delightful dessert collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dessertItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DessertsMenu;