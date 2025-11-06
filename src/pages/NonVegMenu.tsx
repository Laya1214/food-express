import React from 'react';
import { Drumstick } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const NonVegMenu = () => {
  const nonVegItems = [
    {
      id: 'nonveg-1',
      name: 'Butter Chicken',
      description: 'Tender chicken in rich tomato and butter sauce',
      price: 80,
      image: 'https://masalaandchai.com/wp-content/uploads/2022/03/Butter-Chicken.jpg'
    },
    {
      id: 'nonveg-2',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with spiced chicken',
      price: 250,
      image: 'https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg'
    },
    {
      id: 'nonveg-3',
      name: 'mutton Curry',
      description: 'Slow-cooked lamb in traditional spices',
      price: 200,
      image: 'https://lh5.googleusercontent.com/proxy/fm5qZsQ1nm8HztsfW92BSx3XQKt1tl2miFs7fXnbRmwE5bmIR3ADNRXrG0h6fpcNpkggOK684pAHz0bkpBZTvZLVj8bIwot0-h0aDsU'
    },
    {
      id: 'nonveg-4',
      name: 'Fish Tikka bites',
      description: 'Grilled fish marinated in yogurt and spices',
      price: 190,
      image: 'https://i0.wp.com/www.sonisfood.com/wp-content/uploads/2016/08/Fish-Tikka-Bites.jpg?resize=700%2C1050'
    },
    {
      id: 'nonveg-5',
      name: 'Chicken Tikka Masala',
      description: 'Grilled chicken in creamy tomato sauce',
      price: 170,
      image: 'https://www.closetcooking.com/wp-content/uploads/2019/11/Chicken-Tikka-Masala-1200-8412.jpg'
    },
    {
      id: 'nonveg-6',
      name: 'Mutton Rogan Josh',
      description: 'Kashmiri-style mutton curry with aromatic spices',
      price: 160,
      image: 'https://static.toiimg.com/thumb/53192600.cms?imgsize=418831&width=800&height=800'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Drumstick className="w-12 h-12 text-red-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Non-Vegetarian Menu</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Savor our premium selection of meat dishes prepared with authentic spices and cooking techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nonVegItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonVegMenu;