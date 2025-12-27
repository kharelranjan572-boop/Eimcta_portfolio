import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from '../utilities/image';
import VideoPlayer from '../utilities/Video';
import image21 from "../../img/21.jpg";

const animationVariants = {
  slideInRight: {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  slideInLeft: {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  sectionHeader: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  underline: {
    hidden: { width: '0%' },
    visible: { width: '90%', transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
  },
  paragraph: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
  },
  scaleUp: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } }
  }
};

const gridContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Components ---

const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);

const ICONS = {
  about: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></>,
  benefits: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l1.37.37a2 2 0 0 0 1.95 0l1.37-.37a4 4 0 0 1 4.78 4.78l-.37 1.37a2 2 0 0 0 0 1.95l.37 1.37a4 4 0 0 1-4.78 4.78l-1.37-.37a2 2 0 0 0-1.95 0l-1.37.37a4 4 0 0 1-4.78-4.78l.37-1.37a2 2 0 0 0 0-1.95l-.37-1.37z" /><path d="m9 12 2 2 4-4" /></>,
  who: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  how: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>,
  why: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A5.73 5.73 0 0 0 4.5 16.5z" /><path d="m12 15-3-3a2.25 2.25 0 0 1 0-3l3-3a2.25 2.25 0 0 1 3 0l3 3a2.25 2.25 0 0 1 0 3l-3 3a2.25 2.25 0 0 1-3 0z" /><path d="m21 21-1.5-1.5" /></>,
  improvement: <><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M21 21v-5h-5" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  video: <><path d="m22 8-6 4 6 4V8Z" /><path d="M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" /></>
};

