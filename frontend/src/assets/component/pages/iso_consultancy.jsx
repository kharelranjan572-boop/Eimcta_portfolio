import React from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import consultationProcess from '../../img/consulatancy process.jpg'
import Image from '../utilities/image';
import BusinessQuoteForm from './form';
import VideoPlayer from '../utilities/Video';

const Icon = ({ name, className }) => {
  const icons = {
    award: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    earth: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5s9.5-4.25 9.5-9.5z"></path>
        <path d="M12 2.5c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5z"></path>
        <path d="M12 12c-5.25 0-9.5 4.25-9.5 9.5"></path>
      </svg>
    ),
    shield: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    fileText: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    trendingUp: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    checkCircle: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    layers: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    globe: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
  };

  return icons[name] || null;
};



// --- ANIMATION VARIANTS & COMPONENTS ---
const heroTitleVariant = {
  hidden: { x: 80, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const heroParagraphVariant = {
  hidden: { x: -80, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const sectionHeaderVariant = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const underlineVariant = {
  hidden: { width: '0%', opacity: 0 },
  show: { width: '90%', opacity: 1, transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' } }
};

const paragraphVariant = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
};

const cardVariants = {
  slideInUp: { hidden: { y: 60, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } },
  slideInLeft: { hidden: { x: -80, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.8 } } },
  slideInRight: { hidden: { x: 80, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.8 } } },
  rotate3D: { hidden: { y: 30, opacity: 0, rotateX: -10 }, show: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.8 } } },
  scaleUp: { hidden: { scale: 0.92, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.7 } } }
};

const cardHover = { y: -8, rotateX: 2, rotateY: -1, transition: { duration: 0.3, ease: "easeOut" } };

// Wrapper for triggering animations on scroll
const AnimatedWhenVisible = ({ children, variants, className, tag = 'div', hoverEffect }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  React.useEffect(() => {
    if (inView) { controls.start("show"); }
  }, [controls, inView]);

  const MotionComponent = motion[tag];
  return (
    <MotionComponent ref={ref} variants={variants} initial="hidden" animate={controls} whileHover={hoverEffect} className={className}>
      {children}
    </MotionComponent>
  );
};

