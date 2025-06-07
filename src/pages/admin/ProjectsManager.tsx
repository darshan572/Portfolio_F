import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FolderOpen,
  ExternalLink,
  Github,
  Calendar,
  Star,
  Image,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { Project } from "@/types/portfolio";

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProject, setNewProject] = useState<
    Omit<Project, "id" | "createdAt">
  >({
    title: "",
    description: "",
    longDescription: "",
    technologies: [],
    images: [],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "Web Development",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    status: "in-progress",
  });
  const [techInput, setTechInput] = useState("");

  const categories = [
    "Web Development",
    "Mobile App",
    "Desktop Application",
    "Machine Learning",
    "Data Science",
    "Game Development",
    "API Development",
    "Database Design",
    "Other",
  ];

  const statusOptions = [
    { value: "completed", label: "Completed", color: "text-green-400" },
    { value: "in-progress", label: "In Progress", color: "text-yellow-400" },
    { value: "planned", label: "Planned", color: "text-blue-400" },
  ];

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setProjects(manager.getProjects());

    const handleDataUpdate = () => {
      setProjects(manager.getProjects());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) return;

    const manager = PortfolioManager.getInstance();
    manager.addProject(newProject);
    setNewProject({
      title: "",
      description: "",
      longDescription: "",
      technologies: [],
      images: [],
      liveUrl: "",
      githubUrl: "",
      featured: false,
      category: "Web Development",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "in-progress",
    });
    setIsAddingNew(false);
  };

  const handleUpdateProject = (
    id: string,
    updatedProject: Partial<Project>,
  ) => {
    const manager = PortfolioManager.getInstance();
    manager.updateProject(id, updatedProject);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const manager = PortfolioManager.getInstance();
      manager.deleteProject(id);
    }
  };

  const addTechnology = (projectData: any, setProjectData: any) => {
    if (
      techInput.trim() &&
      !projectData.technologies.includes(techInput.trim())
    ) {
      setProjectData((prev: any) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (
    tech: string,
    projectData: any,
    setProjectData: any,
  ) => {
    setProjectData((prev: any) => ({
      ...prev,
      technologies: prev.technologies.filter((t: string) => t !== tech),
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    projectData: any,
    setProjectData: any,
  ) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      if (PortfolioManager.validateImage(file)) {
        try {
          const base64 = await PortfolioManager.fileToBase64(file);
          setProjectData((prev: any) => ({
            ...prev,
            images: [...prev.images, base64],
          }));
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
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
                Projects Management
              </h1>
              <p className="text-gray-400">
                Showcase your work and achievements
              </p>
            </div>
            <motion.button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              <span>Add New Project</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add New Project Modal */}
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
                    Add New Project
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
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                        placeholder="Project name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400/50 transition-colors"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={newProject.status}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            status: e.target.value as any,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400/50 transition-colors"
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={newProject.startDate}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          End Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={newProject.endDate}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              endDate: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newProject.featured}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-orange-400 bg-gray-900 border-gray-600 rounded focus:ring-orange-400 focus:ring-2"
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm font-medium text-gray-300 flex items-center"
                      >
                        <Star size={16} className="mr-1" />
                        Featured Project
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Short Description *
                      </label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors resize-none"
                        placeholder="Brief project description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Detailed Description
                      </label>
                      <textarea
                        value={newProject.longDescription}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            longDescription: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors resize-none"
                        placeholder="Detailed project description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={newProject.liveUrl}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            liveUrl: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                        placeholder="https://your-project.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GitHub Repository
                      </label>
                      <input
                        type="url"
                        value={newProject.githubUrl}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            githubUrl: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Technologies Used
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(),
                          addTechnology(newProject, setNewProject))
                        }
                        className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                        placeholder="Add technology and press Enter"
                      />
                      <button
                        type="button"
                        onClick={() => addTechnology(newProject, setNewProject)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-orange-600/20 border border-orange-600/30 rounded-full text-orange-400 text-sm"
                        >
                          {tech}
                          <button
                            onClick={() =>
                              removeTechnology(tech, newProject, setNewProject)
                            }
                            className="ml-2 text-orange-400 hover:text-orange-300"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleImageUpload(e, newProject, setNewProject)
                      }
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-700 transition-colors"
                    />
                    {newProject.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newProject.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Project ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() =>
                                setNewProject((prev) => ({
                                  ...prev,
                                  images: prev.images.filter(
                                    (_, i) => i !== index,
                                  ),
                                }))
                              }
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                    onClick={handleAddProject}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Add Project
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star
                        className="text-yellow-400"
                        size={20}
                        fill="currentColor"
                      />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusOptions.find((s) => s.value === project.status)
                          ?.color
                      } bg-current bg-opacity-20`}
                    >
                      {
                        statusOptions.find((s) => s.value === project.status)
                          ?.label
                      }
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 5).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-orange-600/20 border border-orange-600/30 rounded text-orange-400 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 bg-gray-600/20 border border-gray-600/30 rounded text-gray-400 text-xs">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(project.startDate).getFullYear()}
                    </span>
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => setEditingProject(project)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {project.images.length > 0 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {project.images.slice(0, 3).map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${project.title} ${imgIndex + 1}`}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                  {project.images.length > 3 && (
                    <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                      +{project.images.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-16">
              <FolderOpen size={64} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600">
                Add your first project to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectsManager;
