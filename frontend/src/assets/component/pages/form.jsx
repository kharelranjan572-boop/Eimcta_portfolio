// 📌 BusinessQuoteForm.js
import useEmailAPI from "../utilities/SocialMedia/AllApi"; 
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageSquare,
  Send,
  ChevronDown,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// --- Utility Components ---

// 1. Confetti Effect
const ConfettiEffect = () => {
  const pieces = Array.from({ length: 50 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
          animation: `fall ${Math.random() * 2 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        };
        return <div key={i} style={style} className="absolute opacity-80 rounded-sm" />;
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 2. InputField Component
const InputField = ({ label, icon, error, ...props }) => (
  <div className="group">
    <label className="block text-sm font-bold text-amber-900 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-amber-100 p-1.5 rounded-full">
        {icon}
      </div>
      <input
        {...props}
        className={`pl-12 w-full border ${error ? "border-red-400" : "border-amber-300"} rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 shadow-sm hover:shadow-md`}
      />
    </div>
    {error && <p className="mt-1 text-xs font-medium text-red-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{error}</p>}
  </div>
);

// 3. ServicesDropdown Component
const ServicesDropdown = ({
  servicesInterested,
  formData,
  toggleService,
  setFormData,
  errors,
  showDropdown,
  setShowDropdown,
  showCustomInput,
  setShowCustomInput,
  handleChange,
  addCustomService,
}) => (
  <div className="services-dropdown-container group">
    <label className="block text-sm font-bold text-amber-900 mb-1">
      Services Interested *
    </label>
    <div
      className={`flex flex-wrap gap-2 p-3 border rounded-xl min-h-[50px] transition duration-200 ${errors.selectedServices
        ? "border-red-400 bg-red-50"
        : "border-amber-300 bg-amber-50 hover:border-amber-400"
        } shadow-inner`}
    >
      {(formData.selectedServices.concat(formData.customServices).length > 0) ? (
        formData.selectedServices.concat(formData.customServices).map((service) => (
          <div
            key={service}
            className="flex items-center bg-amber-700 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-colors hover:bg-amber-800 cursor-default"
          >
            <span>{service}</span>
            <button
              type="button"
              onClick={() => {
                if (formData.selectedServices.includes(service)) toggleService(service);
                else setFormData((prev) => ({
                  ...prev,
                  customServices: prev.customServices.filter((s) => s !== service),
                }));
              }}
              className="ml-2 -mr-1 p-0.5 rounded-full text-white/90 hover:bg-white/20 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-amber-500 self-center px-1 text-sm italic">Select services below...</p>
      )}
    </div>

    {errors.selectedServices && (
      <p className="mt-1 text-xs font-medium text-red-600 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" />{errors.selectedServices}</p>
    )}

    <div className="relative mt-3">
      <button
        type="button"
        className="w-full border border-amber-300 rounded-xl p-3 cursor-pointer flex justify-between items-center text-left bg-white hover:bg-amber-100 transition-colors shadow-sm"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-amber-800 font-semibold">
          {showDropdown ? "Hide Services List" : "View and Select Services"}
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-amber-600 transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`} 
        />
      </button>
      {showDropdown && (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 max-h-72 overflow-y-auto border border-amber-400 bg-white rounded-xl shadow-xl p-3"
        >
          {servicesInterested.map((service, idx) => (
            <label
              key={idx}
              className="flex items-center p-2 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={formData.selectedServices.includes(service)}
                onChange={() => toggleService(service)}
                className="h-5 w-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 mr-3 shadow-inner"
              />
              <span className="text-sm text-gray-700 font-medium">{service}</span>
            </label>
          ))}
          <div className="p-2 mt-3 border-t border-amber-200">
            {showCustomInput ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.customService}
                  onChange={handleChange}
                  name="customService"
                  className="flex-1 border border-amber-300 rounded-lg px-3 py-2 mr-2 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="Enter custom service"
                  onKeyDown={(e) => e.key === 'Enter' && addCustomService()}
                />
                <button
                  type="button"
                  onClick={addCustomService}
                  className="text-white bg-amber-600 px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-semibold shadow-md"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium flex items-center p-1"
              >
                <PlusCircle className="w-4 h-4 mr-1"/> Add other service...
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

// PlusCircle Icon
const PlusCircle = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
);


// --- Main Component ---
export default function BusinessQuoteForm() {
  const form = useRef();

  const servicesInterested = [
    "ISO 9001:2015 QMS (Quality Management System)",
    "ISO 45001:2018 OHSMS (Occupational Health & Safety Management System)",
    "ISO 14001:2015 EMS (Environmental Management System)",
    "ISO 27001:2022 ISMS (Information Security Management System)",
    "ISO 22000:2018 FSMS (Food Safety Management System)",
    "ISO 39001:2012 RTSMS (Road Traffic Safety Management System)",
    "ISO 21001:2018 EOMS (Educational Organizations Management System)",
    "ISO 50001:2018 EnMS (Energy Management System)",
    "Training Programs",
    "OHS Consultancy",
    "Environmental Services",
    "Safety Equipment",
    "Third Party Audits",
    "CE Marking (Conformité Européenne)",
    "HACCP Certification (Hazard Analysis & Critical Control Points)",
    "Emergency Planning",
  ];

  const initialFormData = {
    name: "",
    organization: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    message: "",
    selectedServices: [],
    customServices: [],
    customService: "",
    CurrentDate: new Date().toDateString(),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Auto-clear status
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const fetchLocation = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await res.json();
      const admin = data.localityInfo?.administrative || [];
      const city = data.city || "";
      const district = admin.find((a) => a.adminLevel === 6)?.name || "";
      const province = admin.find((a) => a.adminLevel === 4)?.name || "";
      const addressParts = [city, district, province].filter(Boolean);
      const address = addressParts.join(", ");

      setFormData((prev) => ({
        ...prev,
        address: address,
        country: data.countryName || prev.country,
      }));
    } catch (err) {
      console.error("Failed to fetch location:", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchLocation(pos.coords.latitude, pos.coords.longitude),
        () => console.log("User denied geolocation or failed to retrieve location.")
      );
    }
  }, []);

  const headerVariant = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } };
  const underlineVariant = { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const addCustomService = () => {
    const trimmed = formData.customService.trim();
    if (trimmed && !formData.customServices.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        customServices: [...prev.customServices, trimmed],
        customService: "",
      }));
      setShowCustomInput(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your full name is required.";
    if (!formData.organization.trim()) newErrors.organization = "Organization name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "A valid email address is required.";
    if (!/^\+?(\d[\s-]?){7,15}$/.test(formData.phone.trim())) newErrors.phone = "A valid phone number is required (7-15 digits, optionally starting with +).";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (formData.selectedServices.length + formData.customServices.length === 0)
      newErrors.selectedServices = "Please select at least one service.";
    return newErrors;
  };

  const { sendEmail } = useEmailAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      if(validationErrors.selectedServices) setShowDropdown(true); 
      return;
    }

    const payload = {
      ...formData,
      selectedServices: formData.selectedServices,
      customServices: formData.customServices,
    };

    const result = await sendEmail(payload);
    setIsSubmitting(false);

    if (result?.success) {
      setSubmitStatus({ success: true, message: result.message || "Thank you for contacting us we will contact you as soon as possible. Thank you" });
      setFormData(initialFormData);
    } else {
      let errorMsg = "Failed to submit inquiry.";
      if (result?.error) {
        if (typeof result.error === "string") errorMsg = result.error;
        else if (Array.isArray(result.error)) errorMsg = result.error.join(", ");
        else if (typeof result.error === "object" && result.error.text) errorMsg = result.error.text;
      }
      setSubmitStatus({ success: false, message: errorMsg });
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-50 font-['Inter',sans-serif]">
      <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border border-amber-200">
        <motion.h2
          className=" text-lg sm:text-xs  md:text-3xl lg:text-4xl font-extrabold text-amber-900 mb-6 text-center relative"
          initial="initial"
          whileInView="animate"
          variants={headerVariant}
          viewport={{ once: true }}
        >
          <span className="inline-block relative">
            Business Service Inquiry
            <motion.div 
                className="absolute left-0 right-0 -bottom-2 h-1.5 bg-yellow-400 rounded-lg origin-center" 
                variants={underlineVariant} 
                initial="initial" 
                whileInView="animate" 
                viewport={{ once: true }} 
            />
          </span>
        </motion.h2>
        <p className="text-amber-700 text-center mb-10 text-lg">
          Tell us about your organization and the services you are interested in.
        </p>

        <form ref={form} onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
          {/* Name & Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Contact Name *" name="name" value={formData.name} onChange={handleChange} error={errors.name} icon={<User className="h-4 w-4 text-amber-600" />} placeholder="Your full name" />
            <InputField label="Organization Name *" name="organization" value={formData.organization} onChange={handleChange} error={errors.organization} icon={<Building className="h-4 w-4 text-amber-600" />} placeholder="Your organization name" />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} icon={<Mail className="h-4 w-4 text-amber-600" />} placeholder="your.email@example.com" />
            <InputField label="Phone/Mobile *" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} icon={<Phone className="h-4 w-4 text-amber-600" />} placeholder="+977 1234567890" />
          </div>

          {/* Address & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Address *" name="address" value={formData.address} onChange={handleChange} error={errors.address} icon={<MapPin className="h-4 w-4 text-amber-600" />} placeholder="Street, City, District, Province" />
            <InputField label="Country *" name="country" value={formData.country} onChange={handleChange} error={errors.country} icon={<Globe className="h-4 w-4 text-amber-600" />} placeholder="e.g., Nepal" />
          </div>

          {/* Services */}
          <ServicesDropdown
            servicesInterested={servicesInterested}
            formData={formData}
            toggleService={toggleService}
            errors={errors}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            showCustomInput={showCustomInput}
            setShowCustomInput={setShowCustomInput}
            handleChange={handleChange}
            addCustomService={addCustomService}
          />

          {/* Message */}
          <div className="group">
            <label className="block text-sm font-bold text-amber-900 mb-1">Project/Requirement Details (Optional)</label>
            <div className="relative">
              <div className="absolute left-3 top-4 bg-amber-100 p-1.5 rounded-full">
                <MessageSquare className="h-4 w-4 text-amber-600" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="pl-12 w-full border border-amber-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition duration-200 shadow-sm hover:shadow-md"
                placeholder="E.g., We require ISO 9001 certification for our manufacturing plant in Q3 2025. Tell us about your organization, size, and specific needs."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                </div>
              ) : (
                <span className="flex items-center text-lg">
                  <Send className="mr-2 h-5 w-5" /> Submit Inquiry
                </span>
              )}
            </button>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-5 rounded-xl text-center font-medium shadow-md flex items-center justify-center transition-all ${submitStatus.success ? "bg-amber-100 border border-orange-400 text-amber-800" : "bg-red-100 border border-red-400 text-red-800"}`}
            >
              {submitStatus.success ? <CheckCircle className="h-5 w-5 mr-3" /> : <AlertTriangle className="h-5 w-5 mr-3" />}
              {submitStatus.message}
            </motion.div>
          )}
        </form>

        {/* Confetti */}
        {submitStatus?.success && <ConfettiEffect />}
      </div>
    </main>
  );
}
