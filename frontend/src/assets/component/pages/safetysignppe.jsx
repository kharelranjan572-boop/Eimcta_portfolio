import React from "react";
import { HardHat, Glasses, Shield, Footprints, UserRoundCog, Ear, Hand, FlaskConical, Factory, Hospital, Zap, Shirt, Mountain, Building, Hammer, Droplets, TriangleAlert, FireExtinguisher, Radiation, Biohazard, Syringe, Ban, TrafficCone, Plus, Recycle } from "lucide-react";


// --- CUSTOM STYLE FOR 3D HOVER EFFECTS ---
const CustomStyles = () => (
    <style>{`
        .perspective-parent {
            perspective: 1000px;
        }
        .card-hover-effect {
            transition: transform 0.3s ease-out;
            transform-style: preserve-3d;
        }
        .card-hover-effect:hover {
            transform: translateY(-8px) rotateX(2deg) rotateY(-1deg) scale(1.03);
        }
        
        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
            .industry-chip {
                flex-basis: calc(50% - 0.5rem);
                font-size: 0.875rem;
                padding: 0.5rem;
            }
            
            .industry-chip-icon {
                margin-right: 0.5rem;
            }
        }
    `}</style>
);


// --- HELPER & ANIMATION COMPONENTS ---

/**
 * A flexible component to animate children when they scroll into view.
 * Uses the Intersection Observer API and configurable Tailwind CSS classes.
 */
const AnimateOnScroll = ({ children, delay = 0, initial = "opacity-0 translate-y-10", className = "" }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Delay is in seconds, convert to ms for setTimeout
                    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
                    observer.unobserve(entry.target); // Clean up observer
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                isVisible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : initial
            }`}
        >
            {children}
        </div>
    );
};

/**
 * A dedicated component for section headers that includes an animated underline.
 */
const SectionHeader = ({ title }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef) };
    }, []);

    return (
        <div ref={ref} className="text-center mb-8 md:mb-12">
            <h2 className={`relative inline-block text-2xl md:text-3xl font-bold text-amber-900 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {title}
                <span 
                    className={`absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 h-1 bg-amber-400 origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} 
                    style={{ transitionDelay: '500ms', width: '25%' }} 
                />
            </h2>
        </div>
    );
};


/**
 * A placeholder for a video player component.
 */
const VideoPlayer = () => (
  <AnimateOnScroll delay={0.2} initial="opacity-0 scale-95">
    <div className="mt-12 md:mt-20 text-center">
      <SectionHeader title="Learn More About Workplace Safety" />
      <div className="relative aspect-video max-w-4xl mx-auto rounded-lg md:rounded-xl shadow-lg md:shadow-2xl overflow-hidden bg-gray-900 border-2 md:border-4 border-amber-200">
        <img 
          src="https://placehold.co/1280x720/0a0a0a/f59e0b?text=Safety+Training+Video" 
          alt="Safety Training Video Placeholder" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <button
            aria-label="Play Video"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.555 15.055a.75.75 0 01.09-1.055l8.5-6.5a.75.75 0 011.056.91l-8.5 6.5a.75.75 0 01-1.146.145z" clipRule="evenodd" transform="translate(1, -0.5)" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </AnimateOnScroll>
);


// --- DATA CONFIGURATION ---
const industrySectors = [
  { icon: <Factory className="w-5 h-5 md:w-6 md:h-6" />, name: "Manufacturing" },
  { icon: <Hospital className="w-5 h-5 md:w-6 md:h-6" />, name: "Healthcare" },
  { icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, name: "Energy" },
  { icon: <Shirt className="w-5 h-5 md:w-6 md:h-6" />, name: "Textile" },
  { icon: <Mountain className="w-5 h-5 md:w-6 md:h-6" />, name: "Mining" },
  { icon: <Building className="w-5 h-5 md:w-6 md:h-6" />, name: "Corporate Offices" },
  { icon: <Hammer className="w-5 h-5 md:w-6 md:h-6" />, name: "Construction" },
  { icon: <Droplets className="w-5 h-5 md:w-6 md:h-6" />, name: "Oil & Gas" },
];

const signCategories = [
  { id: 1, icon: <TriangleAlert className="w-10 h-10 md:w-12 md:h-12" />, title: "Danger Signs", description: "Indicates immediate danger that will cause death or serious injury if not avoided.", iso: "ISO 7010 W001", examples: ["High voltage", "Radiation area", "Toxic material"], gradient: "bg-gradient-to-br from-red-600 to-red-800", sectors: ["Construction", "Manufacturing", "Energy"] },
  { id: 2, icon: <Ban className="w-10 h-10 md:w-12 md:h-12" />, title: "Prohibition Signs", description: "Indicates behavior or actions that are not permitted in the area.", iso: "ISO 7010 P001", examples: ["No smoking", "No entry", "No mobile phones"], gradient: "bg-gradient-to-br from-red-500 to-red-700", sectors: ["Healthcare", "Food Processing", "Chemical"] },
  { id: 3, icon: <TrafficCone className="w-10 h-10 md:w-12 md:h-12" />, title: "Mandatory Signs", description: "Indicates actions that must be carried out to comply with safety regulations.", iso: "ISO 7010 M001", examples: ["Wear PPE", "Wash hands", "Safety harness required"], gradient: "bg-gradient-to-br from-blue-600 to-blue-800", sectors: ["Construction", "Laboratories", "Manufacturing"] },
  { id: 4, icon: <Plus className="w-10 h-10 md:w-12 md:h-12" />, title: "Emergency Signs", description: "Indicates location of safety equipment or emergency exits.", iso: "ISO 7010 E001", examples: ["First aid kit", "Emergency exit", "Eyewash station"], gradient: "bg-gradient-to-br from-green-600 to-green-800", sectors: ["All industries"] },
  { id: 5, icon: <FireExtinguisher className="w-10 h-10 md:w-12 md:h-12" />, title: "Fire Safety Signs", description: "Indicates location of fire fighting equipment and fire alarm activation points.", iso: "ISO 7010 F001", examples: ["Fire extinguisher", "Fire hose", "Fire alarm call point"], gradient: "bg-gradient-to-br from-orange-600 to-orange-800", sectors: ["All industries"] },
  { id: 6, icon: <Radiation className="w-10 h-10 md:w-12 md:h-12" />, title: "Warning Signs", description: "Indicates potentially hazardous situations that may cause minor or moderate injury.", iso: "ISO 7010 W001", examples: ["Slippery surface", "Hot surface", "Forklift traffic"], gradient: "bg-gradient-to-br from-yellow-500 to-yellow-700", sectors: ["Warehousing", "Manufacturing", "Healthcare"] },
  { id: 7, icon: <Biohazard className="w-10 h-10 md:w-12 md:h-12" />, title: "Biological Hazard Signs", description: "Indicates presence of biological substances that pose a threat to health.", iso: "ISO 7010 W021", examples: ["Biohazard area", "Contaminated waste", "Infectious materials"], gradient: "bg-gradient-to-br from-purple-600 to-purple-800", sectors: ["Healthcare", "Laboratories", "Waste Management"] },
  { id: 8, icon: <Plus className="w-10 h-10 md:w-12 md:h-12" />, title: "Safe Condition Signs", description: "Indicates safe conditions or locations of safety-related facilities.", iso: "ISO 7010 E002", examples: ["Assembly point", "Safe route", "Emergency shower"], gradient: "bg-gradient-to-br from-green-500 to-green-700", sectors: ["All industries"] },
  { id: 9, icon: <Recycle className="w-10 h-10 md:w-12 md:h-12" />, title: "Environmental Signs", description: "Provides information about environmental protection and waste management.", iso: "ISO 7010 E003", examples: ["Recycling station", "Waste segregation", "Water conservation"], gradient: "bg-gradient-to-br from-teal-600 to-teal-800", sectors: ["All industries"] }
];

const ppeCategories = [
  { id: 1, icon: <HardHat className="w-10 h-10 md:w-12 md:h-12" />, title: "Head Protection", description: "Industrial helmets compliant with ANSI Z89.1/CSA Z94.1 standards for impact and electrical hazards.", standards: "EN 397, ANSI Z89.1", types: ["Hard Hats", "Bump Caps", "Welding Helmets"], gradient: "bg-gradient-to-br from-amber-500 to-amber-700", industries: ["Construction", "Mining", "Utilities"] },
  { id: 2, icon: <Glasses className="w-10 h-10 md:w-12 md:h-12" />, title: "Eye Protection", description: "Safety glasses and goggles meeting ANSI Z87.1 for impact, chemical splash, and optical radiation protection.", standards: "ANSI Z87.1, EN 166", types: ["Safety Glasses", "Goggles", "Face Shields"], gradient: "bg-gradient-to-br from-blue-600 to-blue-800", industries: ["Laboratories", "Healthcare", "Woodworking"] },
  { id: 3, icon: <Shield className="w-10 h-10 md:w-12 md:h-12" />, title: "Respiratory Protection", description: "NIOSH-approved respirators for particulate matter, gases, vapors, and oxygen-deficient environments.", standards: "NIOSH 42 CFR 84, EN 149", types: ["N95 Masks", "Half-face Respirators", "SCBA"], gradient: "bg-gradient-to-br from-gray-600 to-gray-800", industries: ["Healthcare", "Construction", "Mining"] },
  { id: 4, icon: <Footprints className="w-10 h-10 md:w-12 md:h-12" />, title: "Foot Protection", description: "Steel-toe boots and slip-resistant footwear for protection against crush injuries and slips.", standards: "ASTM F2413, EN ISO 20345", types: ["Steel Toe Boots", "Metatarsal Guards", "Slip-Resistant Shoes"], gradient: "bg-gradient-to-br from-slate-600 to-slate-800", industries: ["Construction", "Warehousing", "Manufacturing"] },
  { id: 5, icon: <UserRoundCog className="w-10 h-10 md:w-12 md:h-12" />, title: "Leg Protection", description: "Protective clothing including chaps and leg guards against cuts, abrasions, and chemicals.", standards: "EN 381, ANSI/ISEA 107", types: ["Leg Guards", "Chemical Pants", "Kevlar Chaps"], gradient: "bg-gradient-to-br from-indigo-600 to-indigo-800", industries: ["Forestry", "Chemical", "Construction"] },
  { id: 6, icon: <Ear className="w-10 h-10 md:w-12 md:h-12" />, title: "Hearing Protection", description: "Earplugs and earmuffs rated for occupational noise exposure per NRR requirements.", standards: "ANSI S3.19, EN 352", types: ["Earplugs", "Earmuffs", "Electronic Hearing Protectors"], gradient: "bg-gradient-to-br from-pink-600 to-pink-800", industries: ["Aviation", "Construction", "Metalwork"] },
  { id: 7, icon: <Hand className="w-10 h-10 md:w-12 md:h-12" />, title: "Hand Protection", description: "Gloves designed for protection against cuts, heat, chemicals, and electrical hazards.", standards: "EN 388, EN 374, ASTM D120", types: ["Cut-Resistant Gloves", "Chemical Gloves", "Heat-Resistant Gloves"], gradient: "bg-gradient-to-br from-red-600 to-red-800", industries: ["Glass Handling", "Chemical", "Welding"] },
  { id: 8, icon: <FlaskConical className="w-10 h-10 md:w-12 md:h-12" />, title: "Chemical Protection", description: "Specialized suits and gloves for handling hazardous materials and chemicals safely.", standards: "EN 943, NFPA 1991", types: ["Chemical Suits", "Respirators", "Splash Goggles"], gradient: "bg-gradient-to-br from-green-600 to-green-800", industries: ["Pharmaceutical", "Laboratory", "Chemical"] },
  { id: 9, icon: <Shirt className="w-10 h-10 md:w-12 md:h-12" />, title: "Body Protection", description: "Vests, jackets, and full-body suits to protect from visibility hazards and extreme conditions.", standards: "ANSI/ISEA 107, EN ISO 20471", types: ["Hi-Vis Vests", "Insulated Jackets", "Fire-Retardant Suits"], gradient: "bg-gradient-to-br from-cyan-600 to-cyan-800", industries: ["Traffic Control", "Utilities", "Emergency Services"] },
  { id: 10, icon: <Shield className="w-10 h-10 md:w-12 md:h-12" />, title: "Face Protection", description: "Face shields and masks to prevent exposure to splashes, flying debris, and biological hazards.", standards: "EN 166, ANSI Z87.1", types: ["Face Shields", "Surgical Masks", "Welding Helmets"], gradient: "bg-gradient-to-br from-purple-600 to-purple-800", industries: ["Healthcare", "Metalwork", "Laboratory"] }
];


// --- MAIN COMPONENT ---
export default function SafetySignPPE() {
  return (
    <>
      <CustomStyles />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 font-sans overflow-x-hidden">
        
        {/* Header Section */}
        <header className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <AnimateOnScroll initial="opacity-0 scale-95">
                <div className="flex justify-center mb-4 md:mb-6">
                    <img
                        src="https://placehold.co/300x80/fefce8/a16207?text=Safety+First+Inc.&font=inter"
                        alt="Safety First Inc. Logo"
                        className="rounded-lg w-64 md:w-80"
                    />
                </div>
            </AnimateOnScroll>
            <AnimateOnScroll initial="opacity-0 translate-x-20" delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 tracking-tight">
                    Workplace Safety Solutions
                </h1>
            </AnimateOnScroll>
            <AnimateOnScroll initial="opacity-0 -translate-x-20" delay={0.2}>
                <p className="text-base md:text-lg text-amber-800 max-w-3xl mx-auto leading-relaxed text-justify md:text-center px-2">
                    Comprehensive safety solutions including ISO-compliant signage and certified personal protective equipment (PPE) for hazard prevention across all industries.
                </p>
            </AnimateOnScroll>
        </header>

        {/* Industries Section */}
        <AnimateOnScroll delay={0.2} initial="opacity-0 translate-y-[30px]">
            <div className="text-center mb-12 md:mb-16">
                <SectionHeader title="Trusted by Industries Worldwide" />
                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
                    {industrySectors.map((sector, i) => (
                    <div
                        key={i}
                        className="industry-chip inline-flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full bg-white shadow-sm border border-amber-200 text-amber-900 hover:bg-amber-50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                        <span className="industry-chip-icon p-1 md:p-2 rounded-full bg-amber-100 text-amber-600">
                        {sector.icon}
                        </span>
                        <span className="font-medium ml-1 md:ml-2 md:mr-1">{sector.name}</span>
                    </div>
                    ))}
                </div>
            </div>
        </AnimateOnScroll>

        {/* Safety Signs Section */}
        <div className="mb-16 md:mb-20">
            <SectionHeader title="ISO-Compliant Safety Signs" />
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 perspective-parent">
                {signCategories.map((card, i) => (
                <AnimateOnScroll key={card.id} initial="opacity-0 translate-y-16" delay={0.1 * (i % 3)}>
                    <article className="rounded-xl overflow-hidden bg-white border border-amber-200 shadow-lg flex flex-col h-full card-hover-effect">
                        <div className={`${card.gradient} h-32 md:h-36 flex items-center justify-center relative p-4 text-white`}>
                            <span className="p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">{card.icon}</span>
                        </div>
                        <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-grow flex flex-col">
                            <h3 className="text-lg md:text-xl font-bold text-amber-900">{card.title}</h3>
                            <p className="text-amber-800 leading-relaxed flex-grow text-justify">{card.description}</p>
                            <div className="space-y-2 md:space-y-3 pt-2 md:pt-3 border-t border-amber-100">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Standard</h4>
                                    <p className="text-xs md:text-sm text-amber-900 font-mono bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">{card.iso}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Common Examples</h4>
                                    <ul className="mt-1 space-y-1">
                                        {card.examples.slice(0, 3).map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="text-amber-500 mr-2 font-bold text-lg">•</span>
                                            <span className="text-amber-900 text-sm md:text-base">{item}</span>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Key Sectors</h4>
                                    <div className="mt-1 md:mt-2 flex flex-wrap gap-1 md:gap-2">
                                        {card.sectors.slice(0, 3).map((sector, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">{sector}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </AnimateOnScroll>
                ))}
            </div>
        </div>
        
        {/* PPE Equipment Section */}
        <div className="mb-10">
            <SectionHeader title="Certified PPE Equipment" />
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 perspective-parent">
                {ppeCategories.map((card, i) => (
                <AnimateOnScroll key={card.id} initial="opacity-0 translate-y-16" delay={0.1 * (i % 3)}>
                    <article className="rounded-xl overflow-hidden bg-white border border-amber-200 shadow-lg flex flex-col h-full card-hover-effect">
                        <div className={`${card.gradient} h-32 md:h-36 flex items-center justify-center relative p-4 text-white`}>
                            <span className="p-3 md:p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">{card.icon}</span>
                        </div>
                        <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-grow flex flex-col">
                            <h3 className="text-lg md:text-xl font-bold text-amber-900">{card.title}</h3>
                            <p className="text-amber-800 leading-relaxed flex-grow text-justify">{card.description}</p>
                            <div className="space-y-2 md:space-y-3 pt-2 md:pt-3 border-t border-amber-100">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Standards</h4>
                                    <p className="text-xs md:text-sm text-amber-900 font-mono bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">{card.standards}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Types</h4>
                                    <ul className="mt-1 space-y-1">
                                        {card.types.slice(0, 3).map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="text-amber-500 mr-2 font-bold text-lg">•</span>
                                            <span className="text-amber-900 text-sm md:text-base">{item}</span>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider">Key Industries</h4>
                                    <div className="mt-1 md:mt-2 flex flex-wrap gap-1 md:gap-2">
                                        {card.industries.slice(0, 3).map((industry, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">{industry}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </AnimateOnScroll>
                ))}
            </div>
        </div>
        
        {/* Video Section */}
        {/* <VideoPlayer /> */}

      </section>
    </>
  );
}