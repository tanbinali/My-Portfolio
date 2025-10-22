import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaWhatsapp,
  FaDiscord,
  FaArrowRight,
} from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const iconHoverVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    },
  };

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

        // Shared card content
        const cardContent = (
          <>
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={bgGlowStyle}
              aria-hidden="true"
              whileHover={{ opacity: 1 }}
            />
            {/* Icon */}
            <motion.div
              className="relative z-10 w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:shadow-lg"
              style={iconContainerStyle}
              variants={iconHoverVariants}
            >
              <div
                className="text-xl xs:text-2xl sm:text-2xl md:text-2xl transition-transform duration-300"
                style={titleStyle}
                aria-hidden="true"
              >
                {contact.icon}
              </div>
            </motion.div>
            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">
              <motion.h3
                className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300"
                style={titleStyle}
                whileHover={{ scale: 1.05 }}
              >
                {contact.title}
              </motion.h3>
              <p className="text-gray-300 text-sm xs:text-base sm:text-lg font-medium mb-2 sm:mb-3 leading-tight">
                {contact.info}
              </p>
              <p className="text-gray-400 text-xs xs:text-sm mb-4 sm:mb-6 flex-1 leading-relaxed">
                {contact.description}
              </p>
              {/* CTA */}
              <motion.div
                className="flex items-center justify-center gap-1 xs:gap-2 text-xs xs:text-sm font-semibold transition-all duration-300"
                whileHover={{ gap: "0.5rem" }}
              >
                <span style={ctaColorStyle}>Get in Touch</span>
                <motion.div
                  animate={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight
                    style={ctaColorStyle}
                    size={12}
                    className="xs:size-auto"
                  />
                </motion.div>
              </motion.div>
            </div>
            {/* Hover Border */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={hoverBorderStyle}
              aria-hidden="true"
            />
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
    []
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="contact"
      className="py-8 xs:py-12 sm:py-16 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-transparent relative overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Small badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-4 xs:mb-6 mx-auto"
          >
            <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs xs:text-sm font-medium text-accent">
              Get in touch
            </span>
          </motion.div>

          {/* Frosted container for title + description */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto mb-4 xs:mb-6 p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-base-300/50 bg-base-200/30 backdrop-blur-md"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 xs:mb-4 text-center">
              <ShinyText
                text="Let's Work Together"
                disabled={false}
                speed={3}
              />
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-neutral-content leading-relaxed text-center">
              Ready to bring your ideas to life? Reach out through any of these
              channels and let's start building something amazing.
            </p>
          </motion.div>

          {/* Underline */}
          <motion.div
            variants={itemVariants}
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="w-24 xs:w-32 h-0.5 xs:h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
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

      {/* Background Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden -z-10 hidden sm:block">
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="pulse"
          className="absolute top-1/4 sm:top-1/3 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-2xl sm:blur-3xl"
        />
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="pulse"
          transition={{ delay: 0.5 }}
          className="absolute bottom-1/4 sm:bottom-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-2xl sm:blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Contacts;
