import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaWhatsapp, FaDiscord } from "react-icons/fa";
import logo from "../assets/pfp.webp";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.15,
      color: "#34D399",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const copyrightVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="bg-base-100 border-t border-green-700/20 text-gray-400 py-3 xs:py-4 sm:py-6 overflow-hidden"
    >
      {/* Mobile Layout - Stacked */}
      <div className="block lg:hidden">
        <motion.div
          variants={containerVariants}
          className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 overflow-hidden"
        >
          {/* Logo + Name - Centered on mobile */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-3 xs:mb-4"
          >
            <motion.img
              src={logo}
              alt="MD Tanbin Logo"
              className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 rounded-md shadow-md shadow-green-500/20"
              variants={logoVariants}
              whileHover="hover"
            />
            <motion.span
              variants={textVariants}
              className="font-semibold text-green-400 text-xs xs:text-sm sm:text-base"
              whileHover={{ color: "#34D399", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              MD Tanbin Ali
            </motion.span>
          </motion.div>

          {/* Social Icons - Centered */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center gap-3 xs:gap-4 text-base xs:text-lg sm:text-xl mb-3 xs:mb-4"
          >
            <motion.a
              href="mailto:tanbinali@gmail.com"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="Email"
            >
              <FaEnvelope />
            </motion.a>
            <motion.a
              href="https://wa.me/8801882393841"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="https://github.com/tanbinali"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://discord.com/users/570223124608450570"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="Discord"
            >
              <FaDiscord />
            </motion.a>
          </motion.div>

          {/* Copyright - Centered */}
          <motion.div
            variants={copyrightVariants}
            className="text-gray-500 text-xs xs:text-xs sm:text-sm text-center px-2"
            whileHover={{ color: "#9CA3AF", scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            © {new Date().getFullYear()} MD Tanbin Ali. All rights reserved.
          </motion.div>
        </motion.div>
      </div>

      {/* Tablet Layout - Modified for medium screens */}
      <div className="hidden lg:block xl:hidden">
        <motion.div
          variants={containerVariants}
          className="max-w-7xl mx-auto px-6 lg:px-8 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo + Name */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <motion.img
                src={logo}
                alt="MD Tanbin Logo"
                className="h-8 w-8 rounded-md shadow-md shadow-green-500/20"
                variants={logoVariants}
                whileHover="hover"
              />
              <motion.span
                variants={textVariants}
                className="font-semibold text-green-400 text-sm lg:text-base"
                whileHover={{ color: "#34D399", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                MD Tanbin Ali
              </motion.span>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={containerVariants}
              className="flex justify-center gap-4 text-lg"
            >
              <motion.a
                href="mailto:tanbinali@gmail.com"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="transition-colors duration-300 p-1"
                aria-label="Email"
              >
                <FaEnvelope />
              </motion.a>
              <motion.a
                href="https://wa.me/8801882393841"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="transition-colors duration-300 p-1"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </motion.a>
              <motion.a
                href="https://github.com/tanbinali"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="transition-colors duration-300 p-1"
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://discord.com/users/570223124608450570"
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="transition-colors duration-300 p-1"
                aria-label="Discord"
              >
                <FaDiscord />
              </motion.a>
            </motion.div>

            {/* Copyright */}
            <motion.div
              variants={copyrightVariants}
              className="text-gray-500 text-xs lg:text-sm text-center"
              whileHover={{ color: "#9CA3AF", scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} MD Tanbin Ali. All rights reserved.
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout - 3 Columns */}
      <div className="hidden xl:block">
        <motion.div
          variants={containerVariants}
          className="max-w-7xl mx-auto grid grid-cols-3 items-center px-4 sm:px-6 lg:px-8 text-sm overflow-hidden"
        >
          {/* Left: Logo + Name */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 justify-start"
          >
            <motion.img
              src={logo}
              alt="MD Tanbin Logo"
              className="h-9 w-9 rounded-md shadow-md shadow-green-500/20"
              variants={logoVariants}
              whileHover="hover"
            />
            <motion.span
              variants={textVariants}
              className="font-semibold text-green-400 text-base md:text-lg"
              whileHover={{ color: "#34D399", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              MD Tanbin Ali
            </motion.span>
          </motion.div>

          {/* Center: Social Icons */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center gap-4 text-lg md:text-xl"
          >
            <motion.a
              href="mailto:tanbinali@gmail.com"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="Email"
            >
              <FaEnvelope />
            </motion.a>
            <motion.a
              href="https://wa.me/8801882393841"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="https://github.com/tanbinali"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://discord.com/users/570223124608450570"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-300 p-1"
              aria-label="Discord"
            >
              <FaDiscord />
            </motion.a>
          </motion.div>

          {/* Right: Copyright */}
          <motion.div
            variants={copyrightVariants}
            className="text-gray-500 text-xs md:text-sm text-right"
            whileHover={{ color: "#9CA3AF", scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            © {new Date().getFullYear()} MD Tanbin Ali. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
