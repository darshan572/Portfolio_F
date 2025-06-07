import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Code,
  FolderOpen,
  Award,
  Mail,
  TrendingUp,
  Calendar,
  Activity,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import PortfolioManager from "@/lib/portfolio-manager";
import { PortfolioData } from "@/types/portfolio";

const Dashboard: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const manager = PortfolioManager.getInstance();
    setPortfolioData(manager.getData());
    setLastUpdated(new Date().toLocaleString());
    setIsLoading(false);

    const handleDataUpdate = () => {
      setPortfolioData(manager.getData());
      setLastUpdated(new Date().toLocaleString());
    };

    window.addEventListener("portfolioDataUpdated", handleDataUpdate);
    return () =>
      window.removeEventListener("portfolioDataUpdated", handleDataUpdate);
  }, []);

  const handleExportData = () => {
    if (!portfolioData) return;

    const manager = PortfolioManager.getInstance();
    const dataStr = manager.exportData();
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const manager = PortfolioManager.getInstance();
      const success = manager.importData(content);

      if (success) {
        alert("Data imported successfully!");
      } else {
        alert("Error importing data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const stats = [
    {
      label: "Skills",
      value: portfolioData?.skills.length || 0,
      icon: Code,
      color: "from-blue-400 to-purple-400",
      change: "+2 this month",
    },
    {
      label: "Projects",
      value: portfolioData?.projects.length || 0,
      icon: FolderOpen,
      color: "from-orange-400 to-red-400",
      change: `${portfolioData?.projects.filter((p) => p.status === "completed").length || 0} completed`,
    },
    {
      label: "Certifications",
      value: portfolioData?.certifications.length || 0,
      icon: Award,
      color: "from-yellow-400 to-orange-400",
      change: "All verified",
    },
    {
      label: "Experience",
      value: portfolioData?.experience.length || 0,
      icon: TrendingUp,
      color: "from-green-400 to-cyan-400",
      change: "2+ years learning",
    },
  ];

  const recentActivity = [
    {
      action: "Profile updated",
      time: "2 hours ago",
      icon: User,
      color: "text-blue-400",
    },
    {
      action: "New project added",
      time: "1 day ago",
      icon: FolderOpen,
      color: "text-orange-400",
    },
    {
      action: "Skills section updated",
      time: "3 days ago",
      icon: Code,
      color: "text-purple-400",
    },
    {
      action: "Contact info changed",
      time: "1 week ago",
      icon: Mail,
      color: "text-green-400",
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back! Here's your portfolio overview.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-white">{lastUpdated}</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              <span>Export Data</span>
            </motion.button>

            <motion.label
              className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload size={16} />
              <span>Import Data</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </motion.label>

            <motion.button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600/20 border border-gray-600/30 rounded-lg text-gray-400 hover:bg-gray-600/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="text-black" size={24} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Recent Activity
              </h3>
              <Activity className="text-gray-400" size={20} />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ${activity.color}`}
                  >
                    <activity.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Portfolio Status */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Portfolio Status
              </h3>
              <Calendar className="text-gray-400" size={20} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Profile Completion</span>
                <span className="text-green-400 font-semibold">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">✓ Personal Info</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">✓ Skills Added</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">⚠ Projects</span>
                  <span className="text-yellow-400">Needs More</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">✗ Resume</span>
                  <span className="text-red-400">Missing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-semibold mb-6 text-white">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: "About",
                href: "/admin/about",
                icon: User,
                color: "from-blue-400 to-purple-400",
              },
              {
                label: "Skills",
                href: "/admin/skills",
                icon: Code,
                color: "from-purple-400 to-pink-400",
              },
              {
                label: "Projects",
                href: "/admin/projects",
                icon: FolderOpen,
                color: "from-orange-400 to-red-400",
              },
              {
                label: "Certificates",
                href: "/admin/certifications",
                icon: Award,
                color: "from-yellow-400 to-orange-400",
              },
              {
                label: "Contact",
                href: "/admin/contact",
                icon: Mail,
                color: "from-green-400 to-cyan-400",
              },
              {
                label: "Settings",
                href: "/admin/settings",
                icon: RefreshCw,
                color: "from-gray-400 to-gray-600",
              },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="flex flex-col items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center mb-2 group-hover:shadow-lg`}
                >
                  <link.icon className="text-black" size={20} />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Dashboard;
