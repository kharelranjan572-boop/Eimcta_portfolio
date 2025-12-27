import { motion } from 'framer-motion';
import React from 'react';
import {
    Building,
    Factory,
    Heart,
    Hospital,
    Utensils,
    Banknote,
    GraduationCap,
    Server,
    Truck,
    Warehouse,
    Star
} from 'lucide-react';

const ISOShowcase = () => {
    const categories = [
        {
            id: 'construction',
            title: 'Construction',
            icon: <Building size={28} />,
            certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
            description: 'Quality, environmental and safety management for construction projects'
        },
        {
            id: 'manufacturer',
            title: 'Factory / Manufacturer',
            icon: <Factory size={28} />,
            certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
            description: 'Standards for manufacturing excellence and operational safety'
        },
        {
            id: 'ngo',
            title: 'NGOs / INGOs',
            icon: <Heart size={28} />,
            certifications: ['ISO 9001', 'ISO 26000', 'SA 8000'],
            description: 'Social responsibility and accountability for non-profit organizations'
        },
        {
            id: 'healthcare',
            title: 'Hospital / Clinic / Lab',
            icon: <Hospital size={28} />,
            certifications: ['ISO 710001', 'ISO 13485', 'ISO 15189'],
            description: 'Healthcare quality management and medical laboratory standards'
        },
        {
            id: 'food',
            title: 'Hotel / Food Industry',
            icon: <Utensils size={28} />,
            certifications: ['ISO 22000', 'HACCP', 'GMP'],
            description: 'Food safety and quality management for hospitality industry'
        },
        {
            id: 'finance',
            title: 'Bank / Finance / Insurance',
            icon: <Banknote size={28} />,
            certifications: ['ISO 9001', 'ISO 27001', 'SA 8001'],
            description: 'Financial services quality and information security standards'
        },
        {
            id: 'education',
            title: 'ISO School / College / EDU',
            icon: <GraduationCap size={28} />,
            certifications: ['ISO 21001'],
            description: 'Educational organizations management system for learning environments'
        },
        {
            id: 'service',
            title: 'Service Industries',
            icon: <Server size={28} />,
            certifications: ['ISO 9001', 'ISO 45001'],
            description: 'Quality and safety management for service providers'
        },
        {
            id: 'transport',
            title: 'Transport / Logistic',
            icon: <Truck size={28} />,
            certifications: ['ISO 9001', 'ISO 28000', 'ISO 39001'],
            description: 'Supply chain security and road traffic safety management'
        },
        {
            id: 'warehousing',
            title: 'Exim / Warehousing',
            icon: <Warehouse size={28} />,
            certifications: ['ISO 9001', 'ISO 45001'],
            description: 'Quality management for warehousing and storage operations'
        },
        {
            id: 'technology',
            title: 'Info. Technology',
            icon: <Server size={28} />,
            certifications: ['ISO 9001', 'ISO 27000'],
            description: 'IT service management and information security standards'
        }
    ];

    // Card animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.9,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.5
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
                    }}
                    className="text-center mb-20 relative"
                >
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Star className="text-amber-400 fill-amber-400" size={32} />
                    </div>
                    <div className="relative inline-block">
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: -20 },
                                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 25 } },
                            }}
                            className="text-xl sm:text-xs  md:text-3xl lg:text-4xl font-bold text-amber-900"
                        >
                            OPERATE YOUR BUSINESS WITH GLOBAL RECOGNITION!
                        </motion.h1>
                         {/* Animated underline acting as a pseudo-element */}
                    </div>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 25 } },
                        }}
                        className="text-lg text-amber-800 max-w-3xl mx-auto leading-relaxed mt-8"
                    >
                        Achieve international standards and demonstrate your commitment to excellence with our ISO certification services.
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border
                             border-amber-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                        >
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center mb-5">
                                    <div className="p-3 rounded-full bg-amber-100 text-amber-700 mr-4 shadow-inner">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-amber-900">{category.title}</h2>
                                </div>
                                <p className="text-amber-800 mb-5 leading-relaxed flex-grow">{category.description}</p>
                                <div className="mt-auto pt-4 border-t border-amber-100 flex flex-wrap gap-2">
                                    {category.certifications.map((cert, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full shadow-sm"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ISOShowcase;

