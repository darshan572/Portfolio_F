import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, SocialLinks } from "@/types/portfolio";

const Hero: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
    setSocialLinks(manager.getSocialLinks());

    const handleDataUpdate = () => {
      setPersonalInfo(manager.getPersonalInfo());
      setSocialLinks(manager.getSocialLinks());
    };

    // Sequential loading timeline
    const timer1 = setTimeout(() => setShowImage(true), 2000); // Image after text animations
    const timer2 = setTimeout(() => setShowNavbar(true), 2800); // Navbar after image

    // Dispatch event for navbar to show
    const timer3 = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("showNavbar"));
    }, 2800);

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);

    return () => {
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated Grid Points */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            {/* Hello Text with Word Animations */}
            <div className="text-gray-400 text-lg md:text-xl font-light">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mr-2"
              >
                Hello
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-block mr-3"
              >
                there,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                className="inline-block"
              >
                I am
              </motion.span>
            </div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              {personalInfo?.name || "Darshan Kumar"}
            </motion.h1>

            {/* Title with Underline */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="relative"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mb-4">
                {personalInfo?.title || "Full Stack Developer"}
              </h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="max-w-lg"
            >
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {personalInfo?.introduction ||
                  `I'm a 3rd year Computer Science and Engineering student at Quantum University, New Delhi.`}
              </p>
            </motion.div>

            {/* Buttons with Special Animations */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Say Hello Button with Magnetic Effect */}
              <motion.button
                onClick={scrollToContact}
                data-magnetic
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.8,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <motion.span
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  Say Hello!
                  <motion.div
                    whileHover={{ x: 5, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.span>

                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Particle Effect on Hover */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </motion.button>

              {/* My Projects Button */}
              <motion.button
                onClick={scrollToProjects}
                data-magnetic
                className="group flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-white transition-all duration-300 relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#ffffff",
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 2.0,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <span>My Projects</span>
                <motion.div
                  whileHover={{ x: 5, y: -5, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ExternalLink size={18} />
                </motion.div>

                {/* Hover Background */}
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ scale: 0, borderRadius: "50%" }}
                  whileHover={{ scale: 1, borderRadius: "8px" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with Delayed Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={showImage ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative max-w-md w-full">
              {personalInfo?.profileImage ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    showImage
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <motion.img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: "3/4" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Animated Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 1.0 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 1.1 }}
                  />
                </motion.div>
              ) : (
                /* Placeholder when no image */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    showImage
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  <div
                    className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl border border-gray-700"
                    style={{ aspectRatio: "3/4", height: "500px" }}
                  >
                    <div className="text-center text-gray-500">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                        {personalInfo?.name?.[0] || "D"}
                      </div>
                      <p className="text-sm">Add your photo in admin panel</p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 }}
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 1.0 }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-red-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      showImage
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.5, delay: 1.1 }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center cursor-pointer"
          data-magnetic
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
