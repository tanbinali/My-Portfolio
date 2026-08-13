import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCode, 
  FaGamepad, 
  FaBolt, 
  FaFire, 
  FaTerminal, 
  FaBug 
} from "react-icons/fa";
import { SiPython, SiReact, SiJavascript } from "react-icons/si";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// Import your logo
import logo from "../assets/logo.webp";

// Customized "#1" Icon using your Pixelify Sans font
const NumberOneIcon = ({ className }) => (
  <span 
    className={`${className} leading-none tracking-wider font-bold`} 
    style={{ fontFamily: "'Pixelify Sans', sans-serif", color: "inherit" }}
  >
    #1
  </span>
);

// Icons used for the rapid flashing effect
const flashIcons = [FaBolt, FaFire, FaTerminal, FaBug, SiPython, SiReact, SiJavascript];

// The final 3 icons that represent you
const finalIcons = [FaCode, FaGamepad, NumberOneIcon];

const LoadingScreen = ({ onComplete }) => {
  const [slot1, setSlot1] = useState(0);
  const [slot2, setSlot2] = useState(0);
  const [slot3, setSlot3] = useState(0);

  const [isLocked1, setIsLocked1] = useState(false);
  const [isLocked2, setIsLocked2] = useState(false);
  const [isLocked3, setIsLocked3] = useState(false);
  
  const [showWelcome, setShowWelcome] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Helper to get a random icon index
    const getRandomIndex = () => Math.floor(Math.random() * flashIcons.length);

    // The Rapid Flashing Engine
    const flashInterval = setInterval(() => {
      setSlot1((prev) => (isLocked1 ? prev : getRandomIndex()));
      setSlot2((prev) => (isLocked2 ? prev : getRandomIndex()));
      setSlot3((prev) => (isLocked3 ? prev : getRandomIndex()));
    }, 60);

    // Sequence the lock-ins
    const lock1Timer = setTimeout(() => setIsLocked1(true), 800);
    const lock2Timer = setTimeout(() => setIsLocked2(true), 1400);
    const lock3Timer = setTimeout(() => setIsLocked3(true), 2000); 

    // Trigger Shiny text exactly at 2.4s
    const welcomeTimer = setTimeout(() => setShowWelcome(true), 2400);

    // Trigger the slide-away animation
    const exitTimer = setTimeout(() => setIsExiting(true), 4500);

    // Tell App.jsx to unmount this component completely
    const unmountTimer = setTimeout(() => onComplete(), 5300);

    // Cleanup timers
    return () => {
      clearInterval(flashInterval);
      clearTimeout(lock1Timer);
      clearTimeout(lock2Timer);
      clearTimeout(lock3Timer);
      clearTimeout(welcomeTimer);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [isLocked1, isLocked2, isLocked3, onComplete]);

  // Helper component to render an individual slot (Now Jade/Green when locked)
  const Slot = ({ isLocked, flashIndex, finalIconIndex }) => {
    const Icon = isLocked ? finalIcons[finalIconIndex] : flashIcons[flashIndex];
    const borderColor = isLocked ? "#00ff99" : "#374151"; 
    const shadowColor = isLocked ? "rgba(0, 255, 153, 0.3)" : "transparent";
    
    return (
      <motion.div
        animate={isLocked ? { scale: [1, 1.2, 1], color: "#00ff99" } : { color: "#4b5563" }}
        transition={{ duration: 0.3 }}
        className="relative flex-none aspect-square w-16 xs:w-20 sm:w-24"
      >
        {/* Desktop: ElectricBorder */}
        <div className="hidden md:block w-full h-full">
          <ElectricBorder
            color={borderColor}
            speed={0.8}
            chaos={0.1}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div 
              className={`w-full aspect-square flex items-center justify-center rounded-2xl transition-colors duration-300 ${
                isLocked ? "bg-[#00ff99]/10" : "bg-gray-900/50"
              }`}
            >
              <Icon className="text-3xl sm:text-4xl" />
            </div>
          </ElectricBorder>
        </div>

        {/* Mobile/Tablet: Normal Neon */}
        <div className="block md:hidden w-full h-full">
          <div
            className={`w-full h-full flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
              isLocked ? "bg-[#00ff99]/10" : "bg-gray-900/50"
            }`}
            style={{
              borderColor: borderColor,
              boxShadow: `0 0 15px ${shadowColor}`,
            }}
          >
            <Icon className="text-2xl xs:text-3xl sm:text-4xl" />
          </div>
        </div>
      </motion.div>
    );
  };

  // Abstract inner content for cleaner responsive layout
  const innerContent = (
    <>
      {/* System Status Pill with Gold Electric Border */}
      <div className="text-center">
        {/* Desktop: ElectricBorder */}
        <div className="hidden md:inline-block">
          <ElectricBorder
            color="#FFD700"
            speed={0.8}
            chaos={0.1}
            thickness={1.5}
            style={{ borderRadius: 9999 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#FFD700] tracking-widest" style={{ fontFamily: "'Iceland', sans-serif" }}>
                SYSTEM BOOT SEQUENCE
              </span>
            </div>
          </ElectricBorder>
        </div>

        {/* Mobile/Tablet: Normal Gold Neon Pill */}
        <div className="inline-block md:hidden">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700] backdrop-blur-md"
            style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#FFD700] tracking-widest" style={{ fontFamily: "'Iceland', sans-serif" }}>
              SYSTEM BOOT SEQUENCE
            </span>
          </div>
        </div>
      </div>

      {/* Slots Container */}
      <div className="flex justify-center gap-4 sm:gap-6 my-4">
        <Slot isLocked={isLocked1} flashIndex={slot1} finalIconIndex={0} />
        <Slot isLocked={isLocked2} flashIndex={slot2} finalIconIndex={1} />
        <Slot isLocked={isLocked3} flashIndex={slot3} finalIconIndex={2} />
      </div>

      {/* Loading Bar & Shiny Text Area */}
      <div className="w-full flex flex-col items-center min-h-[4rem] sm:min-h-[5rem] justify-start px-2 mt-2">
        {showWelcome ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center w-full h-auto text-center mt-4"
            style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
          >
            <ShinyText
              text="Initializing Environment..."
              disabled={prefersReducedMotion}
              speed={prefersReducedMotion ? 5 : 3}
              className="text-center text-xl sm:text-2xl md:text-3xl tracking-wider font-bold bg-gradient-to-r from-emerald-400 via-[#00ff99] to-teal-400 bg-clip-text text-transparent"
            />
          </motion.div>
        ) : (
          /* Progressing Silver Bar with Logo Header */
          <div className="w-full max-w-[280px] h-1.5 sm:h-2 bg-gray-800 rounded-full relative mt-8">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.4, ease: "linear" }} 
              // Silver Gradient
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-400 to-gray-100 rounded-full shadow-[0_0_10px_rgba(200,200,200,0.4)]"
            >
              <img 
                src={logo} 
                alt="Loading..." 
                // Silver glow drop-shadow
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] z-10"
              />
            </motion.div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-transparent overflow-hidden px-4"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#00ff99]/5 rounded-full blur-[100px] sm:blur-[120px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-lg flex flex-col items-center justify-center gap-4"
          >
            {innerContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;