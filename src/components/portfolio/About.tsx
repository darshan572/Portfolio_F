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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      current: isDark
        ? "bg-green-500/20 text-green-400 border-green-500/30"
        : "bg-green-100 text-green-700 border-green-300",
      completed: isDark
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : "bg-blue-100 text-blue-700 border-blue-300",
      upcoming: isDark
        ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
        : "bg-orange-100 text-orange-700 border-orange-300",
    };
    return (
      statusColors[status as keyof typeof statusColors] || statusColors.current
    );
  };

  return (
    <section
      id="about"
      className={`min-h-screen py-20 relative overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300d4ff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="53" cy="7" r="1"/%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3Ccircle cx="7" cy="53" r="1"/%3E%3Ccircle cx="53" cy="53" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
              : 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23374151" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="53" cy="7" r="1"/%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3Ccircle cx="7" cy="53" r="1"/%3E%3Ccircle cx="53" cy="53" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
          }`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              About{" "}
              <span
                className={`${
                  isDark
                    ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Me
              </span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Passionate about technology and constantly learning new skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Bio Section */}
              <div
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-6 flex items-center gap-3 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-400/20 to-green-400/20"
                        : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    }`}
                  >
                    <GraduationCap
                      className={`${
                        isDark ? "text-cyan-400" : "text-blue-600"
                      }`}
                      size={24}
                    />
                  </div>
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`mt-1 flex-shrink-0 transition-colors duration-500 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                      size={18}
                    />
                    <div>
                      <p
                        className={`font-medium transition-colors duration-500 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Location
                      </p>
                      <p
                        className={`transition-colors duration-500 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {personalInfo?.location ||
                          "Quantum University, New Delhi"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar
                      className={`mt-1 flex-shrink-0 transition-colors duration-500 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                      size={18}
                    />
                    <div>
                      <p
                        className={`font-medium transition-colors duration-500 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Age
                      </p>
                      <p
                        className={`transition-colors duration-500 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {personalInfo?.age || "20 years old"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p
                      className={`leading-relaxed transition-colors duration-500 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {personalInfo?.bio ||
                        "I'm a dedicated computer science student with a passion for full-stack development and emerging technologies. Currently pursuing my B.Tech in Computer Science and Engineering, I enjoy building innovative solutions and learning new technologies."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              {personalInfo?.profileImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <div
                    className={`relative p-1 rounded-2xl ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-400 to-green-400"
                        : "bg-gradient-to-r from-blue-500 to-purple-500"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        className="w-80 h-96 object-cover"
                      />
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-t from-black/50 to-transparent"
                            : "bg-gradient-to-t from-gray-900/30 to-transparent"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Education Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div
                className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/70 border-gray-200/50 shadow-lg"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-8 flex items-center gap-3 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-400/20 to-green-400/20"
                        : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    }`}
                  >
                    <Award
                      className={`${
                        isDark ? "text-cyan-400" : "text-blue-600"
                      }`}
                      size={24}
                    />
                  </div>
                  Education
                </h3>

                <div className="space-y-6">
                  {education.length > 0 ? (
                    education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isVisible
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className={`relative pl-8 pb-6 ${
                          index !== education.length - 1
                            ? `border-l-2 ${
                                isDark ? "border-gray-700" : "border-gray-300"
                              }`
                            : ""
                        }`}
                      >
                        <div
                          className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-2 ${
                            isDark
                              ? "bg-gray-900 border-cyan-400"
                              : "bg-white border-blue-500"
                          }`}
                        />

                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4
                                className={`font-semibold text-lg transition-colors duration-500 ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {edu.degree}
                              </h4>
                              <p
                                className={`transition-colors duration-500 ${
                                  isDark ? "text-cyan-400" : "text-blue-600"
                                }`}
                              >
                                {edu.institution}
                              </p>
                              <p
                                className={`text-sm transition-colors duration-500 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {edu.field}
                              </p>
                            </div>

                            <div className="text-right">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(edu.status || "current")}`}
                              >
                                {edu.status
                                  ? edu.status.charAt(0).toUpperCase() +
                                    edu.status.slice(1)
                                  : "Current"}
                              </span>
                              <p
                                className={`text-sm mt-1 transition-colors duration-500 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {edu.startYear} - {edu.endYear || "Present"}
                              </p>
                            </div>
                          </div>

                          {edu.gpa && (
                            <p
                              className={`text-sm transition-colors duration-500 ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              GPA:{" "}
                              <span className="font-medium">{edu.gpa}</span>
                            </p>
                          )}

                          {edu.achievements && edu.achievements.length > 0 && (
                            <div className="space-y-1">
                              <p
                                className={`text-sm font-medium transition-colors duration-500 ${
                                  isDark ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                Achievements:
                              </p>
                              <ul className="space-y-1">
                                {edu.achievements.map(
                                  (achievement, achIndex) => (
                                    <li
                                      key={achIndex}
                                      className={`text-sm pl-4 relative transition-colors duration-500 ${
                                        isDark
                                          ? "text-gray-400"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      <span
                                        className={`absolute left-0 top-2 w-1 h-1 rounded-full ${
                                          isDark ? "bg-cyan-400" : "bg-blue-500"
                                        }`}
                                      />
                                      {achievement}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div
                      className={`text-center py-8 transition-colors duration-500 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <GraduationCap
                        size={48}
                        className="mx-auto mb-4 opacity-50"
                      />
                      <p>No education information available.</p>
                      <p className="text-sm mt-2">
                        Add education details in the admin panel.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
