import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, MapPin, User, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  paymentMethod: z.enum(['card', 'cash_on_delivery']),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === 'card') {
      return (
        data.cardNumber &&
        data.cardNumber.length >= 16 &&
        data.expiryDate &&
        /^\d{2}\/\d{2}$/.test(data.expiryDate) &&
        data.cvv &&
        data.cvv.length >= 3
      );
    }
    return true;
  },
  {
    message: 'Please fill in all card details',
    path: ['cardNumber'],
  }
);

type CheckoutFormData = z.infer<typeof checkoutSchema>;
const Checkout = () => {
  const { state, createOrder } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash_on_delivery'>('card');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: profile?.full_name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      paymentMethod: 'card',
    },
    mode: 'onChange',
  });

  const watchPaymentMethod = register('paymentMethod').onChange;

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'card' | 'cash_on_delivery';
    setPaymentMethod(value);
    if (watchPaymentMethod) {
      watchPaymentMethod(e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...paymentMethodRest } = register('paymentMethod');

  const actualRegister = {
    ...paymentMethodRest,
    onChange: handlePaymentMethodChange,
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    try {
      await createOrder(data);
      navigate('/confirmation');
    } finally {
      setIsLoading(false);
    }
  };

  const total = state.total + state.total * 0.1 + 2.99;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register('name')}
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                  <input
                    {...register('email')}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                  <input
                    {...register('phone')}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  <input
                    {...register('address')}
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register('city')}
                      type="text"
                      name="city"
                      placeholder="City"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                    <input
                      {...register('zipCode')}
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input
                        {...actualRegister}
                        type="radio"
                        value="card"
                        className="peer sr-only"
                      />
                      <div className="p-4 border-2 border-gray-300 rounded-lg peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all hover:border-blue-400">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                          <div>
                            <p className="font-semibold text-gray-800">Credit/Debit Card</p>
                            <p className="text-sm text-gray-500">Pay securely online</p>
                          </div>
                        </div>
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input
                        {...actualRegister}
                        type="radio"
                        value="cash_on_delivery"
                        className="peer sr-only"
                      />
                      <div className="p-4 border-2 border-gray-300 rounded-lg peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all hover:border-blue-400">
                        <div className="flex items-center space-x-3">
                          <Banknote className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-semibold text-gray-800">Cash on Delivery</p>
                            <p className="text-sm text-gray-500">Pay when you receive</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="font-semibold">Card Details</h3>
                      </div>
                      <input
                        {...register('cardNumber')}
                        type="text"
                        placeholder="Card Number"
                        maxLength={16}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            {...register('expiryDate')}
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                          )}
                        </div>
                        <div>
                          <input
                            {...register('cvv')}
                            type="text"
                            placeholder="CVV"
                            maxLength={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cash_on_delivery' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Banknote className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-800">Cash on Delivery Selected</p>
                          <p className="text-sm text-green-700 mt-1">
                            Please keep exact change ready. Our delivery partner will collect ₹{total.toFixed(2)} at your doorstep.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Placing Order...' : `Place Order - ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(state.total * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹2.99</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;