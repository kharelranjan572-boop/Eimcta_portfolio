import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import image16 from "../../img/16.jpg"

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2
    }
  },
};

const underlineVariant = {
  hidden: {
    width: '90%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  visible: {
    width: '25%',
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const paragraphVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardHover = {
  y: -8,
  rotateX: "2deg",
  rotateY: "-1deg",
  transition: { duration: 0.3, ease: "easeOut" }
};


const ISO21001Guide = () => {
  // Data arrays for different sections of the guide
  const features = [
    'Enhanced focus on learning outcomes',
    'Inclusive education for learners with diverse needs',
    'Consistent stakeholder satisfaction',
    'Improved processes for assessment and evaluation',
  ];

  const benefits = [
    { title: 'Improved Quality of Education', description: 'Provides a structured approach to enhancing the quality of education through systematic planning and monitoring.' },
    { title: 'Better Stakeholder Satisfaction', description: 'Effectively meets the needs and expectations of learners, parents, staff, and other stakeholders.' },
    { title: 'Increased Operational Efficiency', description: 'Optimizes processes, reduces inefficiencies, and allocates resources more effectively.' },
    { title: 'Global Recognition', description: 'Certification provides international recognition, giving institutions a competitive edge in attracting students and partnerships.' },
    { title: 'Enhanced Learner Focus', description: 'Emphasizes learner-centered education, ensuring learners\' needs are prioritized in decision-making.' },
  ];

  const applicants = [
    'Primary and secondary schools',
    'Colleges and universities',
    'Technical and vocational training institutions',
    'E-Learning providers',
    'Corporate training departments',
  ];

  const applicationSteps = [
    { title: 'Evaluate Current Systems', description: 'Conduct a thorough evaluation of your existing management system to identify gaps and areas for improvement.' },
    { title: 'Develop Policies and Objectives', description: 'Align your policies and objectives with the requirements of ISO 21001:2018 to ensure they meet the needs of learners and stakeholders.' },
    { title: 'Implement and Monitor', description: 'Introduce necessary changes and continuously monitor your processes to maintain alignment with the standard.' },
    { title: 'Internal Audits', description: 'Perform internal audits to assess your institution\'s readiness for certification.' },
    { title: 'Engage a Certification Body', description: 'Contact an accredited certification body to perform the external audit and grant certification upon compliance.' },
  ];

  // Animation variants used by SectionHeader
  const animationVariants = {
    scaleUp: { hidden: { scale: 0.92, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } } },
    sectionHeader: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } },
    underline: { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } } },
    paragraph: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 } } }
  };

  // A reusable SectionHeader component (scroll-triggered, animated icon + underline matching text width)
  const SectionHeader = ({ icon, children, subtitle }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    React.useEffect(() => {
      if (inView) controls.start('visible');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
      <div ref={ref} className="mb-6 text-center w-[90%] max-w-4xl mx-auto">
        <motion.div animate={controls} initial="hidden" variants={animationVariants.scaleUp} className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full">
            <span className="text-xl md:text-2xl text-amber-600">{icon}</span>
          </div>
        </motion.div>
        <motion.h2
          animate={controls}
          initial="hidden"
          variants={animationVariants.sectionHeader}
          className="text-2xl md:text-3xl font-bold text-amber-900 mb-3 tracking-tight relative inline-block"
        >
          <span className="inline-block relative">
            {children}
            <motion.span
              className="absolute left-0 -bottom-2 h-1 bg-yellow-400 rounded-lg origin-center w-full"
              variants={animationVariants.underline}
              initial="hidden"
              animate={controls}
              style={{ originX: 0.5 }}
            />
          </span>
        </motion.h2>
        {subtitle && (
          <motion.p animate={controls} initial="hidden" variants={animationVariants.paragraph} className="text-base md:text-lg text-amber-800 max-w-3xl mx-auto text-center">
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }; 

  return (
    <div className="bg-gray-50 w-full min-h-screen my-[3rem] font-sans">
      <article className="w-full bg-white shadow-lg mx-auto overflow-hidden">

        {/* Hero Section */}
        <section className="p-6 sm:p-8 text-center w-full relative">
          <motion.h1
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-800 text-bold tracking-tight relative inline-block pb-4"
          >
            <span className="text-amber-800 mr-3">📜</span> ISO 21001 : 2018 (EOMS)

          </motion.h1>

          {/* H1 Underline with grow animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-1.5 bg-amber-500 rounded-full mx-auto mt-2"
            style={{ originX: 0.5 }}
          />

          <motion.p
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="text-amber-800 mt-4 text-lg text-bold font-semibold mx-auto"
          >
            A Comprehensive Guide to Educational Organization Management Systems (EOMS)
          </motion.p>
        </section>

        {/* Full-width Image */}
        <div className="w-full">
          <Image src={image16} alt="ISO 21001 Certification" caption="" className="w-full" />
        </div>

        <main className="w-full p-6 sm:p-8 md:p-12 space-y-12">
          {/* --- ABOUT THE STANDARD --- */}
          <motion.section
            className="group p-6 rounded-lg w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionHeader icon="📚">About  Standard</SectionHeader>
            <motion.p
              variants={paragraphVariant}
              className="text-amber-800 leading-relaxed text-base md:text-lg text-justify mt-8 max-w-5xl mx-auto"
            >
              ISO 21001:2018 is a management system standard specifically developed for educational organizations, including schools, colleges, universities, and training institutions. It focuses on optimizing the delivery of educational services to meet learners' needs and ensure consistent quality. The standard helps educational institutions establish policies and procedures that align with their vision and mission, thereby promoting continuous improvement and learner engagement.
            </motion.p>
          </motion.section>

          {/* --- KEY FEATURES & WHO CAN APPLY (2-COLUMN LAYOUT ON LARGER SCREENS) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 space-y-12 lg:space-y-0 w-full">
            {/* --- KEY FEATURES --- */}
            <motion.section
              className="group p-6 rounded-lg w-full"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionHeader icon="✨">Key Features</SectionHeader>
              <ul className="space-y-3 mt-8 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start text-base md:text-lg text-justify">
                    <span className="text-yellow-400 font-bold mr-3 mt-1">✓</span>
                    <span className="text-amber-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* --- WHO CAN APPLY --- */}
            <motion.section
              className="group p-6 rounded-lg w-full"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionHeader icon="🏫">Who Can Apply?</SectionHeader>
              <p className="text-amber-800 mb-4 text-base md:text-lg text-justify mt-8 max-w-5xl mx-auto">This standard is applicable to all types of educational organizations, including:</p>
              <ul className="space-y-2 text-amber-800 text-base md:text-lg max-w-5xl mx-auto">
                {applicants.map((applicant, index) => (
                  <li key={index} className="flex items-start text-justify">
                    <span className="text-yellow-400 font-bold mr-3 mt-1">•</span>
                    {applicant}
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* --- BENEFITS --- */}
          <motion.section
            className="group p-6 rounded-lg w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SectionHeader icon="🌟">Benefits of ISO 21001:2018</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg border border-yellow-200 shadow-sm"
                  variants={slideInUp}
                  whileHover={cardHover}
                >
                  <h3 className="font-bold text-amber-900 text-lg mb-2">{benefit.title}</h3>
                  <p className="text-amber-800 text-justify">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* --- HOW TO APPLY --- */}
          <motion.section
            className="group p-6 rounded-lg w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SectionHeader icon="🎯">How Can You Apply?</SectionHeader>
            <ol className="space-y-6 mt-8 max-w-5xl mx-auto">
              {applicationSteps.map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  variants={slideInUp}
                >
                  <div className="flex-shrink-0 bg-amber-800 text-yellow-400 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl mr-4 hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 text-lg">{step.title}</h3>
                    <p className="text-amber-800 text-justify">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.section>

          {/* --- VIDEO PLAYER --- */}
          <VideoPlayer src="https://www.youtube.com/watch?v=zWLykaz3YYM&t=7s" title="ISO 21001:2018 Overview" />
        </main>
      </article>
    </div>
  );
};

export default ISO21001Guide;