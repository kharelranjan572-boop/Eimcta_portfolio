import React from 'react';
import { motion } from 'framer-motion';

// Define the animation variants. These describe the 'initial', 'in', and 'out' states of your page.
const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const pageTransition = {
  duration: 0.6,
  ease: "easeInOut",
};
const PageTransitionWrapper = ({ children, pageKey }) => {
  return (
    <motion.div
      key={pageKey}           // Unique key tells AnimatePresence when a component is entering/exiting
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      variants={pageVariants} // Use the defined variants
      className="min-h-screen " // Important for fullscreen transitions
    // `absolute` allows pages to overlap during transition
    >
      {children} {/* Render the actual content of the page */}
    </motion.div>
  );
};

export default PageTransitionWrapper;