const SectionTitle = ({ icon, children, subtitle }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className="relative mb-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <motion.div animate={controls} initial="hidden" variants={animationVariants.scaleUp}>
          <div className="text-yellow-400 bg-yellow-100 rounded-full p-2">{icon}</div>
        </motion.div>
        <div className="relative">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-amber-900 inline-block"
            variants={animationVariants.sectionHeader}
            initial="hidden"
            animate={controls}
          >
            {children}
            <motion.span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded-lg"
              style={{ width: '90%', originX: 0.5 }}
              variants={animationVariants.underline}
              initial="hidden"
              animate={controls}
            />
          </motion.h2>
        </div>
      </div>
      {subtitle && (
        <motion.p
          className="mt-2 text-amber-900/80 max-w-3xl mx-auto text-justify"
          variants={animationVariants.paragraph}
          initial="hidden"
          animate={controls}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

const InfoCard = ({ icon, title, children, customVariant }) => (
  <motion.div
    className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm"
    variants={customVariant}
    whileHover={{ y: -8, rotateX: "2deg", rotateY: "-1deg", scale: 1.03, boxShadow: "0px 15px 30px -10px rgba(0,0,0,0.1)", transition: { duration: 0.3, ease: "easeOut" } }}
  >
    <div className="flex items-center gap-4">
      <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">{icon}</div>
      <h3 className="text-lg font-bold text-amber-900">{title}</h3>
    </div>
    <p className="mt-4 text-amber-900/80 leading-relaxed text-justify">{children}</p>
  </motion.div>
);

const AnimatedGrid = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={gridContainerVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export default function ISO45001Certification() {
  const { ref: introRef, inView: introInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }} className="min-h-screen pb-3  mt-[2rem] bg-gray-50 text-gray-800 antialiased overflow-x-hidden">
      <div className="bg-white shadow-lg rounded-lg border-2 border-amber-100 max-w-7xl mx-auto">
        <header className="bg-amber-800 text-white p-8 text-center rounded-t-lg">
          <motion.h1 initial="hidden" animate="visible" variants={animationVariants.slideInRight} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-wide text-white">ISO 45001:2018 (OHSMS)</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={animationVariants.slideInLeft} className="mt-2 text-lg text-amber-200">Safety Management System (SMS)</motion.p>
        </header>


        <Image src={image21} alt={image21} caption="" />

        <main className="container mx-auto px-4 py-16 space-y-20">
          <motion.section ref={introRef} className="text-center max-w-3xl mx-auto" initial="hidden" animate={introInView ? "visible" : "hidden"} variants={animationVariants.paragraph}>
            <p className="text-lg md:text-xl text-amber-900/80 leading-relaxed text-justify">
              ISO 45001:2018 is the global standard for Occupational Health and Safety Management. It provides a framework to proactively improve employee safety, reduce workplace risks, and create better, safer working conditions.
            </p>
          </motion.section>

          <section>
            <SectionTitle icon={<Icon path={ICONS.about} />}>About the ISO 45001 Standard</SectionTitle>
            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard icon={<Icon path={ICONS.check} />} title="Identify Hazards" customVariant={animationVariants.slideInUp}>Proactively find and manage potential workplace dangers.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Implement Measures" customVariant={animationVariants.slideInUp}>Establish effective preventive and corrective actions.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Improve Performance" customVariant={animationVariants.slideInUp}>Continuously enhance your health and safety record.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Ensure Compliance" customVariant={animationVariants.slideInUp}>Meet all relevant national and international legal requirements.</InfoCard>
            </AnimatedGrid>
          </section>

          <section>
            <SectionTitle icon={<Icon path={ICONS.benefits} />}>Benefits of Certification</SectionTitle>
            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard icon={<Icon path={ICONS.check} />} title="Legal Compliance" customVariant={animationVariants.scaleUp}>Avoid costly penalties by staying aligned with regulations.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Fewer Accidents" customVariant={animationVariants.scaleUp}>Reduce incidents and lost productivity with proactive risk management.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Cost Savings" customVariant={animationVariants.scaleUp}>Minimize claims, compensation, and insurance premiums.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Stronger Safety Culture" customVariant={animationVariants.scaleUp}>Build employee commitment to a safer workplace.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Stakeholder Trust" customVariant={animationVariants.scaleUp}>Demonstrate responsibility to clients, partners, and regulators.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Operational Efficiency" customVariant={animationVariants.scaleUp}>Improve processes and reduce downtime.</InfoCard>
            </AnimatedGrid>
          </section>

          <section>
            <SectionTitle icon={<Icon path={ICONS.who} />}>Who Can Apply?</SectionTitle>
            <p className=" max-w-3xl mx-auto mb-8 text-amber-900/80 text-justify">ISO 45001 is designed for any organization, regardless of size or industry. It's especially vital for:</p>
            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={<Icon path={ICONS.check} />} title="Manufacturing & Construction" customVariant={animationVariants.slideInLeft}>Manage high-risk environments with strict safety controls.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Healthcare & Logistics" customVariant={animationVariants.slideInUp}>Ensure staff well-being in critical, fast-paced operations.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="Service Industries" customVariant={animationVariants.slideInRight}>Build trust and safeguard employees in all sectors.</InfoCard>
            </AnimatedGrid>
          </section>

          <section>
            <SectionTitle icon={<Icon path={ICONS.how} />}>The Certification Process</SectionTitle>
            <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <InfoCard icon={<Icon path={ICONS.check} />} title="1. Gap Analysis" customVariant={animationVariants.slideInUp}>Review current practices against ISO 45001 requirements.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="2. Documentation" customVariant={animationVariants.slideInUp}>Update policies and procedures to align with the standard.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="3. Employee Training" customVariant={animationVariants.slideInUp}>Engage your workforce in new safety initiatives.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="4. Internal Audits" customVariant={animationVariants.slideInUp}>Evaluate system performance and fix non-conformities.</InfoCard>
              <InfoCard icon={<Icon path={ICONS.check} />} title="5. Certification Audit" customVariant={animationVariants.slideInUp}>An accredited body conducts the final audit for certification.</InfoCard>
            </AnimatedGrid>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-amber-100/50 p-8 rounded-2xl">
            <InfoCard icon={<Icon path={ICONS.why} className="text-yellow-400 bg-yellow-100 rounded-full p-1 w-8 h-8" />} title="Why Choose Everest Consultrain?" customVariant={animationVariants.slideInLeft}>
              Our expert consultants simplify the certification journey with end-to-end guidance, customized solutions, and effective training, ensuring your success is efficient and cost-effective.
            </InfoCard>
            <InfoCard icon={<Icon path={ICONS.improvement} className="text-yellow-400 bg-yellow-100 rounded-full p-1 w-8 h-8" />} title="A Journey of Continuous Improvement" customVariant={animationVariants.slideInRight}>
              Certification is just the beginning. We help you sustain a strong safety culture through regular audits and performance reviews, keeping you compliant and resilient.
            </InfoCard>
          </section>
        </main>
        
          <VideoPlayer src="https://www.youtube.com/watch?v=kiDe9QhUpDM" title="" />

      </div>
    </div>
  );
}