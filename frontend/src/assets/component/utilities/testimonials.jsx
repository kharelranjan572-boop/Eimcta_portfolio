import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechSolutions Inc.",
    quote: "This service transformed our customer engagement metrics. We saw a 300% increase in positive feedback within just two months of implementation.",
    rating: 5,
    date: "May 15, 2023"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "InnovateX",
    quote: "The platform's intuitive interface and powerful analytics have become indispensable to our daily operations. Truly a game-changer for our business.",
    rating: 4,
    date: "April 2, 2023"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Product Manager",
    company: "Digital Horizon",
    quote: "Exceptional customer support and continuous feature updates keep us coming back. Their team understands our needs perfectly.",
    rating: 5,
    date: "June 28, 2023"
  },
  {
    id: 4,
    name: "David Wilson",
    position: "CTO",
    company: "Nexus Systems",
    quote: "The seamless integration with our existing tools saved us countless hours of development time. Reliability is unmatched in the industry.",
    rating: 5,
    date: "March 10, 2023"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Operations Lead",
    company: "Global Connect",
    quote: "We've reduced our operational costs by 40% while improving efficiency. The ROI was apparent within the first quarter.",
    rating: 4,
    date: "July 5, 2023"
  },
  {
    id: 6,
    name: "James Park",
    position: "Founder",
    company: "StartUp Vision",
    quote: "As a small business, we appreciate the affordable pricing with enterprise-level features. It's like having an entire IT department in one tool.",
    rating: 5,
    date: "February 18, 2023"
  }
];

export const Testimonials = () => {
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [visibleCards, setVisibleCards] = useState(1);

  // Calculate number of visible cards based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      if (width < 768) {
        setVisibleCards(1); // Mobile - 1 card
      } else if (width < 1024) {
        setVisibleCards(2); // Tablet - 2 cards
      } else {
        setVisibleCards(3); // Desktop - 3 cards
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate card width based on number of visible cards
  const cardWidth = 100 / visibleCards; // Percentage width per card

  // Calculate the scroll position based on current index
  const scrollToPosition = (index) => {
    const position = -index * cardWidth;
    controls.start({
      x: `${position}%`,
      transition: { duration: 0.5 }
    });
  };

  // Handle next button click
  const handleNext = () => {
    const newIndex = Math.min(currentIndex + visibleCards, testimonials.length - visibleCards);
    setCurrentIndex(newIndex);
    scrollToPosition(newIndex);
  };

  // Handle previous button click
  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - visibleCards, 0);
    setCurrentIndex(newIndex);
    scrollToPosition(newIndex);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (currentIndex + visibleCards >= testimonials.length) {
        // If at end, go back to start
        setCurrentIndex(0);
        scrollToPosition(0);
      } else {
        handleNext();
      }
    }, 3000); // 3 seconds auto-scroll

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, visibleCards]);

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-14 lg:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
            Trusted by <span className="text-amber-600">Leading Organizations</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
            Don't just take our word for it - hear what our clients say
          </p>
        </motion.div>

        <div className="relative group">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full
               bg-white shadow-md flex items-center justify-center hover:bg-amber-50 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex + visibleCards < testimonials.length && (
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-amber-50 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Gradient overlays - only show on desktop */}
          {windowWidth >= 768 && (
            <>
              <div className="absolute inset-y-0 left-0 w-8 sm:w-12 md:w-16 lg:w-24   z-10"></div>
              <div className="absolute inset-y-0 right-0 w-8 sm:w-12 md:w-16 lg:w-24  z-10"></div>
            </>
          )}

          {/* Testimonials Carousel */}
          <div className="overflow-hidden py-4 px-8 md:px-4">
            <motion.div
              className="flex"
              animate={controls}
              initial={{ x: 0 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex-shrink-0 ${windowWidth < 768 ? 'w-full' : `w-1/${visibleCards}`} px-2`}
                  whileHover={{
                    scale: windowWidth >= 768 ? 1.03 : 1, // Only scale on desktop
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="bg-white border border-amber-200 p-6 md:p-8 rounded-xl shadow-lg
                   hover:shadow-xl transition-all duration-300 h-full mx-auto max-w-md md:max-w-none">
                    <div className="flex items-start mb-5 md:mb-6">
                      <div className="relative">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-base md:text-lg text-gray-800" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>{testimonial.name}</h4>
                        <p className="text-amber-600 text-sm md:text-base" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>{testimonial.position}</p>
                        <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="relative">
                      <svg
                        className="absolute -top-5 -left-2 w-7 h-7 md:w-8 md:h-8 text-amber-100 opacity-70"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-sm md:text-base text-gray-700 italic relative z-10 pl-6" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="mt-4 md:mt-6 flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 md:w-5 md:h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dots indicator for mobile */}
        {windowWidth < 768 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / visibleCards) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index * visibleCards);
                  scrollToPosition(index * visibleCards);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index * visibleCards ? 'bg-amber-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};