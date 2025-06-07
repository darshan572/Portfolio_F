import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Code,
  Database,
  Wrench,
  Monitor,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { Skill } from "@/types/portfolio";

const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 50,
    category: "programming",
    color: "#3178c6",
  });

  const categories = [
    {
      id: "programming",
      label: "Programming Languages",
      icon: Code,
      color: "from-blue-400 to-purple-400",
    },
    {
      id: "framework",
      label: "Frameworks & Libraries",
      icon: Monitor,
      color: "from-green-400 to-cyan-400",
    },
    {
      id: "tool",
      label: "Tools & Software",
      icon: Wrench,
      color: "from-orange-400 to-red-400",
    },
    {
      id: "database",
      label: "Databases",
      icon: Database,
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: "other",
      label: "Other Skills",
      icon: Monitor,
      color: "from-purple-400 to-pink-400",
    },
  ];

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setSkills(manager.getSkills());

    const handleDataUpdate = () => {
      setSkills(manager.getSkills());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    const manager = PortfolioManager.getInstance();
    manager.addSkill(newSkill);
    setNewSkill({
      name: "",
      level: 50,
      category: "programming",
      color: "#3178c6",
    });
    setIsAddingNew(false);
  };

  const handleUpdateSkill = (id: string, updatedSkill: Partial<Skill>) => {
    const manager = PortfolioManager.getInstance();
    manager.updateSkill(id, updatedSkill);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const manager = PortfolioManager.getInstance();
      manager.deleteSkill(id);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.icon || Code;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "from-blue-400 to-purple-400";
  };

  const groupedSkills = categories.map((category) => ({
    ...category,
    skills: skills.filter((skill) => skill.category === category.id),
  }));

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
                Skills Management
              </h1>
              <p className="text-gray-400">
                Add, edit, and organize your technical skills
              </p>
            </div>
            <motion.button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Add New Skill</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add New Skill Modal */}
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
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Add New Skill
                  </h3>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) =>
                        setNewSkill((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
                      placeholder="e.g., JavaScript, React, Python"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={newSkill.category}
                      onChange={(e) =>
                        setNewSkill((prev) => ({
                          ...prev,
                          category: e.target.value as any,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Proficiency Level: {newSkill.level}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) =>
                        setNewSkill((prev) => ({
                          ...prev,
                          level: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color
                    </label>
                    <input
                      type="color"
                      value={newSkill.color}
                      onChange={(e) =>
                        setNewSkill((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                      className="w-full h-12 bg-gray-900/50 border border-gray-600/50 rounded-lg cursor-pointer"
                    />
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
                    onClick={handleAddSkill}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Skill
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills by Category */}
        <div className="space-y-8">
          {groupedSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}
                >
                  <category.icon className="text-black" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {category.label}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>

              {category.skills.length > 0 ? (
                <div className="grid gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4"
                    >
                      {editingSkill?.id === skill.id ? (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingSkill.name}
                              onChange={(e) =>
                                setEditingSkill((prev) =>
                                  prev
                                    ? { ...prev, name: e.target.value }
                                    : null,
                                )
                              }
                              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                            />
                            <select
                              value={editingSkill.category}
                              onChange={(e) =>
                                setEditingSkill((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        category: e.target.value as any,
                                      }
                                    : null,
                                )
                              }
                              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                            >
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">
                              Level: {editingSkill.level}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editingSkill.level}
                              onChange={(e) =>
                                setEditingSkill((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        level: parseInt(e.target.value),
                                      }
                                    : null,
                                )
                              }
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleUpdateSkill(skill.id, editingSkill)
                              }
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Save size={16} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingSkill(null)}
                              className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <X size={16} />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: skill.color }}
                              />
                              <h3 className="text-lg font-medium text-white">
                                {skill.name}
                              </h3>
                              <span className="text-sm text-gray-400">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${skill.level}%`,
                                  backgroundColor: skill.color,
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => setEditingSkill(skill)}
                              className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <category.icon
                    size={48}
                    className="mx-auto mb-3 opacity-50"
                  />
                  <p>No skills in this category yet</p>
                  <p className="text-sm">
                    Add your first {category.label.toLowerCase()}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SkillsManager;
