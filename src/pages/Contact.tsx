
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Send, Clock, ArrowLeft } from 'lucide-react';
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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form:', values);
      
      const { data, error } = await supabase
        .from('contact_us_table')
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone ? parseFloat(values.phone) : null,
          subject: values.subject,
          message: values.message
        })
        .select();

      console.log('Contact form submission result:', { data, error });

      if (error) {
        console.error('Contact form submission error:', error);
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
        title="Get in Touch"
        description="Have questions about our products or services? We'd love to hear from you. Our team is ready to assist you with any inquiries."
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-6">
              {/* Map - Updated the iframe src to the correct location */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.736547542354!2d36.91592861475807!3d-1.334545536015023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f12868e2de63f%3A0x2f32a1c09e437acc!2sKQ%20Cargo!5e0!3m2!1sen!2sus!4v1716221525067!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Kranian Farms Location"
                  ></iframe>
                </div>
              </div>
              
              {/* Contact Cards */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 dark:bg-kranian-900 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-kranian-600 dark:text-kranian-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Address</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">KQ Cargo, JKIA/ Nairobi, Kenya</p>
                      <a href="https://maps.app.goo.gl/iRTB1UTwPcEw9yxp9" target="_blank" rel="noopener noreferrer" className="text-kranian-600 dark:text-kranian-400 text-sm hover:text-kranian-700 dark:hover:text-kranian-300 mt-1 inline-block">
                        Get directions
                      </a>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 dark:bg-kranian-900 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-kranian-600 dark:text-kranian-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <a href="tel:+254701640801" className="hover:text-kranian-600 dark:hover:text-kranian-400">(+254) 701 640 801</a>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <a href="tel:+254702726346" className="hover:text-kranian-600 dark:hover:text-kranian-400">(+254) 702 726 346</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 dark:bg-kranian-900 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-kranian-600 dark:text-kranian-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <a href="mailto:info@kranianfarms.com" className="hover:text-kranian-600 dark:hover:text-kranian-400">info@kranianfarms.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 dark:bg-kranian-900 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-kranian-600 dark:text-kranian-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Business Hours</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61575074558774" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/kranianfarms_kenya/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://wa.me/254701640801" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors"
                    >
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-100">Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-100">Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-100">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                              {...field} 
                            />
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
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-kranian-700 dark:text-kranian-400 mb-8">Meet Our Team</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">Our dedicated team is passionate about delivering quality products to your table and providing exceptional service to all our customers.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Rachel Muturi */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow relative">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-kranian-100 dark:border-kranian-800">
                <img
                  src="/rachel.png"
                  alt="Rachel Muturi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Rachel Muturi</h3>
              <p className="text-kranian-600 dark:text-kranian-400 mb-4">Director</p>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 px-4">"At Kranian Farms, I grow more than crops--I grow community."</p>
              <div className="flex justify-center space-x-4">                
                <a href="mailto:rachel@kranianfarms.com" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+254701640801" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/254701640801" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Brian Senelwa */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow relative">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-kranian-100 dark:border-kranian-800">
                <img
                  src="/brian.png"
                  alt="Brian Senelwa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Brian Senelwa</h3>
              <p className="text-kranian-600 dark:text-kranian-400 mb-4">Director</p>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 px-4">"Dedication to quality, transparency, and long-term sustainability."</p>
              <div className="flex justify-center space-x-4">                
                <a href="mailto:brian@kranianfarms.com" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+254702726346" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/254702726346" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-kranian-100 dark:hover:bg-kranian-800 hover:text-kranian-600 dark:hover:text-kranian-400 transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
