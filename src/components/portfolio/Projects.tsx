import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Filter, X } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { Project } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTheme } from "@/contexts/ThemeContext";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isInView: isVisible } = useScrollAnimation();
  const { isDark } = useTheme();

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    const projectsData = manager.getProjects();
    setProjects(projectsData);
    setFilteredProjects(projectsData);

    const handleDataUpdate = () => {
      const updatedProjects = manager.getProjects();
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory,
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm]);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const getStatusColor = (status: string) => {
    if (isDark) {
      switch (status) {
        case "completed":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "in-progress":
          return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "planning":
          return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    } else {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-700 border-green-300";
        case "in-progress":
          return "bg-yellow-100 text-yellow-700 border-yellow-300";
        case "planning":
          return "bg-blue-100 text-blue-700 border-blue-300";
        default:
          return "bg-gray-100 text-gray-700 border-gray-300";
      }
    }
  };

  return (
    <section
      id="projects"
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
              ? 'bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2300d4ff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M0 0h40v40H0V0zm20 20a20 20 0 1 1-40 0 20 20 0 0 1 40 0z"/%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
              : 'bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23374151" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M0 0h40v40H0V0zm20 20a20 20 0 1 1-40 0 20 20 0 0 1 40 0z"/%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
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
              My{" "}
              <span
                className={`${
                  isDark
                    ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Projects
              </span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              A showcase of my development work and creative solutions
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-500 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-400"
                    : "bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? "focus:ring-cyan-400" : "focus:ring-blue-500"
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? isDark
                        ? "bg-gradient-to-r from-cyan-400 to-green-400 text-black"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : isDark
                        ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
                        : "bg-white/70 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group cursor-pointer rounded-2xl border backdrop-blur-lg transition-all duration-500 hover:scale-105 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700/50 hover:border-cyan-400/50"
                      : "bg-white/70 border-gray-200/50 shadow-lg hover:border-blue-400/50"
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-t-2xl h-48">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center transition-colors duration-500 ${
                          isDark
                            ? "bg-gradient-to-br from-gray-700 to-gray-800"
                            : "bg-gradient-to-br from-gray-100 to-gray-200"
                        }`}
                      >
                        <div
                          className={`text-6xl font-bold opacity-20 transition-colors duration-500 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        isDark
                          ? "bg-gradient-to-t from-gray-900/80 to-transparent"
                          : "bg-gradient-to-t from-gray-900/60 to-transparent"
                      }`}
                    />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                      >
                        {project.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 space-y-4">
                    <h3
                      className={`text-xl font-semibold transition-colors duration-500 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm line-clamp-3 transition-colors duration-500 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-500 ${
                              isDark
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 3 && (
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors duration-500 ${
                            isDark
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isDark
                              ? "bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                          Demo
                        </motion.a>
                      )}

                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            isDark
                              ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-16 transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <Filter size={64} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border backdrop-blur-lg transition-colors duration-500 ${
                isDark
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/90 border-gray-200/50"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                <h3
                  className={`text-2xl font-bold transition-colors duration-500 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedProject.title}
                </h3>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-lg transition-colors duration-500 ${
                    isDark
                      ? "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {selectedProject.image && (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}

                <p
                  className={`text-lg leading-relaxed transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                <div>
                  <h4
                    className={`font-semibold mb-3 transition-colors duration-500 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-500 ${
                          isDark
                            ? "bg-cyan-400/20 text-cyan-400"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.demoUrl && (
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      View Demo
                    </motion.a>
                  )}

                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 border rounded-lg font-semibold transition-all duration-300 ${
                        isDark
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700/50"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      View Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
