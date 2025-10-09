import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import logo from "../assets/pfp.webp";

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-base-100 border-t border-green-700/20 text-gray-300 py-10 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo + Title */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img
            src={logo}
            alt="MD Tanbin Logo"
            className="h-12 w-auto rounded-lg shadow-md shadow-green-500/20"
          />
          <h3 className="text-xl font-semibold text-green-400">
            MD Tanbin Ali
          </h3>
          <p className="text-sm text-gray-400">
            Full Stack Software Developer • Passion for clean, creative code.
          </p>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <h4 className="text-lg font-semibold text-green-400">Connect</h4>
          <div className="flex gap-5 text-2xl">
            <a
              href="mailto:tanbin@example.com"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/tanbinali"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/tanbinali"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
          <motion.button
            onClick={scrollToTop}
            className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors duration-300"
            whileHover={{ y: -2 }}
          >
            <FaArrowUp /> Back to Top
          </motion.button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MD Tanbin Ali — All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
