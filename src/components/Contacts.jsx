import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaDiscord,
  FaArrowRight,
  FaPaperPlane,
  FaCheck,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdMessage } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import emailjs from "@emailjs/browser";

// --- Hooks ---
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
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// --- Data ---
const contacts = [
  {
    title: "Email",
    icon: <FaEnvelope />,
    info: "tanbinali@gmail.com",
    href: "mailto:tanbinali@gmail.com",
    color: "#FFD700",
    description: "Send me an email for professional inquiries",
  },
  {
    title: "WhatsApp",
    icon: <FaWhatsapp />,
    info: "+880 1882-393841",
    href: "https://wa.me/8801882393841",
    color: "#25D366",
    description: "Quick chat and instant messaging",
  },
  {
    title: "Discord",
    icon: <FaDiscord />,
    info: "@taikonotenshi",
    href: "https://discord.com/users/570223124608450570",
    color: "#7289DA",
    description: "Connect for collaboration and tech discussions",
  },
];

// --- Form Sub-Component ---
const ContactForm = ({ shouldReduceAnimations }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    const serviceID = "service_5newz1s";
    const templateID = "template_iqlvitu";
    const publicKey = "8t89P3VDgfBhV3mWX";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Email Error:", error);
      setStatus("error");
      setErrorMsg("Failed to send. Please try again later.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClasses =
    "w-full bg-base-300/50 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-300 backdrop-blur-sm";
  const iconClasses =
    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg";

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <MdMessage className="text-white" /> Send a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="relative group">
          <FaUser
            className={`${iconClasses} group-focus-within:text-white transition-colors`}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            disabled={status === "loading" || status === "success"}
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <MdEmail
            className={`${iconClasses} group-focus-within:text-white transition-colors`}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            disabled={status === "loading" || status === "success"}
          />
        </div>

        {/* Message Input */}
        <div className="relative group">
          <div className="absolute left-4 top-4 text-gray-400 text-lg group-focus-within:text-white transition-colors">
            <FaPaperPlane />
          </div>
          <textarea
            name="message"
            placeholder="What's on your mind?"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} pl-12 resize-none`}
            disabled={status === "loading" || status === "success"}
          />
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              <FaExclamationCircle /> {errorMsg}
            </motion.div>
          )}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg border border-green-400/20"
            >
              <FaCheck /> Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status !== "idle"}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            status === "loading"
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          }`}
          whileHover={status === "idle" ? { scale: 1.02 } : {}}
          whileTap={status === "idle" ? { scale: 0.98 } : {}}
        >
          {status === "loading" ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : status === "success" ? (
            <>
              Sent <FaCheck />
            </>
          ) : (
            <>
              Send Message <FaArrowRight size={14} />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

// --- Main Component ---
const Contacts = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceAnimations ? 0.08 : 0.12,
          delayChildren: shouldReduceAnimations ? 0.1 : 0.15,
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceAnimations ? 15 : 25, scale: 0.97 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: shouldReduceAnimations ? 0.3 : 0.5,
          ease: "easeOut",
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const cardHoverVariants = useMemo(
    () =>
      shouldReduceAnimations
        ? {}
        : {
            hover: {
              y: -6,
              scale: 1.01,
              transition: { duration: 0.25, ease: "easeOut" },
            },
          },
    [shouldReduceAnimations]
  );

  const iconHoverVariants = useMemo(
    () =>
      shouldReduceAnimations
        ? {}
        : {
            hover: { scale: 1.08, rotate: 3, transition: { duration: 0.2 } },
          },
    [shouldReduceAnimations]
  );

  const contactItems = useMemo(
    () =>
      contacts.map((contact, index) => {
        const bgGlowStyle = {
          background: `radial-gradient(circle at center, ${contact.color}15 0%, transparent 70%)`,
        };
        const iconContainerStyle = {
          backgroundColor: `${contact.color}15`,
          border: `2px solid ${contact.color}30`,
        };
        const titleStyle = { color: contact.color };
        const ctaColorStyle = { color: contact.color };
        const hoverBorderStyle = { boxShadow: `0 0 0 1px ${contact.color}40` };

        const cardContent = (
          <>
            {!shouldReduceAnimations && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={bgGlowStyle}
                aria-hidden="true"
              />
            )}
            <motion.div
              className="relative z-10 w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:shadow-lg gpu-accelerated"
              style={iconContainerStyle}
              variants={iconHoverVariants}
            >
              <div
                className="text-xl xs:text-2xl sm:text-2xl md:text-2xl"
                style={titleStyle}
                aria-hidden="true"
              >
                {contact.icon}
              </div>
            </motion.div>
            <div className="relative z-10 flex-1 flex flex-col">
              <h3
                className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                style={titleStyle}
              >
                {contact.title}
              </h3>
              <p className="text-gray-300 text-sm xs:text-base sm:text-lg font-medium mb-2 sm:mb-3 leading-tight">
                {contact.info}
              </p>
              <p className="text-gray-400 text-xs xs:text-sm mb-4 sm:mb-6 flex-1 leading-relaxed">
                {contact.description}
              </p>
              <div className="flex items-center justify-center gap-1 xs:gap-2 text-xs xs:text-sm font-semibold">
                <span style={ctaColorStyle}>Get in Touch</span>
                <FaArrowRight
                  style={ctaColorStyle}
                  size={12}
                  className="xs:size-auto"
                />
              </div>
            </div>
            {!shouldReduceAnimations && (
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={hoverBorderStyle}
                aria-hidden="true"
              />
            )}
          </>
        );

        return (
          <motion.div
            key={index}
            className="group relative h-full"
            variants={itemVariants}
            whileHover="hover"
          >
            {/* Desktop/Laptop: ElectricBorder */}
            <div className="hidden md:block h-full">
              <ElectricBorder
                color={contact.color}
                thickness={2}
                speed={0.5}
                chaos={0.2}
                style={{ borderRadius: 20, height: "100%" }}
              >
                <motion.a
                  variants={cardHoverVariants}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-6 sm:p-8 rounded-2xl bg-base-200/80 backdrop-blur-md shadow-xl flex flex-col items-center text-center border border-transparent hover:shadow-2xl transition-all duration-500 h-full min-h-[280px]"
                  whileTap={{ scale: 0.98 }}
                >
                  {cardContent}
                </motion.a>
              </ElectricBorder>
            </div>

            {/* Mobile/Tablet Fallback */}
            <div className="block md:hidden h-full">
              <motion.a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 xs:p-6 rounded-xl bg-base-200/80 backdrop-blur-md shadow-lg flex flex-col items-center text-center border-2 h-full min-h-[220px]"
                style={{
                  borderColor: contact.color,
                  boxShadow: `0 0 10px ${contact.color}20`,
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {cardContent}
              </motion.a>
            </div>
          </motion.div>
        );
      }),
    [iconHoverVariants, cardHoverVariants, itemVariants, shouldReduceAnimations]
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="contact"
      className="py-10 sm:py-14 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-transparent relative overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card-light max-w-max mb-4 sm:mb-6 mx-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-accent">
              Get in touch
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-4 sm:mb-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl glass-card"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-center">
              <ShinyText
                text="Let's Work Together"
                disabled={shouldReduceAnimations}
                speed={shouldReduceAnimations ? 5 : 3}
              />
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-content leading-relaxed text-center">
              Ready to bring your ideas to life? Reach out through any of these
              channels or drop a message below.
            </p>
          </motion.div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mx-auto" />
        </motion.div>

        {/* --- GRID LAYOUT: Contacts Top, Form Bottom --- */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* 1. Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8"
          >
            {contactItems}
          </motion.div>

          {/* 2. Contact Form Section */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl mx-auto"
          >
            {/* Desktop Electric Border for Form */}
            <div className="hidden md:block">
              <ElectricBorder
                color="#FFFFFF" // Changed to White
                thickness={2}
                speed={0.8}
                chaos={0.1}
                style={{ borderRadius: 24 }}
              >
                <div className="bg-base-200/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl">
                  <ContactForm
                    shouldReduceAnimations={shouldReduceAnimations}
                  />
                </div>
              </ElectricBorder>
            </div>

            {/* Mobile Fallback for Form */}
            <div className="block md:hidden">
              <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border-2 border-white/30 shadow-xl">
                <ContactForm shouldReduceAnimations={shouldReduceAnimations} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Ambience */}
      {!shouldReduceAnimations && (
        <div className="absolute inset-0 overflow-hidden -z-10 hidden md:block pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-primary/5 rounded-full blur-3xl gpu-accelerated"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{
              delay: 1,
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 right-1/4 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-secondary/5 rounded-full blur-3xl gpu-accelerated"
          />
        </div>
      )}
    </motion.section>
  );
};

export default Contacts;
