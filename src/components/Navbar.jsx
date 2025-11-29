import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import { FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { SiEducative } from "react-icons/si";
import { TbCertificate } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";

const menuItems = [
  {
    id: "about",
    label: "About",
    icon: <FaInfoCircle className="inline-block mr-2" />,
  },
  {
    id: "expertise",
    label: "Expertise",
    icon: <GrUserExpert className="inline-block mr-2" />,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <SiEducative className="inline-block mr-2" />,
  },
  {
    id: "education",
    label: "Education",
    icon: <TbCertificate className="inline-block mr-2" />,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <IoIosCall className="inline-block mr-2" />,
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const performScroll = useCallback((id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    const navEl = navRef.current;
    const navHeight = navEl ? navEl.offsetHeight : 0;
    const target = section.offsetTop - navHeight - 8;

    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const handleDesktopClick = useCallback(
    (id) => {
      performScroll(id);
      setIsOpen(false);
    },
    [performScroll]
  );

  const handleMobileClick = useCallback((id) => {
    setPendingScrollId(id);
    setIsOpen(false);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 gpu-accelerated ${
        isScrolled
          ? "bg-base-100/80 safe-blur shadow-lg py-2 border-b border-primary/10"
          : "bg-transparent py-3"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.button
          onClick={() => performScroll("top")}
          className="cursor-pointer flex items-center gap-2 sm:gap-3 group focus-ring rounded-lg p-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Go to top"
        >
          <motion.div
            className="p-1 sm:p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
            whileHover={{ rotate: 5 }}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-7 sm:h-8 md:h-9 w-auto"
              loading="eager"
            />
          </motion.div>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary tracking-tight hidden xs:inline">
            <span className="hidden sm:inline">MD Tanbin's </span>Portfolio
          </span>
        </motion.button>

        <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleDesktopClick(item.id)}
              className="relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-base-content/80 hover:text-primary transition-colors duration-200 group flex items-center gap-1.5 rounded-lg hover:bg-primary/5 focus-ring"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <span className="text-base lg:text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </span>
              <span>{item.label}</span>
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                variants={underlineVariants}
                initial="hidden"
                whileHover="visible"
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          className="md:hidden z-60 p-2.5 rounded-xl transition-colors duration-200 touch-target focus-ring"
          onClick={() => setIsOpen((s) => !s)}
          whileTap={{ scale: 0.92 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          style={{
            backgroundColor: isOpen ? "rgba(0, 255, 153, 0.1)" : "transparent",
          }}
        >
          {isOpen ? (
            <FaTimes className="h-6 w-6 text-primary" />
          ) : (
            <FaBars className="h-6 w-6 text-base-content" />
          )}
        </motion.button>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          if (pendingScrollId) {
            setTimeout(() => {
              performScroll(pendingScrollId);
              setPendingScrollId(null);
            }, 50);
          }
        }}
      >
        {isOpen && (
          <motion.div
            className="md:hidden bg-base-100/95 safe-blur border-t border-primary/10 px-4 sm:px-6 py-3 sm:py-4 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleMobileClick(item.id)}
                  className="w-full text-left py-3.5 px-4 text-base font-medium text-base-content/90 hover:text-primary hover:bg-primary/5 transition-all duration-200 items-center flex gap-3 group rounded-xl touch-target"
                  variants={menuItemVariants}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <span className="text-lg opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
