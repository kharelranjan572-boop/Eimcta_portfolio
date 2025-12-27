import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, } from "react-router-dom";
import logo from "../../img/eimcta.png";
import { menuitems } from "../utilities/Array/data.js";
import {
  Info,
  Layers,
  FileText,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
  Menu,
  BookOpen,
  ClipboardCheck,
  Award,
  GraduationCap,
  FileSearch,
  Leaf,
  Tag,
  Megaphone,
  HelpCircle,
  Share2,
  MailCheck,
} from "lucide-react";

const defaultIconMap = {
  about: <Info size={20} className="mr-2" />,
  services: <Layers size={20} className="mr-2" />,
  blog: <FileText size={20} className="mr-2" />,
  contact: <PhoneCall size={20} className="mr-2" />,
  "iso consultancy": <BookOpen size={18} className="mr-2" />,
  "iso audit": <ClipboardCheck size={18} className="mr-2" />,
  "iso certification": <Award size={18} className="mr-2" />,
  training: <GraduationCap size={18} className="mr-2" />,
  tender: <FileSearch size={18} className="mr-2" />,
  environmental: <Leaf size={18} className="mr-2" />,
  "supply of sign": <Tag size={18} className="mr-2" />,
  offers: <Megaphone size={18} className="mr-2" />,
  faq: <HelpCircle size={18} className="mr-2" />,
  social: <Share2 size={18} className="mr-2" />,
  quote: <MailCheck size={18} className="mr-2" />,
};

