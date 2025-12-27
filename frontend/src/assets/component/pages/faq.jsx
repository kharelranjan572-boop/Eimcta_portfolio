import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import {faqData} from "../utilities/Array/data";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ item, isOpen, onClick }) => {
  // Use the icon component provided in the data
  const Icon = item.icon;

  return (
    // Updated container: removed continuous border, added margin-bottom for separation,
    // and conditional styling for open state (border-2, bg-amber-50)
    <div 
        className={`
            mb-4 rounded-xl transition-all duration-300 ease-in-out shadow-sm
            ${isOpen
                ? 'border-2 border-orange-500 bg-amber-50 shadow-lg' // Open state: Strong orange border, amber background
                : 'border border-slate-200 bg-white hover:border-orange-300' // Closed state: Light default border for separation
            }
        `}
    >
      <button
        onClick={onClick}
        // Button padding adjusted to fit inside the new card style
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-all hover:text-orange-600 focus:outline-none rounded-xl"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.question.replace(/\s/g, '-')}`}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Icon container - Updated to amber/orange */}
          <div className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-lg bg-orange-100 text-orange-700 shadow-sm">
            <Icon size={20} />
          </div>
          {/* Question text is now bold */}
          <span className="font-bold text-slate-900 text-base sm:text-lg">{item.question}</span>
        </div>
        
        {/* Chevron icon with rotation animation */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-slate-400 ml-4"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Answer content with Framer Motion slide-in/out */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            id={`faq-answer-${item.question.replace(/\s/g, '-')}`}
            role="region"
            aria-labelledby={`faq-question-${item.question.replace(/\s/g, '-')}`}
          >
            {/* Answer is clearly separated by padding */}
            <div className="pb-5 pt-0 px-5 text-slate-700 leading-relaxed text-sm sm:text-base">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


/**
 * Main FAQ component. (Renamed from App to FAQ)
 */
const Faq = () => {
  // State to track which FAQ item is currently open (null for none)
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the open state of an FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Includes font-sans and custom font-family for Arial Narrow
    <div className="min-h-screen bg-slate-50 py-16 px-4 font-sans antialiased" style={{ fontFamily: 'Arial Narrow, Arial, sans-serif' }}>
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-orange-700 sm:text-5xl">
            EIMCTA FAQ Center
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Your comprehensive resource for questions about ISO Certification, Training, and Consultancy Services.
          </p>
        </div>

        {/* FAQ List Container - The overall container is plain white */}
        <div 
          className="rounded-3xl bg-white p-4 sm:p-10" 
          // Custom box shadow using amber/orange color
          style={{ boxShadow: "0 15px 30px -8px rgba(245, 158, 11, 0.15)" }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Contact CTA Footer - Updated to orange gradient */}
        
      </div>
    </div>
  );
};

export default Faq;