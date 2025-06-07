import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, X } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";

interface ContentEditorProps {
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  title,
  children,
  onSave,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        onSave();
      }
      // Show success message
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving:", error);
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!PortfolioManager.validateImage(file)) {
      throw new Error("Invalid image file");
    }

    return await PortfolioManager.fileToBase64(file);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Changes</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default ContentEditor;
