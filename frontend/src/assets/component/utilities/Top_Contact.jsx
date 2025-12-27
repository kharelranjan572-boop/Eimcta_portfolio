import { Link } from "react-router-dom";
import { FileText, Mail, Phone, WindIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import React from "react";

import logo from "../../img/eimcta.png";

/* ----------------------------------
   THEMED CONTACT ITEM
---------------------------------- */
const ThemedContactItem = ({
  icon,
  title,
  subtitle,
  href,
  to,
  onClick,
  isBlinking = false,
  hideIconOnMobile = false,
  isInput = false,
  className = "",
}) => {
  // 🔹 INPUT MODE (for Phone)
  if (isInput) {
    return (
      <div className={`flex items-center rounded-lg p-2 ${className}`}>
        <div
          className={`text-stone-700 mr-3 ${hideIconOnMobile ? "hidden md:block" : ""
            }`}
        >
          {icon}
        </div>

        <div className="font-sans text-left">
          <p className="font-bold text-lg text-stone-800">{title}</p>

          <input
            type="text"
            value={subtitle}
            readOnly
            className="text-md text-stone-600 bg-transparent border-none outline-none cursor-text select-all"
          />
        </div>
      </div>
    );
  }

  // 🔹 NORMAL CLICK / LINK MODE
  const LinkComponent = to ? Link : "a";
  const linkProps = to ? { to } : { href };

  return (
    <div onClick={onClick}>
      <LinkComponent
        {...linkProps}
        className={`flex items-center rounded-lg cursor-pointer group p-2 ${className}`}
      >
        <div
          className={`text-stone-700 mr-3 transition-transform group-hover:scale-110
          ${hideIconOnMobile ? "hidden md:block" : ""}`}
        >
          {icon}
        </div>

        <div className="font-sans text-left">
          <p
            className={`font-bold text-lg transition-colors 
            ${isBlinking
                ? "animate-pulse text-red-600"
                : "text-stone-800 group-hover:text-red-700"
              }`}
          >
            {title}
          </p>
          <p className="text-md text-stone-500">{subtitle}</p>
        </div>
      </LinkComponent>
    </div>
  );
};

/* ----------------------------------
   ANIMATED CONTACT ITEM
---------------------------------- */
const AnimatedContactItem = ({
  icon,
  title,
  subtitle,
  href,
  to,
  onClick,
  isBlinking = false,
  hideIconOnMobile = false,
  isInput = false,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ThemedContactItem
        icon={icon}
        title={title}
        subtitle={subtitle}
        href={href}
        to={to}
        onClick={onClick}
        isBlinking={isBlinking}
        hideIconOnMobile={hideIconOnMobile}
        isInput={isInput}
      />
    </motion.div>
  );
};

/* ----------------------------------
   TOP CONTACT BAR
---------------------------------- */
const TopContactBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // 🔽 SCROLL TO BOTTOM FUNCTION
  const scrollToBottom = () => {
    window.scrollTo({
      // top:4821 ,
      top: document.documentElement.scrollHeight - window.innerHeight - 850,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full border-b border-stone-200 hidden md:block"
    >
      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            50% { opacity: .2; }
          }
          .animate-pulse {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>

      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/">
            <img src={logo} alt="Logo" className="w-[10rem] object-contain" />
          </Link>
        </motion.div>

        {/* CONTACT ITEMS */}
        <div className="hidden md:flex items-center space-x-6">
          {/* 🔽 GET A QUOTE → SCROLL */}
          <AnimatedContactItem
            icon={<FileText size={44} strokeWidth={1.5} />}
            title="Get a Quote"
            subtitle="Click to fill form"
            isBlinking={true}
            onClick={scrollToBottom}
            index={0}
          />

          {/* 📧 EMAIL */}
          <AnimatedContactItem
            icon={<Mail size={44} strokeWidth={1.5} />}
            title="Email Us"
            subtitle="info@everestconsultrain.com"
            href="mailto:info@everestconsultrain.com"
            hideIconOnMobile={true}
            index={1}
          />

          {/* 📞 PHONE → INPUT MODE */}
          <AnimatedContactItem
            icon={<Phone size={44} strokeWidth={1.5} />}
            title="Contact Us"
            subtitle="+977-01-5903211"
            isInput={true}
            hideIconOnMobile={true}
            index={2}
          />
        </div>
      </nav>
    </motion.header>
  );
};

export default TopContactBar;
