import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  GraduationCap,
  Calendar,
  MapPin,
  Trophy,
  Star,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { Education } from "@/types/portfolio";

const EducationManager: React.FC = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    field: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    current: false,
    gpa: 0,
    achievements: [],
  });
  const [achievementInput, setAchievementInput] = useState("");

  const degreeTypes = [
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Engineering (B.E.)",
    "Bachelor of Science (B.Sc)",
    "Bachelor of Computer Applications (BCA)",
    "Master of Technology (M.Tech)",
    "Master of Science (M.Sc)",
    "Master of Computer Applications (MCA)",
    "Doctor of Philosophy (Ph.D)",
    "Diploma",
    "Certificate",
    "High School",
    "Intermediate/12th",
    "Other",
  ];

  const fieldOptions = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Computer Applications",
    "Computer Science",
    "Information Systems",
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Other",
  ];

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setEducation(manager.getEducation());

    const handleDataUpdate = () => {
      setEducation(manager.getEducation());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const handleAddEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim()) return;

    const manager = PortfolioManager.getInstance();
    manager.addEducation(newEducation);
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      current: false,
      gpa: 0,
      achievements: [],
    });
    setIsAddingNew(false);
  };

  const handleUpdateEducation = (
    id: string,
    updatedEducation: Partial<Education>,
  ) => {
    const manager = PortfolioManager.getInstance();
    manager.updateEducation(id, updatedEducation);
    setEditingEducation(null);
  };

  const handleDeleteEducation = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      const manager = PortfolioManager.getInstance();
      manager.deleteEducation(id);
    }
  };

  const addAchievement = (eduData: any, setEduData: any) => {
    if (
      achievementInput.trim() &&
      !eduData.achievements.includes(achievementInput.trim())
    ) {
      setEduData((prev: any) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const removeAchievement = (
    achievement: string,
    eduData: any,
    setEduData: any,
  ) => {
    setEduData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter((a: string) => a !== achievement),
    }));
  };

  const getStatusBadge = (edu: Education) => {
    if (edu.current) {
      return {
        text: "Current",
        color: "text-green-400",
        bg: "bg-green-400/20",
        border: "border-green-400/30",
      };
    }

    const endDate = new Date(edu.endDate || new Date());
    const now = new Date();

    if (endDate > now) {
      return {
        text: "Upcoming",
        color: "text-blue-400",
        bg: "bg-blue-400/20",
        border: "border-blue-400/30",
      };
    } else {
      return {
        text: "Completed",
        color: "text-gray-400",
        bg: "bg-gray-400/20",
        border: "border-gray-400/30",
      };
    }
  };

  const sortedEducation = [...education].sort((a, b) => {
    // Current education first, then by start date (newest first)
    if (a.current && !b.current) return -1;
    if (!a.current && b.current) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

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
                Education Management
              </h1>
              <p className="text-gray-400">
                Manage your academic background and qualifications
              </p>
            </div>
            <motion.button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Add Education</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add New Education Modal */}
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
                    Add Education Entry
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
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) =>
                          setNewEducation((prev) => ({
                            ...prev,
                            institution: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-colors"
                        placeholder="University/College/School name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Degree/Qualification *
                      </label>
                      <select
                        value={newEducation.degree}
                        onChange={(e) =>
                          setNewEducation((prev) => ({
                            ...prev,
                            degree: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-colors"
                      >
                        <option value="">Select degree type</option>
                        {degreeTypes.map((degree) => (
                          <option key={degree} value={degree}>
                            {degree}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Field of Study
                      </label>
                      <select
                        value={newEducation.field}
                        onChange={(e) =>
                          setNewEducation((prev) => ({
                            ...prev,
                            field: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-colors"
                      >
                        <option value="">Select field of study</option>
                        {fieldOptions.map((field) => (
                          <option key={field} value={field}>
                            {field}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          value={newEducation.startDate}
                          onChange={(e) =>
                            setNewEducation((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={newEducation.endDate}
                          onChange={(e) =>
                            setNewEducation((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          disabled={newEducation.current}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-purple-400/50 transition-colors disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="current"
                        checked={newEducation.current}
                        onChange={(e) =>
                          setNewEducation((prev) => ({
                            ...prev,
                            current: e.target.checked,
                            endDate: e.target.checked ? "" : prev.endDate,
                          }))
                        }
                        className="w-4 h-4 text-purple-400 bg-gray-900 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                      />
                      <label
                        htmlFor="current"
                        className="text-sm font-medium text-gray-300 flex items-center"
                      >
                        <Star size={16} className="mr-1" />
                        Currently Studying Here
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GPA/Percentage (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={newEducation.gpa || ""}
                        onChange={(e) =>
                          setNewEducation((prev) => ({
                            ...prev,
                            gpa: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-colors"
                        placeholder="e.g., 8.5 (out of 10)"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Achievements & Honors
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={achievementInput}
                          onChange={(e) => setAchievementInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(),
                            addAchievement(newEducation, setNewEducation))
                          }
                          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-colors"
                          placeholder="Add achievement and press Enter"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            addAchievement(newEducation, setNewEducation)
                          }
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {newEducation.achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-purple-600/20 border border-purple-600/30 rounded-lg text-purple-400 text-sm"
                          >
                            <span className="flex-1">{achievement}</span>
                            <button
                              onClick={() =>
                                removeAchievement(
                                  achievement,
                                  newEducation,
                                  setNewEducation,
                                )
                              }
                              className="ml-2 text-purple-400 hover:text-purple-300"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Add awards, honors, scholarships, dean's list, etc.
                      </p>
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
                    onClick={handleAddEducation}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Education
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Education List */}
        <div className="space-y-6">
          {sortedEducation.map((edu, index) => {
            const statusBadge = getStatusBadge(edu);

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-black" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-purple-400 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color} ${statusBadge.bg} ${statusBadge.border} border`}
                      >
                        {statusBadge.text}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                      {edu.field && (
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          Field: {edu.field}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.current
                          ? "Present"
                          : edu.endDate
                            ? new Date(edu.endDate).getFullYear()
                            : "Present"}
                      </div>
                      {edu.gpa && edu.gpa > 0 && (
                        <div className="flex items-center">
                          <Trophy size={14} className="mr-2" />
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>

                    {edu.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">
                          Achievements & Honors:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map(
                            (achievement, achievementIndex) => (
                              <span
                                key={achievementIndex}
                                className="px-2 py-1 bg-purple-600/20 border border-purple-600/30 rounded text-purple-400 text-xs"
                              >
                                {achievement}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingEducation(edu)}
                      className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {sortedEducation.length === 0 && (
            <div className="text-center py-16">
              <GraduationCap size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No education entries yet
              </h3>
              <p className="text-gray-600">
                Add your academic background to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EducationManager;
