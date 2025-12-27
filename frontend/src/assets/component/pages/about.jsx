import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  HardHat,
  GraduationCap,
  TreePalm,
  Shield,
  Search,
  FileText,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  X
} from "lucide-react";

import QualityPolicyImage from "../../img/Qualitypolicy1_1695565086.jpg";
import HealthSafetyPolicyImage from "../../img/Sample HSE Policy_001_1694416109.jpg";
import ImpartialityPolicyImage from "../../img/Impartiality Policy_001_1694437730.jpg";
import AntiBriberyPolicyImage from "../../img/Antibibary_1695565570.jpg"; 
import BusinessQuoteForm from "./form";



const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInLeft = { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInRight = { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
const slideInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } };
const rotate3D = { hidden: { opacity: 0, rotateX: -10, y: 30 }, visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
const underlineVariant = { hidden: { width: 0 }, visible: { width: "25%", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 } } };

// --- Reusable Helper Components ---

const PatternBackground = ({ color = "from-amber-700 to-amber-900" }) => (
  <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${color}`}
    style={{
      backgroundImage: 'linear-gradient(135deg, #ffffff 10%, transparent 10%, transparent 50%, #ffffff 50%, #ffffff 60%, transparent 60%, transparent 100%)',
      backgroundSize: '15px 15px'
    }}
  ></div>
);

const SectionHeader = ({ children, className = "", viewState = true }) => (
  <motion.div
    className={`relative inline-block ${className}`}
    initial="hidden"
    animate={viewState ? "visible" : "hidden"}
    variants={containerVariants}
  >
    <motion.h2
      variants={itemVariants}
      className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center inline-block"
    >
      {children}
    </motion.h2>
    <motion.div
      variants={underlineVariant}
      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-amber-600 rounded-lg"
      style={{ originX: 0.5 }}
    />
  </motion.div>
);

const ThreeDCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{
      y: -8,
      rotateX: 2,
      rotateY: -1,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className={`transform-gpu transition-all duration-400 hover:shadow-xl ${className}`}
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1000px'
    }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const [activeSection, setActiveSection] = useState("mission");
  const sectionsRef = useRef({});

  // Refs for scroll animations
  const missionRef = useRef(null);
  const servicesRef = useRef(null);
  const policiesRef = useRef(null);
  const expertiseRef = useRef(null);
  const contactRef = useRef(null);
  const whyChooseRef = useRef(null);
  const coreServicesRef = useRef(null);
  const valuesRef = useRef(null);

  const isMissionInView = useInView(missionRef, { once: true, margin: "-20%" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-20%" });
  const isExpertiseInView = useInView(expertiseRef, { once: true, margin: "-20%" });
  const isWhyChooseInView = useInView(whyChooseRef, { once: true, margin: "-20%" });
  const isCoreServicesInView = useInView(coreServicesRef, { once: true, margin: "-20%" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-20%" });
  const isPoliciesInView = useInView(policiesRef, { once: true, margin: "-20%" });


  // --- Data Arrays ---
  const policies = [
    { 
      title: "Quality Policy", 
      description: "", 
      image: QualityPolicyImage,
    },
    { 
      title: "Health & Safety Policy", 
      description: "", 
      image: HealthSafetyPolicyImage,
    },
    { 
      title: "Impartiality Policy", 
      description: "", 
      image:ImpartialityPolicyImage ,
    },
    { 
      title: "Anti-Bribery Policy", 
      description: "", 
      image: AntiBriberyPolicyImage,
    },
  ];
  
  const services = [
    { title: "ISO Certification & Training", icon: <Award size={24} className="text-amber-700 group-hover:text-white" />, description: "Certification for standards like ISO 9001, 45001, 14001, and more, plus expert training." },
    { title: "OHS & Consultancy", icon: <HardHat size={24} className="text-amber-700 group-hover:text-white" />, description: "Health plans, environmental services, GMP, HACCP, CE marking, and disaster management." },
    { title: "Digital Transformation", icon: <GraduationCap size={24} className="text-amber-700 group-hover:text-white" />, description: "Paperless systems, marketing strategies, data analysis, and ERP solutions for efficiency." },
    { title: "Corporate Training", icon: <TreePalm size={24} className="text-amber-700 group-hover:text-white" />, description: "ISO Auditor, OHS, fire safety, road safety, Lean Six Sigma, PMP, and Primavera training." },
    { title: "Supply & Outsourcing", icon: <Shield size={24} className="text-amber-700 group-hover:text-white" />, description: "OHS signage, traffic safety equipment, PPEs, and fire safety gear." },
    { title: "Third Party Services", icon: <Search size={24} className="text-amber-700 group-hover:text-white" />, description: "Audits, inspections, incident investigations, testing, calibration, and certification." },
  ];
  const values = [
    { title: 'Our Belief', description: 'We see every client relationship as more than just business; it is a long-term partnership built on trust.' },
    { title: 'Our Path', description: 'Delivering competitive, reliable, ethical, and timely services to ensure the highest level of client satisfaction.' },
    { title: 'Our Mission', description: 'To provide ethical, impartial, and professional services anytime, anywhere.' },
    { title: 'Our Vision', description: 'Expanding our services across Nepal, neighboring countries, and beyond to meet the expectations of world-class clients.' },
  ];
  const isoStandards = ["ISO 9001:2015 QMS", "ISO 45001:2018 OHSMS", "ISO 14001:2015 EMS", "ISO 39001:2012 RTSMS", "ISO 27001:2022 ISMS", "ISO 15189:2022 Path Lab", "ISO 26000:2010 SR", "SA 8000", "ISO 55001:2014 Asset Mgmt", "ISO 50001:2018 Energy M", "ISO 41001:2018 FMS", "ISO 28001 Security & Resilience MS"];
  const specializedServices = ["CE Marking", "RBA CoC (SVAP, SeQ)", "SMETA Sedex", "QAA", "HACCP", "HALAL", "GMP", "Third Party Audit", "Emergency Management", "Technical Bids"];

  // Main agency image (high resolution)
  const agencyImage = {
    preview: "https://placehold.co/1200x800/d97706/FFFFFF?text=Everest+International+Preview",
    full: "https://placehold.co/2250x3300/d97706/FFFFFF?text=Everest+International+Full+Resolution"
  };

  // --- Functions ---
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 relative overflow-hidden font-sans">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-md hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center space-x-6 py-3">
            {[
              { id: "mission", label: "About Us" }, { id: "services", label: "Services" },
              { id: "policies", label: "Policies" }, { id: "expertise", label: "Expertise" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto my-[1rem] px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center mb-12 md:mb-16 relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 p-8 md:p-12 text-white">
          <PatternBackground color="from-amber-700 to-amber-900" />
          <div className="relative z-10">
            <motion.h1 variants={slideInRight} className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">About EIMCTA - Your Partner in Excellence</span>
            </motion.h1>
            <motion.p variants={slideInLeft} className="text-lg sm:text-xl text-amber-100 max-w-3xl mx-auto">
              Welcome to Everest International Management Consultancy & Training Agency (EIMCTA), your trusted partner for comprehensive management solutions.
            </motion.p>
          </div>
        </motion.div>

        {/* Mission Section */}
        {/* <div ref={el => { sectionsRef.current.mission = el; missionRef.current = el; }} className="mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0 }} animate={isMissionInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8 }} className="w-full">
            <div className="flex justify-center mb-8"><SectionHeader viewState={isMissionInView}>About Our Agency</SectionHeader></div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isMissionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full mb-8">
              <img
                src={agencyImage.preview}
                alt="EIMCTA Team Collaboration" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </motion.div>
             <motion.div initial={{ opacity: 0, y: 30 }} animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-4 text-gray-700 text-base md:text-lg bg-white p-6 md:p-8 rounded-xl shadow-md border border-amber-100">
                <p>
                    We specialize in helping businesses achieve competitive, adaptable, and result-oriented management systems, conforming to international standards such as ISO, CE, BS, IEC/EN, and ANSI.
                </p>
                <p>
                    Our expert team brings extensive experience in consultancy and certification services. We assist organizations in documenting and streamlining their operational processes to meet ISO standards, ensuring your business runs more efficiently and autonomously. ISO standards are not just a formal requirement; they are essential tools for improving overall business performance.
                </p>
            </motion.div>
          </motion.div>
        </div> */}

        {/* Why Choose Section */}
        <div ref={whyChooseRef} className="mb-16 md:mb-20">
            <div className="flex justify-center mb-8"><SectionHeader viewState={isWhyChooseInView}>Why Choose EIMCTA?</SectionHeader></div>
            
            <motion.div className="grid md:grid-cols-2 gap-8 mt-8" variants={containerVariants} initial="hidden" animate={isWhyChooseInView ? "visible" : "hidden"}>
                <ThreeDCard><motion.div variants={slideInLeft} className="bg-white p-8 rounded-xl shadow-lg border border-amber-100 h-full"><h4 className="font-bold text-xl mb-3 text-amber-700">Tailored Solutions</h4><p className="text-gray-600">Our consultancy services are designed to fit seamlessly into your business processes, making ISO standards and certifications highly adaptable and workable for your organization.</p></motion.div></ThreeDCard>
                <ThreeDCard><motion.div variants={slideInRight} className="bg-white p-8 rounded-xl shadow-lg border border-amber-100 h-full"><h4 className="font-bold text-xl mb-3 text-amber-700">Client Satisfaction</h4><p className="text-gray-600">We are proud to have been recognized by our clients for our practical and effective solutions, which consistently meet their needs.</p></motion.div></ThreeDCard>
            </motion.div>
        </div>

        {/* Services Grid (Main Services) */}
        <div ref={el => { sectionsRef.current.services = el; servicesRef.current = el; }} className="mb-16 md:mb-20">
          <div className="flex justify-center mb-8"><SectionHeader viewState={isServicesInView}>Our Core Services</SectionHeader></div>
          <motion.div variants={containerVariants} initial="hidden" animate={isServicesInView ? "visible" : "hidden"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const animationVariants = [slideInLeft, slideInUp, slideInRight];
              const variant = animationVariants[index % 3];
              return (
              <ThreeDCard key={index}>
                <motion.div variants={variant} whileHover={{ y: -12, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)", transition: { duration: 0.3, ease: "easeOut" } }} className="relative p-6 bg-white rounded-xl group overflow-hidden hover:shadow-lg transition-all duration-400 border border-amber-100 h-full" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="pb-4 flex items-center gap-4">
                      <motion.div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl group-hover:text-white group-hover:bg-gradient-to-r from-amber-600 to-amber-800 transition-all duration-400" whileHover={{ rotate: 8, scale: 1.05 }}>
                        {service.icon}
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors">{service.description}</p>
                  </div>
                </motion.div>
              </ThreeDCard>
            )})}
          </motion.div>
        </div>
        
        {/* Our Values Section */}
        <div ref={valuesRef} className="mb-16 md:mb-20">
            <div className="flex justify-center mb-8"><SectionHeader viewState={isValuesInView}>Our Values</SectionHeader></div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8" variants={containerVariants} initial="hidden" animate={isValuesInView ? "visible" : "hidden"}>
                {values.map((value, index) => {
                    const animationVariants = [slideInLeft, slideInUp, slideInUp, slideInRight];
                    return (
                        <ThreeDCard key={index}>
                            <motion.div variants={animationVariants[index % 4]} className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 h-full text-center flex flex-col justify-center items-center">
                                <h4 className="font-bold text-amber-700 text-xl mb-2">{value.title}</h4>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        </ThreeDCard>
                    )
                })}
            </motion.div>
        </div>

        {/* Policies Section */}
        <div ref={el => { sectionsRef.current.policies = el; policiesRef.current = el; }} className="mb-16 md:mb-20">
            <div className="flex justify-center mb-8"><SectionHeader viewState={isPoliciesInView}>Our Policies</SectionHeader></div>
            <motion.div variants={containerVariants} initial="hidden" animate={isPoliciesInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {policies.map((policy, index) => (
                    <ThreeDCard key={index}>
                        <motion.div variants={index % 2 === 0 ? rotate3D : scaleUp} className="relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-400 border border-amber-100 group" style={{ transformStyle: 'preserve-3d' }}>
                            <div className="w-full h-max overflow-hidden relative">
                                <img
                                    src={policy.image}
                                    alt={policy.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h3>
                                <p className="text-gray-600">{policy.description}</p>
                            </div>
                        </motion.div>
                    </ThreeDCard>
                ))}
            </motion.div>
        </div>

        {/* Expertise Section */}
        <div ref={el => { sectionsRef.current.expertise = el; expertiseRef.current = el; }} className="mb-16 md:mb-20">
            <div className="flex justify-center mb-8"><SectionHeader viewState={isExpertiseInView}>Our Certifications & Specializations</SectionHeader></div>
            <motion.div initial={{ opacity: 0 }} animate={isExpertiseInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
                <PatternBackground color="from-amber-800 to-amber-900" />
                <div className="relative z-10 text-white">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <div className="flex-1"><h3 className="text-lg md:text-xl font-semibold mb-4">ISO Standards</h3><div className="flex flex-wrap gap-2">
                          {isoStandards.map((standard, index) => (<motion.span key={standard} initial={{ opacity: 0, scale: 0.8 }} animate={isExpertiseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: index * 0.04 }} whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.2)", transition: { duration: 0.2 } }} className="inline-block text-justify  bg-opacity-10 border border-white border-opacity-20 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 cursor-default">{standard}</motion.span>))}</div></div>
                        <div className="flex-1"><h3 className="text-lg md:text-xl font-semibold mb-4">Specialized Services</h3><div className="flex flex-wrap gap-2">
                          {specializedServices.map((service, index) => (<motion.span key={service} initial={{ opacity: 0, scale: 0.8 }} animate={isExpertiseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, delay: index * 0.04 + 0.2 }} whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.2)", transition: { duration: 0.2 } }} className="inline-block bg-opacity-10 border border-white border-opacity-20 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-full transition-all duration-300 cursor-default">{service}</motion.span>))}</div></div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Contact Section */}
        <div ref={el => { sectionsRef.current.contact = el; contactRef.current = el; }}>
            {/* <BusinessQuoteForm /> */}
        </div>
      </div>
    </div>
  );
}