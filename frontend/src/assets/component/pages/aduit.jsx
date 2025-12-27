import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import image from '../../img/1.jpg';

// --- Self-Contained Lucide Icon Components ---
const IconWrapper = ({ children }) => <div className="w-6 h-6">{children}</div>;
const ClipboardList = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg></IconWrapper>;
const ShieldCheck = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg></IconWrapper>;
const FileText = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg></IconWrapper>;
const ListChecks = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /><path d="M13 6h8" /><path d="M13 12h8" /><path d="M13 18h8" /></svg></IconWrapper>;
const Users = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></IconWrapper>;
const Factory = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg></IconWrapper>;
const HeartPulse = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.7-1.5L13.5 14l.5-2H21" /></svg></IconWrapper>;
const Utensils = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" /></svg></IconWrapper>;
const Server = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></svg></IconWrapper>;
const Truck = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg></IconWrapper>;
const Zap = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></IconWrapper>;
const School = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 10v6" /><path d="M22 10v6" /><path d="M2 10h16" /><path d="m2 10 8-6 8 6" /><path d="M6 10v6" /><path d="M10 10v6" /></svg></IconWrapper>;
const CalendarCheck = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></svg></IconWrapper>;
const AlertCircle = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg></IconWrapper>;
const CheckCircle = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></IconWrapper>;
const Eye = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg></IconWrapper>;
const TrendingUp = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg></IconWrapper>;
const LayoutGrid = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg></IconWrapper>;
const RefreshCw = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg></IconWrapper>;
const BarChart2 = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg></IconWrapper>;
const Clock = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></IconWrapper>;
const Lock = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></IconWrapper>;
const Globe = () => <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></IconWrapper>;

// --- Animation Wrapper Component ---
const AnimatedWrapper = ({ children, variants, transition }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};


// --- Main Component ---
const ISOAuditGuide = () => {

    const easeCurve = [0.25, 0.46, 0.45, 0.94];

    // --- Animation Variants ---
    const slideInRight = { hidden: { x: 80, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    const slideInLeft = { hidden: { x: -80, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    const slideInUp = { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    const scaleUp = { hidden: { scale: 0.92, opacity: 0 }, visible: { scale: 1, opacity: 1 } };
    const sectionHeaderVariant = { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    const underlineVariant = { hidden: { scaleX: 0 }, visible: { scaleX: 1 } };
    const paragraphVariant = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    const cardHover = { y: -8, rotateX: 2, rotateY: -1 };

    const listContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div style={{ fontFamily: "'Arial Narrow', sans-serif" }} className="antialiased bg-gray-50 text-amber-800 font-bold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Hero Section */}
                <section className="text-center mb-24 overflow-hidden">
                    <AnimatedWrapper variants={slideInRight} transition={{ duration: 0.8, ease: easeCurve }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-900 mb-4 tracking-tight">
                            The definitive Guide to <span className="text-amber-600">ISO Audits</span>
                        </h1>
                    </AnimatedWrapper>
                    <AnimatedWrapper variants={slideInLeft} transition={{ duration: 0.8, ease: easeCurve }}>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-justify text-amber-700 mb-8 font-medium">
                            Unlock operational excellence. Understand the purpose, processes, and profound benefits of conducting thorough ISO audits in your organization.
                        </p>
                    </AnimatedWrapper>
                    <div className="rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto border-4 border-white">
                        <img
                            src={image}
                            alt="A team collaborating on ISO 9001 Certification documents"
                            className="w-full object-cover"
                        />
                    </div>
                </section>

                {/* What is ISO Audit */}
                <section className="mb-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className='relative'>
                            <AnimatedWrapper variants={sectionHeaderVariant} transition={{ duration: 0.7, ease: easeCurve }}>
                                <div className="flex items-center mb-6">
                                    <div className="bg-yellow-100 p-3 rounded-full shadow-lg mr-4">
                                        <FileText className="text-yellow-500 w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-amber-900">Understanding ISO Audits</h2>
                                </div>
                            </AnimatedWrapper>
                            <motion.div
                                className="h-1 bg-yellow-400 rounded-full absolute"
                                style={{ left: '50%', translateX: '-50%', bottom: '-0.5rem', originX: 0.5, width: '25%' }}
                                variants={underlineVariant}
                                transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}
                            />

                            <AnimatedWrapper variants={paragraphVariant} transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}>
                                <p className="text-amber-800 mb-8 text-lg text-justify leading-relaxed font-medium">
                                    An <span className="font-semibold text-amber-900">ISO audit</span> is a systematic, independent process that evaluates your organization's compliance with international standards through documented evidence and process verification.
                                </p>
                            </AnimatedWrapper>

                            <motion.div variants={listContainer} initial="hidden" animate="visible">
                                {[
                                    "Verification of process effectiveness",
                                    "Identification of improvement opportunities",
                                    "Assessment of regulatory compliance",
                                    "Evaluation of risk management practices",
                                    "Validation of continuous improvement"
                                ].map((point, i) => (
                                    <motion.div key={i} variants={paragraphVariant}>
                                        <div className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-amber-200 hover:shadow-md hover:border-amber-300 transition-all duration-300 mb-4">
                                            <div className="bg-yellow-100 p-1 rounded-full mr-4 mt-1 flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-yellow-500" />
                                            </div>
                                            <span className="text-amber-800 font-medium">{point}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <AnimatedWrapper variants={slideInUp} transition={{ duration: 0.7, ease: easeCurve }}>
                            <motion.div whileHover={cardHover} transition={{ duration: 0.3, ease: 'easeOut' }}>
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200 hover:shadow-2xl transition-shadow duration-300">
                                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                                        <div className="flex items-center">
                                            <ShieldCheck className="w-8 h-8 mr-3" />
                                            <h3 className="text-xl font-bold">Key Benefits of Auditing</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { icon: <TrendingUp className="w-6 h-6 text-amber-600" />, text: "Performance Improvement" },
                                                { icon: <Lock className="w-6 h-6 text-amber-600" />, text: "Risk Mitigation" },
                                                { icon: <Globe className="w-6 h-6 text-amber-600" />, text: "Regulatory Compliance" },
                                                { icon: <Users className="w-6 h-6 text-amber-600" />, text: "Stakeholder Confidence" }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-amber-50 p-4 rounded-lg text-center hover:bg-amber-100 transition-all duration-300 transform hover:-translate-y-1">
                                                    <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                                                        {item.icon}
                                                    </div>
                                                    <p className="font-medium text-amber-800 text-sm">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatedWrapper>
                    </div>
                </section>

                {/* Audit Process */}
                <section className="mb-24 bg-white rounded-3xl shadow-lg p-8 lg:p-12 border border-amber-200">
                    <div className="text-center mb-12">
                        <AnimatedWrapper variants={sectionHeaderVariant} transition={{ duration: 0.7, ease: easeCurve }}>
                            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
                                <ListChecks className="mr-2 text-amber-600 w-5 h-5" />
                                Systematic Approach
                            </div>
                            <div className="relative inline-block">
                                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">The ISO Audit Process</h2>
                                <motion.div
                                    className="h-1 bg-yellow-400 rounded-full absolute"
                                    style={{ left: '50%', translateX: '-50%', bottom: '-0.5rem', originX: 0.5, width: '90%' }}
                                    variants={underlineVariant}
                                    transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}
                                />
                            </div>
                        </AnimatedWrapper>
                        <AnimatedWrapper variants={paragraphVariant} transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}>
                            <p className="text-amber-800 max-w-2xl mx-auto text-lg text-justify pt-4 font-medium">
                                A structured methodology to ensure comprehensive evaluation and continuous improvement.
                            </p>
                        </AnimatedWrapper>
                    </div>

                    <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={listContainer} initial="hidden" animate="visible">
                        {[
                            { step: 1, title: "Planning Phase", description: "Define scope, objectives, and criteria", icon: <CalendarCheck className="w-6 h-6 text-amber-600" /> },
                            { step: 2, title: "Preparation", description: "Review documents and prepare checklists", icon: <FileText className="w-6 h-6 text-amber-600" /> },
                            { step: 3, title: "Opening Meeting", description: "Align expectations with auditees", icon: <Users className="w-6 h-6 text-amber-600" /> },
                            { step: 4, title: "Execution", description: "Conduct interviews and collect evidence", icon: <Eye className="w-6 h-6 text-amber-600" /> },
                            { step: 5, title: "Findings Analysis", description: "Identify non-conformities", icon: <AlertCircle className="w-6 h-6 text-amber-600" /> },
                            { step: 6, title: "Closing Meeting", description: "Present findings and agree on actions", icon: <CheckCircle className="w-6 h-6 text-amber-600" /> },
                            { step: 7, title: "Reporting", description: "Document comprehensive audit report", icon: <ClipboardList className="w-6 h-6 text-amber-600" /> },
                            { step: 8, title: "Follow-up", description: "Verify corrective actions are implemented", icon: <RefreshCw className="w-6 h-6 text-amber-600" /> }
                        ].map((s) => (
                            <AnimatedWrapper key={s.step} variants={slideInUp} transition={{ duration: 0.7, ease: easeCurve }}>
                                <motion.div whileHover={cardHover} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full">
                                    <div className="bg-white  p-6 rounded-2xl shadow-md border border-amber-200 h-full">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-white p-3 rounded-lg shadow-inner">{s.icon}</div>
                                            <div className="bg-amber-200 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">STEP {s.step}</div>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-amber-900">{s.title}</h3>
                                        <p className="text-amber-800 text-sm font-medium">{s.description}</p>
                                    </div>
                                </motion.div>
                            </AnimatedWrapper>
                        ))}
                    </motion.div>
                </section>

                {/* Audit Types */}
                <section className="mb-24">
                    <div className="text-center mb-12">
                        <AnimatedWrapper variants={sectionHeaderVariant} transition={{ duration: 0.7, ease: easeCurve }}>
                            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
                                <LayoutGrid className="mr-2 text-amber-600 w-5 h-5" />
                                Audit Variations
                            </div>
                            <div className="relative inline-block">
                                <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">Types of ISO Audits</h2>
                                <motion.div
                                    className="h-1 bg-yellow-400 rounded-full absolute"
                                    style={{ left: '50%', translateX: '-50%', bottom: '-0.5rem', originX: 0.5, width: '90%' }}
                                    variants={underlineVariant}
                                    transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}
                                />
                            </div>
                        </AnimatedWrapper>
                        <AnimatedWrapper variants={paragraphVariant} transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}>
                            <p className="text-amber-800 max-w-2xl mx-auto text-justify text-lg pt-4 font-medium">
                                Different audit approaches tailored to specific organizational needs and requirements.
                            </p>
                        </AnimatedWrapper>
                    </div>

                    <motion.div className="grid md:grid-cols-3 gap-8" variants={listContainer} initial="hidden" animate="visible">
                        {[
                            { type: "Internal Audits", description: "First-party evaluations conducted by your own organization to assess compliance and identify improvement areas.", icon: <Users className="w-8 h-8 text-amber-600" />, frequency: "6-12 months", color: "border-amber-300" },
                            { type: "Supplier Audits", description: "Second-party assessments performed by customers on their vendors to ensure quality standards are met.", icon: <FileText className="w-8 h-8 text-amber-600" />, frequency: "As per contract", color: "border-amber-300" },
                            { type: "Certification Audits", description: "Third-party evaluations by accredited bodies to grant official ISO certification.", icon: <ShieldCheck className="w-8 h-8 text-amber-600" />, frequency: "Every 3 years", color: "border-amber-300" }
                        ].map((audit, i) => (
                            <AnimatedWrapper key={i} variants={slideInUp} transition={{ duration: 0.8, ease: easeCurve }}>
                                <motion.div whileHover={cardHover} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full">
                                    <div className={`bg-white p-8 rounded-2xl shadow-lg border-t-4 ${audit.color} h-full`}>
                                        <div className="bg-amber-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                                            {audit.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-center mb-4 text-amber-900">{audit.type}</h3>
                                        <p className="text-amber-800 mb-6  text-justify text-base font-medium">{audit.description}</p>
                                        <div className="text-center bg-amber-100 py-2 px-4 rounded-full w-fit mx-auto">
                                            <div className="flex items-center justify-center text-sm font-medium text-amber-700">
                                                <Clock className="w-4 h-4 mr-2" />
                                                <span>Frequency: <strong>{audit.frequency}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedWrapper>
                        ))}
                    </motion.div>
                </section>

                {/* Industry Frequency */}
                <section className="bg-gradient-to-br from-amber-800 to-amber-900 rounded-3xl p-8 lg:p-12 text-white">
                    <div className="text-center mb-12">
                        <AnimatedWrapper variants={sectionHeaderVariant} transition={{ duration: 0.7, ease: easeCurve }}>
                            <div className="inline-flex items-center bg-amber-700/30 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
                                <Clock className="mr-2 w-5 h-5" />
                                Industry Standards
                            </div>
                            <div className="relative inline-block">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Audit Frequency by Industry</h2>
                                <motion.div
                                    className="h-1 bg-yellow-400 rounded-full absolute"
                                    style={{ left: '50%', translateX: '-50%', bottom: '-0.5rem', originX: 0.5, width: '90%' }}
                                    variants={underlineVariant}
                                    transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}
                                />
                            </div>
                        </AnimatedWrapper>
                        <AnimatedWrapper variants={paragraphVariant} transition={{ duration: 0.8, delay: 0.3, ease: easeCurve }}>
                            <p className="text-amber-200 max-w-2xl mx-auto text-lg pt-4 font-medium">
                                Recommended audit intervals based on industry risk profiles and regulatory requirements.
                            </p>
                        </AnimatedWrapper>
                    </div>

                    <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={listContainer} initial="hidden" animate="visible">
                        {[
                            { industry: "Manufacturing", frequency: "Bi-annually", risk: "High", icon: <Factory className="w-6 h-6" /> },
                            { industry: "Healthcare", frequency: "Quarterly", risk: "Critical", icon: <HeartPulse className="w-6 h-6" /> },
                            { industry: "Food Services", frequency: "Monthly", risk: "Critical", icon: <Utensils className="w-6 h-6" /> },
                            { industry: "Info Technology", frequency: "Annually", risk: "Medium", icon: <Server className="w-6 h-6" /> },
                            { industry: "Construction", frequency: "Quarterly", risk: "High", icon: <Truck className="w-6 h-6" /> },
                            { industry: "Energy", frequency: "Quarterly", risk: "Critical", icon: <Zap className="w-6 h-6" /> },
                            { industry: "Education", frequency: "Annually", risk: "Medium", icon: <School className="w-6 h-6" /> },
                            { industry: "Financial Services", frequency: "Semi-annually", risk: "High", icon: <BarChart2 className="w-6 h-6" /> }
                        ].map((item, i) => (
                            <AnimatedWrapper key={i} variants={scaleUp} transition={{ duration: 0.7, ease: easeCurve }}>
                                <motion.div whileHover={cardHover} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full">
                                    <div className="bg-amber-700/20 p-6 rounded-xl border border-amber-700/30 h-full transition-colors hover:bg-amber-700/30 hover:border-yellow-400">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-amber-700/30 p-3 rounded-lg mr-4">
                                                {item.icon}
                                            </div>
                                            <h3 className="font-bold text-lg text-white">{item.industry}</h3>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-amber-200 font-medium">Frequency</span>
                                                <span className="font-medium text-white">{item.frequency}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-amber-200 font-medium">Risk Level</span>
                                                <span className={`font-semibold px-2.5 py-1 rounded-full text-xs ${item.risk === "Critical" ? "bg-red-500/20 text-red-300" :
                                                        item.risk === "High" ? "bg-amber-500/20 text-amber-300" :
                                                            "bg-green-500/20 text-green-300"
                                                    }`}>
                                                    {item.risk}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedWrapper>
                        ))}
                    </motion.div>
                </section>

            </div>
        </div>
    );
};

export default ISOAuditGuide;


