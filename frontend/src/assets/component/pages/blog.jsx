import React, { useState, useMemo, useEffect } from "react";
import { Facebook, Instagram, Youtube, Linkedin, ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { getFbUserPages } from "../utilities/SocialMedia/AllApi";
import { UploadForm } from "../utilities/upload";
import { motion, AnimatePresence } from "framer-motion";

const dummyFetch = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [];
};

const platformButtons = [
  {
    name: "Facebook",
    key: "fb",
    color: "from-blue-600 to-blue-800",
    hoverColor: "hover:from-blue-700 hover:to-blue-900",
    icon: <Facebook className="w-5 h-5" />,
    hasApi: true,
    password: "eimcta@3Md.kumar"
  },
  {
    name: "Instagram",
    key: "insta",
    color: "from-fuchsia-600 to-pink-600",
    hoverColor: "hover:from-fuchsia-700 hover:to-pink-700",
    icon: <Instagram className="w-5 h-5" />,
    hasApi: false,
    disabledMessage: "Instagram API not available - requires Meta Business Verification",
    password: "eimcta@3Md.kumar"
  },
  {
    name: "YouTube",
    key: "yt",
    color: "from-red-600 to-red-800",
    hoverColor: "hover:from-red-700 hover:to-red-900",
    icon: <Youtube className="w-5 h-5" />,
    hasApi: false,
    disabledMessage: "YouTube API coming in Q4 2023",
    password: "eimcta@3Md.kumar"
  },
  {
    name: "LinkedIn",
    key: "linkedin",
    color: "from-sky-800 to-sky-950",
    hoverColor: "hover:from-sky-900 hover:to-sky-950",
    icon: <Linkedin className="w-5 h-5" />,
    hasApi: false,
    disabledMessage: "LinkedIn API requires partner status",
    password: "eimcta@3Md.kumar"
  },
];

const platformApiMap = {
  fb: getFbUserPages,
  yt: dummyFetch,
  linkedin: dummyFetch,
};

