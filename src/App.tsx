import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import "@/styles/engineering-theme.css";
import "@/styles/animations.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Admin Content Management Routes */}
        <Route path="/admin/about" element={<Dashboard />} />
        <Route path="/admin/skills" element={<Dashboard />} />
        <Route path="/admin/projects" element={<Dashboard />} />
        <Route path="/admin/certifications" element={<Dashboard />} />
        <Route path="/admin/contact" element={<Dashboard />} />
        <Route path="/admin/settings" element={<Dashboard />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
