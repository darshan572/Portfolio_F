import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Database,
  Wrench,
  Monitor,
  Server,
  Smartphone,
} from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { Skill } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const categories = [
    { id: "all", label: "All Skills", icon: Monitor },
    { id: "programming", label: "Programming", icon: Code },
    { id: "framework", label: "Frameworks", icon: Server },
    { id: "tool", label: "Tools", icon: Wrench },
    { id: "database", label: "Databases", icon: Database },
    { id: "other", label: "Other", icon: Smartphone },
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

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const getSkillColor = (category: string) => {
    const colors = {
      programming: "from-blue-400 to-purple-400",
      framework: "from-green-400 to-cyan-400",
      tool: "from-orange-400 to-red-400",
      database: "from-yellow-400 to-orange-400",
      other: "from-purple-400 to-pink-400",
    };
    return (
      colors[category as keyof typeof colors] || "from-gray-400 to-gray-600"
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillCardVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%2300d4ff" fill-opacity="0.3"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10-10c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E\')] bg-repeat'
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
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-6" />
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-cyan-400 to-blue-400 text-black border-transparent"
                      : "text-gray-400 border-gray-600 hover:text-white hover:border-cyan-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon size={16} />
                  <span className="text-sm font-medium">{category.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
                layout
                className="group relative"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {skill.icon && (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-400 capitalize">
                          {skill.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-cyan-400">
                        {skill.level}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${getSkillColor(skill.category)} rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + 0.5,
                          ease: "easeOut",
                        }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </motion.div>
                    </div>

                    {/* Skill Level Indicator */}
                    <div className="mt-2 text-xs text-gray-500">
                      {skill.level >= 90
                        ? "Expert"
                        : skill.level >= 70
                          ? "Advanced"
                          : skill.level >= 50
                            ? "Intermediate"
                            : "Beginner"}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Skills Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(1).map((category) => {
                const categorySkills = skills.filter(
                  (skill) => skill.category === category.id,
                );
                const avgLevel =
                  categorySkills.length > 0
                    ? Math.round(
                        categorySkills.reduce(
                          (sum, skill) => sum + skill.level,
                          0,
                        ) / categorySkills.length,
                      )
                    : 0;

                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center">
                      <category.icon className="text-cyan-400" size={24} />
                    </div>
                    <div className="text-lg font-semibold text-white">
                      {categorySkills.length}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {category.label}
                    </div>
                    <div className="text-xs text-cyan-400">
                      Avg: {avgLevel}%
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Code className="text-gray-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No skills found
              </h3>
              <p className="text-gray-600">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
