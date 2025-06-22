
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import PageHeading from '@/components/PageHeading';
import { supabase } from '@/integrations/supabase/client';

const quotationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  product: z.string().min(3, { message: "Product must be at least 3 characters." }),
  quantity: z.string().refine(value => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "Quantity must be a valid number greater than 0."
  }),
  additionalInfo: z.string().optional(),
  socials: z.string().optional()
});

type QuotationFormValues = z.infer<typeof quotationFormSchema>;

const Checkout: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      product: "",
      quantity: "",
      additionalInfo: "",
      socials: ""
    }
  });

  async function onSubmit(values: QuotationFormValues) {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('quotation_table')
        .insert({
          name: values.name,
          email: values.email,
          phone_number: parseFloat(values.phoneNumber) || null,
          location: values.location,
          product: values.product,
          quantity: parseFloat(values.quantity) || null,
          additional_info: values.additionalInfo || null,
          socials: values.socials || null,
          status: 'pending',
          requested_at: new Date().toISOString(),
          received_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Quotation request submitted successfully!",
        description: "We'll get back to you with a detailed quote soon.",
      });

      form.reset();
      navigate('/checkout-success');
    } catch (error) {
      console.error('Quotation submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit quotation request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {location.pathname !== '/' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      )}
      
      {/* Hero Section - Use PageHeading component */}
      <PageHeading 
        title="Request a Quotation"
        description="Fill out the form below to request a quotation for our products. Please provide as much detail as possible so we can prepare an accurate quote."
      />

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Quotation Request Form</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
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
                      <FormLabel className="dark:text-gray-100">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
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
                      <FormLabel className="dark:text-gray-100">Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Your location" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Product</FormLabel>
                      <FormControl>
                        <Input placeholder="Product you are interested in" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="Quantity required" type="number" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information you want to provide" 
                          className="min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-100">Socials (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Link to your social media profile" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-kranian-600 hover:bg-kranian-700 dark:bg-kranian-500 dark:hover:bg-kranian-600" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
