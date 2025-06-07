import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Upload,
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  Image,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { PersonalInfo } from "@/types/portfolio";

const AboutEditor: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    title: "",
    introduction: "",
    profileImage: "",
    resumePdf: "",
    email: "",
    phone: "",
    location: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPersonalInfo(manager.getPersonalInfo());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImage" | "resumePdf",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (field === "profileImage" && PortfolioManager.validateImage(file)) {
        const base64 = await PortfolioManager.fileToBase64(file);
        setPersonalInfo((prev) => ({ ...prev, [field]: base64 }));
      } else if (field === "resumePdf" && PortfolioManager.validatePDF(file)) {
        const base64 = await PortfolioManager.fileToBase64(file);
        setPersonalInfo((prev) => ({ ...prev, [field]: base64 }));
      } else {
        alert("Invalid file type or size");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const manager = PortfolioManager.getInstance();
      manager.updatePersonalInfo(personalInfo);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            About Section Editor
          </h1>
          <p className="text-gray-400">
            Manage your personal information and bio dynamically
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Personal Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <User className="text-black" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Personal Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={personalInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={personalInfo.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder="e.g., B.Tech 2nd Year Student"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={personalInfo.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder="City, State/University"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio/Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <FileText className="text-black" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Bio & Introduction
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                About You *
              </label>
              <textarea
                name="introduction"
                value={personalInfo.introduction}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors resize-none"
                placeholder="Write a compelling introduction about yourself, your interests, goals, and what makes you unique..."
              />
              <p className="text-xs text-gray-500 mt-2">
                This will be displayed prominently on your portfolio. Make it
                engaging and professional.
              </p>
            </div>
          </motion.div>

          {/* Files Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Upload className="text-black" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">
                Profile Assets
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Image className="inline mr-2" size={16} />
                  Profile Image
                </label>
                <div className="space-y-4">
                  {personalInfo.profileImage && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-600">
                      <img
                        src={personalInfo.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "profileImage")}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
                  />
                  <p className="text-xs text-gray-500">
                    Upload JPG, PNG, or WebP. Max 5MB.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FileText className="inline mr-2" size={16} />
                  Resume/CV
                </label>
                <div className="space-y-4">
                  {personalInfo.resumePdf && (
                    <div className="p-3 bg-green-600/20 border border-green-600/30 rounded-lg">
                      <p className="text-green-400 text-sm">
                        ✓ Resume uploaded successfully
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleImageUpload(e, "resumePdf")}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 transition-colors"
                  />
                  <p className="text-xs text-gray-500">
                    Upload PDF format only. Max 10MB.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <div>
              {saveStatus === "success" && (
                <p className="text-green-400 text-sm">
                  ✓ Changes saved successfully!
                </p>
              )}
              {saveStatus === "error" && (
                <p className="text-red-400 text-sm">
                  ✗ Error saving changes. Please try again.
                </p>
              )}
            </div>

            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-400/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutEditor;