// Component for section headers with animated underline
const AnimatedHeader = ({ children, className }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (inView) { controls.start("show"); }
  }, [controls, inView]);

  return (
    <div ref={ref} className={`w-full text-center ${className}`}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="relative inline-block"
      >
        <motion.h2 variants={sectionHeaderVariant} className="text-3xl font-bold text-amber-900">
          {children}
        </motion.h2>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 bg-amber-500 rounded-lg"
          style={{ originX: 0.5 }}
          variants={underlineVariant}
        />
      </motion.div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const ISOConsultancy = () => {
  const { useState } = React;
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState(null);

  const allStandards = [
    { id: "9001", name: "ISO 9001:2015", focus: "Quality Management", industries: "All industries", iconName: "award" },
    { id: "14001", name: "ISO 14001:2015", focus: "Environmental Management", industries: "Manufacturing, Construction", iconName: "earth" },
    { id: "45001", name: "ISO 45001:2018", focus: "Occupational Health & Safety", industries: "Factories, Hospitals", iconName: "shield" },
    { id: "27001", name: "ISO 27001:2022", focus: "Information Security", industries: "IT, Banking, Healthcare", iconName: "fileText" },
    { id: "39001", name: "ISO 39001:2012", focus: "Road Traffic Safety", industries: "Transportation, Logistics", iconName: "trendingUp" },
    { id: "15189", name: "ISO 15189:2022", focus: "Medical Laboratories", industries: "Healthcare, Diagnostics", iconName: "checkCircle" },
    { id: "26000", name: "ISO 26000:2010", focus: "Social Responsibility", industries: "All industries", iconName: "users" },
    { id: "55001", name: "ISO 55001:2014", focus: "Asset Management", industries: "Utilities, Infrastructure", iconName: "layers" },
    { id: "50001", name: "ISO 50001:2018", focus: "Energy Management", industries: "Manufacturing, Energy", iconName: "clock" },
    { id: "41001", name: "ISO 41001:2018", focus: "Facility Management", industries: "Real Estate, Corporate", iconName: "globe" },
    { id: "28001", name: "ISO 28001", focus: "Supply Chain Security", industries: "Logistics, Shipping", iconName: "shield" },
    { id: "SA8000", name: "SA 8000", focus: "Social Accountability", industries: "Textiles, Manufacturing", iconName: "users" }
  ];

  const tabs = [
    {
      id: "overview",
      title: "Overview",
      icon: "🧭",
      content: (
        <div className="space-y-8">
          <AnimatedWhenVisible variants={cardVariants.slideInUp} className="bg-white p-8 rounded-3xl shadow-md border border-amber-200 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex justify-center  items-stretch">
              <span className="bg-amber-100 text-amber-900 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 flex items-center justify-center mr-4 text-base sm:text-xl md:text-xl">🧭</span>
                <AnimatedHeader className="mb-10 !text-left">What is ISO Consultancy?</AnimatedHeader>
            </h3>
            <AnimatedWhenVisible tag="p" variants={paragraphVariant} className="text-base md:text-lg mb-6 leading-relaxed text-gray-700">
              <strong className="font-semibold text-amber-800">ISO Consultancy</strong> provides expert guidance to implement international standards,
              streamline processes, and achieve certification. We bridge the gap between your current systems and ISO requirements.
            </AnimatedWhenVisible>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
              <p className="text-amber-800 text-base md:text-lg">
                Whether it's <strong>ISO 9001 (Quality)</strong>, <strong>ISO 14001 (Environment)</strong>,
                or <strong>ISO 45001 (Safety)</strong>, we customize solutions for <strong>your industry needs</strong>.
              </p>
            </div>
          </AnimatedWhenVisible>

          <div className="bg-white p-8 rounded-3xl shadow-md border border-amber-200 transition-all duration-300 hover:shadow-lg">
            <AnimatedHeader className="mb-10 !text-left">Why ISO Standards Matter?</AnimatedHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "📈", title: "Operational Excellence", desc: "Streamline processes for maximum efficiency" },
                { icon: "⚖️", title: "Regulatory Compliance", desc: "Meet legal and customer requirements" },
                { icon: "🌐", title: "Global Recognition", desc: "Enhance credibility in international markets" },
                { icon: "🛡️", title: "Risk Management", desc: "Proactively identify and mitigate risks" },
                { icon: "🔄", title: "Continuous Improvement", desc: "Implement PDCA cycle for growth" },
                { icon: "💼", title: "Competitive Advantage", desc: "Stand out in procurement processes" },
              ].map((item, i) => (
                <AnimatedWhenVisible key={i} variants={cardVariants.scaleUp} hoverEffect={cardHover} className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </AnimatedWhenVisible>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "standards",
      title: "Standards",
      icon: "📘",
      content: (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-md transition-all duration-300 hover:shadow-lg">
            <AnimatedHeader className="mb-10 !text-left">Comprehensive ISO Standards Coverage</AnimatedHeader>
            <p className="text-lg text-gray-700 mb-8">
              We specialize in implementing a wide range of international standards across industries.
              Select a standard to learn more about its benefits and implementation process.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allStandards.map((standard, i) => (
                <AnimatedWhenVisible key={i} variants={cardVariants.slideInUp} hoverEffect={cardHover} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
                  <div className="flex items-start mb-4">
                    <div className="bg-amber-100 p-3 rounded-lg mr-4">
                      <Icon name={standard.iconName} className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{standard.name}</h3>
                      <p className="text-sm text-gray-500">Standard: {standard.id}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 h-12">{standard.focus}</p>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-amber-800">Industries:</span> {standard.industries}
                    </p>
                  </div>
                </AnimatedWhenVisible>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "process",
      title: "Process",
      icon: "🛠️",
      content: (
        <div className="relative p-4">
          <div className="hidden lg:block absolute top-0 left-1/2 h-full w-0.5 bg-amber-200 transform -translate-x-1/2"></div>
          <motion.div variants={{ show: { transition: { staggerChildren: 0.2 } } }} initial="hidden" animate="show">
            {[
              { id: 1, title: "Free Consultation", desc: "Initial discussion to understand client needs", icon: "💬" },
              { id: 2, title: "Contract Signing", desc: "Formal agreement between parties", icon: "📝" },
              { id: 3, title: "Initial Payment", desc: "Client makes first payment", icon: "💰" },
              { id: 4, title: "Job Card Opening", desc: "Project officially begins", icon: "📋" },
              { id: 5, title: "Consultant Deployment", desc: "Consultant assigned with project plan", icon: "👨‍💼" },
              { id: 6, title: "Gap Analysis", desc: "Initial assessment of current state", icon: "🔍" },
              { id: 7, title: "Documentation & Training", desc: "ISO documents and training provided", icon: "📚" },
              { id: 8, title: "24/7 Support", desc: "Continuous support via WhatsApp", icon: "🔄" },
              { id: 9, title: "Job Card Closing", desc: "Project phase concludes", icon: "✅" },
              { id: 10, title: "Part Payment", desc: "Client makes partial payment", icon: "💳" },
              { id: 11, title: "Final Project Closing", desc: "Project officially ends", icon: "🏁" },
              { id: 12, title: "Client Feedback", desc: "Client provides feedback on services", icon: "🌟" },
            ].map((step, i) => (
              <motion.div key={i} variants={i % 2 === 0 ? cardVariants.slideInRight : cardVariants.slideInLeft} className={`relative mb-8 lg:flex items-center ${i % 2 === 0 ? "lg:flex-row-reverse" : ""}`}>
                <div className="hidden lg:block w-1/2"></div>
                <div className="hidden lg:block relative">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.id}
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <motion.div whileHover={cardHover} className={`bg-white p-6 rounded-2xl shadow-sm border border-amber-200 h-full ${i % 2 === 0 ? "lg:ml-8" : "lg:mr-8"}`}>
                    <div className="flex items-start">
                      <div className="bg-amber-100 rounded-lg w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0 text-3xl">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )
    },
  ];

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Arial+Narrow:wght@400;700&display=swap');
      .font-arial-narrow { font-family: 'Arial Narrow', sans-serif; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
      .aspect-h-9 { /* No styles needed here with padding-bottom */ }
      .aspect-w-16 > * { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    `}</style>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 min-h-screen font-arial-narrow text-gray-800">
        <div className="max-w-5xl mx-auto mb-10 text-center">
          <AnimatedWhenVisible tag="h1" variants={heroTitleVariant} className="text-4xl md:text-5xl font-extrabold mb-6 text-amber-900 tracking-tight">
            ISO Certification Consultancy Services
          </AnimatedWhenVisible>
          <AnimatedWhenVisible tag="p" variants={heroParagraphVariant} className="text-lg md:text-xl text-amber-800 mb-8">
            Expert guidance to implement international standards and achieve your certification goals.
          </AnimatedWhenVisible>

        </div>
            <Image
              src={consultationProcess} alt={consultationProcess} caption=" "
             
            />

        <div className="mb-8">
          <div className="relative border-b-2 border-amber-200">
            <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  onMouseEnter={() => setHoveredTab(i)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`px-5 py-3 font-semibold rounded-t-lg transition-all duration-300 relative whitespace-nowrap text-base md:text-lg ${activeTab === i ? 'text-amber-800' : 'text-amber-600 hover:text-amber-800 hover:bg-amber-100/50'}`}
                >
                  <span className="mr-2 text-lg md:text-xl">{tab.icon}</span>
                  {tab.title}
                  <motion.div layoutId="underline" className={`absolute bottom-[-2px] left-0 right-0 h-1 bg-amber-500 ${activeTab === i ? '' : 'hidden'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6">
          {tabs[activeTab].content}
        </div>

        <div className="my-20">
          <AnimatedHeader className="mb-12">Trusted By Organizations Across Industries</AnimatedHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { type: "Manufacturers", icon: "🏭", count: "120+" },
              { type: "Healthcare", icon: "🏥", count: "80+" },
              { type: "Education", icon: "🎓", count: "45+" },
              { type: "IT Companies", icon: "💻", count: "65+" },
              { type: "Agriculture", icon: "🌾", count: "30+" },
              { type: "Government", icon: "🏛️", count: "25+" },
            ].map((client, i) => (
              <AnimatedWhenVisible key={i} variants={cardVariants.scaleUp} hoverEffect={cardHover} className="bg-white p-6 rounded-xl shadow-sm border border-amber-200 text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl mb-4">{client.icon}</div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">{client.type}</h3>
                <p className="text-sm text-gray-500">{client.count} clients</p>
              </AnimatedWhenVisible>
            ))}
          </div>
        </div>
        <VideoPlayer />
         <BusinessQuoteForm />
      </div>
    </>
  );
};

export default ISOConsultancy;

