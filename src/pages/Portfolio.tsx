import React, { useEffect } from "react";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import { checkAndResetData } from "@/lib/reset-data";

const Portfolio: React.FC = () => {
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
    <div className="min-h-screen bg-black text-white">
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
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Portfolio Website. Built with React &
            TypeScript.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Designed with ❤️ for showcasing talent and connecting with
            opportunities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
