import React from 'react';
import { Leaf } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const VegMenu = () => {
  const vegItems = [
    {
      id: 'veg-1',
      name: 'Paneer Butter Masala',
      description: 'Rich and creamy paneer curry with aromatic spices',
      price: 150 ,
      image: 'https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala.jpg'
    },
    {
      id: 'veg-2',
      name: 'Dal Makhani',
      description: 'Slow-cooked black lentils in rich tomato gravy',
      price: 100,
      image: 'https://www.sharmispassions.com/wp-content/uploads/2012/05/dal-makhani7.jpg'
    },
    {
      id: 'veg-3',
      name: 'Vegetable Biryani',
      description: 'Fragrant basmati rice with mixed vegetables and spices',
      price: 140,
      image: 'https://i.ytimg.com/vi/Do7ZdUodDdw/maxresdefault.jpg'
    },
    {
      id: 'veg-4',
      name: 'Aloo Gobi',
      description: 'Spiced cauliflower and potato curry',
      price: 70,
      image: 'https://niksharmacooks.com/wp-content/uploads/2022/11/AlooGobiDSC_5234.jpg'
    },
    {
      id: 'veg-5',
      name: 'Palak Paneer',
      description: 'Cottage cheese in creamy spinach gravy',
      price: 85,
      image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/01/Palak-Paneer.jpg'
    },
    {
      id: 'veg-6',
      name: 'Chole Bhature',
      description: 'Spicy chickpea curry with fluffy fried bread',
      price: 90,
      image: 'https://bluenilekitchen.com/wp-content/uploads/2024/08/IMG_0208-scaled.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Vegetarian Menu</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our delicious collection of vegetarian dishes made with fresh, locally sourced ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vegItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VegMenu;