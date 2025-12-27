import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom"; 
import logo from '../../img/eimcta.png';

const Footer = () => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const isVideoInView = useInView(videoRef, { margin: "-10%" });
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (isVideoInView) setPlayVideo(true);
  }, [isVideoInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const slideFromLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const slideFromRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  const phoneNumbers = ["+977-01-5903211", "+977 9741 766 637", "+977 9862 731 591"];
  const emails = ["info@everestconsultrain.com", "eimcta.md@gmail.com", "iso.kathmandu@gmail.com"];
  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/eimctanepal", color: "hover:bg-blue-600" },
    { icon: Youtube, url: "https://www.youtube.com/watch?v=pqaihirDdBU", color: "hover:bg-red-600" },
    { icon: Instagram, url: "https://www.instagram.com/everest_consultrain/", color: "hover:bg-pink-600" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/everest-international-management-consultancy-training-agency-pvt-ltd/?originalSubdomain=np", color: "hover:bg-blue-700" },
  ];

  const faqs = [
    { question: "What is EIMCTA?", link: "/Blog-Offers/FAQ" },
    { question: "What does EIMCTA do?", link: "/Blog-Offers/FAQ" },
    { question: "What is ISO certification?", link: "/Blog-Offers/FAQ" },
  ];

  const ytVideoId = "pqaihirDdBU";
  const ytThumbnail = `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`;

  return (
    <footer
      ref={ref}
      className="relative text-amber-900 bg-gradient-to-b from-amber-100 to-amber-100 font-['Arial_Narrow'] font-bold overflow-hidden"
    >
      {/* Decorative Bars */}
      <div className="absolute top-0 left-0 w-full h-4 bg-amber-300 opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-600 opacity-30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-14 md:py-16">
        <motion.div
          className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ================= LOGO + INFO ================= */}
          <motion.div
            variants={slideFromLeft}
            className="space-y-6 px-6 py-8 bg-amber-50 rounded-2xl shadow-sm md:bg-transparent md:shadow-none md:p-0"
          >
            <div className="flex flex-col items-center md:items-start space-y-3">
              <motion.div
                className="text-3xl font-bold tracking-widest text-amber-800 drop-shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img
                  src={logo}
                  alt="EIMCTA Logo"
                  className="w-32 md:w-48 h-auto object-contain"
                />
              </motion.div>

              <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0 text-amber-800">
                Everest International Management Consultancy Training & Agency Pvt. Ltd.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={22} />
                <div>
                  <p className="text-sm">Location</p>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock size={18} />
                <div>
                  <p className="text-sm">Working Hours</p>
                  <p>Sun–Fri: 9AM – 5PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= CONTACT ================= */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 px-6 py-8 bg-amber-50 rounded-2xl shadow-sm md:bg-transparent md:shadow-none md:p-0"
          >
            <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
              <Phone size={18} /> Phone Numbers
            </h3>

            <ul className="space-y-3">
              {phoneNumbers.map((number, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="flex justify-center md:justify-start text-sm"
                >
                  <a href={`tel:${number}`} className="hover:text-amber-700">
                    {number}
                  </a>
                </motion.li>
              ))}
            </ul>

            <hr className="md:hidden border-amber-300 opacity-40" />

            <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} /> Email
            </h3>

            <ul className="space-y-3">
              {emails.map((email, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="flex justify-center md:justify-start items-start text-sm"
                >
                  <a href={`mailto:${email}`} className="hover:text-amber-700 break-all">
                    {email}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ================= FAQ ================= */}
          <motion.div
            variants={slideFromRight}
            className="space-y-6 px-6 py-8 bg-amber-50 rounded-2xl shadow-sm md:bg-transparent md:shadow-none md:p-0"
          >
            <h3 className="text-lg font-semibold">FAQs</h3>

            <ul className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl border border-amber-300 px-4 py-3 bg-amber-100 hover:bg-amber-200 transition"
                >
                  <Link
                    to={faq.link}
                    className="flex items-center justify-between text-sm font-semibold"
                  >
                    {faq.question}
                    <ChevronRight size={16} />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ================= VIDEO + SOCIAL ================= */}
          <motion.div
            variants={slideFromRight}
            className="space-y-8 px-6 py-8 bg-amber-50 rounded-2xl shadow-sm md:bg-transparent md:shadow-none md:p-0"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
                <Youtube size={18} /> Our Videos
              </h3>

              <motion.div
                ref={videoRef}
                className="relative h-48 w-full max-w-full mx-auto overflow-hidden rounded-2xl border-2 border-amber-700 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {playVideo ? (
                  <iframe
                  key="1"
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={ytThumbnail}
                      alt="YouTube Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex justify-center md:justify-start gap-5">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-amber-300 shadow-md"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
