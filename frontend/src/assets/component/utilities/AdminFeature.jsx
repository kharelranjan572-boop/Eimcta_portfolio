import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminFeature = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    highlightsTopics: "",
    images: [],
    highlightsList: ["", "", ""],
    offerTitle: "",
    offerDescription: "",
    offerDate: "",
  });

  // Helper to format date for input field (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const get = async () => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        const data = response.data.data[0];
        if (data) {
          setFormData({
            id: data._id,
            title: data.title || "",
            description: data.description || "",
            highlightsTopics: data.highlightsTopics || "",
            images: data.images || [],
            highlightsList: data.highlightsList || ["", "", ""],
            offerTitle: data.offerTitle || "",
            offerDescription: data.offerDescription || "", // Fixed typo from DataTransfer
            offerDate: formatDate(data.offerDate), // Format for HTML input
          });
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  useEffect(() => {
    get();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _id = formData.id;

    // Title validation
    const wordCount = formData.title.trim().split(/\s+/).filter((w) => w !== "").length;
    if (wordCount !== 8) {
      alert(`Title must be exactly 8 words! (Current: ${wordCount})`);
      return;
    }
console.log('before update axios',formData)
    try {
      // If you are uploading actual files, you might need FormData. 
      // If the backend accepts JSON (URLs/base64), this works:
      const response = await axios.put(`http://localhost:5000/${_id}`, formData,{headers: { "Content-Type": "multipart/form-data" }});
      if (response.status === 201 || response.status === 200) {
        alert("Campaign Updated Successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while submitting the campaign.");
    }
  };

  const handleInputChange = (e, index = null, type = null) => {
    const { name, value } = e.target;
    if (type === "highlightsList" && index !== null) {
      const newList = [...formData.highlightsList];
      newList[index] = value;
      setFormData({ ...formData, highlightsList: newList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) return;
    
    // For local preview purposes:
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, images: [reader.result] });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 text-amber-600 font-bold hover:bg-amber-100 transition-all border border-amber-200 shadow-sm"
        >
          <span className="text-xl">←</span> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="space-y-8 shadow-md p-5 rounded-md">
          <div>
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter bg-gradient-to-r from-amber-400 via-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent pb-2">
              Advertisement Details
            </h1>
            <p className="text-gray-400 font-medium">Configure your marketing campaign parameters below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" enctype="multipart/form-data">
            <div className="space-y-4">
              <div className="group">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 group-focus-within:text-orange-500 transition">Campaign Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-4 bg-gray-50 border-b-2 border-gray-100 focus:border-orange-500 outline-none transition text-lg"
                  placeholder="Enter exactly 8 catchy words..."
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Main Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                  placeholder="Tell your customers more about this offer..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Highlights Heading & List</label>
                <input
                  type="text"
                  name="highlightsTopics"
                  value={formData.highlightsTopics}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                  placeholder="e.g. Why Choose Us?"
                />
                
                {formData.highlightsList.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="font-semibold">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleInputChange(e, idx, "highlightsList")}
                      className="flex-1 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                      placeholder={`Point ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-widest">Pricing & Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="offerTitle"
                    placeholder="Offer (e.g. 40% Discount)"
                    value={formData.offerTitle}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-white shadow-inner outline-none"
                  />
                  <input
                    type="date"
                    name="offerDate"
                    value={formData.offerDate}
                    onChange={handleInputChange}
                    className="p-3 rounded-lg border border-white shadow-inner outline-none text-gray-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition group"
              >
                <span className=" text-2xl flex align-middle text-center lg:mx-[15rem] md:mx-[21rem] sm:mx-[9rem] mx-[7rem] group-hover:scale-125 transition">📸</span>
                Add Campaign Image <span className="text-bold text-pink-700">(Best Practice: 5001x1501 Resolution)</span>
                <input type="file" hidden name="images" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-5 hover:bg-orange-900 transition-colors text-white font-black rounded-2xl shadow-2xl bg-orange-600 transform active:scale-95 uppercase tracking-widest"
            >
              Update Campaign
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="relative">
          <div className="sticky top-5">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Corporate Asset Preview</h2>
            <div
              style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}
              className="bg-white border-[1px] border-amber-200 shadow-2xl rounded-sm overflow-hidden flex flex-col min-h-[750px]"
            >
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 flex justify-between items-start text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-amber-200 shadow-lg">
                    <span className="text-amber-600 font-black text-3xl tracking-tighter">EI</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black leading-none tracking-tight">EIMCTA</h3>
                    <p className="text-[10px] tracking-[0.3em] font-bold opacity-90 mt-1">GLOBAL INDUSTRIAL ALLIANCE</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="bg-white/20 p-2 rounded border border-white/30 backdrop-blur-sm">
                    <p className="text-[10px] font-black leading-none">ISO 9001:2015</p>
                    <p className="text-[8px] font-bold uppercase tracking-tighter opacity-80">Certified Standard</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="text-amber-600 font-black text-xs uppercase tracking-[0.2em] mb-2">Executive Summary</h4>
                  <p className="text-3xl font-bold leading-tight text-gray-900 uppercase">
                    {formData.title || "PRECISION ENGINEERING MEETS GLOBAL STANDARDS AT EIMCTA TODAY"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-amber-100">
                  {formData.highlightsList.map((highlight, idx) => (
                    <div key={idx} className={`text-center ${idx < formData.highlightsList.length - 1 ? "sm:border-r border-amber-100" : ""} px-2`}>
                      <h5 className="font-black text-amber-600 text-[11px] uppercase mb-1">{formData.highlightsTopics || `Highlight ${idx + 1}`}</h5>
                      <p className="text-[10px] text-gray-500 font-bold">{highlight || "TBD"}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visual Portfolio</p>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {formData.images.length > 0 ? (
                      formData.images.map((img, idx) => (
                        <div key={idx} className="relative min-w-[180px] h-40 rounded-sm overflow-hidden border border-amber-200 shadow-md">
                          <img src={img} className="w-full h-full object-cover" alt="campaign" />
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-40 bg-gray-50 border-2 border-dashed border-amber-100 flex items-center justify-center text-amber-300 text-xs italic">
                        Awaiting Media Assets...
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded border border-amber-100">
                  <p className="text-sm text-gray-700 italic font-bold leading-relaxed">
                    {formData.description || "Our strategy leverages the ISO-certified EIMCTA framework..."}
                  </p>
                </div>

                {formData.offerTitle && (
                  <div className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-sm border-l-4 border-amber-500">
                    <div>
                      <p className="text-[10px] font-bold text-amber-400 uppercase">Active Program</p>
                      <h5 className="text-xl font-black italic uppercase tracking-tighter">{formData.offerTitle}</h5>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-amber-400">{formData.offerDate || "UPON REQUEST"}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border-t border-amber-100 p-8">
                <div className="grid grid-cols-2 gap-8 text-[11px] font-bold text-gray-500">
                  <div>
                    <p className="text-amber-600 font-black uppercase text-[9px]">Global Headquarters</p>
                    <p>123 INDUSTRIAL WAY, TECH PARK</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-600 font-black uppercase text-[9px]">Inquiry Support</p>
                    <p>TOLL FREE: +1 (800) EIMCTA-ISO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeature;