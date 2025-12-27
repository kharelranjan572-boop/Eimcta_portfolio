import useEmailAPI from "../utilities/SocialMedia/AllApi.js";
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Mail, Phone, Home, Globe, MessageSquare, Check, X, ChevronDown, AlertCircle, Navigation, Plus, Building, Factory, HeartHandshake, Stethoscope, Utensils, GraduationCap, PiggyBank, Bell, Truck, Package, Server, Trash2 } from 'lucide-react';

// Mock Confetti Effect component
const ConfettiEffect = ({ isActive }) => {
    if (!isActive) return null;

    // Simple visual indicator for mock confetti using motion
    const confettiVariants = {
        initial: { y: 0, opacity: 1, scale: 1 },
        animate: {
            y: [0, -500, -800],
            opacity: [1, 1, 0],
            rotate: [0, 360],
            scale: [1, 1.5, 0.5]
        }
    };

    const colors = ['#f59e0b', '#fbbf24', '#fcd34d', '#fed7aa']; // Amber shades
    
    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    variants={confettiVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        backgroundColor: colors[i % colors.length],
                        borderRadius: '50%',
                    }}
                />
            ))}
        </motion.div>
    );
};


// =================================================================
// 2. DATA CONSTANTS 
// =================================================================

const CATEGORIES = [
    { id: 'construction', name: "CONSTRUCTION", icon: <Building className="text-amber-500" size={20} />, description: "Construction companies, contractors, and building firms.", standards: [{ id: 'con-9001', code: 'ISO 9001:2015', description: 'Quality management system for construction' }, { id: 'con-14001', code: 'ISO 14001:2015', description: 'Environmental management for construction' }, { id: 'con-45001', code: 'ISO 45001:2018', description: 'Occupational health and safety for sites' }] },
    { id: 'factory', name: "FACTORY / MANUFACTURER", icon: <Factory className="text-amber-500" size={20} />, description: "Manufacturing plants and production facilities.", standards: [{ id: 'fac-9001', code: 'ISO 9001:2015', description: 'Manufacturing quality standards' }, { id: 'fac-14001', code: 'ISO 14001:2015', description: 'Sustainable manufacturing practices' }, { id: 'fac-45001', code: 'ISO 45001:2018', description: 'Factory worker safety standards' }] },
    { id: 'ingo', name: "INGO/NGO", icon: <HeartHandshake className="text-amber-500" size={20} />, description: "International and local non-governmental organizations.", standards: [{ id: 'ing-9001', code: 'ISO 9001:2015', description: 'Quality in humanitarian operations' }, { id: 'ing-26000', code: 'ISO 26000:2010', description: 'Guidance on social responsibility' }, { id: 'ing-sa8000', code: 'SA 8000:2014', description: 'Fair treatment of workers standards' }] },
    { id: 'healthcare', name: "HOSPITAL / CLINIC / LAB", icon: <Stethoscope className="text-amber-500" size={20} />, description: "Healthcare providers, medical laboratories, and clinics.", standards: [{ id: 'med-13485', code: 'ISO 13485:2016', description: 'Quality management for medical devices' }, { id: 'med-15189', code: 'ISO 15189:2012', description: 'Medical laboratory quality standards' }] },
    { id: 'hospitality', name: "HOTEL / FOOD INDUSTRY", icon: <Utensils className="text-amber-500" size={20} />, description: "Hotels, restaurants, and food service businesses.", standards: [{ id: 'hot-22000', code: 'ISO 22000:2018', description: 'Food safety management system' }, { id: 'hot-haccp', code: 'HACCP', description: 'Critical control points for food safety' }] },
    { id: 'finance', name: "BANK / FINANCE / INSURANCE", icon: <PiggyBank className="text-amber-500" size={20} />, description: "Financial institutions requiring data security.", standards: [{ id: 'fin-9001', code: 'ISO 9001:2015', description: 'Financial service quality standards' }, { id: 'fin-27001', code: 'ISO 27001:2022', description: 'Data protection and security management' }] },
    { id: 'education', name: "SCHOOL/COLLEGE EDU", icon: <GraduationCap className="text-amber-500" size={20} />, description: "Educational institutions for academic quality.", standards: [{ id: 'edu-21001', code: 'ISO 21001:2018', description: 'Quality management in education' }] },
    { id: 'service', name: "SERVICE INDUSTRIES", icon: <Bell className="text-amber-500" size={20} />, description: "Service providers requiring quality delivery.", standards: [{ id: 'ser-9001', code: 'ISO 9001:2015', description: 'Service quality standards' }, { id: 'ser-45001', code: 'ISO 45001:2018', description: 'Service worker safety management' }] },
    { id: 'transport', name: "TRANSPORT / LOGISTIC", icon: <Truck className="text-amber-500" size={20} />, description: "Transportation and logistics companies.", standards: [{ id: 'log-9001', code: 'ISO 9001:2015', description: 'Logistics quality standards' }, { id: 'log-28000', code: 'ISO 28000:2007', description: 'Security in logistics operations' }] },
    { id: 'warehousing', name: "EXIM/WAREHOUSING", icon: <Package className="text-amber-500" size={20} />, description: "Warehousing and import/export businesses.", standards: [{ id: 'war-9001', code: 'ISO 9001:2015', description: 'Warehousing quality standards' }, { id: 'war-45001', code: 'ISO 45001:2018', description: 'Warehouse worker safety procedures' }] },
    { id: 'technology', name: "INFO TECHNOLOGY", icon: <Server className="text-amber-500" size={20} />, description: "IT companies and service providers.", standards: [{ id: 'it-9001', code: 'ISO 9001:2015', description: 'IT service quality standards' }, { id: 'it-27000', code: 'ISO 27000:2018', description: 'IT security best practices' }] },
];

