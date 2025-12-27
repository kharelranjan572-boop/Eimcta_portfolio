import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import image14 from "../../img/14.jpg"

export default function ISO9001Certification() {
    const introRef = useRef(null);
    const isIntroInView = useInView(introRef, { once: true, amount: 0.3 });

    const gridHeaderRef = useRef(null);
    const isGridHeaderInView = useInView(gridHeaderRef, { once: true, amount: 0.5 });

    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.2 });
    
    const videoHeaderRef = useRef(null);
    const isVideoHeaderInView = useInView(videoHeaderRef, { once: true, amount: 0.5 });

    const videoRef = useRef(null);
    const isVideoInView = useInView(videoRef, { once: true, amount: 0.3 });


    // Animation Variants
    const transition = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] };

    const heroVariants = {
        slideInRight: {
            hidden: { opacity: 0, x: 80 },
            visible: { opacity: 1, x: 0, transition },
        },
        slideInLeft: {
            hidden: { opacity: 0, x: -80 },
            visible: { opacity: 1, x: 0, transition },
        },
    };

    const sectionHeaderVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ...transition } },
    };
    
    const underlineVariant = {
        hidden: { width: "0%" },
        visible: { width: "25%", transition: { duration: 0.8, delay: 0.3, ...transition } },
    };

    const paragraphVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { ...transition, delay: 0.3 } },
    };

    const gridContainerVariants = {
        hidden: { opacity: 1 }, // Parent is always visible
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };
    
    const cardVariant = {
        hidden: { opacity: 0, y: 60, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ...transition } },
    };
    
    const videoVariant = {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ...transition } },
    };

    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-amber-800 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">

                {/* --- Header Section --- */}
                <header className="text-center mb-16">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants.slideInRight}
                        className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight mb-4 relative pb-4"
                    >
                        ISO 9001:2015(QMS)
                        {/* NOTE: A motion.div is used for the animated underline, a powerful pattern in Framer Motion for dynamic "pseudo-elements". */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { width: "0%" },
                                visible: { width: "25%", transition: { duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
                            }}
                            style={{ originX: 0.5 }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 bg-amber-500 rounded-full"
                        />
                    </motion.h1>
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants.slideInLeft}
                        className="text-lg text-amber-800 max-w-3xl mx-auto leading-relaxed"
                    >
                        Elevating Your Business Through Excellence in Quality Management
                    </motion.p>
                </header>

                {/* --- Top Banner Image --- */}
              
                <Image src={image14} alt={image14} caption=""/>
                {/* --- Introduction Text --- */}
                <motion.div
                    ref={introRef}
                    initial="hidden"
                    animate={isIntroInView ? "visible" : "hidden"}
                    variants={paragraphVariant}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                     <p className="text-xl text-gray-700 leading-relaxed">
                        ISO 9001 is the globally recognized standard for Quality Management Systems (QMS). It provides a framework designed to help businesses consistently deliver high-quality products and services, enhance operational efficiency, and boost customer satisfaction.
                    </p>
                </motion.div>
                
                {/* --- Grid Header --- */}
                <div ref={gridHeaderRef} className="text-center mb-12">
                     <motion.h2 
                        initial="hidden"
                        animate={isGridHeaderInView ? "visible" : "hidden"}
                        variants={sectionHeaderVariants}
                        className="text-3xl md:text-4xl font-bold text-amber-900 mb-4 relative pb-4"
                    >
                        A Framework for Success
                        <motion.div
                            initial="hidden"
                            animate={isGridHeaderInView ? "visible" : "hidden"}
                            variants={underlineVariant}
                            style={{ originX: 0.5 }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-amber-500 rounded-full"
                        />
                    </motion.h2>
                </div>

                {/* --- Content Grid --- */}
                <motion.div
                    ref={gridRef}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate={isGridInView ? "visible" : "hidden"}
                    variants={gridContainerVariants}
                >

                    {/* Card: About ISO 9001 */}
                    <InfoCard
                        icon={<InfoIcon />}
                        title="About ISO 9001"
                        description="ISO 9001 is the most widely adopted quality management standard worldwide. It outlines the requirements for a QMS, helping organizations establish consistent processes that meet customer needs. This standard is flexible and applicable to any industry, making it essential for businesses focused on delivering quality while improving operational effectiveness."
                        variants={cardVariant}
                    />

                    {/* Card: Benefits */}
                    <InfoCard
                        icon={<BenefitsIcon />}
                        title="Benefits of ISO 9001:2015"
                        content={
                            <ul className="space-y-3">
                                <BenefitItem text="Improved Customer Satisfaction" detail="Focus on customer needs for higher satisfaction and retention." />
                                <BenefitItem text="Enhanced Operational Efficiency" detail="Reduce waste, streamline processes, and save costs." />
                                <BenefitItem text="Better Risk Management" detail="Identify risks early and take preventive actions." />
                                <BenefitItem text="Global Market Access" detail="Gain credibility and access international markets." />
                            </ul>
                        }
                        variants={cardVariant}
                    />

                    {/* Card: Who Can Apply? */}
                    <InfoCard
                        icon={<UsersIcon />}
                        title="Who Can Apply?"
                        content={
                            <>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Any organization, regardless of size or industry, can apply. It is especially beneficial for:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Tag label="Manufacturing" />
                                    <Tag label="Healthcare" />
                                    <Tag label="IT Services" />
                                    <Tag label="Education" />
                                    <Tag label="Construction" />
                                    <Tag label="Government" />
                                </div>
                            </>
                        }
                         variants={cardVariant}
                    />
                    
                    {/* Card: How to Apply? */}
                    <InfoCard
                        icon={<ClipboardIcon />}
                        title="How Can You Apply?"
                        content={
                           <ol className="space-y-4">
                                <StepItem number="1" text="Conduct a Gap Analysis to assess current processes." />
                                <StepItem number="2" text="Process Improvement and Documentation." />
                                <StepItem number="3" text="Employee Training on quality standards." />
                                <StepItem number="4" text="Internal Audits to verify compliance." />
                                <StepItem number="5" text="Certification Audit by an accredited body." />
                            </ol>
                        }
                         variants={cardVariant}
                    />

                    {/* Card: Why Choose Us? */}
                    <InfoCard
                        icon={<SparklesIcon />}
                        title="Why Choose Everest Consultrain?"
                        content={
                            <>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Navigating ISO certification can be complex. We offer expert consultancy and training to equip your team with the skills needed to implement and maintain an effective QMS.
                                </p>
                                <div className="bg-amber-100/60 p-4 rounded-lg border-l-4 border-amber-500">
                                    <p className="text-sm text-amber-900 italic font-medium">
                                        "Our expertise ensures your certification journey is smooth, efficient, and tailored to your business needs."
                                    </p>
                                </div>
                            </>
                        }
                         variants={cardVariant}
                    />

                    {/* Card: Continuous Improvement */}
                    <InfoCard
                        icon={<RefreshIcon />}
                        title="Continuous Improvement"
                        content={
                            <>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Achieving certification is just the beginning. The standard requires ongoing improvement through regular audits and updates to maintain excellence and drive growth.
                                </p>
                                <div className="mt-4 p-3 bg-amber-100/60 rounded-lg">
                                    <p className="text-sm text-amber-900">
                                        <strong>Key to success:</strong> Regular internal audits, management reviews, and continual improvement cycles.
                                    </p>
                                </div>
                            </>
                        }
                         variants={cardVariant}
                    />
                </motion.div>
                
                {/* --- Video Section --- */}
               <VideoPlayer url="https://www.youtube.com/watch?v=kiDe9QhUpDM&t=1s" title=" " />

            </div>
        </div>
    );
}

// --- Reusable Sub-components ---

const InfoCard = ({ icon, title, description, content, variants }) => (
    <motion.div 
        variants={variants}
        whileHover={{ y: -8, rotateX: "2deg", rotateY: "-1deg" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 h-full flex flex-col"
    >
        <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-amber-900">{title}</h2>
        </div>
        <div className="flex flex-col flex-grow">
            {description && <p className="text-gray-700 leading-relaxed flex-grow">{description}</p>}
            {content}
        </div>
    </motion.div>
);

const BenefitItem = ({ text, detail }) => (
    <li className="flex items-start">
        <span className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 font-bold">✓</span>
        <span>
            <strong className="text-amber-900">{text}:</strong> {detail}
        </span>
    </li>
);

const StepItem = ({ number, text }) => (
    <li className="flex items-center">
        <span className="bg-amber-800 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold text-md">{number}</span>
        <span className="text-gray-700">{text}</span>
    </li>
);

const Tag = ({ label }) => (
    <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">{label}</span>
);

// --- SVG Icons (Unchanged) ---

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const BenefitsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const ClipboardIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4-4 6.293-6.293a1 1 0 011.414 0z" />
    </svg>
);
const RefreshIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);


