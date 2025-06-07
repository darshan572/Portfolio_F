import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const MagneticCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Optimized mouse position update with RAF
  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    },
    [isVisible],
  );

  // Throttled hover handlers
  const handleMouseEnter = useCallback(() => setCursorVariant("hover"), []);
  const handleMouseLeave = useCallback(() => setCursorVariant("default"), []);

  // Hide cursor when mouse leaves window
  const handleMouseLeave2 = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter2 = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    // Add event listeners with passive option for better performance
    const addListenersToElements = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], [data-magnetic], .cursor-hover',
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    };

    // Initial setup
    const cleanup = addListenersToElements();

    // Re-setup on DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      cleanup();
      addListenersToElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Mouse position tracking
    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    window.addEventListener("mouseleave", handleMouseLeave2, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter2, { passive: true });

    return () => {
      cleanup();
      observer.disconnect();
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave2);
      window.removeEventListener("mouseenter", handleMouseEnter2);
    };
  }, [
    updateMousePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseLeave2,
    handleMouseEnter2,
  ]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
    },
  };

  const trailVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
    },
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - works alongside default cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] will-change-transform"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.4,
        }}
        style={{
          transform: `translate3d(${mousePosition.x - 16}px, ${mousePosition.y - 16}px, 0)`,
        }}
      >
        <div className="w-full h-full bg-white/80 rounded-full border-2 border-white/40 backdrop-blur-sm"></div>
      </motion.div>

      {/* Trail cursor - simplified for performance */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9998] will-change-transform"
        variants={trailVariants}
        animate="default"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.6,
        }}
        style={{
          transform: `translate3d(${mousePosition.x - 8}px, ${mousePosition.y - 8}px, 0)`,
        }}
      >
        <div className="w-full h-full bg-red-500 rounded-full opacity-70 shadow-lg shadow-red-500/30"></div>
      </motion.div>

      {/* Outer ring - lightest for performance */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9997] border-2 border-white/30 rounded-full will-change-transform"
        variants={ringVariants}
        animate="default"
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.8,
        }}
        style={{
          transform: `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0)`,
        }}
      />
    </>
  );
};

export default MagneticCursor;
