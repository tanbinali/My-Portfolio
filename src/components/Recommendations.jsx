import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaUserAlt, FaBriefcase, FaQuoteLeft, FaCheckCircle, FaSpinner, FaPlus, FaTimes } from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// --- Custom Hooks ---
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    let timeout;
    const debouncedCheck = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 100);
    };
    window.addEventListener("resize", debouncedCheck, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeout);
    };
  }, []);
  return isMobile;
};

const Recommendations = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  // View & Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", position: "", recommendation: "" });
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  
  // Real recommendations fetched from Google Sheets
  const [recommendationsList, setRecommendationsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form theme color set to Silver
  const formThemeColor = "#C0C0C0"; 
  // Color Palette Cycle for cards: Green, Gold, Silver
  const cardColors = ["#2ecc71", "#FFD700", "#C0C0C0"];

  // Fetch recommendations on component mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/get-recommendations');
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (data && data.length > 0) {
              setRecommendationsList(data.reverse());
            }
          }
        }
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch('/api/submit-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setRecommendationsList([formData, ...recommendationsList]);
        setFormData({ name: "", position: "", recommendation: "" });
        
        setTimeout(() => {
          setStatus("idle");
          setShowForm(false); // Close form and show updated list
        }, 2500);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceAnimations ? 0.1 : 0.15,
          delayChildren: 0.1,
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceAnimations ? 10 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: shouldReduceAnimations ? 0.3 : 0.5, ease: "easeOut" },
      },
    }),
    [shouldReduceAnimations]
  );

  const FormContent = (
    <div className="w-full h-full bg-base-200/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden group">
      <div 
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#C0C0C0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        aria-hidden="true" 
      />

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white">Add Your Recommendation</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
            <FaUserAlt style={{ color: formThemeColor }} /> Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-base-300/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C0C0C0] focus:ring-1 focus:ring-[#C0C0C0] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
            <FaBriefcase style={{ color: formThemeColor }} /> Position/Company
          </label>
          <input
            type="text"
            name="position"
            required
            placeholder="Assistant Professor, East Delta University"
            value={formData.position}
            onChange={handleChange}
            className="w-full bg-base-300/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C0C0C0] focus:ring-1 focus:ring-[#C0C0C0] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
            <FaQuoteLeft style={{ color: formThemeColor }} /> Recommendation
          </label>
          <textarea
            name="recommendation"
            required
            rows="4"
            placeholder="Write your recommendation here..."
            value={formData.recommendation}
            onChange={handleChange}
            className="w-full bg-base-300/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C0C0C0] focus:ring-1 focus:ring-[#C0C0C0] transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full py-3.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all shadow-lg ${
            status === "submitting" 
              ? "bg-gray-600 text-gray-300 cursor-not-allowed" 
              : "bg-[#C0C0C0] text-black hover:bg-[#a6a6a6] hover:scale-[1.02] cursor-pointer"
          }`}
        >
          {status === "submitting" ? (
            <><FaSpinner className="animate-spin" /> Submitting...</>
          ) : (
            <><FaPaperPlane /> Submit Recommendation</>
          )}
        </button>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 text-green-400"
            >
              <FaCheckCircle className="flex-shrink-0" />
              <p className="text-sm">Thank you! Your recommendation has been successfully sent.</p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              Something went wrong. Please try again later.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );

  const toggleButtonContent = (
    <button
      onClick={() => setShowForm(!showForm)}
      className="w-full h-full bg-base-200/80 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm font-medium whitespace-nowrap flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
    >
      {showForm ? (
        <>
          <FaTimes className="text-[#C0C0C0]" /> Cancel Form
        </>
      ) : (
        <>
          <FaPlus className="text-[#C0C0C0]" /> Add Recommendation
        </>
      )}
    </button>
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="recommendations"
      className="py-10 sm:py-14 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={containerVariants} className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card-light max-w-max mb-4 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ecc71] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ecc71]"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-white">
              Endorsements
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-4 p-4 sm:p-5 md:p-6 rounded-xl glass-card">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center">
              <ShinyText
                text="Recommendations"
                disabled={shouldReduceAnimations}
                speed={shouldReduceAnimations ? 5 : 3}
              />
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed text-center">
              Feedback and professional endorsements from colleagues and mentors.
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-[#2ecc71] to-transparent rounded-full mx-auto mt-3"
          />
        </motion.div>

        {/* Persistent Toggle Action Button with Electric Border - Fixed Width */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10 w-64 mx-auto">
          {isMobile ? (
            <div
              className="w-full rounded-full border-2 overflow-hidden"
              style={{
                borderColor: "#C0C0C0",
                boxShadow: `0 0 15px 1px #C0C0C040`,
              }}
            >
              {toggleButtonContent}
            </div>
          ) : (
            <ElectricBorder
              color="#C0C0C0"
              thickness={2}
              speed={0.8}
              chaos={0.1}
              style={{ borderRadius: 9999, width: "100%" }}
            >
              {toggleButtonContent}
            </ElectricBorder>
          )}
        </motion.div>

        {/* Form Container (Toggles open/close smoothly) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto mb-12 overflow-hidden"
            >
              {isMobile ? (
                <div
                  className="w-full rounded-2xl border-2"
                  style={{
                    borderColor: formThemeColor,
                    boxShadow: `0 0 15px 1px ${formThemeColor}40`,
                  }}
                >
                  {FormContent}
                </div>
              ) : (
                <ElectricBorder
                  color={formThemeColor}
                  thickness={2}
                  speed={0.8}
                  chaos={0.1}
                  style={{ borderRadius: 16 }}
                >
                  {FormContent}
                </ElectricBorder>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommendations Grid List (Always preserved underneath) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="flex justify-center py-12">
              <FaSpinner className="animate-spin text-[#2ecc71]" size={32} />
            </div>
          ) : recommendationsList.length === 0 ? (
            <p className="text-center text-gray-400 italic">No recommendations yet. Be the first to add one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendationsList.map((rec, index) => {
                const currentThemeColor = cardColors[index % cardColors.length];

                const cardContent = (
                  <div className="w-full h-full bg-base-200/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/20 transition-colors">
                      <FaQuoteLeft size={36} />
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed relative z-10 mb-6 italic">
                      "{rec.recommendation}"
                    </p>
                    <div className="relative z-10 border-t border-white/10 pt-4 mt-auto">
                      <h4 className="font-bold text-white text-base" style={{ color: currentThemeColor }}>
                        {rec.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{rec.position}</p>
                    </div>
                  </div>
                );

                return (
                  <motion.div key={index} variants={itemVariants} className="h-full">
                    {isMobile ? (
                      <div
                        className="h-full rounded-2xl border-2"
                        style={{
                          borderColor: currentThemeColor,
                          boxShadow: `0 0 15px 1px ${currentThemeColor}30`,
                        }}
                      >
                        {cardContent}
                      </div>
                    ) : (
                      <ElectricBorder
                        color={currentThemeColor}
                        thickness={2}
                        speed={0.8}
                        chaos={0.1}
                        style={{ borderRadius: 16, height: "100%" }}
                      >
                        {cardContent}
                      </ElectricBorder>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Recommendations;