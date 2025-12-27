import React, { useEffect, useState } from "react";
import { getPagePosts, getFbUserPages } from "../utilities/SocialMedia/AllApi.js";
import { AlertTriangle, Loader, Plus, Filter, Calendar, ExternalLink, Heart, Eye, MessageSquare, X } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Parallax } from "react-parallax";
import Modal from 'react-modal';

// Set modal app element
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const platformOptions = [
  { key: "fb", label: "Facebook", icon: <FaFacebookF className="text-blue-600" />, color: "bg-blue-50", border: "border-blue-200" },
  { key: "yt", label: "YouTube", icon: <FaYoutube className="text-red-600" />, color: "bg-red-50", border: "border-red-200" },
  { key: "insta", label: "Instagram", icon: <FaInstagram className="text-pink-500" />, color: "bg-pink-50", border: "border-pink-200" },
  { key: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn className="text-blue-500" />, color: "bg-blue-50", border: "border-blue-200" },
  { key: "tiktok", label: "TikTok", icon: <FaTiktok className="text-black" />, color: "bg-gray-50", border: "border-gray-200" },
];

const ContentBoosting = () => {
  const [postsByDate, setPostsByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(platformOptions.map((p) => p.key));
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  const formatDate = (isoString) => {
    if (!isoString) return "Unknown";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getShortDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: 'short',
      day: 'numeric'
    });
  };

  const openAnalyticsModal = (post) => {
    setSelectedPost(post);
    setIsAnalyticsModalOpen(true);
  };

  const closeAnalyticsModal = () => {
    setIsAnalyticsModalOpen(false);
    setSelectedPost(null);
  };

  const togglePlatform = (key) => {
    setSelectedPlatforms((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const fetchFacebookPosts = async () => {
      try {
        setLoading(true);
        const pages = await getFbUserPages();
        const selectedPage = pages[1];
        const pagePosts = await getPagePosts(selectedPage.id, selectedPage.access_token);

        const grouped = {};
        pagePosts.forEach((post) => {
          const date = formatDate(post.created_time);
          if (!grouped[date]) grouped[date] = [];

          const likes = post.likes?.summary?.total_count || 0;
          const comments = post.comments?.summary?.total_count || 0;
          const shares = post.shares?.count || 0;
          const views = post.views || 0;
          const engagement = likes + comments + shares;

          grouped[date].push({
            ...post,
            pageName: selectedPage.name,
            platform: "fb",
            shortDate: getShortDate(post.created_time),
            externalUrl: `https://facebook.com/${post.id.split('_')[0]}/posts/${post.id.split('_')[1]}`,
            metrics: {
              likes,
              comments,
              shares,
              views,
              engagement,
              engagementRate: views > 0 ? ((engagement / views) * 100).toFixed(2) : 0
            }
          });
        });

        setPostsByDate(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchFacebookPosts();
  }, []);
  // console.log("Object.entires", Object.entries(postsByDate)) filter based on same date
  const filteredPosts = Object.entries(postsByDate).reduce((acc, [date, posts]) => {
    const filtered = posts.filter((post) => {
      const platformMatch = selectedPlatforms.includes(post.platform);
      const searchMatch = post.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.pageName.toLowerCase().includes(searchQuery.toLowerCase());
      const dateMatch = dateRange.start && dateRange.end
        ? new Date(post.created_time) >= new Date(dateRange.start) &&
        new Date(post.created_time) <= new Date(dateRange.end)
        : true;
      return platformMatch && searchMatch && dateMatch;
    });

    if (filtered.length > 0) {
      acc[date] = filtered;
    }

    return acc;
  }, {});

  const renderPostCard = (post, idx) => (
    <motion.div
      key={post.id || idx}
      whileHover={{ x: 5 }}
      className="mb-6 pb-6 border-b border-gray-700 last:border-0 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-700 rounded-lg">
            {platformOptions.find(p => p.key === post.platform)?.icon}
          </div>
          <span className="text-sm font-medium text-gray-400">{post.pageName}</span>
        </div>
        <span className="text-xs text-gray-500">{post.shortDate}</span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">
        {post.message || <span className="italic text-gray-500">No message content</span>}
      </p>

      {post.full_picture && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-lg overflow-hidden mb-4 border border-gray-700"
        >
          <img
            src={post.full_picture}
            alt="Post content"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      )}

      <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-gray-700/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => openAnalyticsModal(post)}
              className="flex items-center gap-1 text-gray-300 hover:text-green-400 transition-colors"
              aria-label="View likes"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.metrics.likes.toLocaleString()}</span>
            </button>

            <button
              onClick={() => openAnalyticsModal(post)}
              className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors"
              aria-label="View views"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">{post.metrics.views ? post.metrics.views.toLocaleString() : 'N/A'}</span>
            </button>

            <button
              onClick={() => openAnalyticsModal(post)}
              className="flex items-center gap-1 text-gray-300 hover:text-purple-400 transition-colors"
              aria-label="View comments"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">{post.metrics.comments.toLocaleString()}</span>
            </button>
          </div>

          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-400 hover:text-green-300 font-medium text-sm"
            aria-label="View original post"
          >
            <span>View Original</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {post.metrics.views > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(post.metrics.engagementRate, 100)}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  const AnalyticsModal = () => (
    <Modal
      isOpen={isAnalyticsModalOpen}
      onRequestClose={closeAnalyticsModal}
      contentLabel="Post Analytics"
      className="modal-content bg-gray-800 border border-gray-700 rounded-xl max-w-2xl mx-auto mt-20 p-0 outline-none"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex justify-center items-start"
    >
      {selectedPost && (
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Post Performance</h3>
            <button
              onClick={closeAnalyticsModal}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="text-green-400 font-bold text-2xl">
                {selectedPost.metrics.likes.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Likes</div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="text-blue-400 font-bold text-2xl">
                {selectedPost.metrics.views ? selectedPost.metrics.views.toLocaleString() : 'N/A'}
              </div>
              <div className="text-gray-400 text-sm">Views</div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="text-purple-400 font-bold text-2xl">
                {selectedPost.metrics.comments.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Comments</div>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="text-yellow-400 font-bold text-2xl">
                {selectedPost.metrics.shares.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">Shares</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3">Engagement Rate</h4>
            <div className="flex items-center gap-4">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                  style={{ width: `${Math.min(selectedPost.metrics.engagementRate, 100)}%` }}
                />
              </div>
              <span className="text-white font-medium">
                {selectedPost.metrics.engagementRate}%
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {selectedPost.metrics.engagement.toLocaleString()} engagements / {selectedPost.metrics.views ? selectedPost.metrics.views.toLocaleString() : 'N/A'} views
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={closeAnalyticsModal}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-gray-900"
      >
        <div className="flex flex-col items-center">
          <Loader className="animate-spin w-8 h-8 text-green-400 mb-2" />
          <motion.span
            className="text-green-400 font-medium text-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Loading your social content...
          </motion.span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center items-center h-screen text-red-400 bg-gray-900"
      >
        <div className="flex items-center bg-red-900/30 p-6 rounded-lg border border-red-700/50 backdrop-blur-sm">
          <AlertTriangle className="w-8 h-8" />
          <span className="ml-3 font-semibold text-xl">{error}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Parallax
        bgImage="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        strength={500}
        className="relative"
      >
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        <div className="relative z-10 py-32 px-4 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              SOCIAL COMMAND CENTER
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Your mission control for cross-platform content strategy and analytics
          </motion.p>
        </div>
      </Parallax>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                CONTENT ARCHIVE
              </span>
            </h2>
            <p className="text-gray-400 mt-2 text-lg">
              {Object.values(filteredPosts).flat().length} posts deployed
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white placeholder-gray-500"
                aria-label="Search posts"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <button
              onClick={toggleFilters}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all ${showFilters ? 'bg-green-600 text-white' : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'} font-medium`}
              aria-label="Toggle filters"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <Link to="/Blog-Offers/FB-Titktok-Linkedin-youtube" className="flex-shrink-0">
              <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-all font-medium shadow-lg shadow-green-500/20">
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 backdrop-blur-sm bg-opacity-80">
                <h3 className="font-medium text-xl text-white mb-5">FILTER PARAMETERS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                      Platforms
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {platformOptions.map(({ key, label, icon, color, border }) => (
                        <motion.button
                          key={key}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => togglePlatform(key)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${color} ${border} ${selectedPlatforms.includes(key) ? 'ring-2 ring-green-500 shadow-lg' : 'opacity-90 hover:opacity-100'}`}
                          aria-label={`Toggle ${label} platform`}
                        >
                          <div className="text-xl">{icon}</div>
                          <span className="text-sm font-medium text-gray-800">{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                      Date Range
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-grow">
                        <input
                          type="date"
                          value={dateRange.start || ''}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
                          aria-label="Start date"
                        />
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                      <span className="flex items-center text-gray-500">to</span>
                      <div className="relative flex-grow">
                        <input
                          type="date"
                          value={dateRange.end || ''}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
                          aria-label="End date"
                        />
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSelectedPlatforms(platformOptions.map(p => p.key));
                        setSearchQuery("");
                        setDateRange({ start: null, end: null });
                      }}
                      className="px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all border border-gray-600"
                      aria-label="Reset all filters"
                    >
                      Reset all filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {Object.entries(filteredPosts).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(filteredPosts).map(([date, posts], index) => (
              <motion.div
                key={`${date}-${index}`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br rounded-2xl transition-all duration-300 ${hoveredCard === index ? 'from-green-500/10 to-blue-500/10 opacity-100' : 'opacity-0'}`}
                  style={{
                    transform: hoveredCard === index ?
                      'perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02)' :
                      'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
                  }}
                />

                <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-400/30 transition-all h-full flex flex-col">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-xl text-white">{date}</h3>
                      <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-400/20">
                        {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                      </span>
                    </div>
                    <div className="mt-2 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-1/3"></div>
                  </div>

                  <div className="p-5 flex-grow overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                    {posts.map((post, idx) => renderPostCard(post, idx))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700 backdrop-blur-sm"
          >
            <div className="text-gray-400 mb-5 text-lg">No content matches your mission parameters</div>
            <button
              onClick={() => {
                setSelectedPlatforms(platformOptions.map(p => p.key));
                setSearchQuery("");
                setDateRange({ start: null, end: null });
              }}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 mx-auto shadow-lg"
              aria-label="Reset all filters"
            >
              <Filter className="w-5 h-5" />
              <span>Reset all filters</span>
            </button>
          </motion.div>
        )}
      </div>

      <AnalyticsModal />
    </div>
  );
};

export default ContentBoosting;