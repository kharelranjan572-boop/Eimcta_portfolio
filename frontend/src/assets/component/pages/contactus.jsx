import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, ExternalLink, Menu, X } from 'lucide-react';
import BusinessQuoteForm from "./form";

// Animation variants (same as before)
const slideInRight = {
  hidden: { x: 80, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInLeft = {
  hidden: { x: -80, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const underlineVariant = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const rotate3D = {
  hidden: { y: 30, rotateX: -10, opacity: 0 },
  visible: { 
    y: 0, 
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Card component with hover animations
const ThreeDCard = ({ children, className = "", variants = slideInUp, custom = 0 }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        rotateX: 2,
        rotateY: -1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      custom={custom}
      className={`rounded-xl bg-white/95 backdrop-blur-sm border border-amber-200/60 shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Mobile Navigation Component

// Main App component
export default function Contact() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Close mobile nav when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Mobile Navigation */}
      
     
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative">
        {/* Enhanced Hero Section with CSS Parallax-like effect */}
        <div 
          className="bg-cover bg-fixed bg-center" 
          style={{backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
        >
          <div className="h-64 md:h-96 flex items-center justify-center bg-gradient-to-r from-amber-900/80 to-amber-800/70 px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-4 md:mb-6">
                <motion.div 
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-amber-500/20 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
                </motion.div>
                <motion.h1 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-3 md:mb-4 relative"
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                >
                  Contact Us
                  <motion.span 
                    className="block w-1/3 md:w-1/4 h-1.5 bg-amber-400 rounded-full mx-auto mt-3 md:mt-4"
                    variants={underlineVariant}
                    initial="hidden"
                    animate="visible"
                  ></motion.span>
                </motion.h1>
              </div>
              <motion.p 
                className="text-base md:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
              >
                Get in touch with our team for any questions about our services or to schedule a consultation.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-8 md:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h2 
                className="text-2xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4 relative inline-block"
                variants={itemVariants}
              >
                Get In Touch
                <motion.span 
                  className="absolute w-1/3 md:w-1/4 left-1/2 -translate-x-1/2 -bottom-2 md:-bottom-3 h-1.5 bg-amber-400 rounded-full"
                  variants={underlineVariant}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-amber-700 max-w-2xl mx-auto text-base md:text-lg"
                variants={itemVariants}
              >
                Reach out to us through any of these channels
              </motion.p>
            </motion.div>

            <ThreeDCard className="p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                {/* Contact Details */}
                <motion.div 
                  className="space-y-6 md:space-y-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <div>
                    <motion.h3 
                      className="text-xl md:text-2xl font-semibold text-amber-900 mb-4 md:mb-6 pb-2 border-b border-amber-200"
                      variants={itemVariants}
                    >
                      Contact Information
                    </motion.h3>
                    <div className="space-y-4 md:space-y-6">
                      <ThreeDCard variants={slideInUp} custom={0.1} className="p-3 md:p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                            <Phone className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-amber-900 font-medium text-base md:text-lg mb-1 md:mb-2">Phone Numbers</p>
                            <a href="tel:+977015903211" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              +977-01-5903211
                            </a>
                            <a href="tel:+9779741766637" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              +977 9741 766 637
                            </a>
                            <a href="tel:+9779862731591" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              +977 9862 731 591
                            </a>
                            <p className="text-xs md:text-sm text-amber-600 mt-1 md:mt-2">Click to call directly</p>
                          </div>
                        </div>
                      </ThreeDCard>

                      <ThreeDCard variants={slideInUp} custom={0.2} className="p-3 md:p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                            <Mail className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-amber-900 font-medium text-base md:text-lg mb-1 md:mb-2">Email Addresses</p>
                            <a href="mailto:info@everestconsultrain.com" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              info@everestconsultrain.com
                            </a>
                            <a href="mailto:eimcta.md@gmail.com" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              eimcta.md@gmail.com
                            </a>
                            <a href="mailto:iso.kathmandu@gmail.com" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              iso.kathmandu@gmail.com
                            </a>
                            <p className="text-xs md:text-sm text-amber-600 mt-1 md:mt-2">Click to send an email</p>
                          </div>
                        </div>
                      </ThreeDCard>

                      <ThreeDCard variants={slideInUp} custom={0.3} className="p-3 md:p-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                            <Globe className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-amber-900 font-medium text-base md:text-lg mb-1 md:mb-2">Website</p>
                            <a href="https://everestconsultrain.com" target="_blank" rel="noopener noreferrer" className="block text-amber-700 hover:text-amber-900 transition-colors duration-200 py-1 hover:underline text-sm md:text-base truncate">
                              https://everestconsultrain.com
                            </a>
                            <p className="text-xs md:text-sm text-amber-600 mt-1 md:mt-2">Click to visit our website</p>
                          </div>
                        </div>
                      </ThreeDCard>
                    </div>
                  </div>
                </motion.div>

                {/* QR Codes and Social Media */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.h3 
                    className="text-xl md:text-2xl font-semibold text-amber-900 mb-4 md:mb-6 pb-2 border-b border-amber-200"
                    variants={itemVariants}
                  >
                    Connect With Us
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-5">
                    <ThreeDCard variants={rotate3D} custom={0.1} className="text-center p-3 md:p-4">
                      <div className="bg-white p-2 md:p-3 rounded-xl border border-amber-200 shadow-sm inline-block">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.facebook.com/eimctanepal`}
                          alt="Facebook QR Code"
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                        />
                      </div>
                      <p className="text-amber-700 mt-2 md:mt-3 font-medium text-sm md:text-base">Facebook</p>
                      <p className="text-xs md:text-sm text-amber-600">Scan to follow</p>
                    </ThreeDCard>

                    <ThreeDCard variants={rotate3D} custom={0.2} className="text-center p-3 md:p-4">
                      <div className="bg-white p-2 md:p-3 rounded-xl border border-amber-200 shadow-sm inline-block">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.youtube.com/@ISO.EIMCTA`}
                          alt="YouTube QR Code"
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                        />
                      </div>
                      <p className="text-amber-700 mt-2 md:mt-3 font-medium text-sm md:text-base">YouTube</p>
                      <p className="text-xs md:text-sm text-amber-600">Scan to subscribe</p>
                    </ThreeDCard>

                    <ThreeDCard variants={rotate3D} custom={0.3} className="text-center p-3 md:p-4">
                      <div className="bg-white p-2 md:p-3 rounded-xl border border-amber-200 shadow-sm inline-block">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/?originalSubdomain=np`}
                          alt="LinkedIn QR Code"
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                        />
                      </div>
                      <p className="text-amber-700 mt-2 md:mt-3 font-medium text-sm md:text-base">LinkedIn</p>
                      <p className="text-xs md:text-sm text-amber-600">Scan to connect</p>
                    </ThreeDCard>

                    <ThreeDCard variants={rotate3D} custom={0.4} className="text-center p-3 md:p-4">
                      <div className="bg-white p-2 md:p-3 rounded-xl border border-amber-200 shadow-sm inline-block">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.instagram.com/everest_consultrain/`}
                          alt="Instagram QR Code"
                          className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                        />
                      </div>
                      <p className="text-amber-700 mt-2 md:mt-3 font-medium text-sm md:text-base">Instagram</p>
                      <p className="text-xs md:text-sm text-amber-600">Scan to follow</p>
                    </ThreeDCard>
                  </div>
                </motion.div>
              </div>
            </ThreeDCard>
          </div>
        </div>

        {/* Map Location */}
        <div className="container mx-auto px-4 sm:px-6 pb-12 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-6 md:mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.h2 
                className="text-2xl md:text-4xl font-bold text-amber-900 mb-3 md:mb-4 relative inline-block"
                variants={itemVariants}
              >
                Find Us on the Map
                <motion.span 
                  className="absolute w-1/3 md:w-1/4 left-1/2 -translate-x-1/2 -bottom-2 md:-bottom-3 h-1.5 bg-amber-400 rounded-full"
                  variants={underlineVariant}
                ></motion.span>
              </motion.h2>
              <motion.p 
                className="text-amber-700 max-w-2xl mx-auto text-base md:text-lg"
                variants={itemVariants}
              >
                Visit our office at the location below
              </motion.p>
            </motion.div>
            
            <ThreeDCard variants={scaleUp} className="w-full h-64 sm:h-72 md:h-96">
              <iframe
                title="EIMCTA Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.647673399961!2d85.36863727607958!3d27.72157447568726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1968cee7500d%3A0x260f11a4a2e7c416!2sEIMCTA!5e0!3m2!1sen!2snp!4v1693831942422!5m2!1sen!2snp"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 w-full h-full"
              ></iframe>
            </ThreeDCard>
            
            <motion.div 
              className="mt-4 md:mt-6 text-center px-2"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-amber-700 text-sm md:text-base">
                <strong>Address:</strong> Everest International Management Consultancy & Training Agency Pvt. Ltd.
              </p>
              <a
                href="https://www.google.com/maps/place/Everest+International+Management+Consultancy+%26Training+Agency+Pvt.+Ltd./@27.7215243,85.3708094,42m/data=!3m1!1e3!4m14!1m7!3m6!1s0x39eb1b94991c2f69:0xa6d7df8340d039b1!2sEverest+International+Management+Consultancy+%26Training+Agency+Pvt.+Ltd.!8m2!3d27.7215752!4d85.3708119!16s%2Fg%2F11vfb9tw0s!3m5!1s0x39eb1b94991c2f69:0xa6d7df8340d039b1!8m2!3d27.7215752!4d85.3708119!16s%2Fg%2F11vfb9tw0s?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 md:mt-3 text-amber-600 hover:text-amber-800 font-medium transition-colors text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                Open in Google Maps
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}