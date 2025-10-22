import React, { useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/picture.webp";
import logo from "../assets/logo.webp";
import miniAvatar from "../assets/pfp.webp";
import resume from "../assets/Tanbin Resume.pdf";
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
    href: resume,
    label: "Resume",
    download: true,
    color: "hover:text-green-400",
  },
];

const Hero = () => {
  // Animation variants - KEEPING ORIGINAL
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Memoize social link elements - KEEPING ORIGINAL
  const socialLinkElements = useMemo(() => {
    return socialLinks.map(({ icon: Icon, label, href, download, color }) => (
      <motion.a
        key={label}
        variants={itemVariants}
        whileHover={{
          scale: 1.1,
          y: -2,
        }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target={download ? "_self" : "_blank"}
        rel="noopener noreferrer"
        download={download || false}
        className={`group relative p-4 rounded-xl bg-base-200/50 border border-base-300 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:bg-base-300 hover:border-accent ${color}`}
        title={label}
        aria-label={label}
        tabIndex={0}
      >
        <Icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-base-300 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {label}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-base-300 rotate-45"></div>
        </div>
      </motion.a>
    ));
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-screen px-6 md:px-16 lg:px-24 py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      {/* Background Elements - ORIGINAL STYLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden lg:block absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="hidden lg:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="hidden lg:block absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      {/* LEFT CONTENT - ORIGINAL STRUCTURE */}
      <motion.div
        variants={containerVariants}
        className="flex-1 flex flex-col justify-center gap-8 max-w-2xl z-10 order-2 lg:order-1"
      >
        {/* Badge - ORIGINAL */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-4"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-accent">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Main Heading - ORIGINAL */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary block"
            >
              Hey, I'm
            </motion.span>
            <ShinyText
              text="MD. Tanbin Ali"
              speed={3}
              className="text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        {/* Typing Text - ORIGINAL */}
        <motion.div variants={itemVariants} className="space-y-3">
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
            className="text-xl sm:text-2xl font-semibold text-secondary rounded-full backdrop-blur-sm min-h-[2.5rem]"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.6}
            textColors={["text-secondary"]}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-secondary to-primary rounded-full"
          />
        </motion.div>

        {/* Description - ORIGINAL */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-neutral-content leading-relaxed max-w-xl backdrop-blur-sm bg-base-200/30 rounded-2xl p-6 border border-base-300/50"
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

        {/* CTA Buttons - ORIGINAL */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl transform"
          >
            <span>Get In Touch</span>
            <FiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            href={resume}
            download
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-base-200 border border-accent text-accent font-semibold rounded-xl transition-all duration-300 hover:bg-accent hover:text-accent-content hover:border-accent transform"
          >
            <span>Download Resume</span>
            <FaDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Social Links - ORIGINAL */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-4 pt-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-neutral-content uppercase tracking-wider text-center lg:text-left"
          >
            Connect with me
          </motion.p>
          <motion.div
            variants={containerVariants}
            className="flex gap-3 flex-wrap justify-center lg:justify-start"
          >
            {socialLinkElements}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT CARD - Profile - ORIGINAL STYLE */}
      <motion.div
        variants={cardVariants}
        animate="floating"
        className="flex-1 flex justify-center items-center mt-8 lg:mt-0 mb-12 lg:mb-0 z-10 order-1 lg:order-2"
      >
        <div className="relative max-w-xs sm:max-w-sm w-full">
          {/* Decorative elements - ORIGINAL */}
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50 pointer-events-none"
          />
          <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl pointer-events-none" />

          <React.Suspense
            fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-96 bg-base-200/50 rounded-2xl flex items-center justify-center"
              >
                <div className="text-accent">Loading...</div>
              </motion.div>
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
              showBehindGradient
              enableTilt={false}
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