const BENEFITS_BILINGUAL = [
    { np: "रिसोर्स हरुको सहि उपयोग हुन्छ।", en: "Optimal utilization of resources occurs." },
    { np: "गुणस्तर निर्धारणका सम्पुर्ण लिखित नीति तथा विभागिय दस्ताबेजहरु तयार हुन्छन।", en: "All written policies and departmental documents for quality determination are prepared." },
    { np: "कामकारबाहीको लेखा परिछ्यण तथा उचित बाड्फाड।", en: "Audit and proper adjustment of work execution." },
    { np: "समाग्री, समय तथा साधनको अनावश्यक उपायोग तथा दुरुपयोग हुनबाट बचाउछ।", en: "Prevents unnecessary use and misuse of materials, time, and resources." },
    { np: "सेवा तथा निर्मित सामग्रीहरुको गुणस्तर एबम बिस्वस्नियता बड्‌छ।", en: "Increases the quality and reliability of services and manufactured goods." },
    { np: "प्रतिस्पर्धात्मक बजारमा आफ्नो संस्थाको मूल्याकंनमा अभिवृद्धी हुन्छ।", en: "Enhances the valuation of your organization in the competitive market." },
    { np: "टेन्डर/प्रतिस्पर्धामा अब्बल हुदै।", en: "Excelling in tenders/competitions." },
    { np: "दिर्गकालमा व्यापार सम्ममा पनि वृद्धि हुन्छ।", en: "In the long term, business credibility also increases." }
];

