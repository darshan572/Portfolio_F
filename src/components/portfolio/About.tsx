import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo, Education } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTheme } from "@/contexts/ThemeContext";

const About: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const { ref, isVisible } = useScrollAnimation();
  const { isDark } = useTheme();
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
    setEducation(manager.getEducation());

    const handleDataUpdate = () => {
      setPersonalInfo(manager.getPersonalInfo());
      setEducation(manager.getEducation());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const stats = [
    { label: "Years of Learning", value: "2+", icon: GraduationCap },
    { label: "Projects Completed", value: "15+", icon: Code },
    { label: "Technologies Used", value: "20+", icon: Award },
    { label: "Certifications", value: "5+", icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const fadeInVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ff88" fill-opacity="0.4"%3E%3Cpath d="M30 30c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zM10 10c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
          }
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                >
                  {personalInfo?.introduction ||
                    "Passionate computer science student with a focus on software development and emerging technologies."}
                </motion.p>

                <motion.div variants={itemVariants} className="space-y-4">
                  {personalInfo?.location && (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="mr-3 text-green-400" size={20} />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}

                  {education.length > 0 && (
                    <div className="flex items-center text-gray-400">
                      <GraduationCap className="mr-3 text-cyan-400" size={20} />
                      <span>
                        {education[0].degree} in {education[0].field}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-400">
                    <Calendar className="mr-3 text-green-400" size={20} />
                    <span>Available for internships and collaborations</span>
                  </div>
                </motion.div>
              </div>

              {/* Education Timeline */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      variants={itemVariants}
                      className="relative pl-8 border-l-2 border-green-400/30"
                    >
                      <div className="absolute -left-2 top-2 w-4 h-4 bg-green-400 rounded-full" />
                      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                        <h4 className="text-lg font-semibold text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-green-400 font-medium">
                          {edu.institution}
                        </p>
                        <p className="text-gray-400">{edu.field}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar size={14} className="mr-2" />
                          <span>
                            {new Date(edu.startDate).getFullYear()} -{" "}
                            {edu.current
                              ? "Present"
                              : new Date(edu.endDate!).getFullYear()}
                          </span>
                        </div>
                        {edu.gpa && edu.gpa > 0 && (
                          <p className="text-cyan-400 mt-2">GPA: {edu.gpa}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats and Visual */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Profile Image */}
              {personalInfo?.profileImage && (
                <motion.div variants={itemVariants} className="relative">
                  <div className="relative w-80 h-80 mx-auto">
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-green-400 rounded-tl-3xl" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-cyan-400 rounded-br-3xl" />

                    {/* Main Image */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-gray-700/50 shadow-2xl">
                      <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center group hover:border-green-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-green-400 group-hover:text-cyan-400 transition-colors" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Skills Preview */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Node.js",
                    "Python",
                    "Java",
                    "Git",
                    "SQL",
                  ].map((skill, index) => (
                    <motion.span
                      key={skill}
                      variants={itemVariants}
                      className="px-3 py-1 bg-gradient-to-r from-green-400/20 to-cyan-400/20 border border-green-400/30 rounded-full text-sm text-green-400"
                      whileHover={{ scale: 1.1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;