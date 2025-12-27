import React from "react";
import { motion } from "framer-motion";

const Scroll_x = () => {
  // State to hold the current time in Nepal

  // Define the unique items for the marquee
  const marqueeItems = [
    { content: "| https://everestconsultrain.com |" },
    { content: "| info@everestconsultrain.com |" },
    { content: "  | +977 1 5903211 | 974-1766637 |" },
    { content: "| Bouddha, Kathmandu |" },
  ];

  // Effect to update the time every second


  // A helper component to render the sequence of items.
  const MarqueeSequence = () => (
    <>
      {marqueeItems.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className="text-gray-700 text-nowrap font-medium text-xs md:text-sm mx-2 md:mx-4"
            style={{ fontFamily: "Arial Narrow" }}
          >
            {item.content}
          </span>
          <span className="text-gray-400 mx-1 md:mx-2">✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="w-full bg-gray-100 py-2 md:py-3 px-3 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 shadow-md rounded-lg my-4"
    >
      {/* Marquee Container */}
      <div className="w-full md:flex-1 overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            <MarqueeSequence />
            <MarqueeSequence />
          </div>
        </div>
      </div>

      {/* Right side container for clock and icons, hidden on mobile */}


      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
        
        .marquee-content {
          display: flex;
          align-items: center;
          width: fit-content;
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 767px) {
          .marquee-content {
            animation-duration: 22s;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Scroll_x;

