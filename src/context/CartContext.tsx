import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  createOrder: (orderData: OrderData) => Promise<void>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff),
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'restaurant_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  const createOrder = async (orderData: OrderData) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to place an order');
      }

      const totalAmount = state.total + state.total * 0.1 + 2.99;
      const deliveryAddress = `${orderData.address}, ${orderData.city}, ${orderData.zipCode}`;

      console.log('Creating order with data:', {
        user_id: user.id,
        items: state.items,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        phone: orderData.phone,
        payment_method: orderData.paymentMethod || 'card',
      });

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          items: state.items,
          total_amount: totalAmount,
          delivery_address: deliveryAddress,
          phone: orderData.phone,
          payment_method: orderData.paymentMethod || 'card',
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Order creation error:', error);
        throw error;
      }

      if (!order) {
        throw new Error('Order created but no data returned');
      }

      console.log('Order created successfully:', order);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`;

      console.log('Sending order confirmation email to:', orderData.email);

      try {
        const emailResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: orderData.email,
            name: orderData.name,
            orderId: order.id,
            items: state.items,
            totalAmount: totalAmount,
            deliveryAddress: deliveryAddress,
            phone: orderData.phone,
            paymentMethod: orderData.paymentMethod || 'card',
          }),
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log('Order confirmation email sent successfully:', emailResult);
          toast.success(`Order placed successfully! Confirmation email sent to ${orderData.email}`);
        } else {
          const errorText = await emailResponse.text();
          console.error('Failed to send email. Status:', emailResponse.status, 'Error:', errorText);
          toast.success('Order placed successfully! (Email notification pending)');
        }
      } catch (emailError) {
        console.error('Error sending order confirmation email:', emailError);
        toast.success('Order placed successfully! (Email notification pending)');
      }

      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error placing order';
      toast.error(message);
      throw error;
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const { items } = JSON.parse(savedCart) as CartState;
      dispatch({ type: 'CLEAR_CART' });
      items.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch, createOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};