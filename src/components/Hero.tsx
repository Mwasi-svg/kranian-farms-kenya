
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '@/data/products';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Beautiful Blooms, Fresh from Our Farm",
      subtitle: "Kranian Farms delivers the freshest flowers, herbs, and vegetables locally and internationally. Grown with love, delivered with care."
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Handpicked Excellence, Sustainable Growing",
      subtitle: "Our farm follows eco-friendly practices to ensure sustainable harvests and premium quality products."
    },
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "From Our Gardens to Your Doorstep",
      subtitle: "Experience the beauty of nature with our carefully curated selection of farm-fresh products."
    }
  ];

  const featuredProducts = getFeaturedProducts();

  return (
    <section className="relative h-[550px] md:h-[650px] overflow-hidden">
      <Carousel
        className="w-full h-full"
        opts={{ loop: true }}
        setApi={(api) => {
          api?.on('select', () => {
            setActiveSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] transform scale-105"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    animation: activeSlide === index ? 'heroZoom 8s ease-out forwards' : '',
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                
                <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-48 h-full flex flex-col items-center justify-center text-center">
                  <h1 
                    className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif transform transition-all duration-700"
                    style={{
                      opacity: activeSlide === index ? 1 : 0,
                      transform: activeSlide === index ? 'translateY(0)' : 'translateY(20px)',
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p 
                    className="text-white text-lg md:text-xl max-w-2xl mb-8 transform transition-all duration-700 delay-300"
                    style={{
                      opacity: activeSlide === index ? 1 : 0,
                      transform: activeSlide === index ? 'translateY(0)' : 'translateY(20px)',
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <div 
                    className="flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-500"
                    style={{
                      opacity: activeSlide === index ? 1 : 0,
                      transform: activeSlide === index ? 'translateY(0)' : 'translateY(20px)',
                    }}
                  >
                    <Button asChild size="lg" className="bg-kranian-600 hover:bg-kranian-700 text-white">
                      <Link to="/products">
                        Shop Our Collection
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                      <Link to="/products?category=bouquet">
                        Browse Bouquets
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/30 hover:bg-white/50" />
        <CarouselNext className="right-4 bg-white/30 hover:bg-white/50" />
        
        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => {
                const api = document.querySelector('[data-embla-api]') as any;
                if (api?.__emblaApi) {
                  api.__emblaApi.scrollTo(index);
                }
              }}
            />
          ))}
        </div>
      </Carousel>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
