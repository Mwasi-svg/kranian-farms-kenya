
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Truck, MapPin, Phone, CreditCard as CardIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    mpesaPhone: '',
  });
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Payment form
  const form = useForm({
    defaultValues: {
      paymentMethod: 'card',
    },
  });
  
  // Calculate order totals
  const subtotal = getCartTotal();
  const shipping = deliveryOption === 'express' ? 15 : (subtotal >= 50 ? 0 : 5);
  const tax = subtotal * 0.07; // 7% tax example
  const total = subtotal + shipping + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add products before checkout.",
        variant: "destructive"
      });
      navigate('/products');
      return;
    }
    
    setLoading(true);
    
    // Perform payment processing based on selected method
    let paymentSuccessful = false;
    
    try {
      // Simulated payment processing
      if (paymentMethod === 'card') {
        // Validate card information
        if (!formData.cardName || !formData.cardNumber || !formData.expMonth || !formData.expYear || !formData.cvv) {
          throw new Error('Please fill in all card details');
        }
        // Simulate card processing
      } else if (paymentMethod === 'mpesa') {
        // Validate M-Pesa phone
        if (!formData.mpesaPhone || formData.mpesaPhone.length < 10) {
          throw new Error('Please enter a valid M-Pesa phone number');
        }
        // Simulate M-Pesa processing
      } else if (paymentMethod === 'stripe') {
        // Simulate Stripe processing
      }
      
      paymentSuccessful = true;
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred during payment processing",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    if (paymentSuccessful) {
      // Simulate order processing
      setTimeout(() => {
        toast({
          title: "Order Placed!",
          description: "Your order has been successfully placed.",
        });
        clearCart();
        navigate('/checkout-success');
        setLoading(false);
      }, 1500);
    }
  };
  
  // If cart is empty, redirect to products
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Please add products to your cart before checking out.</p>
          <Button asChild>
            <button onClick={() => navigate('/products')}>Browse Products</button>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-medium flex items-center mb-6">
                  <MapPin className="mr-2 h-5 w-5 text-kranian-600" />
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="SA">Saudi Arabia</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Delivery Options */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-medium flex items-center mb-6">
                  <Truck className="mr-2 h-5 w-5 text-kranian-600" />
                  Delivery Options
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="delivery-standard"
                      name="deliveryOption"
                      type="radio"
                      value="standard"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="h-4 w-4 text-kranian-600 focus:ring-kranian-500 border-gray-300"
                    />
                    <label htmlFor="delivery-standard" className="ml-3 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Standard Delivery</span>
                      <span className="block text-sm text-gray-500">3-5 business days</span>
                      <span className="block text-sm font-medium text-gray-900">
                        {subtotal >= 50 ? 'Free' : 'KES 5.00'}
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="delivery-express"
                      name="deliveryOption"
                      type="radio"
                      value="express"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="h-4 w-4 text-kranian-600 focus:ring-kranian-500 border-gray-300"
                    />
                    <label htmlFor="delivery-express" className="ml-3 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">Express Delivery</span>
                      <span className="block text-sm text-gray-500">1-2 business days</span>
                      <span className="block text-sm font-medium text-gray-900">KES 15.00</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-medium flex items-center mb-6">
                  <CreditCard className="mr-2 h-5 w-5 text-kranian-600" />
                  Payment Method
                </h2>
                
                <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                    <RadioGroupItem value="card" id="payment-card" />
                    <FormLabel htmlFor="payment-card" className="flex items-center">
                      <CardIcon className="h-5 w-5 mr-2" />
                      <span>Credit/Debit Card</span>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 mt-2 hover:bg-gray-50">
                    <RadioGroupItem value="mpesa" id="payment-mpesa" />
                    <FormLabel htmlFor="payment-mpesa" className="flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>M-Pesa</span>
                    </FormLabel>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 mt-2 hover:bg-gray-50">
                    <RadioGroupItem value="stripe" id="payment-stripe" />
                    <FormLabel htmlFor="payment-stripe" className="flex items-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
                      </svg>
                      <span>Pay with Stripe</span>
                    </FormLabel>
                  </div>
                </RadioGroup>
                
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required={paymentMethod === 'card'}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required={paymentMethod === 'card'}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Month *
                      </label>
                      <input
                        type="text"
                        id="expMonth"
                        name="expMonth"
                        required={paymentMethod === 'card'}
                        placeholder="MM"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.expMonth}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Year *
                      </label>
                      <input
                        type="text"
                        id="expYear"
                        name="expYear"
                        required={paymentMethod === 'card'}
                        placeholder="YYYY"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.expYear}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required={paymentMethod === 'card'}
                        placeholder="XXX"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'mpesa' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="mpesaPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        M-Pesa Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="mpesaPhone"
                        name="mpesaPhone"
                        required={paymentMethod === 'mpesa'}
                        placeholder="e.g. 254712345678"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-kranian-500"
                        value={formData.mpesaPhone}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        You will receive a prompt on your phone to complete the payment.
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'stripe' && (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      You will be redirected to Stripe to complete your payment securely.
                    </p>
                  </div>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-kranian-600 hover:bg-kranian-700 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <ul role="list" className="divide-y divide-gray-200 mb-6">
                {cart.map((item) => (
                  <li key={item.product.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.product.name}</h3>
                          <p className="ml-4">KES {item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Totals */}
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium">KES {subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">
                    {deliveryOption === 'express' ? 'Express Shipping' : 'Shipping'}
                  </dt>
                  <dd className="text-sm font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `KES ${shipping.toFixed(2)}`
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600">Tax (7%)</dt>
                  <dd className="text-sm font-medium">KES {tax.toFixed(2)}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium">KES {total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 text-center flex-grow">
        <div className="max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your purchase and will prepare it for shipping soon.
            A confirmation email has been sent to your email address.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export { CheckoutSuccess };
export default Checkout;