// COMPONENT: A more robust NavLink that correctly handles react-router navigation
const NavLink = ({ to, children, className, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    // Prevent default <a> tag behavior to let React Router handle navigation
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    // Navigate only if 'to' is a valid path
    if (to && to !== "#") {
      navigate(to);
    }
  };

  const isActive = location.pathname === to;
  const finalClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <a href={to || "#"} className={finalClassName} onClick={handleClick}>
      {children}
    </a>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  // content height measurement removed — use simpler mobile-only maxHeight fallback
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setExpandedItems({});
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update measured heights for expanded items whenever expansion state changes
  // (was measuring heights here) — removed to avoid timing issues on mobile

  // Recompute heights on window resize since scrollHeight values can change
  // no-op: removed dynamic height recomputation to keep mobile dropdowns stable

  const toggleItemExpansion = (path) => {
    setExpandedItems((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedItems({});
  };

  const getIcon = (item, level = 0) => {
    if (item.icon && React.isValidElement(item.icon)) {
      return React.cloneElement(item.icon, {
        size: level > 0 ? 18 : 20,
        className: `mr-2 ${item.icon.props?.className || ""}`,
      });
    }

    const lower = item.title.toLowerCase();
    if (lower.includes("about")) return defaultIconMap.about;
    if (lower.includes("service")) return defaultIconMap.services;
    if (lower.includes("blog") || lower.includes("offer")) return defaultIconMap.blog;
    if (lower.includes("contact")) return defaultIconMap.contact;
    if (lower.includes("consultancy")) return defaultIconMap["iso consultancy"];
    if (lower.includes("audit")) return defaultIconMap["iso audit"];
    if (lower.includes("certification")) return defaultIconMap["iso certification"];
    if (lower.includes("training")) return defaultIconMap["training"];
    if (lower.includes("tender") || lower.includes("bid")) return defaultIconMap["tender"];
    if (lower.includes("environmental")) return defaultIconMap["environmental"];
    if (lower.includes("supply")) return defaultIconMap["supply of sign"];
    if (lower.includes("offers") || lower.includes("contents")) return defaultIconMap["offers"];
    if (lower.includes("faq")) return defaultIconMap["faq"];
    if (lower.includes("fb") || lower.includes("social")) return defaultIconMap["social"];
    if (lower.includes("quote") || lower.includes("eligibility")) return defaultIconMap["quote"];

    return level === 0 ? <Info size={20} className="mr-2" /> : <FileText size={18} className="mr-2" />;
  };

  // Renders dropdown items for DESKTOP with collapsible sub-menus
  const renderDesktopDropdownItems = (items, level = 0, parentKey = "") => {
    return items.map((item, idx) => {
      const key = `${parentKey}-${idx}`;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={key} className="w-full">
          <div className="flex items-center justify-center w-full">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center flex-grow px-4 py-2 text-sm rounded-md transition-all duration-500 ${isActive && !hasChildren
                  ? "bg-amber-700 text-white"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                }`
              }
            >
              {getIcon(item, level)}
              {item.title}
            </NavLink>
            {hasChildren && (
              <button
                onClick={() => toggleItemExpansion(key)}
                className="p-1 rounded-md hover:bg-amber-100 mr-2 transition-colors duration-200"
                aria-expanded={!!expandedItems[key]}
              >
                {expandedItems[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}
          </div>

          {hasChildren && (
            <div className={`overflow-hidden pl-4 transition-[max-height] duration-700 ease-in-out`} style={{ maxHeight: expandedItems[key] ? `${item.children.length * 60}rem` : "0px" }}>
              <div
                className={`pt-1 border-l-2 border-amber-200 transform origin-top transition-all duration-700 ease-in-out ${expandedItems[key] ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {renderDesktopDropdownItems(item.children, level + 1, key)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  // Renders dropdown items for MOBILE with collapsible submenus
  const renderMobileDropdownItems = (items, level = 0, parentKey = "") => {
    return items.map((item, idx) => {
      const key = `${parentKey}-${idx}`;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={key} className="relative group p-2">
          <div className="flex items-center justify-between">
            <NavLink
              to={item.path}
              onClick={() => {
                if (!hasChildren) {
                  closeMobileMenu();
                }
              }}
              className={({ isActive }) =>
                `flex items-center flex-grow px-4 py-2 text-sm rounded-md transition-all duration-200 ${isActive && !hasChildren
                  ? "bg-amber-400 text-white"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                }`
              }
            >
              {getIcon(item, level)}
              {item.title}
            </NavLink>

            {hasChildren && (
              <button
                onClick={() => toggleItemExpansion(key)}
                className="p-1 rounded-md hover:bg-amber-100 mr-2 transition-all  ease-in-out duration-200"
              >
                {expandedItems[key] ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
          </div>

          {hasChildren && (
            <div className={`overflow-hidden ${level > 0 ? "ml-4 pl-2  border-l-2 border-amber-200" : ""} transition-all duration-200 ease-in-out`} style={{ maxHeight: expandedItems[key] ? "2000px" : "0px" }}>
              <div
                className={` ${level > 0 ? "mt-1" : "mt-0"} transform origin-top transition-all duration-200 ease-in-out ${expandedItems[key] ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'}`}
                style={{ willChange: 'transform, opacity' }}
              >
                {renderMobileDropdownItems(item.children, level + 1, key)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all 
         duration-200 font-['Arial_Narrow'] md:bg-amber-600 bg-white font-bold  ${scrolled ? "bg-amber-600 shadow-lg py-0" : "bg-amber-600 shadow-md py-2"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  justify-between h-16">
          {/* Logo - visible on mobile and desktop */}
          <Link to="/" className="flex items-center">
            <div className="flex-shrink-0 lg:hidden md:hidden sm:block  items-center">
              <img
                className="h-auto w-28"
                src={logo}
                alt="Logo"
              />
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuitems.map((item, idx) => (
              <div key={idx} className="relative group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md text-lg transition-all duration-200 ease-in-out ${isActive ? "text-orange-700 bg-white" : "text-white hover:text-amber-100"
                    }`
                  }
                >
                  {getIcon(item)}
                  {item.title}
                  {item.children && (
                    <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </NavLink>

                {item.children && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 mt-1 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
                  opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto 
                   group-hover:translate-y-0 transition-all duration-200 ease-in-out origin-top z-50">
                    <div className="py-1">
                      {renderDesktopDropdownItems(item.children, 1, `d-${idx}`)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button - positioned to the right */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-600
               hover:text-amber-100 hover:bg-amber-700 focus:outline-none 
              transition duration-500"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - full height */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 transform  
          transition-transform duration-200 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
          <span className="font-bold text-gray-700">Menu</span>
          <button
            onClick={closeMobileMenu}
            className="p-1 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-2 pt-2 pb-3 space-y-1 overflow-y-auto h-full">
          {menuitems.map((item, idx) => {
            const key = `m-${idx}`;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={key} className="mb-1">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (hasChildren) {
                        toggleItemExpansion(key);
                      } else {
                        closeMobileMenu();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center flex-grow px-3 py-2 rounded-md text-base transition-all duration-200 ${isActive && !hasChildren
                        ? "bg-amber-50 text-amber-700"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      }`
                    }
                  >
                    {getIcon(item)}
                    <span className="ml-2">{item.title}</span>
                  </NavLink>

                  {hasChildren && (
                    <button
                      onClick={() => toggleItemExpansion(key)}
                      className="p-1 rounded-md hover:bg-amber-100 mr-2 transition-colors duration-200"
                    >
                      {expandedItems[key] ? <ChevronUp size={20} /> : <ChevronRight size={20} />}
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className="overflow-hidden transition-[max-height] duration-200 ease-in-out"
                    style={{ maxHeight: expandedItems[key] ? "2000px" : "0px" }}
                  >
                    <div className="mt-1 ml-4 pl-2 space-y-1 border-l-2 border-amber-200">
                      {renderMobileDropdownItems(item.children, 1, key)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
