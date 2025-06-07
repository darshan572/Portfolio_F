import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  ExternalLink,
  Calendar,
  Star,
  Filter,
  Search,
} from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { Project } from "@/types/portfolio";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    const allProjects = manager.getProjects();
    setProjects(allProjects);
    setFilteredProjects(allProjects);

    const handleDataUpdate = () => {
      const updatedProjects = manager.getProjects();
      setProjects(updatedProjects);
      applyFilters(updatedProjects, activeFilter, searchTerm);
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, [activeFilter, searchTerm]);

  const applyFilters = (
    projectsList: Project[],
    filter: string,
    search: string,
  ) => {
    let filtered = projectsList;

    // Apply category filter
    if (filter !== "all") {
      if (filter === "featured") {
        filtered = filtered.filter((project) => project.featured);
      } else {
        filtered = filtered.filter(
          (project) => project.category.toLowerCase() === filter.toLowerCase(),
        );
      }
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    }

    setFilteredProjects(filtered);
  };

  useEffect(() => {
    applyFilters(projects, activeFilter, searchTerm);
  }, [projects, activeFilter, searchTerm]);

  // Get unique categories
  const categories = [
    "all",
    "featured",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/20";
      case "in-progress":
        return "text-yellow-400 bg-yellow-400/20";
      case "planned":
        return "text-blue-400 bg-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff6b35" fill-opacity="0.3"%3E%3Cpath d="M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z" fill-rule="nonzero"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
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
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my work, from personal projects to collaborative
              endeavors
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto mt-6" />
          </motion.div>

          {/* Filters and Search */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-400/50 transition-colors"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <Filter className="text-gray-400 mr-2" size={20} />
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 capitalize ${
                      activeFilter === category
                        ? "bg-gradient-to-r from-orange-400 to-red-400 text-black border-transparent"
                        : "text-gray-400 border-gray-600 hover:text-white hover:border-orange-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category === "all" ? "All Projects" : category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="group relative"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-orange-400/50 transition-all duration-300 h-full">
                  {/* Project Image */}
                  {project.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 flex items-center space-x-1 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-medium">
                          <Star size={12} />
                          <span>Featured</span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status.replace("-", " ").toUpperCase()}
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github size={16} />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-600/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-orange-400/20 border border-orange-400/30 rounded text-orange-400 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/20 border border-gray-600/30 rounded text-gray-400 text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(project.startDate).getFullYear()}</span>
                      </div>
                      <span className="capitalize">{project.category}</span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-orange-400/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="text-gray-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Try selecting a different category"}
              </p>
            </motion.div>
          )}

          {/* Projects Stats */}
          {projects.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Project Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {projects.length}
                  </div>
                  <div className="text-sm text-gray-400">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {projects.filter((p) => p.status === "completed").length}
                  </div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {projects.filter((p) => p.status === "in-progress").length}
                  </div>
                  <div className="text-sm text-gray-400">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {
                      Array.from(
                        new Set(projects.flatMap((p) => p.technologies)),
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-400">Technologies</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
