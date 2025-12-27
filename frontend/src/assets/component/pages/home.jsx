import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import { Testimonials } from '../utilities/testimonials.jsx';
import { ISO_CREDENTIALS } from '../utilities/Iso_service.jsx';
import { Branding } from '../utilities/branding.jsx';
// import ImageGallery3D from '../utilities/gallery.jsx';
import ModalPage from '../utilities/modal.jsx';
import Scroll_x from '../utilities/ScrollX.jsx';
import AboutCard from '../utilities/global.jsx';
import ISOShowcase from './Glob_rec.jsx';
import BusinessQuoteForm from './form.jsx';

// Lazy load components
const ImageCarousel = lazy(() => import("../utilities/caro.jsx"));

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 to-amber-100">
    <div className="w-16 h-16 border-4 rounded-full border-amber-200 border-t-amber-600 animate-spin"></div>
  </div>
);

// Feature card component
const FeatureCard = ({ item }) => (
  <motion.div
    className="flex flex-col h-full p-6 transition-all bg-white border border-gray-100 rounded-xl
     shadow-sm group hover:shadow-md sm:p-8"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: item.id * 0.1, type: "spring", stiffness: 100 }}
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  >
    <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-lg 
    bg-amber-100 group-hover:bg-amber-200 sm:w-14 sm:h-14 sm:mb-6">
      <svg className="w-5 h-5 text-amber-600 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
      </svg>
    </div>
    <h3 className="mb-2 text-lg font-bold text-gray-800 italic sm:text-xl sm:mb-3">{item.title}</h3>
    <p className="text-sm font-light leading-relaxed text-gray-600 sm:text-base">{item.desc}</p>
  </motion.div>
);

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 30 : 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 40 : 80]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white overflow-hidden" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
      {/* ===== HERO SECTION ===== */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <section className="relative w-full">
          <ImageCarousel />
        </section>
      </Suspense>

      <Scroll_x />
      <ISOShowcase />

      {/* ===== ISO SERVICES ===== */}
      <ISO_CREDENTIALS />

      {/* ===== GALLERY ===== */}
      {/* <ImageGallery3D /> */}

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />

      <AboutCard />
      {/* ===== BRANDING ===== */}
      
      {/* ===== MODAL ===== */}
      <ModalPage />
      <Branding />
    </div>
  );
};

export default Home;