import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

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

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 70,
      scale: 0.9,
      rotateX: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const certCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fbbf24" fill-opacity="0.3"%3E%3Cpolygon points="30 0 60 30 30 60 0 30"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
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
              <span className="text-white">My </span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional certifications and achievements that validate my
              expertise
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-6" />
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 h-full">
                  {/* Certificate Image */}
                  {cert.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Status Indicator */}
                      <div className="absolute top-4 right-4">
                        {isExpired(cert.expiryDate) ? (
                          <div className="flex items-center space-x-1 px-3 py-1 bg-red-400/20 border border-red-400/30 rounded-full text-red-400 text-xs font-medium">
                            <Clock size={12} />
                            <span>Expired</span>
                          </div>
                        ) : isExpiringSoon(cert.expiryDate) ? (
                          <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-medium">
                            <Clock size={12} />
                            <span>Expiring Soon</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 px-3 py-1 bg-green-400/20 border border-green-400/30 rounded-full text-green-400 text-xs font-medium">
                            <CheckCircle size={12} />
                            <span>Valid</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certificate Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="text-black" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors leading-tight">
                            {cert.name}
                          </h3>
                          <p className="text-yellow-400 font-medium text-sm">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      {cert.verificationUrl && (
                        <motion.a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600/50 transition-colors flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Credential ID
                        </p>
                        <p className="text-sm text-gray-300 font-mono bg-gray-900/50 px-2 py-1 rounded">
                          {cert.credentialId}
                        </p>
                      </div>
                    )}

                    {/* Skills */}
                    {cert.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">
                          Skills Validated
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded text-yellow-400 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600/20 border border-gray-600/30 rounded text-gray-400 text-xs">
                              +{cert.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>
                          Issued:{" "}
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      {cert.expiryDate && (
                        <div
                          className={`flex items-center space-x-1 ${
                            isExpired(cert.expiryDate)
                              ? "text-red-400"
                              : isExpiringSoon(cert.expiryDate)
                                ? "text-yellow-400"
                                : "text-gray-500"
                          }`}
                        >
                          <Clock size={12} />
                          <span>
                            {isExpired(cert.expiryDate)
                              ? "Expired: "
                              : "Expires: "}
                            {new Date(cert.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {certifications.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Award className="text-gray-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No certifications yet
              </h3>
              <p className="text-gray-600">
                Certifications will be displayed here once added
              </p>
            </motion.div>
          )}

          {/* Certifications Summary */}
          {certifications.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Certifications Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {certifications.length}
                  </div>
                  <div className="text-sm text-gray-400">
                    Total Certificates
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {
                      certifications.filter(
                        (cert) => !isExpired(cert.expiryDate),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Valid</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {
                      certifications.filter((cert) =>
                        isExpiringSoon(cert.expiryDate),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Expiring Soon</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {
                      Array.from(
                        new Set(certifications.flatMap((cert) => cert.skills)),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Skills Covered</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Achievement Timeline */}
          {certifications.length > 0 && (
            <motion.div variants={itemVariants} className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Achievement Timeline
              </h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-px bg-gradient-to-b from-yellow-400 to-orange-400" />

                {certifications
                  .sort(
                    (a, b) =>
                      new Date(b.issueDate).getTime() -
                      new Date(a.issueDate).getTime(),
                  )
                  .map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      variants={itemVariants}
                      className={`relative flex items-center mb-8 ${
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black z-10" />

                      {/* Content */}
                      <div
                        className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                      >
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                          <h4 className="font-semibold text-white">
                            {cert.name}
                          </h4>
                          <p className="text-yellow-400 text-sm">
                            {cert.issuer}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
