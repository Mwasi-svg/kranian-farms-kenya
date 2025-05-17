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

// Define the type for a slide in the hero carousel
type HeroSlide = {
  image: string;
  title: string;
  subtitle: string;
  buttonText?: string;  // Added optional buttonText property
};

const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const slides: HeroSlide[] = [
    {
      image: "./burgundy.png",
      title: "Premium Roses",
      subtitle: "Explore our fine roses"
    },
    {
      image: "reflex.png",
      title: "Spray Roses",
      subtitle: "Explore our Spray Roses"
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
    },
  ];
  const vegetablesIndex = slides.findIndex(slide => slide.title === "Handpicked Excellence, Sustainable Growing");

  // Use proper type for the slides we're adding
  const additionalSlides: HeroSlide[] = [
    {
      image: "summerflower.png",
      title: "Summer Flowers",
      subtitle: "Explore our vast Summer Flowers",
    },
    {
      image: "herbs.jpg",
      title: "Herbs",
      subtitle: "Explore our fresh Herbs",
      buttonText: "Explore Herbs"
    },
    {
      image: "fruits.png",
      title: "Fruits",
      subtitle: "Explore our tropical Fruits",
      buttonText: "Browse Fruits"
    },
    {
      image: "vegetables.png",
      title: "Vegetables",
      subtitle: "Explore our fresh vegetables",
      buttonText: "Browse Vegetables"
    },
  ];

  // Insert the additional slides
  slides.splice(vegetablesIndex, 0, ...additionalSlides);
  slides.splice(6, 2);

  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    if (carouselApi) {
      const interval = setInterval(() => {
        carouselApi.scrollNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselApi]);

  return (
    <div className="relative min-h-[100vh] overflow-hidden -mt-[74px] flex flex-col scrollbar-none"> 
      {/* Fixed the style tag by removing jsx attribute */}
      <style>
        {`
        body {
          overflow-y: scroll;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        body::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        @keyframes heroZoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}
      </style>

      <Carousel
        className="w-full h-full relative z-0"
        opts={{ loop: true }}
        setApi={(api) => { setCarouselApi(api);
          api?.on('select', () => {
            setActiveSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-screen">
                <div
                  className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] z-0 bg-cover bg-center bg-no-repeat object-cover"
                  style={{
                    ...(slide.title === "Premium Roses" && {
                      backgroundPosition: 'left center',
                    }),
                    backgroundImage: `url('${slide.image}')`,
                    animation: activeSlide === index ? 'heroZoom 8s ease-out forwards' : '',
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>

                <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-48 h-full flex flex-col items-center justify-center text-center z-10">
                  <h1
                    className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif transform transition-all duration-700 drop-shadow-lg"
                    style={{
                      opacity: activeSlide === index ? 1 : 0,
                      transform: activeSlide === index ? 'translateY(0)' : 'translateY(20px)',
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-white text-lg md:text-xl max-w-2xl mb-8 transform transition-all duration-700 delay-300 drop-shadow-lg"
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
                    { slide.title === "Herbs" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=herbs">
                          Explore Herbs
                        </Link>
                      </Button>
                    ) : slide.title === "Fruits" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=fruits">
                          Browse Fruits
                        </Link>
                      </Button>
                    ) : slide.title === "Summer Flowers" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=summer-flowers">
                          Explore Summer Flowers
                        </Link>
                      </Button>
                    ) : slide.title === "Spray Roses" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=spray-roses">
                          Browse Spray Roses
                        </Link>
                      </Button>
                    ) : slide.title === "Premium Roses" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=premium-roses">
                          Browse Premium Roses
                        </Link>
                      </Button>
                    ) : slide.title === "Vegetables" ? (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=vegetables">
                          Explore Vegetables
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg" variant="outline" className="bg-white bg-opacity-20 border-white text-white hover:bg-white hover:bg-opacity-30">
                        <Link to="/products?category=bouquet">
                          Browse Premium Roses
                        </Link>
                      </Button>
                    )}
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
                if (carouselApi) {
                  carouselApi.scrollTo(index);
                }
              }}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
