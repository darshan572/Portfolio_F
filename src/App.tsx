import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import AboutEditor from "@/pages/admin/AboutEditor";
import SkillsManager from "@/pages/admin/SkillsManager";
import ProjectsManager from "@/pages/admin/ProjectsManager";
import CertificationsManager from "@/pages/admin/CertificationsManager";
import ContactAnalytics from "@/pages/admin/ContactAnalytics";
import EducationManager from "@/pages/admin/EducationManager";
import MagneticCursor from "@/components/ui/MagneticCursor";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/styles/engineering-theme.css";
import "@/styles/animations.css";

function App() {
  return (
    <ThemeProvider>
      {/* Set basename for GitHub Pages deployment */}
      <BrowserRouter basename="/Portfolio_F">
        <MagneticCursor />
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<Portfolio />} />

          {/* Admin Login */}
          <Route path="/admin" element={<Login />} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Admin Content Management Pages */}
          <Route path="/admin/about" element={<AboutEditor />} />
          <Route path="/admin/skills" element={<SkillsManager />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route
            path="/admin/certifications"
            element={<CertificationsManager />}
          />
          <Route path="/admin/education" element={<EducationManager />} />
          <Route path="/admin/contact" element={<ContactAnalytics />} />

          {/* 404 Fallback */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
