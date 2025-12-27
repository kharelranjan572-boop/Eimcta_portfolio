import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ShieldCheck,
  Users,
  ClipboardList,
  TrendingUp,
  Search,
  AlertTriangle,
  HardHat,
  Factory,
  Hospital,
  Droplet,
  CheckCircle
} from 'lucide-react';
import img from '../../img/hseaudit (1).jpg'

/* ---------------- Animation Variants ---------------- */
const animationVariants = {
  slideInRight: {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  },
  slideInLeft: {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  },
  sectionHeader: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
  },
  // Refined: Changed width to 40% for a cleaner accent underline
  underline: {
    hidden: { width: '0%' },
    visible: { width: '40%', transition: { duration: 0.8, delay: 0.3 } }
  },
  paragraph: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  },
  scaleUp: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
  }
};

// Refined: Simplified hover effect for cleaner lift and shadow in grid items
const cardHoverEffect = {
  y: -6,
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  transition: { duration: 0.3 }
};

/* ---------------- Content Data ---------------- */
const benefitsData = [
  {
    icon: ShieldCheck,
    title: 'Enhanced Safety Performance',
    desc: 'Systematic audits help identify hazards and assess risks, leading to safer workplaces and reduced incidents.'
  },
  {
    icon: AlertTriangle,
    title: 'Regulatory Compliance',
    desc: 'Audits ensure compliance with applicable health and safety laws, minimizing legal risks and penalties.'
  },
  {
    icon: Users,
    title: 'Employee Engagement',
    desc: 'Employee involvement in audits promotes awareness, accountability, and a strong safety culture.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    desc: 'Audit findings support corrective actions and continual enhancement of HSE performance.'
  }
];

const industriesData = [
  { icon: HardHat, name: 'Construction' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Droplet, name: 'Oil & Gas' },
  { icon: Hospital, name: 'Healthcare' }
];

const auditStepsData = [
  { number: '1', title: 'Planning', description: 'Define audit scope, objectives, and applicable legal and organisational requirements.' },
  { number: '2', title: 'Documentation Review', description: 'Review safety policies, procedures, training records, and previous audit reports.' },
  { number: '3', title: 'Fact-Finding', description: 'Engage employees, observe operations, and identify existing safety practices and gaps.' },
  { number: '4', title: 'Evaluation', description: 'Assess audit findings against legal requirements and industry best practices.' },
  { number: '5', title: 'Recommendations', description: 'Develop clear, measurable, and achievable recommendations for improvement.' },
  { number: '6', title: 'Corrective Actions & Reporting', description: 'Assign responsibilities, implement actions, and communicate results to stakeholders.' }
];

/* ---------------- Reusable Components ---------------- */
const AnimatedSection = ({ children, variant, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variant} className={className}>
      {children}
    </motion.div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <div ref={ref} className="mb-12 text-center max-w-4xl mx-auto px-4 sm:px-0">
      <motion.div initial="hidden" animate={controls} variants={animationVariants.scaleUp}>
        <div className="inline-flex items-center justify-center w-14 h-14 mb-6 bg-amber-100 rounded-full shadow-md">
          <Icon className="w-7 h-7 text-amber-600" />
        </div>
      </motion.div>

      {/* Added tracking-tight for cleaner heading typography */}
      <motion.h2 initial="hidden" animate={controls} variants={animationVariants.sectionHeader} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-900 mb-6 relative inline-block">
        {title}
        {/* Underline uses the refined 40% width variant */}
        <motion.span initial="hidden" animate={controls} variants={animationVariants.underline} className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-amber-400 rounded-lg" />
      </motion.h2>

      <motion.p initial="hidden" animate={controls} variants={animationVariants.paragraph} className="text-lg sm:text-xl text-amber-800">
        {subtitle}
      </motion.p>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, desc }) => (
  // Uses the refined cardHoverEffect
  <motion.div whileHover={cardHoverEffect} className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-lg transition-transform duration-300">
    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
      <Icon className="w-6 h-6 text-amber-700" />
    </div>
    <h3 className="text-xl font-bold text-amber-900 mb-2">{title}</h3>
    {/* Explicitly using leading-relaxed for clear paragraph height */}
    <p className="text-amber-700 text-justify leading-relaxed">{desc}</p>
  </motion.div>
);

