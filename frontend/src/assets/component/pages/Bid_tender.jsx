import React, { useState, useEffect, useRef } from "react";

// Import Lucid icons (assuming you have them installed)
// If not, you can install with: npm install lucide-react
import { 
  Beaker, 
  TestTube, 
  ShieldCheck, 
  ClipboardCheck, 
  AlertTriangle, 
  TrendingUp, 
  Database,
  Leaf,
  Target,
  Eye,
  Heart,
  Users,
  BookOpen
} from "lucide-react";

// A wrapper component to handle scroll-triggered animations
const AnimateOnScroll = ({ children, animation, delay, threshold = 0.1, as = 'div', className: wrapperClassName, style: wrapperStyle }) => {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(element); // Animate only once
                }
            },
            { threshold }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold]);

    const Tag = as;

    return (
        <Tag
            ref={ref}
            className={`${wrapperClassName || ''} opacity-0 ${isInView ? animation : ''}`}
            style={{ ...wrapperStyle, animationDelay: delay }}
        >
            {children}
        </Tag>
    );
};


// Particle Background Component (static version)
const ParticleBackground = ({ count = 30, color = "amber" }) => {
  const particles = Array.from({ length: count });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-${color}-300 opacity-20`}
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

// Interactive Card Component
const InteractiveCard = ({ icon, title, description }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl p-8 h-full border border-amber-200 bg-white shadow-md hover:shadow-lg transition-transform,box-shadow duration-300 ease-out hover:-translate-y-2 hover:[transform:rotateX(2deg)_rotateY(-1deg)]">
      <div className="absolute inset-0 opacity-10 bg-amber-100" />
      <ParticleBackground count={5} />
      
      <div className="relative z-10 text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-amber-900 relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
        </h3>
        <p className="text-amber-800">{description}</p>
        
      </div>
    </div>
  );
};

const TechnicalBidComponent = () => {
  // Interactive button component
  const InteractiveButton = ({ children, className = "" }) => (
    <button
      className={`px-8 py-4 rounded-xl font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 eimcta-font bg-gray-50 overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
          .eimcta-font { font-family: 'Poppins', Arial, sans-serif; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(80px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-80px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes itemVariants {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes underlineVariant {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          @keyframes contentParagraphVariant {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes grow {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-itemVariants {
            animation: itemVariants 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-underlineVariant {
            animation: underlineVariant 0.8s 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-contentParagraphVariant {
            animation: contentParagraphVariant 0.8s 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-slideInUp {
            animation: slideInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          .animate-grow {
            animation: grow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          .heading-underline {
            position: relative;
            display: inline-block;
          }
          
          .heading-underline::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: -8px;
            left: 25%;
            background-color: #f59e0b;
            transition: width 0.5s ease;
            border-radius: 2px;
          }
          
          .heading-underline.animate::after {
            width: 50%;
          }
        `}
      </style>

      {/* Cinematic Hero Section */}
      <div className="relative text-center py-20 lg:py-32 rounded-3xl overflow-hidden mb-20 bg-gradient-to-br from-amber-50 to-amber-100">
          <ParticleBackground count={40} />
          <div className="relative z-10 max-w-4xl mx-auto">
               <div className="inline-block bg-white/80 backdrop-blur-sm text-amber-700 px-6 py-2 rounded-full mb-6 text-sm font-semibold shadow-sm">
                  EXCELLENCE IN ENVIRONMENTAL MONITORING
              </div>
              <AnimateOnScroll as="h1" animation="animate-slideInRight" delay="0.1s" className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight text-center">
                  Transforming <span className="text-amber-700 heading-underline">Environmental Data</span> into Actionable Insights
              </AnimateOnScroll>
              <AnimateOnScroll as="p" animation="animate-slideInLeft" delay="0.2s" className="text-xl text-amber-800 text-center max-w-2xl mx-auto mb-10">
                  We provide comprehensive environmental monitoring solutions that ensure regulatory compliance, protect public health, and support sustainable resource management.
              </AnimateOnScroll>
              <AnimateOnScroll animation="animate-slideInUp" delay="0.3s">
                  <InteractiveButton>Discover Our Services</InteractiveButton>
              </AnimateOnScroll>
          </div>
      </div>
   
      {/* Principles of Environmental Monitoring - Parallax Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-amber-200 p-12 mb-20">
        <ParticleBackground count={20} />
        <div className="relative z-10">
          <div className="inline-flex items-center bg-white text-amber-700 px-6 py-3 rounded-full mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <ClipboardCheck className="mr-3 w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />
            <span className="font-medium">Monitoring Principles</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateOnScroll as="h2" animation="animate-itemVariants" delay="0.1s" className="text-4xl font-bold text-amber-900 mb-2">
                Our <span className="text-amber-700 heading-underline">Methodological Approach</span> to Environmental Monitoring
              </AnimateOnScroll>
              <AnimateOnScroll animation="animate-underlineVariant" delay="0.3s" className="w-[80px] h-[4px] bg-amber-400 rounded-full my-4" wrapperStyle={{ transformOrigin: 'left' }}/>
              
              <AnimateOnScroll as="p" animation="animate-contentParagraphVariant" delay="0.4s" className="text-lg text-amber-800 mb-8 text-justify leading-relaxed">
                Our environmental monitoring follows rigorous scientific principles to ensure accurate, reliable data collection and analysis for informed decision-making and regulatory compliance.
              </AnimateOnScroll>
              
              <AnimateOnScroll animation="animate-slideInUp" delay="0.5s" className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="font-semibold text-xl mb-6 text-amber-700 heading-underline">Core Principles:</h3>
                <ul className="space-y-4">
                  {[
                    { icon: <Beaker className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Sampling: Collect representative samples of air, water, soil, and other environmental media" },
                    { icon: <TestTube className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Analysis: Utilize appropriate analytical methods and equipment to detect pollutants" },
                    { icon: <ShieldCheck className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Quality Assurance: Implement QA/QC measures to ensure data accuracy and reliability" },
                    { icon: <ClipboardCheck className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Compliance: Monitor in accordance with regulatory requirements and standards" },
                    { icon: <AlertTriangle className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Risk Assessment: Assess potential risks to human health and ecosystems" },
                    { icon: <TrendingUp className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Continuous Monitoring: Establish long-term programs to track changes over time" },
                    { icon: <Database className="w-6 h-6 sm:w-5 sm:h-5 text-amber-500" />, text: "Data Management: Effectively manage and interpret monitoring data" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                      <span className="text-amber-500 mr-3 mt-1 transition-transform group-hover:scale-125">{item.icon}</span>
                      <span className="text-amber-800 group-hover:text-amber-600 transition-colors">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </AnimateOnScroll>
            </div>
            
            <AnimateOnScroll animation="animate-grow" delay="0.4s" className="relative h-full">
              <div className="sticky top-24">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100">
                  <h3 className="text-2xl font-semibold mb-8 text-center text-amber-700 heading-underline">
                    Monitoring Process Timeline
                  </h3>
                  <div className="relative">
                    <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 to-amber-400" />
                    {[
                      { step: "1", title: "Project Planning", icon: <Target className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "1-3 days" },
                      { step: "2", title: "Site Assessment", icon: <Eye className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "2-5 days" },
                      { step: "3", title: "Sample Collection", icon: <Beaker className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "3-7 days" },
                      { step: "4", title: "Laboratory Analysis", icon: <TestTube className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "5-10 days" },
                      { step: "5", title: "Data Interpretation", icon: <TrendingUp className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "2-4 days" },
                      { step: "6", title: "Reporting", icon: <BookOpen className="w-6 h-6 sm:w-5 sm:h-5 text-amber-600" />, duration: "3-5 days" }
                    ].map((item, i) => (
                      <div key={i} className="relative pl-10 md:pl-0 mb-10 last:mb-0 group hover:scale-105 transition-transform duration-300">
                        <div className="md:flex items-start">
                          <div className="hidden md:flex w-16 justify-center">
                            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {item.step}
                            </div>
                          </div>
                          <div className="md:ml-6 bg-white p-6 rounded-xl border border-amber-100 shadow-xs flex-1 group-hover:shadow-sm transition-shadow duration-300">
                            <div className="flex items-center mb-2">
                              <span className="text-amber-600 mr-3 group-hover:text-amber-700 transition-colors duration-300">{item.icon}</span>
                              <h4 className="text-lg font-medium group-hover:text-xl transition-all duration-300 text-amber-900 heading-underline">{item.title}</h4>
                            </div>
                            <p className="text-sm text-amber-700 group-hover:text-amber-800 transition-colors duration-300">{item.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Benefits of Environmental Monitoring - Card Grid */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-1 rounded-full">
              <div className="bg-white px-8 py-2 rounded-full">
                <p className="text-lg font-medium text-amber-700">
                  Strategic Value Proposition
                </p>
              </div>
            </div>
          </div>
          
          <AnimateOnScroll as="h2" animation="animate-itemVariants" delay="0.1s" className="text-4xl font-bold text-amber-900 mb-2">
            Benefits of <span className="text-amber-700 heading-underline">Environmental Monitoring</span>
          </AnimateOnScroll>
          <AnimateOnScroll animation="animate-underlineVariant" delay="0.3s" className="w-[80px] h-[4px] bg-amber-400 rounded-full mx-auto mt-2" wrapperStyle={{ transformOrigin: 'center' }}/>
          
          <AnimateOnScroll as="p" animation="animate-contentParagraphVariant" delay="0.4s" className="text-xl text-amber-800 max-w-3xl mx-auto mt-4">
            Comprehensive monitoring solutions that deliver tangible benefits for organizations, communities, and ecosystems
          </AnimateOnScroll>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          {[
            { icon: <Leaf className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Environmental Protection", description: "Identify and mitigate sources of pollution to protect ecosystems, natural resources, and public health" },
            { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Regulatory Compliance", description: "Ensure compliance with environmental regulations through regular monitoring and testing activities" },
            { icon: <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Early Detection", description: "Detect environmental problems at an early stage, preventing long-term impacts and reducing remediation costs" },
            { icon: <Heart className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Public Health", description: "Protect human health by monitoring air and water quality and identifying health risks" },
            { icon: <Database className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Resource Management", description: "Inform sustainable resource management by monitoring changes in environmental conditions" },
            { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-amber-100" />, title: "Community Engagement", description: "Engage stakeholders in monitoring efforts to raise awareness and promote environmental stewardship" }
          ].map((item, i) => (
            <AnimateOnScroll key={i} animation="animate-slideInUp" delay={`${(i * 0.1) + 0.5}s`}>
                <InteractiveCard 
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Industry Applications - Parallax Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-800 to-amber-900 text-white p-12 my-20">
        <ParticleBackground count={30} color="amber" />
        
        <div className="relative z-10">
          <AnimateOnScroll as="h2" animation="animate-itemVariants" delay="0.1s" className="text-4xl font-bold mb-2 text-center text-amber-100">
            <span className="text-amber-200 heading-underline">
              Industry Applications
            </span> of Environmental Monitoring
          </AnimateOnScroll>
          <AnimateOnScroll animation="animate-underlineVariant" delay="0.3s" className="w-[80px] h-[4px] bg-amber-400 rounded-full mx-auto mt-2" wrapperStyle={{ transformOrigin: 'center' }}/>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12 [perspective:1000px]">
            {[
              { icon: "🏭", title: "Industrial", description: "Manufacturing, Processing", stats: "87% compliance rate" },
              { icon: "💧", title: "Water Resources", description: "Drinking Water, Wastewater", stats: "92% accuracy" },
              { icon: "🏗️", title: "Construction", description: "Site Assessment, Remediation", stats: "85% success" },
              { icon: "🌾", title: "Agriculture", description: "Soil Health, Runoff", stats: "94% approval" },
              { icon: "🏢", title: "Municipal", description: "Urban Planning, Public Health", stats: "89% impact" }
            ].map((item, i) => (
              <AnimateOnScroll
                key={i}
                animation="animate-slideInUp"
                delay={`${(i * 0.1) + 0.4}s`}
                className="bg-amber-700 bg-opacity-50 p-8 rounded-xl backdrop-blur-sm border border-amber-500 border-opacity-30 hover:border-opacity-60 transition-all duration-300 hover:-translate-y-2 hover:[transform:rotateX(2deg)_rotateY(1deg)] relative overflow-hidden group"
              >
                <div className="text-5xl mb-6 group-hover:text-6xl transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-amber-100 heading-underline">{item.title}</h3>
                <p className="text-sm opacity-80 mb-4">{item.description}</p>
                <div className="text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {item.stats}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalBidComponent;