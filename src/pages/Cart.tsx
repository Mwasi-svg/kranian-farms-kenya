
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(6, { message: 'Phone number is required' }),
  location: z.string().min(2, { message: 'Location is required' }),
  message: z.string().optional(),
});

// List of restricted regions
const restrictedRegions = [
  'united states', 'usa', 'u.s.', 'u.s.a', 'america', 'canada', 'mexico', 'brazil', 
  'argentina', 'chile', 'colombia', 'peru', 'venezuela', 'ecuador', 'bolivia', 
  'paraguay', 'uruguay', 'guyana', 'suriname', 'french guiana', 'north america', 'south america'
];

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  // State to manage input values for each item
  const [itemInputQuantities, setItemInputQuantities] = useState<{ [key: number]: string }>({});
  const [isLocationRestricted, setIsLocationRestricted] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      message: '',
    },
  });

  // Initialize local state when cart changes
  useEffect(() => {
    const initialQuantities: { [key: number]: string } = {};
    cart.forEach(item => { initialQuantities[item.product.id] = String(item.quantity); });
    setItemInputQuantities(initialQuantities); // Initialize with current cart quantities
  }, [cart]);

  const handleInputChange = (productId: number, value: string) => {
    // Allow any input while typing, validation happens on blur
    setItemInputQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleBlur = (productId: number, value: string) => {
    const parsedValue = parseInt(value, 10);
    const validatedQuantity = isNaN(parsedValue) ? 300 : Math.max(300, Math.min(30000, parsedValue));

    // Update cart state and reset input quantity to validated value
    updateQuantity(productId, validatedQuantity); // Update the cart state with validated quantity
    setItemInputQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: String(validatedQuantity),
    }));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const validatedQuantity = Math.max(300, Math.min(30000, newQuantity));
    updateQuantity(productId, validatedQuantity);
    setItemInputQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: String(validatedQuantity),
    }));
  };

  // Check if location is in restricted regions
  const checkLocation = (location: string) => {
    const normalizedLocation = location.toLowerCase().trim();
    return restrictedRegions.some(region => normalizedLocation.includes(region));
  };

  // Handle location input change
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    form.setValue('location', location);
    setIsLocationRestricted(checkLocation(location));
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLocationRestricted) {
      toast({
        title: "Location Restricted",
        description: "Sorry, we currently don't provide services to North and South America.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before requesting a quotation.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally send the quotation request to the server
    toast({
      title: "Quotation Request Sent!",
      description: "We'll get back to you with a custom quotation soon.",
    });

    // Clear the form and cart after successful submission
    form.reset();
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col">

      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Request a Quotation</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/product/${item.product.id}`} className="hover:text-kranian-600">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                          {item.product.description}
                        </p>

                        <div className="mt-4 flex justify-between items-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity <= 300}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            {/* Input field for direct quantity editing */}
                            <input
                              type="number"
                              min="300"
                              max="30000"
                              className="w-12 text-center font-medium border-none focus:ring-0"
                              value={itemInputQuantities[item.product.id] || ''}
                              onChange={(e) => handleInputChange(item.product.id, e.target.value)}
                              onBlur={(e) => handleBlur(item.product.id, e.target.value)}
                            />
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity >= 30000}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-600 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Cart Controls */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-gray-600"
                    >
                      Clear Cart
                    </Button>
                    <Button asChild variant="ghost">
                      <Link to="/products">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Request Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Request Quotation</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your country/region" 
                              {...field} 
                              onChange={handleLocationChange}
                              className={isLocationRestricted ? "border-red-500" : ""}
                            />
                          </FormControl>
                          {isLocationRestricted && (
                            <p className="text-sm text-red-500 mt-1">
                              Sorry, we currently don't provide services to North and South America.
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific requirements or questions?" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-kranian-600 hover:bg-kranian-700 text-white"
                      disabled={isLocationRestricted || cart.length === 0}
                    >
                      Submit Quotation Request
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