const AuditStep = ({ number, title, description }) => (
  // Uses the refined cardHoverEffect
  <motion.div whileHover={cardHoverEffect} className="bg-white p-6 rounded-xl border border-amber-100 shadow-md transition-transform duration-300">
    <div className="flex items-start">
      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-inner">
        <span className="font-bold text-2xl text-amber-800">{number}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold text-amber-900 mb-2">{title}</h3>
        {/* Explicitly using leading-relaxed for clear paragraph height */}
        <p className="text-amber-700 text-justify leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

/* ---------------- Main Page ---------------- */
const HSEAudits = () => {
  return (
    // Reverted font to Arial Narrow as requested by the user
    <div className="bg-transparent text-amber-900 font-['Arial_Narrow']">
     <header className="relative h-[480px] sm:h-[500px] flex items-center justify-center text-center text-white overflow-hidden">

  {/* Background Image */}
  <img
    src={img}
    alt="HSE Audit"
    className="
      absolute inset-0 w-full h-full
      object-cover
      sm:object-contain
      lg:object-cover
      xl:object-fill
    "
  />

  {/* Dark Overlay for Readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 px-4 sm:px-6">
    
    <motion.p
      initial="hidden"
      animate="visible"
      variants={animationVariants.slideInLeft}
      className="
        max-w-3xl mx-auto
        text-lg sm:text-xl
        text-amber-200
        leading-relaxed
        text-justify
        drop-shadow-[0_1px_8px_rgba(251,191,36,0.6)]
      "
    >
      Health and safety audits play a critical role in ensuring workplace safety,
      regulatory compliance, and continuous improvement of safety performance.
    </motion.p>
  </div>

</header>


      <main className="max-w-7xl mx-auto px-6 py-16 sm:px-8 bg-white rounded-2xl shadow-xl -mt-20 relative z-10">
        {/* About the Standard */}
        <section className="py-12">
          <SectionHeader
            icon={Search}
            title="About the Standard"
            subtitle="A structured approach to evaluating health and safety management systems."
          />
          {/* Explicitly using leading-relaxed for clear paragraph height */}
          <p className="text-lg sm:text-xl text-amber-800 leading-relaxed text-justify max-w-4xl mx-auto">
            A health and safety audit is a systematic examination of an organisation’s safety management systems, policies, and procedures. The objective is to evaluate their effectiveness in protecting employees and ensuring compliance with applicable laws and regulations. Audits also serve as a benchmark for measuring performance and identifying opportunities for improvement.
          </p>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <SectionHeader icon={TrendingUp} title="Benefits of HSE Audits" subtitle="Why regular audits are essential for organisations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitsData.map((item, i) => (
              <AnimatedSection key={i} variant={animationVariants.slideInUp}>
                <BenefitCard {...item} />
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Who Can Apply */}
        <section className="py-12 text-center max-w-4xl mx-auto px-4 sm:px-0">
          <SectionHeader icon={Users} title="Who Can Apply?" subtitle="Applicable across all industries and organisation sizes" />
          {/* Explicitly using leading-relaxed for clear paragraph height */}
          <p className="text-lg sm:text-xl text-amber-800 leading-relaxed text-justify">
            Health and safety audits can be conducted by any organisation, regardless of size or industry. They are especially valuable in high-risk sectors such as construction, manufacturing, healthcare, and oil & gas. Regular audits demonstrate an organisation’s commitment to workplace safety and regulatory compliance.
          </p>
        </section>

        {/* Industries */}
        <section className="py-16">
          <SectionHeader icon={Factory} title="Key Industries" subtitle="High-impact sectors for HSE audits" />
          <div className="flex flex-wrap justify-center gap-4">
            {industriesData.map((ind, i) => (
              // Uses the refined cardHoverEffect
              <motion.div key={i} whileHover={cardHoverEffect} className="flex items-center bg-amber-100 px-5 py-3 rounded-lg transition-transform duration-300 shadow-md">
                <ind.icon className="w-5 h-5 text-amber-700 mr-3 flex-shrink-0" />
                <span className="font-medium text-amber-800">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-16 bg-amber-50 rounded-xl px-6 sm:px-8 shadow-inner">
          <SectionHeader icon={ClipboardList} title="How Can You Apply?" subtitle="Key steps to implement an effective HSE audit" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {auditStepsData.map(step => (
              <AnimatedSection key={step.number} variant={animationVariants.slideInUp}>
                <AuditStep {...step} />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
            <ul className="space-y-4 text-amber-800">
              {[
                'Gather relevant safety documentation and records.',
                'Engage employees and observe operational practices.',
                'Analyse audit findings objectively.',
                'Develop SMART corrective actions.',
                'Assign responsibilities and timelines.',
                'Publish and communicate audit results.'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  {/* Added flex-shrink-0 to the icon to prevent text wrapping under it */}
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HSEAudits;