export default function Blog() {
  const [activePlatform, setActivePlatform] = useState(null);
  const [pagesByPlatform, setPagesByPlatform] = useState({ fb: [], yt: [], linkedin: [] });
  const [selectedPageByPlatform, setSelectedPageByPlatform] = useState({ fb: null, yt: null, linkedin: null });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authenticatedPlatforms, setAuthenticatedPlatforms] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const selectedPage = useMemo(() => {
    return activePlatform ? selectedPageByPlatform[activePlatform] : null;
  }, [activePlatform, selectedPageByPlatform]);

  useEffect(() => {
    const fetchPagesForAuthenticatedPlatform = async () => {
      if (activePlatform && isPlatformAuthenticated(activePlatform) && platformApiMap[activePlatform]) {
        try {
          setLoading(true);
          const pages = await platformApiMap[activePlatform]();
          setPagesByPlatform((prev) => ({
            ...prev,
            [activePlatform]: pages,
          }));
        } catch (error) {
          const errorMsg = error?.response?.data?.error?.message || error.message || "Unknown error";
          console.error(`Error fetching ${activePlatform} pages:`, errorMsg);
          setApiError(`Error fetching ${activePlatform} pages: ${errorMsg}`);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPagesForAuthenticatedPlatform();
  }, [authenticatedPlatforms, activePlatform]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const platform = platformButtons.find(btn => btn.key === activePlatform);
    
    if (passwordInput === platform.password) {
      setAuthenticatedPlatforms(prev => [...prev, activePlatform]);
      setShowPasswordModal(false);
      setPasswordError("");
      setPasswordInput("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handlePlatformClick = async (platformKey) => {
    const platform = platformButtons.find(btn => btn.key === platformKey);
    setActivePlatform(platformKey);
    setApiError("");

    if (!platform?.hasApi) {
      setApiError(platform?.disabledMessage || `No API integration available for ${platform?.name}`);
      return;
    }

    if (!isPlatformAuthenticated(platformKey)) {
      setShowPasswordModal(true);
      return;
    }
  };

  const handlePageSelect = (platformKey, pageId) => {
    const selectedPage = pagesByPlatform[platformKey].find((p) => p.id === pageId);
    setSelectedPageByPlatform((prev) => ({
      ...prev,
      [platformKey]: selectedPage,
    }));
  };

  const isPlatformAuthenticated = (platformKey) => {
    return authenticatedPlatforms.includes(platformKey);
  };

  const renderPlatformContent = () => {
    if (!activePlatform) {
      return (
        <div className="text-center mt-20">
          <ChevronRight className="w-12 h-12 mx-auto animate-pulse text-purple-400/50" />
          <p className="text-gray-400 mt-4">Select a platform to begin publishing your content</p>
        </div>
      );
    }

    const platform = platformButtons.find(btn => btn.key === activePlatform);

    if (!platform?.hasApi) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-pink-900/80 to-red-800/80 border-l-4 border-pink-400 text-pink-100 p-8 rounded-lg shadow-lg mb-6 backdrop-blur-md"
        >
          <p className="font-bold text-xl mb-2 flex items-center">
            <span className="bg-pink-700/50 p-2 rounded-lg mr-3">{platform?.icon}</span>
            API Not Integrated
          </p>
          <p className="opacity-90">{platform?.disabledMessage}</p>
        </motion.div>
      );
    }

    if (!isPlatformAuthenticated(activePlatform)) {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-md"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">{platform.icon}</span>
            <span>Authentication Required</span>
          </h3>
          <p className="text-gray-300">Please enter the password to access {platform.name} features.</p>
        </motion.div>
      );
    }

    if (loading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-center p-12 bg-gray-800/80 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-md"
        >
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin w-12 h-12 text-blue-400 mb-4" />
            <p className="text-gray-300">Loading {platform?.name} pages...</p>
          </div>
        </motion.div>
      );
    }

    const pages = pagesByPlatform[activePlatform];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 overflow-y-hidden"
        >
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">{platform.icon}</span>
              <span>Select {platform.name} Destination</span>
            </h3>

            {pages.length > 0 ? (
              <select
                onChange={(e) => handlePageSelect(activePlatform, e.target.value)}
                className="w-full bg-gray-700/80 border border-gray-600/50 text-white px-4 py-3 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                value={selectedPage?.id || ""}
              >
                <option value="">-- Select {platform.name} Page --</option>
                {pages.map((page) => (
                  <option key={page.id} value={page.id} className="bg-gray-800/80">
                    {page.name} {page.username && `(${page.username})`}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-gray-400 py-4">
                No pages available. Please check your API connection.
              </div>
            )}
          </div>

          {selectedPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Create Post for {selectedPage.name}
              </h3>
              <UploadForm selectedPage={selectedPage} platform={activePlatform} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-black to-blue-950 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-[-300px] left-[-200px] w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.2),_transparent)] rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.15),_transparent)] rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Social Media Publisher
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Premium content publishing across all your social platforms
          </p>
        </header>

        {apiError && (
          <div className="mb-8 bg-gradient-to-r from-red-900/80 to-pink-800/80 border-l-4 border-red-400 text-red-100 p-6 rounded-lg shadow-lg animate-pulse backdrop-blur-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="font-semibold">{apiError}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {platformButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => handlePlatformClick(btn.key)}
              className={`relative bg-gradient-to-br ${btn.color} ${btn.hoverColor} text-white px-4 py-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${activePlatform === btn.key ? "ring-4 ring-purple-500/70 scale-105 z-10" : ""} ${!btn.hasApi ? "opacity-80 cursor-not-allowed grayscale-[30%]" : ""}`}
              disabled={!btn.hasApi}
              title={!btn.hasApi ? btn.disabledMessage : ""}
            >
              <div className="flex flex-col items-center">
                <div className="mb-3 p-3 bg-black/20 rounded-full">
                  {btn.icon}
                </div>
                <span className="font-bold">{btn.name}</span>
                {!btn.hasApi && (
                  <span className="text-xs mt-2 opacity-70 text-center">
                    Coming Soon
                  </span>
                )}
                {btn.hasApi && isPlatformAuthenticated(btn.key) && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-12">
          {renderPlatformContent()}
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                  {platformButtons.find(btn => btn.key === activePlatform)?.icon}
                </span>
                Enter Password
              </h3>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-300 mb-2">
                    Password for {platformButtons.find(btn => btn.key === activePlatform)?.name}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full bg-gray-700/80 border border-gray-600/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                      placeholder="Enter platform password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-red-400 text-sm">{passwordError}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError("");
                      setPasswordInput("");
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}