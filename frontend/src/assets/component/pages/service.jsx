import {
  FaChartLine,
  FaFlask,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaLeaf,
  FaIndustry,
  FaUserTie,
  FaCertificate,
  FaHandsHelping,
  FaAward
} from "react-icons/fa";
import BusinessQuoteForm from "./form";

const Services = () => {
  // Services data
  const services = [
    {
      icon: <FaChartLine className="text-2xl text-amber-600" />,
      title: "ISO Consultancy Services",
      description: "We guide your organization through every stage of ISO implementation from gap analysis to certification readiness.",
      items: [
        "ISO 9001 - Quality Management",
        "ISO 14001 - Environmental Management",
        "ISO 45001 - Occupational Health & Safety",
        "ISO 22000 & HACCP - Food Safety",
        "ISO 27001 - Information Security"
      ],
      cta: "Get Certified"
    },
    {
      icon: <FaFlask className="text-2xl text-amber-600" />,
      title: "Accredited Testing & Calibration",
      description: "Precision services including equipment calibration and comprehensive testing per ISO/IEC 17025 standards.",
      items: [
        "Equipment calibration services",
        "Food, water, environmental testing",
        "Laboratory setup consulting",
        "Quality assurance programs",
        "Compliance verification"
      ],
      cta: "Schedule Testing"
    },
    {
      icon: <FaChalkboardTeacher className="text-2xl text-amber-600" />,
      title: "Professional Training Programs",
      description: "Specialized training to build competence aligned with ISO requirements and industry standards.",
      items: [
        "Lead Auditor certification",
        "Food safety trainings (HACCP)",
        "Occupational health workshops",
        "Environmental compliance",
        "Soft skills development"
      ],
      cta: "View Courses"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-amber-600" />,
      title: "Occupational Health & Safety",
      description: "Creating proactive safety cultures that reduce risk and enhance workplace productivity.",
      items: [
        "Hazard Identification & Risk Assessment",
        "Emergency preparedness planning",
        "Safety audits and compliance",
        "PPE consultation",
        "Incident investigation"
      ],
      cta: "Improve Safety"
    },
    {
      icon: <FaLeaf className="text-2xl text-amber-600" />,
      title: "Environmental Management",
      description: "Comprehensive solutions supporting your environmental responsibility and sustainability goals.",
      items: [
        "Environmental Impact Assessments",
        "Waste management planning",
        "Sustainability consulting",
        "Regulatory compliance",
        "Carbon footprint analysis"
      ],
      cta: "Go Green"
    },
    {
      icon: <FaIndustry className="text-2xl text-amber-600" />,
      title: "Industry-Specific Solutions",
      description: "Tailored approaches addressing unique challenges across various sectors.",
      items: [
        "Manufacturing & Industrial",
        "Healthcare & Pharmaceutical",
        "Food Production & Hospitality",
        "Educational Institutions",
        "Service Industries"
      ],
      cta: "Sector Solutions"
    }
  ];

  const benefits = [
    {
      icon: <FaUserTie className="text-2xl text-amber-600" />,
      title: "Experienced Consultants",
      description: "Seasoned professionals with 10+ years in ISO implementation"
    },
    {
      icon: <FaCertificate className="text-2xl text-amber-600" />,
      title: "Customized Solutions",
      description: "Tailored to your organization's specific needs"
    },
    {
      icon: <FaHandsHelping className="text-2xl text-amber-600" />,
      title: "End-to-End Support",
      description: "From documentation to certification and beyond"
    },
    {
      icon: <FaAward className="text-2xl text-amber-600" />,
      title: "Commitment to Excellence",
      description: "Driving continual improvement and sustainable compliance"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-amber-200/30 to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 relative inline-block pb-2">
            Our Premium Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-400"></span>
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Empowering your organization with international standards compliance and operational excellence.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl bg-white border border-amber-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative p-6 h-full flex flex-col">
                <div className="mb-4 p-3 bg-amber-100 rounded-full w-max">
                  {service.icon}
                </div>
                <h2 className="text-xl font-bold mb-3 text-amber-900" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>{service.title}</h2>
                <p className="mb-4 text-gray-700">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <svg className="flex-shrink-0 h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button className="w-full py-3 px-4 bg-amber-100 hover:bg-amber-200 rounded-lg font-medium transition-all duration-300 border border-amber-200 hover:border-amber-300 flex items-center justify-between group-hover:bg-amber-200">
                    <span className="text-amber-900">{service.cta}</span>
                    <svg className="w-5 h-5 ml-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-24">
          <div className="bg-amber-100/50 rounded-xl p-8 relative overflow-hidden border border-amber-200">
            <div className="relative">
              <h3 className="text-3xl font-bold mb-8 text-center text-amber-900 relative inline-block pb-2">
                Why Choose Us?
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-400"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <div className="p-3 bg-amber-100 rounded-full w-max mb-4">
                      {benefit.icon}
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-amber-900" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>{benefit.title}</h4>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  className="py-3 px-6 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center mx-auto border border-amber-700"
                  style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}
                >
                  Get Your Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       <BusinessQuoteForm />
    </section>
  );
};

export default Services;