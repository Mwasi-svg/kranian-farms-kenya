
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook, Send, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';

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

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="bg-kranian-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you.
            Our team is ready to assist you with any inquiries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-6">
              {/* Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7978541987326!2d36.7883316!3d-1.2944097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109d93a9aed3%3A0x6cc754ffb195294a!2sAPA%20Arcade%2C%20Argwings%20Kodhek%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1644326134093!5m2!1sen!2ske" 
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
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-kranian-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600 text-sm">APA Arcade, 2nd Floor Suite 20, Argwings Kodhek Road, Hurlingham. Nairobi Kenya</p>
                      <a href="https://maps.google.com/?q=APA+Arcade,+Argwings+Kodhek+Road,+Nairobi+Kenya" target="_blank" rel="noopener noreferrer" className="text-kranian-600 text-sm hover:text-kranian-700 mt-1 inline-block">
                        Get directions
                      </a>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-kranian-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                      <p className="text-gray-600 text-sm">
                        <a href="tel:+254701640801" className="hover:text-kranian-600">(+254) 701 640 801</a>
                      </p>
                      <p className="text-gray-600 text-sm">
                        <a href="tel:+254702726346" className="hover:text-kranian-600">(+254) 702 726 346</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-kranian-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600 text-sm">
                        <a href="mailto:info@kranianfarms.com" className="hover:text-kranian-600">info@kranianfarms.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 h-12 w-12 bg-kranian-100 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-kranian-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Business Hours</h4>
                      <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61575074558774" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/kranianfarms_kenya/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://wa.me/254701640801" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors"
                    >
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              <Input type="email" placeholder="Your email" {...field} />
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
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
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
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" {...field} />
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-kranian-600 hover:bg-kranian-700" 
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-kranian-700 mb-8">Meet Our Team</h2>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">Our dedicated team is passionate about delivering quality products to your table and providing exceptional service to all our customers.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Rachel Muturi */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow relative">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-kranian-100">
                <img
                  src="/placeholder.svg"
                  alt="Rachel Muturi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Rachel Muturi</h3>
              <p className="text-kranian-600 mb-4">Director</p>
              <p className="text-gray-600 italic mb-6 px-4">"At Kranian Farms, I grow more than crops--I grow community."</p>
              <div className="flex justify-center space-x-4">                
                <a href="mailto:rachel@kranianfarms.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+254701640801" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/254701640801" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Brian Senelwa */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow relative">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-kranian-100">
                <img
                  src="/placeholder.svg"
                  alt="Brian Senelwa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Brian Senelwa</h3>
              <p className="text-kranian-600 mb-4">Director</p>
              <p className="text-gray-600 italic mb-6 px-4">"Dedication to quality, transparency, and long-term sustainability."</p>
              <div className="flex justify-center space-x-4">                
                <a href="mailto:brian@kranianfarms.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+254702726346" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
                  <Phone size={18} />
                </a>
                <a href="https://wa.me/254702726346" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-kranian-100 hover:text-kranian-600 transition-colors">
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
