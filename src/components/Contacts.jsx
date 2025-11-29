import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaDiscord,
  FaArrowRight,
} from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

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
            className="group relative"
            variants={itemVariants}
            whileHover="hover"
          >
            {/* Desktop/Laptop: ElectricBorder */}
            <div className="hidden md:block">
              <ElectricBorder
                color={contact.color}
                thickness={2}
                speed={0.5}
                chaos={0.2}
                style={{ borderRadius: 20 }}
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

            {/* Tablet: Medium screens */}
            <div className="hidden sm:block md:hidden">
              <motion.a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-6 rounded-2xl bg-base-200/80 backdrop-blur-md shadow-xl flex flex-col items-center text-center border-2 h-full min-h-[260px]"
                style={{
                  borderColor: contact.color,
                  boxShadow: `0 0 15px ${contact.color}30`,
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {cardContent}
              </motion.a>
            </div>

            {/* Mobile: Small screens */}
            <div className="block sm:hidden">
              <motion.a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 xs:p-5 rounded-xl bg-base-200/80 backdrop-blur-md shadow-lg flex flex-col items-center text-center border-2 h-full min-h-[220px]"
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
              channels and let's start building something amazing.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mx-auto"
          />
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {contactItems}
        </motion.div>
      </div>

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
