import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import {
  FaInfoCircle,
  FaBoxes,
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  {
    id: "about",
    label: "About",
    icon: <FaInfoCircle className="inline-block mr-2" />,
  },
  {
    id: "expertise",
    label: "Expertise",
    icon: <FaBoxes className="inline-block mr-2" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FaEnvelopeOpenText className="inline-block mr-2" />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <FaMapMarkerAlt className="inline-block mr-2" />,
  },
];

const navVariants = {
  hidden: { y: -100 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.05,
      when: "afterChildren",
      duration: 0.28,
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { staggerChildren: 0.07, delayChildren: 0.06, duration: 0.36 },
  },
};

const underlineVariants = { hidden: { width: 0 }, visible: { width: "100%" } };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [pendingScrollId, setPendingScrollId] = useState(null);

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const performScroll = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navEl = navRef.current;
    const navHeight = navEl
      ? Math.ceil(navEl.getBoundingClientRect().height)
      : 0;

    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

    const offset = 8;
    const target = Math.max(0, sectionTop - navHeight - offset);

    window.scrollTo({ top: target, behavior: "smooth" });

    setTimeout(() => {
      const stillHidden = section.getBoundingClientRect().top < navHeight + 4;
      if (stillHidden) {
        window.scrollTo({ top: target + 2, behavior: "smooth" });
      }
    }, 650);
  };

  const handleDesktopClick = (id) => {
    performScroll(id);
    setIsOpen(false);
  };

  const handleMobileClick = (id) => {
    setPendingScrollId(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent backdrop-blur-md shadow-xl py-2 border-b border-base-300/20"
          : "bg-transparent backdrop-blur-sm shadow-lg py-3"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          onClick={() => performScroll("hero")}
          className="cursor-pointer flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
            whileHover={{ rotate: 5 }}
          >
            <img
              src={logo}
              alt="Mohammad Khan Auto Parts"
              className="h-9 w-auto"
            />
          </motion.div>

          <span className="text-xl sm:text-2xl font-bold text-primary font-heading tracking-tight">
            MD Tanbin's Portfolio
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 lg:space-x-2 font-body">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleDesktopClick(item.id)}
              className="relative px-4 py-2 text-base font-medium text-base-content/90 hover:text-primary transition-colors duration-300 group flex items-center"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-accent"
                variants={underlineVariants}
                initial="hidden"
                whileHover="visible"
                transition={{ duration: 0.28, ease: "easeOut" }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <motion.div className="md:hidden z-60" whileTap={{ scale: 0.92 }}>
          <button
            onClick={() => setIsOpen((s) => !s)}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isOpen ? "bg-primary/10" : "bg-transparent hover:bg-base-300/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="h-7 w-7 text-base-content" />
            ) : (
              <FaBars className="h-7 w-7 text-base-content" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence
        onExitComplete={() => {
          if (pendingScrollId) {
            setTimeout(() => {
              performScroll(pendingScrollId);
              setPendingScrollId(null);
            }, 8);
          }
        }}
      >
        {isOpen && (
          <motion.div
            className="md:hidden bg-base-200/95 backdrop-blur-lg border-t border-base-300/20 px-6 py-4 space-y-2 font-body overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleMobileClick(item.id)}
                className="w-full text-left py-4 text-lg font-medium text-base-content/90 hover:text-primary transition-colors duration-300 items-center flex gap-2 group"
                variants={menuItemVariants}
                whileHover={{ x: 8 }}
                whileTap={{ x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
