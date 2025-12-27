import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import img7 from '../../img/7.jpg';
import img12 from '../../img/12.jpg';
import img14 from '../../img/14.jpg';
import img26 from '../../img/26.jpg'

const ImageCarousel = () => {
  const slides = [
    { url: img26 },
    { url: img12 },
    { url: img7 },
  
  ];

  // State management for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ref for the autoplay interval and container
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // --- Navigation Functions ---
  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const isLastSlide = currentIndex === slides.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, slides.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, slides.length, isTransitioning]);

  const goToSlide = (slideIndex) => {
    if (slideIndex === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(slideIndex);

    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // --- Autoplay Effect ---
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(goToNext, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [goToNext, isHovered]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
            >
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '1800/750' }}
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 focus:outline-none z-10"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-6 w-6 md:h-10 md:w-10" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 focus:outline-none z-10"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-6 w-6 md:h-10 md:w-10" />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;