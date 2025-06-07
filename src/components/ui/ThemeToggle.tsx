import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      data-magnetic
      className={`
        relative p-2 rounded-lg transition-all duration-300 group
        ${
          isDark
            ? "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
            : "bg-gray-100/50 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} />
        </motion.div>
      </div>

      {/* Tooltip */}
      <div
        className={`
        absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50
        ${
          isDark
            ? "bg-gray-800 text-white border border-gray-700"
            : "bg-white text-gray-900 border border-gray-200 shadow-lg"
        }
      `}
      >
        {isDark ? "Light mode" : "Dark mode"}
        <div
          className={`
          absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
          ${isDark ? "bg-gray-800 border-l border-t border-gray-700" : "bg-white border-l border-t border-gray-200"}
        `}
        />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
