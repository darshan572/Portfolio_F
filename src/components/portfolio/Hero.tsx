import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, SocialLinks } from "@/types/portfolio";

const Hero: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const controls = useAnimation();

  const titles = [
    "Full Stack Developer",
    "Software Engineer",
    "B.Tech CSE Student",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
    setSocialLinks(manager.getSocialLinks());

    const handleDataUpdate = () => {
      setPersonalInfo(manager.getPersonalInfo());
      setSocialLinks(manager.getSocialLinks());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  useEffect(() => {
    const typeTitle = async () => {
      const title = titles[titleIndex];

      // Clear current title
      for (let i = currentTitle.length; i >= 0; i--) {
        setCurrentTitle(title.substring(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Type new title
      for (let i = 0; i <= title.length; i++) {
        setCurrentTitle(title.substring(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Wait before next title
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTitleIndex((prev) => (prev + 1) % titles.length);
    };

    typeTitle();
  }, [titleIndex, titles, currentTitle.length]);

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialIcons = [
    { Icon: Github, url: socialLinks?.github, label: "GitHub" },
    { Icon: Linkedin, url: socialLinks?.linkedin, label: "LinkedIn" },
    { Icon: Mail, url: `mailto:${personalInfo?.email}`, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300d4ff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="53" cy="7" r="1"/%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3Ccircle cx="7" cy="53" r="1"/%3E%3Ccircle cx="53" cy="53" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
          }
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Circuit Board Animation */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-30"
        animate={controls}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cyan-400"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-green-400"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-orange-400"
          />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 40 * Math.cos((i * Math.PI) / 4)}
              y2={50 + 40 * Math.sin((i * Math.PI) / 4)}
              stroke="currentColor"
              strokeWidth="1"
              className="text-cyan-400"
            />
          ))}
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          {personalInfo?.profileImage && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-green-400 p-1 bg-gradient-to-r from-cyan-400 to-green-400">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-white">Hello, I'm </span>
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {personalInfo?.name || "Your Name"}
              </span>
            </h1>
          </motion.div>

          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-300 h-16 flex items-center justify-center">
              <span className="font-mono">{currentTitle}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="ml-1 text-cyan-400"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {personalInfo?.introduction ||
              "Passionate computer science student with a focus on software development and emerging technologies."}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={() => scrollToNext()}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {personalInfo?.resumePdf && (
              <motion.a
                href={personalInfo.resumePdf}
                download
                className="group flex items-center space-x-2 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                <span>Download Resume</span>
              </motion.a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-6"
          >
            {socialIcons.map(
              ({ Icon, url, label }, index) =>
                url && (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-full border border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <Icon size={24} />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ),
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center text-gray-400 hover:text-cyan-400 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
