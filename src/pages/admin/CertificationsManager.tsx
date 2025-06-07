import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Award,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
  Image,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { Certification } from "@/types/portfolio";

const CertificationsManager: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCert, setNewCert] = useState<Omit<Certification, "id">>({
    name: "",
    issuer: "",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    verificationUrl: "",
    credentialId: "",
    image: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");

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

  const handleAddCertification = () => {
    if (!newCert.name.trim() || !newCert.issuer.trim()) return;

    const manager = PortfolioManager.getInstance();
    manager.addCertification(newCert);
    setNewCert({
      name: "",
      issuer: "",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      verificationUrl: "",
      credentialId: "",
      image: "",
      skills: [],
    });
    setIsAddingNew(false);
  };

  const handleUpdateCertification = (
    id: string,
    updatedCert: Partial<Certification>,
  ) => {
    const manager = PortfolioManager.getInstance();
    manager.updateCertification(id, updatedCert);
    setEditingCert(null);
  };

  const handleDeleteCertification = (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      const manager = PortfolioManager.getInstance();
      manager.deleteCertification(id);
    }
  };

  const addSkill = (certData: any, setCertData: any) => {
    if (skillInput.trim() && !certData.skills.includes(skillInput.trim())) {
      setCertData((prev: any) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string, certData: any, setCertData: any) => {
    setCertData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill),
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    certData: any,
    setCertData: any,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (PortfolioManager.validateImage(file)) {
        const base64 = await PortfolioManager.fileToBase64(file);
        setCertData((prev: any) => ({ ...prev, image: base64 }));
      } else {
        alert("Invalid image file");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

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

  const getStatusInfo = (cert: Certification) => {
    if (isExpired(cert.expiryDate)) {
      return {
        status: "Expired",
        color: "text-red-400",
        bg: "bg-red-400/20",
        border: "border-red-400/30",
      };
    } else if (isExpiringSoon(cert.expiryDate)) {
      return {
        status: "Expiring Soon",
        color: "text-yellow-400",
        bg: "bg-yellow-400/20",
        border: "border-yellow-400/30",
      };
    } else {
      return {
        status: "Valid",
        color: "text-green-400",
        bg: "bg-green-400/20",
        border: "border-green-400/30",
      };
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Certifications Management
              </h1>
              <p className="text-gray-400">
                Manage your professional certifications and achievements
              </p>
            </div>
            <motion.button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Add New Certification</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add New Certification Modal */}
        <AnimatePresence>
          {isAddingNew && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Add New Certification
                  </h3>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Certification Name *
                      </label>
                      <input
                        type="text"
                        value={newCert.name}
                        onChange={(e) =>
                          setNewCert((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                        placeholder="Certification title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Issuing Organization *
                      </label>
                      <input
                        type="text"
                        value={newCert.issuer}
                        onChange={(e) =>
                          setNewCert((prev) => ({
                            ...prev,
                            issuer: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                        placeholder="e.g., Google, AWS, Microsoft"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          value={newCert.issueDate}
                          onChange={(e) =>
                            setNewCert((prev) => ({
                              ...prev,
                              issueDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={newCert.expiryDate}
                          onChange={(e) =>
                            setNewCert((prev) => ({
                              ...prev,
                              expiryDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-400/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Credential ID
                      </label>
                      <input
                        type="text"
                        value={newCert.credentialId}
                        onChange={(e) =>
                          setNewCert((prev) => ({
                            ...prev,
                            credentialId: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                        placeholder="Certificate ID or badge number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Verification URL
                      </label>
                      <input
                        type="url"
                        value={newCert.verificationUrl}
                        onChange={(e) =>
                          setNewCert((prev) => ({
                            ...prev,
                            verificationUrl: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                        placeholder="https://verify.example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Certificate Image
                      </label>
                      {newCert.image && (
                        <div className="mb-3">
                          <img
                            src={newCert.image}
                            alt="Certificate"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, newCert, setNewCert)
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-600 file:text-white hover:file:bg-yellow-700 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Skills Validated
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSkill(newCert, setNewCert))
                          }
                          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                          placeholder="Add skill and press Enter"
                        />
                        <button
                          type="button"
                          onClick={() => addSkill(newCert, setNewCert)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newCert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-yellow-600/20 border border-yellow-600/30 rounded-full text-yellow-400 text-sm"
                          >
                            {skill}
                            <button
                              onClick={() =>
                                removeSkill(skill, newCert, setNewCert)
                              }
                              className="ml-2 text-yellow-400 hover:text-yellow-300"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCertification}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Certification
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certifications List */}
        <div className="grid gap-6">
          {certifications.map((cert, index) => {
            const statusInfo = getStatusInfo(cert);

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex space-x-4 flex-1">
                    {cert.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {cert.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.bg} ${statusInfo.border} border`}
                        >
                          {statusInfo.status}
                        </span>
                      </div>

                      <p className="text-yellow-400 font-medium mb-2">
                        {cert.issuer}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          Issued:{" "}
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </div>
                        {cert.expiryDate && (
                          <div className="flex items-center">
                            <Clock size={14} className="mr-2" />
                            Expires:{" "}
                            {new Date(cert.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                        {cert.credentialId && (
                          <div className="md:col-span-2">
                            <span className="text-gray-500">ID: </span>
                            <span className="font-mono text-gray-300">
                              {cert.credentialId}
                            </span>
                          </div>
                        )}
                      </div>

                      {cert.skills.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-yellow-600/20 border border-yellow-600/30 rounded text-yellow-400 text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <button
                      onClick={() => setEditingCert(cert)}
                      className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCertification(cert.id)}
                      className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {certifications.length === 0 && (
            <div className="text-center py-16">
              <Award size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No certifications yet
              </h3>
              <p className="text-gray-600">
                Add your first certification to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CertificationsManager;
