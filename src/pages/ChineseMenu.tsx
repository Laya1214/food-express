import React from 'react';
import { BookDown as Bowl } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const ChineseMenu = () => {
  const chineseItems = [
    {
      id: 'chinese-1',
      name: 'Hakka Noodles',
      description: 'Stir-fried noodles with vegetables and soy sauce',
      price: 110,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'chinese-2',
      name: 'Chicken Manchurian',
      description: 'Crispy chicken balls in tangy Manchurian sauce',
      price: 150,
      image: 'https://sinfullyspicy.com/wp-content/uploads/2020/12/8-2.jpg'
    },
    {
      id: 'chinese-3',
      name: 'kung pao chicken',
      description: 'chunks of boneless chicken, chili peppers, and peanuts',
      price: 165,
      image: 'https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-1200x1480.jpg'
    },
    {
      id: 'chinese-4',
      name: 'Sweet and Sour Pork',
      description: 'Crispy pork with bell peppers in sweet and sour sauce',
      price: 170,
      image: 'https://sunporkfreshfoods.com.au/wp-content/uploads/2023/03/SFF_MID-Shoulder_SweetSourPork_1080_web.jpg'
    },
    {
      id: 'chinese-5',
      name: 'Mafo-Tofu',
      description: 'a spicy sauce made with doubanjiang (fermented chili bean paste) and douchi (fermented black beans)',
      price: 160,
      image: 'https://assets.epicurious.com/photos/624b45cc1184c47f7e94b17e/16:9/w_5989,h_3368,c_limit/MapoTofu_RECIPE_033122_31225.jpg'
    },
    {
      id: 'chinese-6',
      name: 'Spring Rolls',
      description: 'Crispy rolls filled with fresh vegetables',
      price: 85,
      image: 'https://thaicaliente.com/wp-content/uploads/2020/09/Spring-Roll-Feature.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bowl className="w-12 h-12 text-yellow-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Chinese Menu</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience authentic Chinese flavors with our carefully crafted dishes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chineseItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChineseMenu;