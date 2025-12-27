import { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

const WHATSAPP_LINK = "https://wa.me/1234567890";
const PHONE_NUMBER = "tel:+1234567890";
const MESSENGER_LINK = "https://m.me/your-username";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <style>{`
        @keyframes amber-glow {
          0%, 100% {
            box-shadow: 0 0 8px #f59e0b, 0 0 16px #f59e0b;
          }
          50% {
            box-shadow: 0 0 20px #fbbf24, 0 0 40px #f59e0b;
          }
        }

        .animate-amber-glow {
          animation: amber-glow 2.5s ease-in-out infinite;
        }

        .chat-option {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .chat-option:hover {
          transform: translateY(-5px) scale(1.08);
        }
      `}</style>

      <div ref={chatRef} className="fixed bottom-5 left-5 z-50">
        {/* Chat Options */}
        <div
          className={`flex flex-col items-center space-y-4 mb-4 transition-all duration-500 ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          {/* WhatsApp */}
          <Link
            to={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-option w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-amber-600"
          >
            <FaWhatsapp size={28} />
          </Link>

          {/* Phone */}
          <Link
            to={PHONE_NUMBER}
            className="chat-option w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-amber-700"
          >
            <Phone size={28} />
          </Link>

          {/* Messenger */}
          <Link
            to={MESSENGER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-option w-14 h-14 bg-amber-700 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-amber-800"
          >
            <FaFacebookMessenger size={28} />
          </Link>
        </div>

        {/* Main Toggle Button (ONLY glowing element) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-amber-600 animate-amber-glow transition-colors"
          aria-label="Toggle chat menu"
        >
          {isOpen ? (
            <X size={32} className="transition-transform duration-300 rotate-90" />
          ) : (
            <MessageSquare size={32} className="transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Chat;
