import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Leaf,
  User,
  LineChart,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react";

import img from '../../img/HSE Implementation  Training  Workshop.png' 

// ---------------- ANIMATION VARIANTS ----------------
const customEase = [0.25, 0.46, 0.45, 0.94];

const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: customEase } },
};

const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: customEase } },
};

const slideInUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: customEase } },
};

const sectionHeaderVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: customEase } },
};

const underlineVariant = {
  hidden: { width: "0%" },
  visible: {
    width: "90%",
    transition: { duration: 0.8, delay: 0.3, ease: customEase },
  },
};

const cardHover = {
  y: -6,
  scale: 1.03,
  transition: { duration: 0.3, ease: "easeOut" },
};

// ---------------- COMPONENT ----------------
const HSEAwarenessTraining = () => {
  return (
    <main>
      <div className="w-full px-4 py-8 bg-gray-50 font-['Arial_Narrow'] overflow-x-hidden">

        {/* ================= HERO ================= */}
        <motion.div
          className="max-w-7xl mx-auto mb-16 overflow-hidden rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: customEase }}
        >
          <img
            src={img}
            alt="HSE Awareness Training ISO 14001 ISO 45001"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* ================= INTRO ================= */}
        <motion.section
          className="max-w-6xl mx-auto mb-20 bg-white p-8 rounded-xl shadow-lg border border-amber-200"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={slideInRight}
            className="text-3xl md:text-5xl font-bold text-amber-900 mb-6"
          >
            HSE Awareness Training: Understanding ISO 14001:2015 & ISO 45001:2018
          </motion.h1>

          <motion.p
            variants={slideInLeft}
            className="text-lg text-gray-700 leading-relaxed text-justify"
          >
            Health, Safety, and Environment (HSE) management is a critical pillar
            of every responsible organization. With increasing focus on
            workplace safety, employee wellbeing, and environmental protection,
            understanding internationally recognized HSE standards has become
            essential.
            <br /><br />
            This <strong className="text-amber-900">HSE Awareness Training</strong>{" "}
            provides a clear and practical introduction to{" "}
            <strong>ISO 14001:2015</strong> and{" "}
            <strong>ISO 45001:2018</strong>, covering their structure,
            requirements, documentation, and implementation approach. The
            training is an ideal starting point for individuals and
            organizations aiming to strengthen safety culture and environmental
            responsibility.
          </motion.p>
        </motion.section>

        {/* ================= ABOUT ISO ================= */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            className="text-3xl font-bold text-amber-900 mb-12 text-center relative"
            variants={sectionHeaderVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              About the ISO Standards
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded"
                variants={underlineVariant}
              />
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Leaf,
                title: "ISO 14001:2015 – Environmental Management System",
                desc:
                  "ISO 14001 helps organizations identify, manage, monitor, and control their environmental aspects. It supports sustainability by reducing waste, pollution, and environmental risks while ensuring regulatory compliance.",
                color: "text-green-600",
              },
              {
                icon: Shield,
                title: "ISO 45001:2018 – Occupational Health & Safety",
                desc:
                  "ISO 45001 focuses on preventing work-related injuries, illnesses, and fatalities by systematically managing workplace hazards and improving occupational health and safety performance.",
                color: "text-blue-600",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-lg shadow-md border-l-4 border-yellow-400"
                  variants={slideInUp}
                  whileHover={cardHover}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 bg-yellow-100 rounded-full">
                      <Icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-amber-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-justify">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 bg-amber-100/60 p-6 rounded-lg border border-amber-200 flex items-start"
            variants={slideInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TrendingUp className="w-7 h-7 text-amber-900 mr-4 mt-1" />
            <p className="text-gray-700 text-justify">
              Both standards follow the{" "}
              <strong className="text-amber-900">
                Plan–Do–Check–Act (PDCA)
              </strong>{" "}
              cycle, enabling systematic implementation, monitoring, and
              continual improvement of HSE performance.
            </p>
          </motion.div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="max-w-6xl mx-auto mb-20 bg-amber-900 p-10 rounded-xl text-white">
          <motion.h2
            className="text-3xl font-bold text-yellow-400 mb-12 text-center relative"
            variants={sectionHeaderVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              Benefits of HSE Awareness Training
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded"
                variants={underlineVariant}
              />
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["Improved Workplace Safety", "Reduce accidents, injuries, and occupational risks."],
              ["Environmental Responsibility", "Control environmental impacts and promote sustainability."],
              ["Regulatory Compliance", "Meet national and international HSE legal requirements."],
              ["Operational Efficiency", "Reduce downtime, incidents, and unnecessary costs."],
              ["ISO Certification Readiness", "Prepare effectively for ISO 14001 & ISO 45001 audits."],
              ["Enhanced Organizational Reputation", "Build trust with clients, employees, and regulators."],
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 p-5 rounded-lg hover:bg-white/20"
                variants={slideInUp}
                whileHover={cardHover}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-yellow-400">{item[0]}</h4>
                <p className="text-white/90">{item[1]}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= WHO CAN APPLY ================= */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.h2
            className="text-3xl font-bold text-amber-900 mb-12 text-center relative"
            variants={sectionHeaderVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              Who Can Apply?
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded"
                variants={underlineVariant}
              />
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "HSE Managers, Officers, and Coordinators",
              "Employees with safety or environmental responsibilities",
              "Business leaders and senior management",
              "Organizations planning ISO certification",
              "HSE consultants and auditors",
              "Sustainability and compliance professionals",
            ].map((text, i) => (
              <motion.div
                key={i}
                className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:bg-amber-50 hover:shadow-md"
                variants={slideInUp}
                whileHover={cardHover}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Users className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mr-4" />
                <span className="text-amber-800">{text}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= HOW TO APPLY ================= */}
        <section className="max-w-6xl mx-auto mb-20 bg-white p-8 rounded-xl shadow-lg border border-amber-200">
          <motion.h2
            className="text-3xl font-bold text-amber-900 mb-8 text-center relative"
            variants={sectionHeaderVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              How Can You Apply the Knowledge?
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded"
                variants={underlineVariant}
              />
            </span>
          </motion.h2>

          <ol className="space-y-4">
            {[
              "Learn the ISO Framework: Understand the high-level structure, clauses, and intent of ISO 14001:2015 and ISO 45001:2018 standards.",
              "Assess Current Systems: Conduct an internal gap analysis to evaluate existing HSE management practices against ISO requirements.",
              "Implement the PDCA Cycle: Apply the Plan–Do–Check–Act methodology to drive continual improvement in health, safety, and environmental performance.",
              "Create and Maintain Documentation: Develop and control documented information in accordance with ISO standards, including hazard identification, risk assessment, and environmental aspect evaluation.",
              "Prepare for Certification: Understand the ISO 14001 and ISO 45001 certification process and ensure organizational readiness for external audits and registration.",
            ].map((step, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-1 p-0 rounded-lg hover:bg-amber-50"
                whileHover={cardHover}
              >
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-700 mt-1" />
                <span className="text-amber-800">{step}</span>
              </motion.li>
            ))}
          </ol>
        </section>

      </div>
    </main>
  );
};

export default HSEAwarenessTraining;