// Added new 'message' field and configured it for textarea
const FORM_FIELDS = [
    { name: 'name', label: 'Name*', icon: <User size={20} />, placeholder: 'Your Name....' },
    { name: 'organization', label: 'Organization*', icon: <Briefcase size={20} />, placeholder: 'Your Company....' },
    { name: 'email', label: 'Email*', icon: <Mail size={20} />, type: 'email', placeholder: 'Your E-mail....' },
    { name: 'phone', label: 'Phone*', icon: <Phone size={20} />, type: 'tel', placeholder: 'Your Phone....' },
    { name: 'address', label: 'Address*', icon: <Home size={20} />, placeholder: 'Your Full Address....' },
    { name: 'country', label: 'Country*', icon: <Globe size={20} />, placeholder: 'Your Country....' },
    // NEW REQUIRED FIELD - moved to end of form render logic
    { name: 'message', label: 'Comment or Additional Information*', icon: <MessageSquare size={20} />, type: 'textarea', placeholder: 'Please provide any specific requirements or details...', rows: 4 },
];


// =================================================================
// 3. REUSABLE COMPONENTS
// =================================================================

// Component for animating the header underline on scroll
const AnimatedHeader = ({ children, className, icon }) => (
    <motion.h2 
        className={`relative ${className} flex items-center mb-6`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        {icon && <div className="mr-2 text-amber-500">{icon}</div>}
        <span className="relative pb-1">
            {children}
            {/* Animated Underline */}
            <motion.span
                className="absolute left-1/2 bottom-0 h-1 bg-amber-500 rounded-full"
                initial={{ width: 0, x: '-50%' }}
                whileInView={{ width: '100%', x: '-50%' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            />
        </span>
    </motion.h2>
);

// Multi-select/Manual Input Component
const SelectInput = ({ label, items, selectedItems, onSelect, onRemove, onAddManual, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [manualInput, setManualInput] = useState('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter items already selected
    const availableItems = useMemo(() => {
        return items.filter(item => !selectedItems.some(s => s.id === item.id));
    }, [items, selectedItems]);

    // Handles manual submission from div/button/keydown 
    const handleAddManual = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        if (manualInput.trim()) {
            onAddManual(manualInput.trim());
            setManualInput('');
            setIsOpen(false);
        }
    };

    return (
        <motion.div 
            className="relative mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            ref={dropdownRef}
        >
            <label className="block text-sm font-semibold text-amber-700 mb-2">{label}</label>

            {/* Selected Items Display */}
            <div className={`p-3 min-h-[44px] rounded-lg border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} shadow-sm flex flex-wrap gap-2 cursor-pointer transition duration-150 ease-in-out`} onClick={() => setIsOpen(!isOpen)}>
                {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                        <span key={item.id} className="inline-flex items-center text-xs font-medium bg-amber-100 text-amber-800 rounded-full py-1 px-3 shadow-md hover:bg-amber-200 transition duration-150">
                            {item.code || item.name}
                            <Trash2 
                                size={12} 
                                className="ml-2 cursor-pointer text-amber-600 hover:text-amber-800" 
                                onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} 
                            />
                        </span>
                    ))
                ) : (
                    <span className="text-amber-400">{placeholder}</span>
                )}
                <ChevronDown size={18} className={`absolute right-3 top-[38px] transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'} text-amber-500`} />
            </div>

            {/* Error Message */}
            {error && (
                <motion.p 
                    className="text-red-500 text-xs mt-1 flex items-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <AlertCircle size={14} className="mr-1" /> {error}
                </motion.p>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{ transformOrigin: 'top' }}
                    >
                        {availableItems.map((item) => (
                            <div
                                key={item.id}
                                className="p-3 flex flex-col cursor-pointer hover:bg-amber-50 transition duration-150"
                                onClick={() => { onSelect(item); }}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-amber-700">{item.code || item.name}</span>
                                        {item.description && <span className="text-xs text-amber-600 italic">{item.description}</span>}
                                    </div>
                                    <Plus size={16} className="text-amber-500 flex-shrink-0" />
                                </div>
                            </div>
                        ))}
                        {availableItems.length === 0 && (
                            <p className="p-3 text-amber-600 text-sm italic">No predefined options available.</p>
                        )}
                        
                        {/* Manual Add Input */}
                        <div className="p-3 border-t border-gray-200">
                            <div className="flex">
                                <input
                                    type="text"
                                    value={manualInput}
                                    onChange={(e) => setManualInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddManual(e);
                                    }}
                                    placeholder="Or add manually (e.g., 'Other')"
                                    className="flex-grow p-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-700"
                                />
                                <button
                                    type="button" 
                                    onClick={() => handleAddManual(null)} 
                                    className="px-3 py-2 bg-amber-500 text-white font-medium rounded-r-lg hover:bg-amber-600 transition duration-150"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// =================================================================
// 4. MAIN APPLICATION COMPONENT
// =================================================================

const  ISOCertificationForm = () => {
    const { sendEmail } = useEmailAPI();
    
    // State for form data
    const [formData, setFormData] = useState(
        FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    
    // State for custom selections
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStandards, setSelectedStandards] = useState([]);

    // State for UI/submission
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // Derived State: Available standards based on selected categories
    const allAvailableStandards = useMemo(() => {
        const standardMap = new Map();
        selectedCategories.forEach(category => {
            if (category.standards) {
                category.standards.forEach(standard => {
                    if (!standardMap.has(standard.id)) {
                        standardMap.set(standard.id, standard);
                    }
                });
            }
        });
        return Array.from(standardMap.values());
    }, [selectedCategories]);

    // Effect for auto-dismissing success/error messages after 5 seconds
    useEffect(() => {
        let timer;
        if (success || errorMsg) {
            timer = setTimeout(() => {
                setSuccess(false);
                setErrorMsg(null);
            }, 5000); 

            return () => clearTimeout(timer); 
        }
    }, [success, errorMsg]);


    // Handlers for Form Fields
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: null })); 
    }, []);

    // Handlers for Category Selection
    const handleCategorySelect = useCallback((category) => {
        setSelectedCategories(prev => [...prev.filter(c => c.id !== category.id), category]);
    }, []);

    const handleCategoryRemove = useCallback((id) => {
        setSelectedCategories(prev => prev.filter(c => c.id !== id));
        if (!id.startsWith('manual-')) {
            const removedCategory = CATEGORIES.find(c => c.id === id);
            if (removedCategory && removedCategory.standards) {
                const removedStandardIds = new Set(removedCategory.standards.map(s => s.id));
                setSelectedStandards(prev => prev.filter(s => !removedStandardIds.has(s.id) && !s.id.startsWith('manual-')));
            }
        }
    }, []);

    const handleCategoryAddManual = useCallback((name) => {
        const manualCategory = { id: `manual-cat-${Date.now()}`, name: name, standards: [] };
        setSelectedCategories(prev => [...prev, manualCategory]);
    }, []);

    // Handlers for Standard Selection
    const handleStandardSelect = useCallback((standard) => {
        setSelectedStandards(prev => [...prev.filter(s => s.id !== standard.id), standard]); 
    }, []);

    const handleStandardRemove = useCallback((id) => {
        setSelectedStandards(prev => prev.filter(s => s.id !== id));
    }, []);

    const handleStandardAddManual = useCallback((code) => {
        const manualStandard = { id: `manual-std-${Date.now()}`, name: code, code: code, description: 'Manual entry' };
        setSelectedStandards(prev => [...prev, manualStandard]);
    }, []);


    // Validation Logic - ALL FIELDS ARE COMPULSORY
    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        // 1. Validate basic form fields
        FORM_FIELDS.forEach(field => {
            if (!formData[field.name] || !String(formData[field.name]).trim()) {
                newErrors[field.name] = `${field.label} is required.`;
                isValid = false;
            }
        });

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
            isValid = false;
        }

        if (formData.phone && !/^[\d\s\-\+\(\)]{7,20}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid or too short.';
            isValid = false;
        }

        // 2. Validate Category Selection (Compulsory)
        if (selectedCategories.length === 0) {
            newErrors.categories = 'Please select at least one industry category (compulsory).';
            isValid = false;
        }
        
        // 3. Validate Standards Selection (Compulsory)
        if (selectedStandards.length === 0) {
            newErrors.standards = 'Please select at least one standard (compulsory).';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [formData, selectedCategories, selectedStandards]);


    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setErrorMsg(null);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Separate predefined vs manual entries for Categories (Services)
        const predefinedCategories = selectedCategories.filter(c => !c.id.startsWith('manual-'));
        const customCategories = selectedCategories.filter(c => c.id.startsWith('manual-'));
        
        // Separate predefined vs manual entries for Standards
        const predefinedStandardsList = selectedStandards.filter(s => !s.id.startsWith('manual-std-'));
        const customStandardsList = selectedStandards.filter(s => s.id.startsWith('manual-std-'));

        // Format the standards data for the payload
        const predefinedStandards = predefinedStandardsList.map(s => s.code || s.name).join('; ');
        const customStandards = customStandardsList.length > 0 
            ? customStandardsList.map(s => s.code || s.name).join('; ') 
            : 'N/A';

        // Construct the payload with all required keys
        const payload = {
            name: formData.name,
            organization: formData.organization,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            country: formData.country,
            message: formData.message, 
            
            // Mapping categories to user-requested keys
            selectedServices: predefinedCategories.map(c => c.name).join('; '),
            customServices: customCategories.length > 0 ? customCategories.map(c => c.name).join('; ') : 'N/A',
            
            // Separated standards data as requested
            selectedStandards: predefinedStandards,
            customStandards: customStandards,

            timestamp: new Date().toISOString()
        };

        try {
            const result = await sendEmail(payload);
            if (result.success) {
                setSuccess(true);
                // Optionally reset form after success
                setFormData(FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
                setSelectedCategories([]);
                setSelectedStandards([]);
            } else {
                setErrorMsg(result.error || "Submission failed due to an unknown error.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setErrorMsg("A network error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    // Helper for rendering form fields (updated to handle textarea)
    const renderFormField = (field) => (
        <motion.div 
            key={field.name} 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * FORM_FIELDS.indexOf(field) }}
        >
            <label htmlFor={field.name} className="block text-sm font-semibold text-amber-700 mb-2">
                {field.label}
            </label>
            <div className={`flex items-start p-3 rounded-lg border ${errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} shadow-sm focus-within:ring-2 focus-within:ring-amber-500 transition duration-150 ease-in-out`}>
                <div className="text-amber-500 mr-3 mt-1">{field.icon}</div>
                
                {field.type === 'textarea' ? (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={true}
                        rows={field.rows || 3}
                        className="flex-grow bg-transparent focus:outline-none text-amber-700 placeholder-amber-400 resize-y"
                    />
                ) : (
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={true}
                        className="flex-grow bg-transparent focus:outline-none text-amber-700 placeholder-amber-400"
                    />
                )}
            </div>
            {errors[field.name] && (
                <motion.p 
                    className="text-red-500 text-xs mt-1 flex items-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <AlertCircle size={14} className="mr-1" /> {errors[field.name]}
                </motion.p>
            )}
        </motion.div>
    );

    // Filter fields for rendering
    const contactFields = FORM_FIELDS.filter(f => f.name !== 'message');
    const messageField = FORM_FIELDS.find(f => f.name === 'message');

    // Apply custom font simulation globally via style tag
    const customStyles = `
        .font-arial-narrow {
            font-family: 'Arial Narrow', Arial, sans-serif;
            letter-spacing: -0.01em;
        }
    `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
            <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-arial-narrow">
                <ConfettiEffect isActive={success} />
                
                {/* Main Content Card */}
                <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-t-8 border-amber-500">
                    <motion.header 
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-700 mb-3 leading-tight">
                            ISO Certification Inquiry
                        </h1>
                        <p className="text-xl text-amber-600 font-medium">
                            Achieve International Standards for Your Organization
                        </p>
                    </motion.header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* LEFT COLUMN: FORM */}
                        <motion.div 
                            className="lg:border-r lg:border-gray-200 lg:pr-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <AnimatedHeader className="text-2xl font-bold text-amber-700" icon={<Navigation size={24} />}>
                                Contact & Requirement Details
                            </AnimatedHeader>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Basic Fields (excluding message field) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                                    {contactFields.slice(0, 4).map(renderFormField)}
                                    {contactFields.slice(4, 6).map(renderFormField)}
                                </div> 

                                {/* Category Selection */}
                                <SelectInput
                                    label="Select Categories*"
                                    items={CATEGORIES}
                                    selectedItems={selectedCategories}
                                    onSelect={handleCategorySelect}
                                    onRemove={handleCategoryRemove}
                                    onAddManual={handleCategoryAddManual}
                                    placeholder="Select your industry or add manually..."
                                    error={errors.categories}
                                />

                                {/* Standards Selection */}
                                <SelectInput
                                    label="Select Standards*"
                                    items={allAvailableStandards}
                                    selectedItems={selectedStandards}
                                    onSelect={handleStandardSelect}
                                    onRemove={handleStandardRemove}
                                    onAddManual={handleStandardAddManual}
                                    placeholder="Select applicable standards or add manually..."
                                    error={errors.standards}
                                />
                                
                                {/* Message Field (Now at the bottom of the form section) */}
                                {messageField && renderFormField(messageField)}

                                {/* Submission Status Messages */}
                                <div className="mt-4 min-h-[50px]">
                                    <AnimatePresence mode="wait">
                                        {success ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-xl flex items-center font-bold"
                                            >
                                                <Check size={20} className="mr-2" />
                                                CONGRATULATION! Your inquiry has been successfully sent.
                                            </motion.div>
                                        ) : errorMsg ? (
                                            <motion.div
                                                key="error"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="bg-amber-100 border border-amber-400 text-amber-800 px-4 py-3 rounded-xl flex items-center"
                                            >
                                                <X size={20} className="mr-2" />
                                                Error: {errorMsg}
                                            </motion.div>
                                        ) : null}
                                    </AnimatePresence>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className={`w-full flex items-center justify-center py-4 mt-6 text-white font-extrabold rounded-xl shadow-lg transition duration-300 ease-in-out ${loading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 hover:shadow-xl'}`}
                                    disabled={loading || success}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : success ? (
                                        <>
                                            <Check size={24} className="mr-2" />
                                            Inquiry Sent!
                                        </>
                                    ) : (
                                        <>
                                            <MessageSquare size={24} className="mr-2" />
                                            Submit Inquiry
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* RIGHT COLUMN: BENEFITS */}
                        <motion.div 
                            className="pt-8 lg:pt-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <AnimatedHeader className="text-2xl font-bold text-amber-700" icon={<AlertCircle size={24} />}>
                                Key Benefits of Certification
                            </AnimatedHeader>
                            <p className="text-amber-600 mb-6">
                                The implementation of international standards provides numerous advantages:
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0">
                                {BENEFITS_BILINGUAL.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        className="p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-md flex flex-col transition duration-300 hover:shadow-lg hover:border-amber-400"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <div className="flex items-start mb-1">
                                            <Check size={18} className="text-amber-600 flex-shrink-0 mt-1 mr-2" />
                                            <span className="text-lg font-bold text-amber-700 leading-snug">{benefit.np}</span>
                                        </div>
                                        <p className="text-sm text-amber-600 italic border-t border-amber-100 pt-1 mt-1 pl-6">
                                            {benefit.en}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div> 
                </div> 

                {/* Footer / Disclaimer */}
                <motion.footer
                    className="mt-10 text-center text-amber-600 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                </motion.footer>

            </div>
        </>
    );
};

export default ISOCertificationForm;