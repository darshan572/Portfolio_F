import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  User,
  Menu,
  X,
  Clock,
  Home,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthManager from "@/lib/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [sessionTime, setSessionTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authManager = AuthManager.getInstance();

    // Check authentication
    if (!authManager.isAuthenticated()) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
    setAdminUser(authManager.getAdminUser());

    // Update session time every minute
    const updateSessionTime = () => {
      setSessionTime(authManager.formatSessionTimeRemaining());
    };

    updateSessionTime();
    const interval = setInterval(updateSessionTime, 60000); // Update every minute

    // Listen for logout events
    const handleLogout = () => {
      setIsAuthenticated(false);
      navigate("/admin");
    };

    window.addEventListener("adminLogout", handleLogout);

    return () => {
      clearInterval(interval);
      window.removeEventListener("adminLogout", handleLogout);
    };
  }, [navigate]);

  const handleLogout = () => {
    const authManager = AuthManager.getInstance();
    authManager.logout();
    setIsAuthenticated(false);
    navigate("/admin");
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        className="fixed left-0 top-0 h-full w-80 bg-gray-800/90 backdrop-blur-lg border-r border-gray-700/50 z-50 lg:translate-x-0 lg:static lg:z-auto"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Settings className="text-black" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold">Admin Panel</h1>
                <p className="text-xs text-gray-400">Content Manager</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { href: "/admin/dashboard", label: "Dashboard", icon: Home },
              { href: "/admin/about", label: "About Section", icon: User },
              { href: "/admin/skills", label: "Skills", icon: Settings },
              { href: "/admin/projects", label: "Projects", icon: Settings },
              {
                href: "/admin/certifications",
                label: "Certifications",
                icon: Settings,
              },
              { href: "/admin/contact", label: "Contact", icon: Settings },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                whileHover={{ x: 5 }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </motion.a>
            ))}
          </nav>

          {/* User Info */}
          <div className="mt-auto">
            {/* Session Timer */}
            <div className="mb-4 p-3 bg-blue-400/10 border border-blue-400/20 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                <Clock size={16} />
                <span>Session</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{sessionTime}</p>
            </div>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="text-black" size={16} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">
                      {adminUser?.username}
                    </div>
                    <div className="text-xs text-gray-400">Administrator</div>
                  </div>
                </div>
                <ChevronDown
                  className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  size={16}
                />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-gray-700/50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>

            <h2 className="text-xl font-semibold">Portfolio Content Manager</h2>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
