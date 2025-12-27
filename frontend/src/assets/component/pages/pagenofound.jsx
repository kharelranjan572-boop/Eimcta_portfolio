import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ image }) => {
  return (
    <>
     
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }

          .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-pulse { animation: pulse 5s ease-in-out infinite; }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-600 { animation-delay: 0.6s; }
        `}
      </style>

      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 px-4 text-center font-sans">
        <div className="mb-8">
          {image ? (
            // If an image prop is provided, it will be used.
            <img
              src={image}
              alt="Page not found"
              className="w-64 sm:w-72 md:w-80 lg:w-96 animate-float"
            />
          ) : (
            // Default SVG illustration if no image is provided.
            // This SVG is more visually interesting and includes subtle animations.
            <svg
              className="w-64 sm:w-72 md:w-80 lg:w-96 animate-float"
              viewBox="0 0 600 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="4" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main "404" text with a pulsing animation */}
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="180"
                fontWeight="bold"
                fill="#e2e8f0"
                className="animate-pulse"
              >
                404
              </text>
              
              {/* Illustration of a magnifying glass */}
              <g transform="translate(100, 100) rotate(-15)" filter="url(#shadow)">
                <circle cx="100" cy="100" r="70" fill="white" stroke="#94a3b8" strokeWidth="10" />
                <rect x="90" y="90" width="20" height="20" fill="#e0f2fe" />
                <line x1="155" y1="155" x2="220" y2="220" stroke="#94a3b8" strokeWidth="20" strokeLinecap="round" />
              </g>
            </svg>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 mb-4 opacity-0 animate-fadeIn animation-delay-200">
          Page Not Found
        </h1>
        
        <p className="text-md sm:text-lg mt-2 max-w-md text-slate-500 opacity-0 animate-fadeIn animation-delay-400">
          Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist.
        </p>
        
        {/* The Link component is replaced with a standard anchor tag for better compatibility. */}
        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-fadeIn animation-delay-600"
        >
          Go to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;