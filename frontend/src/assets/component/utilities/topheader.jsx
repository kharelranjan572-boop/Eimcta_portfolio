import { motion } from 'framer-motion';
import { Facebook, Youtube, Linkedin } from 'lucide-react';
import React from 'react';

// --- Data for Social Links ---
const socialLinks = [
  { href: "https://www.facebook.com/eimctanepal", label: "Facebook", icon: Facebook },
  { href: "https://www.youtube.com/@ISO.EIMCTA", label: "YouTube", icon: Youtube },
  { href: "https://www.instagram.com/everest_consultrain/", label: "LinkedIn", icon: Linkedin },
];

// --- TopHeader Component ---
const TopHeader = () => {
  // Animation for the background container sliding in from the left
  const containerVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        duration: 0.7, // A smooth slide-in for the background
        ease: 'easeOut',
      },
    },
  };

  // Animation for the content sliding in after the container animation finishes
  const contentVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.7, // Delay is now equal to the container's animation duration
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="w-full bg-orange-50 border-b border-slate-200 py-2 px-4 sm:px-6 overflow-hidden" // overflow-hidden to contain animation
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-y-2 sm:gap-y-0"
        variants={contentVariants} // Children will inherit these variants
      >
        <p
          className="font-semibold uppercase text-center sm:text-left text-xs sm:text-sm flex-1"
          style={{
            letterSpacing: '1px',
            fontFamily: "'Arial Narrow', Arial, sans-serif",
            color: '#6F4E37',
          }}
        >
          Everest International Management Consultancy Training and Agency Pvt. Ltd.
        </p>
        <div className="flex items-center">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group px-3 py-1 border-r border-slate-300 last:border-r-0"
            >
              <Icon
                className="w-5 h-5 text-slate-600 transition-colors duration-300 ease-in-out group-hover:text-amber-600"
              />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopHeader;