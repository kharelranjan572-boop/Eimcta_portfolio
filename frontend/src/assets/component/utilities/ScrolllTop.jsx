import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [launch, setLaunch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 900);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setLaunch(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
    setTimeout(() => setLaunch(false), 1000);
  };

  return (
    <>
      {/* Enhanced gas flames under rocket */}
      {launch && (
        <div className="fixed bottom-[58px] right-[34px] z-40 flex flex-col items-center pointer-events-none">
          <div className="w-2 h-4 bg-amber-400 rounded-full blur-[3px] mb-1 opacity-90 animate-flame-flicker"></div>
          <div className="w-2.5 h-3 bg-yellow-300 rounded-full blur-[4px] opacity-80 animate-flame-flicker delay-75"></div>
          <div className="w-1.5 h-2 bg-yellow-200 rounded-full blur-[2px] opacity-70 animate-flame-flicker delay-150"></div>
        </div>
      )}

      {/* Scroll to Top Rocket Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-500 ease-out
          bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700
          hover:scale-110 hover:shadow-2xl focus:outline-none
          ring-1 ring-amber-300/50 shadow-lg shadow-amber-500/30
          ${visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
          }
          ${launch ? "animate-rocket-launch" : ""}
        `}
        aria-label="Scroll to top"
      >
        <Rocket
          size={26}
          strokeWidth={2}
          className="text-white rotate-[315deg] drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        />
      </button>

      {/* Keyframe styles */}
      <style>{`
        @keyframes rocket-launch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(-30px) scale(1.05);
          }
          60% {
            transform: translateY(-60px) scale(1.1);
          }
          100% {
            transform: translateY(-100px) scale(1.15);
            opacity: 0;
          }
        }
        
        @keyframes flame-flicker {
          0%, 100% { 
            opacity: 0.8; 
            transform: scaleY(1) scaleX(0.95);
          }
          25% { 
            opacity: 0.9;
            transform: scaleY(1.2) scaleX(1.1);
          }
          50% { 
            opacity: 0.7;
            transform: scaleY(1.1) scaleX(0.98);
          }
          75% { 
            opacity: 0.85;
            transform: scaleY(1.3) scaleX(1.05);
          }
        }

        .animate-rocket-launch {
          animation: rocket-launch 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        }

        .animate-flame-flicker {
          animation: flame-flicker 0.3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton