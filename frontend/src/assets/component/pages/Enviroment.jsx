import React from "react";
import Image from "../utilities/image";
import img1 from  "../../img/eia.png"
import img2 from  "../../img/eia.png"

// --- SVG Icon Components ---
const FaLeaf = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M576 64a64 64 0 0 0-64-64H64A64 64 0 0 0 0 64v384a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V64zM320 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-160 0c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm224 256H128V288h384v96z"></path>
  </svg>
);
const FaRecycle = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 182.21v147.58a23.94 23.94 0 0 1-13.31 21.51l-183.2 105.77a24 24 0 0 1-26.62 0L73.31 351.3a23.94 23.94 0 0 1-13.31-21.51V182.21a23.94 23.94 0 0 1 13.31-21.51l183.2-105.77a24 24 0 0 1 26.62 0l183.2 105.77a23.94 23.94 0 0 1 13.31 21.51z"></path>
  </svg>
);
const FaFlask = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 416V256l-64-64V96h-32v96l-64-64V32h-32v96l-64-64V32h-32v96L128 192V96H96v96L32 256v160H0v32h512v-32h-32zM288 320a32 32 0 1 1-64 0 32 32 0 0 1 64 0z"></path>
  </svg>
);
const FaChartLine = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 64h384v32H64V64zm384 64H64v32h384v-32zM64 256h384v32H64v-32zm384 64H64v32h384v-32zM64 416h384v32H64v-32z"></path>
  </svg>
);
const FaShieldAlt = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-41 0l-192 80A48 48 0 0 0 0 127.9v192.2a48 48 0 0 0 45.5 47.8l192 40a48.2 48.2 0 0 0 41 0l192-40A48 48 0 0 0 512 320.1V127.9a48 48 0 0 0-45.5-44.2z"></path>
  </svg>
);
const FaUsers = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M624 208h-64v-64c0-35.3-28.7-64-64-64h-32V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64H80c-35.3 0-64 28.7-64 64v64H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 35.3 28.7 64 64 64h32v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h16c35.3 0 64-28.7 64-64v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"></path>
  </svg>
);
const FaCheck = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"></path>
  </svg>
);
const FaCertificate = (props) => (
  <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M480 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm-48 112c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40zM96 144c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40zm320 272H96V224h320v192z"></path>
  </svg>
);
const FaPlayCircle = (props) => (
    <svg {...props} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path>
    </svg>
);

// Pattern background component
const PatternBackground = () => (
  <div className="absolute inset-0 opacity-10" 
    style={{
      backgroundImage: 'linear-gradient(135deg, #fef3c7 10%, transparent 10%, transparent 50%, #fef3c7 50%, #fef3c7 60%, transparent 60%, transparent 100%)',
      backgroundSize: '20px 20px'
    }}
  ></div>
);

// Helper Component: Video Player with placeholder
const VideoPlayer = ({ title, src, link }) => (
  <section className="mt-16 animate-on-scroll">
    <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-8 text-center relative heading-underline pb-4 animate-itemVariants">
      {title}
    </h2>
    <div className="relative bg-black rounded-xl shadow-lg overflow-hidden group border-4 border-amber-200 animate-scaleUp">
      <video
        className="w-full h-full"
        poster="https://placehold.co/1280x720/1a1a1a/ffffff?text=Video+Highlight"
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300">
        <FaPlayCircle className="text-white text-6xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  </section>
);

