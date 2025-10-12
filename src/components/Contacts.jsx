import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconHoverVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backgroundVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const contactItems = useMemo(
    () =>
      contacts.map((contact, index) => {
        // Memoize style objects to avoid recreation:
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

        return (
          <motion.div
            key={index}
            className="group relative"
            variants={itemVariants}
            whileHover="hover"
          >
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
                className="relative p-8 rounded-2xl bg-gradient-to-br from-base-200/80 to-base-300/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-full border border-base-300/50 group-hover:border-accent/30 overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={bgGlowStyle}
                  aria-hidden="true"
                  whileHover={{ opacity: 1 }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-lg"
                  style={iconContainerStyle}
                  variants={iconHoverVariants}
                >
                  <div
                    className="text-2xl transition-transform duration-300"
                    style={titleStyle}
                    aria-hidden="true"
                  >
                    {contact.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <motion.h3
                    className="text-2xl font-bold mb-3 transition-colors duration-300"
                    style={titleStyle}
                    whileHover={{ scale: 1.05 }}
                  >
                    {contact.title}
                  </motion.h3>
                  <p className="text-gray-300 text-lg font-medium mb-3">
                    {contact.info}
                  </p>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    {contact.description}
                  </p>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300"
                    whileHover={{ gap: "0.75rem" }}
                  >
                    <span style={ctaColorStyle}>Get in Touch</span>
                    <motion.div
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight style={ctaColorStyle} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Hover Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={hoverBorderStyle}
                  aria-hidden="true"
                />
              </motion.a>
            </ElectricBorder>
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
      className="py-12 px-6 md:px-16 lg:px-24 bg-transparent relative"
      aria-label="Contact Section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div variants={containerVariants} className="text-center mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Get in touch
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            <ShinyText text="Let's Work Together" disabled={false} speed={3} />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-6"
          >
            Ready to bring your ideas to life? Reach out through any of these
            channels and let's start building something amazing.
          </motion.p>

          <motion.div
            variants={itemVariants}
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
          />
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactItems}
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Preferred Communication
            </h3>
            <p className="text-gray-300 mb-6">
              For quick responses, WhatsApp and Email are your best bets. I
              typically reply within a few hours during business days.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { color: "bg-green-400", text: "Fast Response Time" },
                { color: "bg-blue-400", text: "Professional Approach" },
                { color: "bg-purple-400", text: "Available for Projects" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <div
                    className={`w-2 h-2 ${item.color} rounded-full animate-pulse`}
                  ></div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-lg mb-6">
            Have a project in mind? Let's discuss how we can work together.
          </p>
          <motion.a
            href="mailto:tanbinali@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl transform group"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope className="w-5 h-5" />
            <span>Start a Conversation</span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>

      {/* Background Elements - consider hiding on mobile for perf */}
      <div className="absolute inset-0 overflow-hidden -z-10 hidden md:block">
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="pulse"
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate="pulse"
          transition={{ delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default Contacts;
