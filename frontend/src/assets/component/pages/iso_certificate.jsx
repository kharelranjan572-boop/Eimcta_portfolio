import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Search, Telescope, FileText, Users, Handshake, ClipboardCheck, Wrench, Trophy, RefreshCw, Briefcase, TrendingUp } from 'lucide-react';
import Image from '../utilities/image';
import ISOCertificationForm from '../utilities/gloabal';
import certificateProcess from '../../img/2.jpg'
import ISOShowcase from './Glob_rec';

const ISO_certification = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -55 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 55 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      }
    }
  };

  const centeredUnderlineVariants = {
    hidden: { width: 0 },
    show: { width: '90%', transition: { duration: 0.8, delay: 0.3 } }
  };

  const stepVariants = (i) => {
    const directions = [
      { x: -34, y: 0 }, // From left
      { x: 34, y: 0 },  // From right
      { x: 0, y: 60 },  // From bottom
      { x: -67, y: 0 }, // From far left
      { x: 67, y: 0 },  // From far right
      { x: 0, y: 45 },  // From bottom (different offset)
      { x: -50, y: 0 }, // From left
      { x: 50, y: 0 },  // From right
      { x: 0, y: 55 },  // From bottom
      { x: -40, y: 0 }, // From left
    ];

    const { x, y } = directions[i % directions.length];

    return {
      hidden: { opacity: 0, x: x, y: y, scale: 0.95 },
      show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.8 } }
    };
  };

  const stepIcons = [
    Search,
    Telescope,
    FileText,
    Users,
    ClipboardCheck,
    Handshake,
    Briefcase,
    Wrench,
    Trophy,
    TrendingUp,
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <motion.article
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Header Section */}
          <header className="bg-amber-600 p-6 sm:p-8 text-center rounded-t-2xl">
            <motion.h1
              className="text-xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight"
              variants={slideInRightVariants}
            >
              How to Certify Your Organization with Relevant ISO Standards
            </motion.h1>
            <motion.p
              className="text-amber-100 text-base sm:text-lg md:text-xl font-light"
              variants={slideInLeftVariants}
            >
              A Step-by-Step Guide to Achieving ISO Certification
            </motion.p>
          </header>

          <Image src={certificateProcess} alt={certificateProcess} caption=" " />
          <ISOCertificationForm/>
          <ISOShowcase />
          
          {/* Introduction */}
          <section className="p-8 border-b border-gray-100">
            <motion.p
              className="text-gray-700 text-base sm:text-lg mb-4 text-justify leading-relaxed"
              variants={textVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              In today's competitive landscape, achieving ISO certification can boost your organization's efficiency, ensure compliance, and build trust with customers.
            </motion.p>
            <motion.p
              className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed"
              variants={textVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              Whether your goal is <span className="font-semibold text-amber-700">ISO 9001</span> for Quality Management, <span className="font-semibold text-amber-700">ISO 45001</span> for Occupational Health and Safety, or <span className="font-semibold text-amber-700">ISO 27001</span> for Information Security, following the correct certification process helps you align with global standards and thrive.
            </motion.p>
          </section>

          {/* About ISO */}
          <motion.section
            className="p-8 border-b border-gray-100"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-4 relative inline-block">
              About ISO Certification
              <motion.span className="absolute left-1/2 -bottom-2 h-1 w-0 bg-orange-500 rounded-full" style={{ x: '-50%' }} variants={centeredUnderlineVariants}></motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-700 text-base sm:text-lg text-justify mt-4 leading-relaxed"
              variants={textVariants}
            >
              ISO certification is a globally recognized standard that signifies a commitment to quality, safety, security, or environmental management. Certification validates that your processes align with best practices and meet customer or regulatory requirements.
            </motion.p>
          </motion.section>

          {/* Benefits */}
          <motion.section
            className="p-8 border-b border-gray-100"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-6 relative inline-block">
              Benefits of ISO Certification
              <motion.span className="absolute left-1/2 -bottom-2 h-1 w-0 bg-orange-500 rounded-full" style={{ x: '-50%' }} variants={centeredUnderlineVariants}></motion.span>
            </motion.h2>
            <ul className="space-y-4">
              {[
                { text: "Operational Efficiency: Streamlined processes, fewer errors, and enhanced productivity." },
                { text: "Risk Mitigation: Better risk management and improved regulatory compliance." },
                { text: "Customer Confidence: Demonstrates commitment to quality and safety, building trust." },
                { text: "Competitive Edge: ISO-certified companies are more attractive to clients, partners, and investors." }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-gray-700 text-base sm:text-lg text-justify"
                  variants={index % 2 === 0 ? slideInLeftVariants : slideInRightVariants}
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span><span className="font-semibold text-amber-700">{item.text.split(':')[0]}:</span> {item.text.split(':')[1]}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Eligibility */}
          <motion.section
            className="p-8 border-b border-gray-100"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className="sm:text-3xl  md:text-3xl text-2xl font-bold text-amber-600 mb-4 relative inline-block">
              Who Can Apply for ISO Certification?
              <motion.span className="absolute left-1/2 -bottom-2 h-1 w-0 bg-orange-500 rounded-full" style={{ x: '-50%' }} variants={centeredUnderlineVariants}></motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-700 text-lg text-justify mt-4"
              variants={textVariants}
            >
              Any organization, regardless of industry or size, can pursue ISO certification. Standards like ISO 9001, ISO 27001, ISO 45001, and others are applicable across sectors, helping businesses enhance processes and ensure customer satisfaction.
            </motion.p>
          </motion.section>

          {/* Process Steps */}
          <motion.section
            className="p-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600 mb-8 relative inline-block">
              How Can You Apply for ISO Certification?
              <motion.span className="absolute left-1/2 -bottom-2 h-1 w-0 bg-orange-500 rounded-full" style={{ x: '-50%' }} variants={centeredUnderlineVariants}></motion.span>
            </motion.h2>
            <div className="space-y-6">
              {[
                {
                  title: "Identify the Right ISO Standard",
                  content: "Determine which ISO standard fits your business needs. Common standards include:",
                  list: [
                    "ISO 9001: For improving quality management systems (QMS).",
                    "ISO 14001: For environmental management systems (EMS).",
                    "ISO 45001: Focuses on occupational health and safety (OH&S).",
                    "ISO 27001: Focuses on information security management systems (ISMS)."
                  ],
                },
                {
                  title: "Conduct a Gap Analysis",
                  content: "Identify areas where your processes do not meet the ISO standards requirements. Focus on documentation, compliance with industry standards, and management system weaknesses.",
                },
                {
                  title: "Update and Document Processes",
                  content: "Make necessary changes to your processes to align with ISO requirements. Ensure all updates are thoroughly documented.",
                },
                {
                  title: "Implement the Management System",
                  content: "Roll out the ISO-specific management system, train employees, assign roles for managing ISO compliance, and use metrics to track progress.",
                },
                {
                  title: "Conduct Internal Audits",
                  content: "Regularly audit your processes to identify any gaps or non-conformities. Address issues promptly to ensure compliance.",
                },
                {
                  title: "Choose a Certification Body",
                  content: "Select an accredited certification body to carry out the official audit. Ensure they have experience in your industry and are recognized by organizations like UKAS or ANAB.",
                },
                {
                  title: "Undergo the Certification Audit",
                  content: "The audit consists of two stages: documentation audit and on-site verification to check your management system and processes.",
                },
                {
                  title: "Address Non-Conformities",
                  content: "If any non-conformities are found, correct them and undergo a follow-up audit to ensure compliance.",
                },
                {
                  title: "Receive Your Certification",
                  content: "Once your organization has passed both audit stages, you will receive your certification, which is valid for three years. Regular surveillance audits will be required to maintain certification.",
                },
                {
                  title: "Continuous Improvement",
                  content: "Continue to conduct internal audits and participate in annual surveillance audits. Review and improve processes to maintain ISO certification and operational excellence.",
                }
              ].map((step, index) => {
                const IconComponent = stepIcons[index];
                return (
                  <motion.div
                    key={index}
                    className={`bg-amber-50 p-4 sm:p-6 rounded-xl shadow-sm hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl`}
                    variants={stepVariants(index)}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-amber-700 mb-2 flex items-center">
                      <span className="bg-amber-600 text-white rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center font-bold text-xs sm:text-sm mr-4">{index + 1}</span>
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-700" />
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-base sm:text-lg text-justify leading-relaxed">{step.content}</p>
                    {step.list && (
                      <ul className="list-disc pl-10 sm:pl-14 mt-2 text-gray-700 text-base sm:text-base">
                        {step.list.map((item, i) => (
                          <li key={i} className="text-justify"><span className="font-semibold text-amber-700">{item.split(':')[0]}:</span> {item.split(':')[1]}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </motion.article>
      </div>
    </div>
  );
};


export default ISO_certification;