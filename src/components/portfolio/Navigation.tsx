import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
            : "bg-transparent",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">Portfolio</h1>
                <p className="text-xs text-gray-400">B.Tech CSE Student</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative",
                    activeSection === item.id
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-lg border border-cyan-400/30"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Admin Button & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <motion.a
                href="/admin"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={16} />
                <span className="text-sm">Admin</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-lg border-l border-white/10 z-50 md:hidden"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Navigation
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                        activeSection === item.id
                          ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
                          : "text-gray-300 hover:text-white hover:bg-white/5",
                      )}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <motion.a
                    href="/admin"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings size={20} />
                    <span>Admin Panel</span>
                  </motion.a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-green-400 origin-left z-50"
        style={{
          scaleX:
            typeof window !== "undefined"
              ? window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)
              : 0,
        }}
        initial={{ scaleX: 0 }}
      />
    </>
  );
};

export default Navigation;
