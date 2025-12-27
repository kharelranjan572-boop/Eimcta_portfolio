import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";
import logo from "../../img/eimcta.png";
import axios from "axios";

const ModalPage = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => setShowModal(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    highlightsTopics: "",
    images: [],
    highlightsList: ["", "", ""],
    offerTitle: "",
    offerDescription: "",
    offerDate: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      const data = response.data.data[0];

      setFormData({
        id: data._id,
        title: data.title,
        description: data.description,
        highlightsTopics: data.highlightsTopics,
        images: data.images?.map((img) => img) || [],
        highlightsList: data.highlightsList?.map((list) => list) || ["", "", ""],
        offerTitle: data.offerTitle,
        offerDescription: data.offerDescription,
        offerDate: data.offerDate,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="h-0 bg-orange-200 flex items-center justify-center">
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[95vh] md:h-[80vh] bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col border border-amber-200"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-[60] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/30"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="shrink-0 bg-gradient-to-r from-amber-700 to-amber-500 p-4 md:p-6 flex justify-between items-start text-white border-b border-amber-600">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12   sm:w-16 sm:h-16   md:w-20 md:h-20   lg:w-24 lg:h-24   bg-white rounded-full flex items-center justify-center  border-2 border-amber-200 shadow-lg shrink-0 overflow-hidden
">
                    <img
                      src={logo}
                      alt="EIMCTA Logo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-black leading-none tracking-tight">EIMCTA</h3>
                    <p className="text-[8px] md:text-[10px] tracking-[0.2em] font-bold opacity-90 mt-1 uppercase italic">
                      For sustainable improvement
                    </p>
                  </div>
                </div>
                <div className="text-right hidden sm:flex flex-col items-end">
                  <div className="bg-white/20 p-2 rounded border border-white/30 backdrop-blur-sm">
                    <p className="text-[10px] font-black leading-none">ISO 9001:2015</p>
                    <p className="text-[8px] font-bold uppercase tracking-tighter opacity-80">Certified Standard</p>
                  </div>
                  <span className="text-[9px] mt-2 font-bold opacity-60 uppercase">Reg No: 44100 12345</span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto bg-slate-50 p-4 md:p-8 space-y-8 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                {/* Executive Summary */}
                <div className="border-l-4 border-amber-500 pl-4 md:pl-6">
                  <h4 className="text-amber-600 font-black text-xs uppercase tracking-[0.2em] mb-2">Executive Summary</h4>
                  <p className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 uppercase">{formData.title}</p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-amber-100">
                  {formData.highlightsList.map((highlight, idx) => (
                    <div
                      key={idx}
                      className={`text-center px-4 py-3 ${idx < formData.highlightsList.length - 1 ? "sm:border-r border-amber-100" : ""
                        } bg-amber-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
                      style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}
                    >
                      <h5 className="font-extrabold text-amber-600 text-[12px] uppercase mb-2 tracking-wider">
                        {formData.highlightsTopics || `Highlight ${idx + 1}`}
                      </h5>
                      <p className="text-[12px] text-gray-600 font-semibold leading-snug">
                        {highlight || "No content available"}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Image Gallery */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visual Portfolio</p>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                    {formData.images.length > 0 ? (
                      formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          className=""
                        >
                          <img
                            src={img}
                            alt="campaign"
                            className="w-full h-full object-cover"
                          />
                        </div>



                      ))
                    ) : (
                      <div className="w-full h-40 bg-white border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-amber-400 gap-2">
                        <Globe className="opacity-20 w-10 h-10" />
                        <span className="text-xs italic font-medium">Awaiting Campaign Media Assets...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-amber-50/50 p-6 md:p-8 rounded-sm border border-amber-100 relative">
                  <span className="absolute top-2 left-4 text-6xl text-amber-200 font-serif opacity-30">“</span>
                  <p className="text-base md:text-lg text-gray-700 italic font-medium leading-relaxed relative z-10 px-4 text-justify">
                    {formData.description}
                  </p>
                  <p className="text-right text-[10px] font-black text-amber-600 uppercase mt-4 tracking-widest">— EIMCTA Market Strategy Division</p>
                </div>

                {/* Promotional Offer */}
                {formData.offerTitle && (
                  <div className="bg-gray-900 text-white p-5 flex flex-col sm:flex-row justify-between items-center rounded-sm border-l-4 border-amber-500 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Active Program</p>
                      <h5 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">{formData.offerTitle}</h5>
                      <p className="text-sm italic mt-1">{formData.offerDescription}</p>
                    </div>
                    <div className="text-center sm:text-right sm:border-l border-gray-700 sm:pl-6 w-full sm:w-auto">
                      <p className="text-[9px] uppercase opacity-60">Valid Until</p>
                      <p className="font-bold text-lg text-amber-400">{formData.offerDate || "UPON REQUEST"}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="shrink-0 bg-white border-t border-amber-100 p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] md:text-[11px] font-bold text-gray-500">
                  <div className="space-y-1 text-center md:text-left">
                    <p className="text-amber-600 font-black uppercase text-[9px] tracking-widest">Location</p>
                    <p>Bouddha, Kathmandu, Nepal | https://everestconsultrain.com</p>
                  </div>
                  <div className="space-y-1 text-center md:text-right">
                    <p className="text-amber-600 font-black uppercase text-[9px] tracking-widest">Inquiry Support</p>
                    <p>Contact us: +977 1 5903211 | 974-1766637</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-[9px] text-gray-300 uppercase font-black">© 2025 EIMCTA. All International Rights Reserved.</p>
                  <div className="flex gap-4">
                    <span className="w-4 h-4 bg-gray-100 rounded-full"></span>
                    <span className="w-4 h-4 bg-gray-100 rounded-full"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModalPage;
