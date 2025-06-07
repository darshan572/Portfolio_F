import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // Show immediately
  const { isDark } = useTheme();

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "certifications", label: "Certifications", href: "#certifications" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleAdminRedirect = () => {
    navigate("/admin");
  };

  if (!showNavbar) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? isDark
            ? "bg-black/90 backdrop-blur-lg border-b border-gray-800/50 shadow-lg"
            : "bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg"
          : "bg-transparent",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center relative overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
                className="text-white"
              >
                <linearGradient
                  id="XCMhBO2Tuj0MTK9K0BhN7a"
                  x1="3.979"
                  x2="43.979"
                  y1="25"
                  y2="25"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#f0f0f0" />
                </linearGradient>
                <path
                  fill="url(#XCMhBO2Tuj0MTK9K0BhN7a)"
                  d="M35.161,38.712	c-4.975,1.504-9.67,0.807-12.228,0.139c-0.07,1.03-0.182,1.461-0.351,1.628c-0.197,0.223-1.827,1.141-2.727-0.167	c-0.394-0.626-0.591-1.754-0.702-2.784c-5.762-2.589-8.433-6.403-8.517-6.543c-0.141-0.139-1.447-1.489-0.141-3.16	c1.223-1.504,5.27-3.021,8.897-3.619c0.141-3.063,0.478-5.428,0.914-6.473c0.52-1.253,1.187-0.139,1.771,0.696	c0.478,0.626,0.773,3.313,0.801,5.457c2.361-0.111,3.795,0.062,6.423,0.557c3.457,0.585,5.762,2.338,5.58,4.315	c-0.169,1.949-1.967,2.756-2.67,2.812c-0.703,0.056-1.827-0.459-1.827-0.459c-0.787-0.362-0.07-0.696,0.844-1.086	c1.012-0.487,0.787-0.974,0.787-0.974c-0.366-1.114-4.85-1.857-9.305-1.857c0,2.436,0.098,6.473,0.169,8.825	c3.12,0.585,5.453,0.459,5.453,0.459s11.384-0.32,11.708-7.517c0.357-7.205-11.384-14.108-20.029-16.281	c-8.63-2.241-13.521-0.654-13.937-0.446c-0.464,0.223-0.042,0.306-0.042,0.306s0.464,0.069,1.312,0.348s0.169,0.696,0.169,0.696	c-1.475,0.495-3.12,0.209-3.437-0.459c-0.323-0.654,0.211-1.253,0.844-2.129c0.591-0.905,1.265-0.877,1.265-0.877	c10.674-3.691,23.718,2.922,23.718,2.922c12.199,6.097,14.281,13.266,14.062,16.05c-0.197,2.742-1.265,7.378-8.785,9.633 M11.689,28.759c-1.209,0.557-0.366,1.448-0.366,1.448c2.277,2.414,5.06,3.926,7.731,4.871c0.309-4.176,0.281-5.665,0.281-7.768	C15.203,27.589,12.814,28.257,11.689,28.759"
                />
              </svg>
            </div>
            <span
              className={`font-bold text-xl transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:flex items-center space-x-1"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                data-magnetic
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group",
                  activeSection === item.id
                    ? isDark
                      ? "text-white"
                      : "text-gray-900"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900",
                )}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className={`absolute inset-0 rounded-lg border ${
                      isDark
                        ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30"
                        : "bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/20"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover effect */}
                <motion.div
                  className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 ${
                    isDark ? "bg-white/5" : "bg-black/5"
                  }`}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Theme Toggle & Admin Button & Mobile Menu */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            {/* Theme Toggle */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Admin Button */}
            <motion.button
              onClick={handleAdminRedirect}
              data-magnetic
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} />
              <span>Admin</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              data-magnetic
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
                  : "bg-gray-100/50 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
              style={{ top: scrolled ? "64px" : "80px" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute top-full left-0 right-0 backdrop-blur-lg border-b lg:hidden ${
                isDark
                  ? "bg-black/95 border-gray-800/50"
                  : "bg-white/95 border-gray-200/50"
              }`}
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 group",
                        activeSection === item.id
                          ? isDark
                            ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30"
                            : "text-gray-900 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20"
                          : isDark
                            ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50",
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  {/* Mobile Admin Button */}
                  <motion.button
                    onClick={handleAdminRedirect}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: navItems.length * 0.1 + 0.2,
                      duration: 0.3,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings size={18} />
                    <span>Admin Panel</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
