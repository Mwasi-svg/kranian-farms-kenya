import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { motion } from 'framer-motion';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// Create a schema for form validation
const sourceOptions = ['Google', 'Instagram', 'Twitter', 'Facebook', 'Referral', 'Other'] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(6, { message: 'Phone number is required' }),
  location: z.string().min(2, { message: 'Location is required' }),
  message: z.string().optional(),
  howDidYouHear: z.enum(sourceOptions, {
    required_error: 'Please select how you heard about us',
  }),
  otherSource: z.string().optional(),
}).refine(
  (data) => data.howDidYouHear !== 'Other' || (data.otherSource && data.otherSource.length > 1),
  {
    message: 'Please specify how you heard about us',
    path: ['otherSource'],
  }
);

// List of restricted regions
const restrictedRegions = [
  'united states', 'usa', 'u.s.', 'u.s.a', 'america', 'canada', 'mexico', 'brazil', 
  'argentina', 'chile', 'colombia', 'peru', 'venezuela', 'ecuador', 'bolivia', 
  'paraguay', 'uruguay', 'guyana', 'suriname', 'french guiana', 'north america', 'south america'
];

const stemLengths = [50, 60, 70, 80, 90, 100];
const headSizes = ['Small', 'Medium', 'Large'];

// Define flower categories
const flowerCategories = ['summer-flowers', 'premium-roses', 'spray-roses', 'intermediate-roses'];

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, updateStemLength, updateHeadSize, clearCart } = useCart();
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
      howDidYouHear: undefined,
      otherSource: '',
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

  const handleStemLengthChange = (productId: number, stemLength: number) => {
    updateStemLength(productId, stemLength);
  };

  const handleHeadSizeChange = (productId: number, headSize: string) => {
    updateHeadSize(productId, headSize);
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

    try {
      console.log('Submitting quotation request:', values, 'Cart:', cart);
      
      // Prepare cart items summary for database
      const cartSummary = cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        stemLength: item.stemLength || 60,
        headSize: item.headSize || 'Medium',
        category: item.product.category
      }));

      const { data, error } = await supabase
        .from('quotation_table')
        .insert({
          name: values.name,
          email: values.email,
          phone_number: parseFloat(values.phone),
          location: values.location,
          product: JSON.stringify(cartSummary), // Store cart items as JSON
          quantity: cart.reduce((total, item) => total + item.quantity, 0), // Total quantity
          additional_info: values.message || null,
          socials: values.howDidYouHear === 'Other' ? values.otherSource : values.howDidYouHear,
          status: 'pending',
          requested_at: new Date().toISOString(),
          received_at: new Date().toISOString()
        })
        .select();

      console.log('Quotation submission result:', { data, error });

      if (error) {
        console.error('Quotation submission error:', error);
        throw error;
      }

      // Send email notification
      try {
        const { error: emailError } = await supabase.functions.invoke('send-quotation-email', {
          body: {
            quotationData: {
              ...values,
              phone_number: parseFloat(values.phone),
              cartItems: cartSummary,
              totalQuantity: cart.reduce((total, item) => total + item.quantity, 0)
            }
          }
        });

        if (emailError) {
          console.error('Email sending error:', emailError);
          // Don't throw error for email failure, just log it
        }
      } catch (emailError) {
        console.error('Email function error:', emailError);
        // Continue even if email fails
      }

      toast({
        title: "Received!",
        description: "Your quotation request has been submitted successfully.",
      });

      // Clear the form and cart
      form.reset();
      clearCart();
      
      // Redirect to contact page with a slight delay for the toast to be visible
      setTimeout(() => {
        navigate('/contact', { 
          state: { 
            fromQuotation: true 
          } 
        });
      }, 1500);
    } catch (error) {
      console.error('Quotation submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit quotation request. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Check if product is a flower category
  const isFlowerCategory = (categoryName: string) => {
    return flowerCategories.includes(categoryName);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:bg-opacity-90 pt-20">
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 mb-8">Request a Quotation</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-medium mb-4 dark:text-gray-200">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="dark:bg-kranian-600 dark:hover:bg-kranian-700 dark:text-white">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */} 
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <li key={item.product.id} className="p-6 flex flex-col sm:flex-row dark:text-gray-200">
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
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-overflow-visible">
                            <Link to={`/product/${item.product.id}`} className="hover:text-kranian-600 dark:hover:text-kranian-400">
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-overflow-visible">
                          {item.product.description}
                        </p>

                        {/* Only show flower-specific options for flower categories */}
                        {isFlowerCategory(item.product.category) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            {/* Stem Length Option */}
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Stem Length
                              </label>
                              <Select 
                                value={String(item.stemLength || 60)} 
                                onValueChange={(value) => handleStemLengthChange(item.product.id, parseInt(value))}
                              >
                                <SelectTrigger className="w-full sm:w-32 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 h-8 text-sm">
                                  <SelectValue placeholder="Select length" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  {stemLengths.map(length => (
                                    <SelectItem key={length} value={String(length)} className="dark:text-gray-200 dark:hover:bg-gray-700">
                                      {length} cm
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Head Size Option */}
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Head Size
                              </label>
                              <Select 
                                value={item.headSize || 'Medium'} 
                                onValueChange={(value) => handleHeadSizeChange(item.product.id, value)}
                              >
                                <SelectTrigger className="w-full sm:w-32 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 h-8 text-sm">
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                  {headSizes.map(size => (
                                    <SelectItem key={size} value={size} className="dark:text-gray-200 dark:hover:bg-gray-700">
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex justify-between items-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-300 dark:disabled:text-gray-600"
                              disabled={item.quantity <= 300}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            {/* Input field for direct quantity editing */}
                            <input
                              type="number"
                              min="300"
                              max="30000"
                              className="w-12 text-center font-medium border-none focus:ring-0 dark:bg-gray-800 dark:text-gray-100"
                              value={itemInputQuantities[item.product.id] || ''}
                              style={{
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield',
                              }}
                              onChange={(e) => handleInputChange(item.product.id, e.target.value)}
                              onBlur={(e) => handleBlur(item.product.id, e.target.value)}
                            />
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-300 dark:disabled:text-gray-600"
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
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-gray-600 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white"
                    > 
                      Clear Cart
                    </Button>
                    <Button asChild variant="ghost" className="dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Request Quotation</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control} 
                      name="name"
                      render={({ field }) => (
                        <FormItem> 
                          <FormLabel className="dark:text-gray-200">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500" />
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
                          <FormLabel className="dark:text-gray-200">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500" />
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
                          <FormLabel className="dark:text-gray-200">Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500" />
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
                          <FormLabel className="dark:text-gray-200">Location</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your country/region" 
                              {...field} 
                              className={`dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 ${isLocationRestricted ? "border-red-500" : ""}`}
                              onChange={handleLocationChange}
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
                      name="howDidYouHear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">How did you hear about us?</FormLabel>
                          <FormControl>
                            <select
                              {...field} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            >
                              <option value="">-- Select an option --</option>
                              {sourceOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch('howDidYouHear') === 'Other' && (
                      <FormField
                        control={form.control}
                        name="otherSource" 
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-200">Please specify</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Friend told me" className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                                 
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-200">Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific requirements or questions?"
                              className="resize-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-kranian-600 hover:bg-kranian-700 text-white dark:bg-kranian-600 dark:hover:bg-kranian-700"
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
