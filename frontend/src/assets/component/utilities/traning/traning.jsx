import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navbarItems } from "../Array/data";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom % 3 === 0 ? -100 : custom % 3 === 1 ? 0 : 100,
    y: 50
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "90%",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const renderTrainingData = (item) => ({
  title: typeof item === "string" ? item : item?.title || "Untitled",
  icon: item?.icon || null,
  description: item?.description || `Professional training program on ${typeof item === "string" ? item : item?.title || "relevant topic"}`,
})

const Training = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const trainingGroups =
    navbarItems?.find((item) => item?.title === "Training")?.children || [];

  // Find OHSE Training index and set as default active tab
  const ohseIndex = trainingGroups.findIndex(group =>
    group.title && group.title.toLowerCase() === "ohse training"
  );
  
  useEffect(() => {
    if (ohseIndex >= 0) {
      setActiveTab(ohseIndex);
    }
  }, [ohseIndex]);

  // Calculate statistics
  const totalItems = trainingGroups.reduce(
    (acc, group) => acc + (group?.children?.length || 0),
    0
  );
  const totalCategories = trainingGroups.length;

  // Get active group data
  const activeGroup = trainingGroups[activeTab] || {};
  const { title: groupTitle, description: groupDescription } = renderTrainingData(activeGroup);
  const groupItems = activeGroup?.children || [];

  return (
    <div className="min-h-screen bg-gray-50 font-['Arial_Narrow']">
      {/* Hero section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-amber-900 relative inline-block"
            >
              Elevate Your Expertise
              <motion.div 
                variants={underlineVariants}
                initial="hidden"
                animate="visible"
                className="absolute left-1/2 -bottom-2 h-1 bg-yellow-400 rounded-full -translate-x-1/2"
              />
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base md:text-lg lg:text-xl text-amber-800 text-justify max-w-2xl"
            >
              Master in-demand skills with our {totalItems}+ industry-recognized courses across {totalCategories} specialized domains
            </motion.p>

            {/* Stats bar */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap"
            >
              {[
                { 
                  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", 
                  label: "Courses Available", 
                  value: `${totalItems}+` 
                },
                { 
                  icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", 
                  label: "Categories", 
                  value: totalCategories 
                },
                { 
                  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", 
                  label: "Learning Paths", 
                  value: "12+" 
                },
                { 
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", 
                  label: "Certifications", 
                  value: "30+" 
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center px-6 py-4 bg-white/90 rounded-xl shadow-md border border-amber-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-2 md:p-3 mr-3 rounded-full bg-yellow-100 text-yellow-500">
                    <svg className="w-4 md:w-6 h-4 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-amber-700">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-amber-900">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Category tabs - Sticky navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b border-amber-200"
        >
          <nav className="flex space-x-4 overflow-x-auto pb-1">
            {trainingGroups.map((group, idx) => {
              const { title: groupTitle } = renderTrainingData(group);
              return (
                <motion.button
                  key={`tab-${idx}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(idx)}
                  className={`relative whitespace-nowrap py-2 px-4 font-medium text-sm md:text-base rounded-full transition-all duration-300 ${idx === activeTab
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                      : 'text-amber-700 hover:text-amber-900 hover:bg-amber-100'
                    }`}
                >
                  {groupTitle}
                  <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs md:text-sm font-medium ${idx === activeTab
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100 text-amber-800'
                    }`}>
                    {group?.children?.length || 0}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </motion.div>

        {/* Training content */}
        <div className="space-y-12">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center">
                <motion.span 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full 
                   bg-yellow-100 text-yellow-500 font-bold text-lg md:text-xl mr-4"
                >
                  {activeTab + 1}
                </motion.span>
                <div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 relative inline-block"
                  >
                    {groupTitle}
                    <motion.div 
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute left-1/2 -bottom-2 h-1 bg-yellow-400 rounded-full -translate-x-1/2"
                    />
                  </motion.h2>
                  {groupDescription && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-amber-800 mt-2 text-sm md:text-base text-justify"
                    >
                      {groupDescription}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {groupItems.map((item, itemIdx) => {
                const { title, description } = renderTrainingData(item);

                return (
                  <motion.div
                    key={`item-${itemIdx}`}
                    custom={itemIdx}
                    variants={cardVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    onMouseEnter={() => setHoveredCard(itemIdx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative rounded-2xl overflow-hidden bg-white border border-amber-200 shadow-md transition-all duration-300 hover:shadow-lg hover:border-amber-300"
                  >
                    <div className="relative flex flex-col h-full p-6">
                      {/* Card accent */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-400" />

                      {/* Card content */}
                      <div className="flex items-start mb-4">
                        <span className="flex-shrink-0 bg-yellow-100 text-amber-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">
                          {activeTab + 1}.{itemIdx + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-900">{title}</h3>
                      </div>

                      <p className="text-sm md:text-base text-amber-700 mb-6 line-clamp-3 text-justify">{description}</p>

                      {/* Card footer */}
                   
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Training;