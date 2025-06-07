import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { Certification } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTheme } from "@/contexts/ThemeContext";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { ref, isInView: isVisible } = useScrollAnimation();
  const { isDark } = useTheme();

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setCertifications(manager.getCertifications());

    const handleDataUpdate = () => {
      setCertifications(manager.getCertifications());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const getValidationIcon = (isValid: boolean) => {
    return isValid ? (
      <CheckCircle className="text-green-500" size={20} />
    ) : (
      <Clock
        className={`${isDark ? "text-yellow-400" : "text-yellow-600"}`}
        size={20}
      />
    );
  };

  const getValidationBadge = (isValid: boolean) => {
    if (isValid) {
      return isDark
        ? "bg-green-500/20 text-green-400 border-green-500/30"
        : "bg-green-100 text-green-700 border-green-300";
    }
    return isDark
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      : "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <section
      id="certifications"
      className={`min-h-screen py-20 relative overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-900 to-black"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
      }`}
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Award Icons Background */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute transition-colors duration-500 ${
              isDark ? "text-cyan-400/5" : "text-blue-500/5"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${40 + Math.random() * 40}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Award />
          </motion.div>
        ))}
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
              <span
                className={`${
                  isDark
                    ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Certifications
              </span>{" "}
              & Achievements
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Professional certifications and completed courses
            </p>
          </motion.div>

          {/* Certifications Grid */}
          {certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group p-6 rounded-2xl border backdrop-blur-lg transition-all duration-500 hover:scale-105 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700/50 hover:border-cyan-400/50"
                      : "bg-white/70 border-gray-200/50 shadow-lg hover:border-blue-400/50"
                  }`}
                >
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
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

                    <div className="text-right">
                      <div className={`flex items-center gap-2 mb-2`}>
                        {getValidationIcon(cert.isValid)}
                        <span
                          className={`text-xs px-2 py-1 rounded-full border font-medium ${getValidationBadge(cert.isValid)}`}
                        >
                          {cert.isValid ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Image */}
                  {cert.image && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={cert.image}
                        alt={`${cert.name} certificate`}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Certificate Details */}
                  <div className="space-y-3">
                    <h3
                      className={`font-semibold text-lg transition-colors duration-500 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {cert.name}
                    </h3>

                    <p
                      className={`font-medium transition-colors duration-500 ${
                        isDark ? "text-cyan-400" : "text-blue-600"
                      }`}
                    >
                      {cert.issuer}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar
                        className={`transition-colors duration-500 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                        size={16}
                      />
                      <span
                        className={`transition-colors duration-500 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                    </div>

                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock
                          className={`transition-colors duration-500 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                          size={16}
                        />
                        <span
                          className={`transition-colors duration-500 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Expires:{" "}
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {cert.credentialId && (
                      <div
                        className={`text-xs font-mono p-2 rounded border transition-colors duration-500 ${
                          isDark
                            ? "bg-gray-700/50 border-gray-600 text-gray-300"
                            : "bg-gray-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        ID: {cert.credentialId}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {cert.verificationUrl && (
                        <motion.a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isDark
                              ? "bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          Verify
                        </motion.a>
                      )}

                      {cert.certificateUrl && (
                        <motion.a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Award size={16} />
                          View
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* No Certifications Message */
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              className={`text-center py-20 transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Award size={64} className="mx-auto mb-6 opacity-50" />
              <h3
                className={`text-2xl font-semibold mb-4 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                No Certifications Yet
              </h3>
              <p className="text-lg max-w-md mx-auto">
                Certifications and achievements will be displayed here once
                added.
              </p>
              <p className="text-sm mt-4 opacity-75">
                Add certifications through the admin panel to showcase your
                professional achievements.
              </p>
            </motion.div>
          )}

          {/* Achievement Stats */}
          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`mt-16 p-8 rounded-2xl border backdrop-blur-lg text-center transition-all duration-500 ${
                isDark
                  ? "bg-gray-800/30 border-gray-700/30"
                  : "bg-white/50 border-gray-200/30 shadow-lg"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-8 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Achievement Summary
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Certifications",
                    value: certifications.length,
                  },
                  {
                    label: "Verified",
                    value: certifications.filter((c) => c.isValid).length,
                  },
                  {
                    label: "This Year",
                    value: certifications.filter(
                      (c) =>
                        new Date(c.issueDate).getFullYear() ===
                        new Date().getFullYear(),
                    ).length,
                  },
                  {
                    label: "Active",
                    value: certifications.filter(
                      (c) =>
                        !c.expiryDate || new Date(c.expiryDate) > new Date(),
                    ).length,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isVisible
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div
                      className={`text-3xl font-bold transition-colors duration-500 ${
                        isDark
                          ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-500 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
