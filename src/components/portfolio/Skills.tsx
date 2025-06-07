import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Smartphone, Server, Cpu } from "lucide-react";
import PortfolioManager from "@/lib/portfolio-manager";
import { Skill } from "@/types/portfolio";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTheme } from "@/contexts/ThemeContext";

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { ref, isVisible } = useScrollAnimation();
  const { isDark } = useTheme();

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

  const getSkillIcon = (category: string) => {
    const iconMap = {
      Frontend: Globe,
      Backend: Server,
      Database: Database,
      Mobile: Smartphone,
      DevOps: Cpu,
      Programming: Code,
    };
    return iconMap[category as keyof typeof iconMap] || Code;
  };

  const getSkillColor = (level: number) => {
    if (isDark) {
      if (level >= 80) return "from-green-400 to-emerald-500";
      if (level >= 60) return "from-blue-400 to-cyan-500";
      if (level >= 40) return "from-yellow-400 to-orange-500";
      return "from-red-400 to-pink-500";
    } else {
      if (level >= 80) return "from-green-500 to-emerald-600";
      if (level >= 60) return "from-blue-500 to-cyan-600";
      if (level >= 40) return "from-yellow-500 to-orange-600";
      return "from-red-500 to-pink-600";
    }
  };

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <section
      id="skills"
      className={`min-h-screen py-20 relative overflow-hidden transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-900 to-black"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
      }`}
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Code Symbols */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-6xl font-mono opacity-5 select-none transition-colors duration-500 ${
              isDark ? "text-cyan-400" : "text-blue-500"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {
              ["</>", "{}", "[]", "()", "&&", "||", "!=", "==="][
                Math.floor(Math.random() * 8)
              ]
            }
          </motion.div>
        ))}
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
              Technical{" "}
              <span
                className={`${
                  isDark
                    ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                Skills
              </span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Technologies and tools I work with
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(
              ([category, categorySkills], categoryIndex) => {
                const IconComponent = getSkillIcon(category);
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-500 hover:scale-105 ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700/50 hover:border-cyan-400/50"
                        : "bg-white/70 border-gray-200/50 shadow-lg hover:border-blue-400/50"
                    }`}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`p-3 rounded-xl ${
                          isDark
                            ? "bg-gradient-to-r from-cyan-400/20 to-green-400/20"
                            : "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                        }`}
                      >
                        <IconComponent
                          className={`${
                            isDark ? "text-cyan-400" : "text-blue-600"
                          }`}
                          size={24}
                        />
                      </div>
                      <h3
                        className={`text-xl font-semibold transition-colors duration-500 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {category}
                      </h3>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isVisible
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span
                              className={`font-medium transition-colors duration-500 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {skill.name}
                            </span>
                            <span
                              className={`text-sm px-2 py-1 rounded-full ${
                                isDark
                                  ? "bg-gray-700/50 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div
                            className={`h-2 rounded-full overflow-hidden ${
                              isDark ? "bg-gray-700/50" : "bg-gray-200"
                            }`}
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-r ${getSkillColor(skill.level)} rounded-full`}
                              initial={{ width: 0 }}
                              animate={
                                isVisible
                                  ? { width: `${skill.level}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                duration: 1.5,
                                delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              },
            )}
          </div>

          {/* Additional Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`mt-16 p-8 rounded-2xl border backdrop-blur-lg text-center transition-all duration-500 ${
              isDark
                ? "bg-gray-800/30 border-gray-700/30"
                : "bg-white/50 border-gray-200/30 shadow-lg"
            }`}
          >
            <h3
              className={`text-2xl font-semibold mb-4 transition-colors duration-500 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Always Learning
            </h3>
            <p
              className={`text-lg max-w-3xl mx-auto transition-colors duration-500 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Technology evolves rapidly, and I'm committed to continuous
              learning. I regularly explore new frameworks, tools, and best
              practices to stay current with industry trends and deliver
              innovative solutions.
            </p>

            {/* Skill Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                {
                  label: "Languages",
                  count: skills.filter((s) => s.category === "Programming")
                    .length,
                },
                {
                  label: "Frameworks",
                  count: skills.filter(
                    (s) =>
                      s.category === "Frontend" || s.category === "Backend",
                  ).length,
                },
                {
                  label: "Tools",
                  count: skills.filter(
                    (s) => s.category === "DevOps" || s.category === "Database",
                  ).length,
                },
                { label: "Years Experience", count: "2+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isVisible
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div
                    className={`text-3xl font-bold transition-colors duration-500 ${
                      isDark
                        ? "bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    }`}
                  >
                    {stat.count}
                  </div>
                  <div
                    className={`text-sm transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
