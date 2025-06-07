import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-orange-400 origin-left z-50"
        style={{
          scaleX: scrollProgress / 100,
        }}
        initial={{ scaleX: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />

      {/* Progress Circle (shows on scroll) */}
      {scrollProgress > 10 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative w-16 h-16">
            {/* Background circle */}
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
                fill="transparent"
              />
              {/* Progress circle */}
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 28}`,
                  strokeDashoffset: `${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#00ff88" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </linearGradient>
              </defs>
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;
