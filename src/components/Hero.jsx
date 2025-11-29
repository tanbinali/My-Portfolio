import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/picture.webp";
import logo from "../assets/logo.webp";
import miniAvatar from "../assets/pfp.webp";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import TextType from "./TextType/TextType";
import ShinyText from "./ShinyText/ShinyText";
const ProfileCard = React.lazy(() => import("./ProfileCard/ProfileCard"));

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
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/tanbinali",
    label: "GitHub",
    color: "hover:text-gray-400",
  },
  {
    icon: FaDiscord,
    href: "https://discord.com/users/570223124608450570",
    label: "Discord",
    color: "hover:text-purple-400",
  },
  {
    icon: FiMail,
    href: "mailto:tanbinali@gmail.com",
    label: "Email",
    color: "hover:text-red-400",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/8801882393841",
    label: "Whatsapp",
    color: "hover:text-red-400",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/mdtanbinali",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: CgNotes,
    href: "https://docs.google.com/document/d/1y_Qr_S4kuzAHVzZvZuUzUXFOdeDGiY1rVmTHZmc9k8A/edit?usp=sharing",
    label: "Resume",
    download: true,
    color: "hover:text-green-400",
  },
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceAnimations ? 0.05 : 0.1,
          delayChildren: shouldReduceAnimations ? 0.1 : 0.3,
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceAnimations ? 15 : 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceAnimations ? 0.3 : 0.6,
          ease: "easeOut",
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: shouldReduceAnimations ? 0.95 : 0.8,
        rotateY: shouldReduceAnimations ? 0 : -10,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: shouldReduceAnimations ? 0.4 : 0.8,
          ease: "easeOut",
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const floatVariants = useMemo(
    () =>
      shouldReduceAnimations
        ? {}
        : {
            floating: {
              y: [-8, 8, -8],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          },
    [shouldReduceAnimations]
  );

  const socialLinkElements = useMemo(() => {
    return socialLinks.map(({ icon: Icon, label, href, download, color }) => (
      <motion.a
        key={label}
        variants={itemVariants}
        whileHover={shouldReduceAnimations ? {} : { scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target={download ? "_self" : "_blank"}
        rel="noopener noreferrer"
        download={download || false}
        className={`group relative p-3 sm:p-4 rounded-xl glass-card-light hover-lift focus-ring touch-target transition-all duration-300 hover:border-primary/30 ${color}`}
        title={label}
        aria-label={label}
        tabIndex={0}
      >
        <Icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors duration-200" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2.5 py-1.5 bg-base-300/95 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-white/10 hidden sm:block">
          {label}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-base-300/95 rotate-45 border-r border-b border-white/10"></div>
        </div>
      </motion.a>
    ));
  }, [itemVariants, shouldReduceAnimations]);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16 overflow-hidden bg-transparent"
    >
      {!shouldReduceAnimations && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 lg:w-80 h-64 lg:h-80 bg-primary/8 rounded-full blur-3xl gpu-accelerated"
          />
          <motion.div
            animate={{ scale: [1.08, 1, 1.08], opacity: [0.3, 0.15, 0.3] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-72 lg:w-96 h-72 lg:h-96 bg-secondary/8 rounded-full blur-3xl gpu-accelerated"
          />
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 right-1/3 w-48 lg:w-64 h-48 lg:h-64 bg-accent/5 rounded-full blur-3xl gpu-accelerated"
          />
        </div>
      )}

      <motion.div
        variants={containerVariants}
        className="flex-1 flex flex-col justify-center gap-5 sm:gap-6 lg:gap-8 max-w-2xl z-10 order-2 lg:order-1"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card-light max-w-max"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium text-accent">
            Available for new opportunities
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceAnimations ? 0.3 : 0.5 }}
              className="text-primary block mb-1 sm:mb-2"
            >
              Hey, I'm
            </motion.span>
            <ShinyText
              text="MD. Tanbin Ali"
              speed={shouldReduceAnimations ? 5 : 3}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-emerald-400 to-secondary bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3">
          <TextType
            as="h2"
            text={[
              "Full Stack Software Developer",
              "Django & REST API Specialist",
              "React & JavaScript Expert",
              "Problem Solver & Lifelong Learner",
              "Clean Code Advocate",
              "Tech Stack Explorer",
            ]}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-secondary min-h-[2rem] sm:min-h-[2.5rem]"
            typingSpeed={shouldReduceAnimations ? 50 : 75}
            pauseDuration={shouldReduceAnimations ? 2000 : 1500}
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.6}
            textColors={["text-secondary"]}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{
              delay: shouldReduceAnimations ? 0.5 : 1,
              duration: 0.6,
            }}
            className="h-0.5 sm:h-1 bg-gradient-to-r from-secondary via-primary to-transparent rounded-full"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-content leading-relaxed max-w-xl glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6"
        >
          I'm passionate about creating{" "}
          <span className="text-primary font-semibold">
            meaningful digital experiences
          </span>{" "}
          — software that feels smooth, looks great, and actually solves
          problems. I specialize in{" "}
          <span className="text-accent font-semibold">Django and React</span> to
          bring innovative ideas to life with robust, scalable solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <motion.a
            whileHover={shouldReduceAnimations ? {} : { scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-primary to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 focus-ring touch-target"
          >
            <span className="text-sm sm:text-base">Get In Touch</span>
            <FiMail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
          </motion.a>

          <motion.a
            whileHover={shouldReduceAnimations ? {} : { scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://docs.google.com/document/d/1y_Qr_S4kuzAHVzZvZuUzUXFOdeDGiY1rVmTHZmc9k8A/export?format=pdf"
            download="MD_Tanbin_Ali_Resume.pdf"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 glass-card border-accent/50 text-accent font-semibold rounded-xl transition-all duration-300 hover:bg-accent/10 hover:border-accent focus-ring touch-target"
          >
            <span className="text-sm sm:text-base">Download Resume</span>
            <FaDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-medium text-neutral-content/80 uppercase tracking-wider text-center lg:text-left"
          >
            Connect with me
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="flex gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start"
          >
            {socialLinkElements}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        animate={shouldReduceAnimations ? undefined : "floating"}
        className="flex-1 flex justify-center items-center mt-6 sm:mt-8 lg:mt-0 mb-8 sm:mb-12 lg:mb-0 z-10 order-1 lg:order-2"
      >
        <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm">
          {!shouldReduceAnimations && (
            <>
              <motion.div
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-3xl blur-xl opacity-60 pointer-events-none gpu-accelerated"
              />
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/8 to-primary/8 rounded-2xl pointer-events-none" />
            </>
          )}

          <React.Suspense
            fallback={
              <div className="w-full aspect-[3/4] glass-card rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <ProfileCard
              name="MD. Tanbin Ali"
              title="Full Stack Developer"
              handle="tanbinali"
              status="Available for Hire"
              contactText="Hire Me!"
              avatarUrl={avatar}
              iconUrl={logo}
              miniAvatarUrl={miniAvatar}
              behindGradient="radial-gradient(circle at 50% 50%, #2ecc7133 0%, #001a1333 100%)"
              innerGradient="linear-gradient(145deg, #0a1a13 0%, #1f5f45 70%, #b3ffcc33 100%)"
              showBehindGradient={!shouldReduceAnimations}
              enableTilt={!isMobile && !prefersReducedMotion}
              enableMobileTilt={false}
              showUserInfo
            />
          </React.Suspense>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