// Main Component
const EnvironmentalServices = () => {
  // Inject animations and set up IntersectionObserver
  React.useEffect(() => {
    // Injecting CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes slideInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes itemVariants { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes paragraph-anim { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes rotate3D { from { opacity: 0; transform: perspective(800px) translateY(30px) rotateX(-10deg); } to { opacity: 1; transform: perspective(800px) translateY(0) rotateX(0deg); } }
      @keyframes scaleUp { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      @keyframes underline-grow { from { width: 0%; } to { width: 25%; } }

      .animate-on-scroll { 
        opacity: 0; 
        transition: opacity 0.5s ease-out;
      }
      .animate-on-scroll.is-visible {
        opacity: 1;
      }

      .is-visible .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-itemVariants { animation: itemVariants 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-paragraph { animation: paragraph-anim 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards; }
      .is-visible .animate-slideInUp { animation: slideInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-rotate3D { animation: rotate3D 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      .is-visible .animate-scaleUp { animation: scaleUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }

      .card-hover { transition: transform 0.3s ease-out; }
      .card-hover:hover { transform: translateY(-8px) perspective(800px) rotateX(2deg) rotateY(-1deg); }

      .heading-underline::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); bottom: -0.5rem; height: 4px; background-color: #f59e0b; border-radius: 9999px; width: 0%; }
      .is-visible .heading-underline::after { animation: underline-grow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards; }
    `;
    document.head.appendChild(style);

    // IntersectionObserver setup
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    // Add Google Font "Inter"
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
        elements.forEach(el => observer.unobserve(el));
    }
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 px-4 py-8 md:px-8 lg:px-20 max-w-7xl mx-auto font-['Inter',_sans-serif]">
      
      {/* Hero Section with SEO-optimized heading */}
      <section className="text-center mb-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 p-8 md:p-12 text-white shadow-xl animate-on-scroll">
        <PatternBackground />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideInRight">
             <span className="text-white drop-shadow-md">
               ISO-Certified Environmental Impact Assessment & Monitoring Services
             </span>
          </h1>
          <p className="text-lg md:text-xl text-amber-100 text-justify max-w-4xl mx-auto leading-relaxed animate-slideInLeft">
            EIMCTA provides comprehensive, impartial environmental services grounded in ISO standards. Our expert team delivers reliable Environmental Impact Assessments (EIA) and precise environmental monitoring using calibrated equipment to ensure regulatory compliance and sustainable development.
          </p>
        </div>
      </section>

      {/* EIA Image with descriptive alt text */}
      <Image 
        src={img1} 
        alt='Environmental Impact Assessment process showing project planning, analysis, and compliance stages'
        className="w-full rounded-lg shadow-md mb-8"
      />

      {/* Enhanced EIA Section with better structure */}
      <section className="mb-16 bg-white rounded-xl p-6 md:p-8 shadow-lg border border-amber-200 relative overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-on-scroll">
        <PatternBackground />
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4 border-2 border-amber-200">
              <FaLeaf className="text-amber-500 text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 heading-underline relative pb-4 animate-itemVariants">
              Environmental Impact Assessment (EIA) Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-paragraph">
              <p className="text-gray-700 mb-4 leading-relaxed">
                An Environmental Impact Assessment (EIA) is a systematic process that evaluates potential environmental effects of proposed projects before implementation. Our ISO-aligned methodology ensures:
              </p>
              <ul className="space-y-3">
                {[
                  "Early identification of environmental risks and opportunities",
                  "Development of effective mitigation strategies",
                  "Full regulatory compliance with local and international standards",
                  "Enhanced project sustainability and social acceptance",
                  "Improved stakeholder confidence through transparent processes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 shadow-inner card-hover animate-slideInRight">
              <h3 className="font-semibold text-amber-800 mb-3 text-lg">Strategic Environmental Assessment (SEA)</h3>
              <p className="text-gray-700 mb-4">
                For policies, plans and programs, we conduct Strategic Environmental Assessments to integrate environmental considerations at the highest decision-making levels, ensuring sustainable development from conception.
              </p>
              <div className="bg-amber-100 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="text-amber-900 font-medium italic">
                  "Our SEA services help align organizational strategies with environmental sustainability goals and regulatory requirements."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Core Principles Section */}
      <section className="mb-16 relative overflow-hidden rounded-xl bg-transparent p-8 animate-on-scroll">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-8 text-center relative heading-underline pb-4 animate-itemVariants">
            Our <span className="text-amber-800">Environmental Monitoring</span> Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <FaFlask className="text-2xl" />, 
                title: "Precision Sampling & Analysis", 
                desc: "Methodical collection and standardized laboratory analysis of air, water, soil, and waste samples using calibrated equipment." 
              },
              { 
                icon: <FaChartLine className="text-2xl" />, 
                title: "Rigorous QA/QC Processes", 
                desc: "Comprehensive quality assurance and control protocols ensuring credible, defensible, and reproducible environmental data." 
              },
              { 
                icon: <FaShieldAlt className="text-2xl" />, 
                title: "Regulatory Compliance", 
                desc: "Monitoring programs aligned with national and international environmental regulations and industry best practices." 
              },
              { 
                icon: <FaUsers className="text-2xl" />, 
                title: "Comprehensive Risk Assessment", 
                desc: "Thorough evaluation of environmental and public health risks to inform effective mitigation strategies." 
              }
            ].map((principle, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-amber-200 card-hover animate-slideInUp"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-amber-500">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{principle.title}</h3>
                <p className="text-amber-800 text-sm leading-relaxed">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section with better categorization */}
      <section className="mb-16 bg-white rounded-xl p-8 relative overflow-hidden border border-amber-200 hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
        <PatternBackground />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-8 text-center relative heading-underline pb-4 animate-itemVariants">
            Comprehensive Benefits of Our Environmental Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-paragraph">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <FaShieldAlt className="mr-2" /> Regulatory & Compliance
              </h3>
              <ul className="space-y-2">
                {["Regulatory compliance", "Risk mitigation", "Legal protection", "Permit acquisition"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-amber-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <FaLeaf className="mr-2" /> Environmental Protection
              </h3>
              <ul className="space-y-2">
                {["Ecosystem conservation", "Pollution prevention", "Resource sustainability", "Biodiversity protection"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-green-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <FaUsers className="mr-2" /> Community & Health
              </h3>
              <ul className="space-y-2">
                {["Public health protection", "Stakeholder engagement", "Community relations", "Transparent reporting"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-blue-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                <FaChartLine className="mr-2" /> Business Value
              </h3>
              <ul className="space-y-2">
                {["Cost savings", "Corporate reputation", "Investor confidence", "Market differentiation"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-purple-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
                <FaRecycle className="mr-2" /> Sustainability
              </h3>
              <ul className="space-y-2">
                {["Circular economy", "Waste minimization", "Carbon footprint reduction", "Climate resilience"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-teal-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
                <FaCertificate className="mr-2" /> Long-term Advantages
              </h3>
              <ul className="space-y-2">
                {["Future-proofing operations", "Data-driven decisions", "Continuous improvement", "Sustainable growth"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-green-500 text-xs mr-2" />
                    <span className="text-amber-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <VideoPlayer 
        title="Our Environmental Assessment Process in Action" 
        src="https://www.w3.org/2010/05/video/mediaevents.html" 
        link="#" 
      /> */}
    </div>
  );
};

export default EnvironmentalServices;