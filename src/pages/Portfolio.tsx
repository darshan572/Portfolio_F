import React, { useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import { checkAndResetData } from "@/lib/reset-data";
import { useTheme } from "@/contexts/ThemeContext";

const Portfolio: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    // Set page title
    document.title = "Darshan Kumar - Portfolio | B.Tech CSE Student";

    // Check and reset data if needed
    checkAndResetData();

    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-8 transition-colors duration-500 ${
          isDark
            ? "bg-gray-900/50 border-gray-800"
            : "bg-gray-50/50 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className={`transition-colors duration-500 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} Portfolio Website. Built with React &
            TypeScript.
          </p>
          <p
            className={`text-sm mt-2 transition-colors duration-500 ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Designed with ❤️ for showcasing talent and connecting with
            opportunities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
