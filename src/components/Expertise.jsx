import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiCplusplus,
  SiC,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiBootstrap,
  SiEclipseide,
  SiXampp,
  SiCodeblocks,
  SiVite,
  SiVercel,
} from "react-icons/si";
import { DiDjango } from "react-icons/di";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaGitAlt, FaJava } from "react-icons/fa";
import { MdHtml } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import LogoLoop from "./LogoLoop/LogoLoop";

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

const Expertise = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceAnimations ? 0.05 : 0.08,
          delayChildren: shouldReduceAnimations ? 0.1 : 0.2,
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceAnimations ? 10 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceAnimations ? 0.3 : 0.5,
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
        y: shouldReduceAnimations ? 15 : 25,
        scale: shouldReduceAnimations ? 0.98 : 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: shouldReduceAnimations ? 0.3 : 0.45,
          ease: "easeOut",
        },
      },
      hover: shouldReduceAnimations
        ? {}
        : {
            y: -4,
            transition: { duration: 0.2, ease: "easeInOut" },
          },
    }),
    [shouldReduceAnimations]
  );

  const logoVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: shouldReduceAnimations ? 0.4 : 0.6,
          ease: "easeOut",
        },
      },
    }),
    [shouldReduceAnimations]
  );

  const techLogos = useMemo(
    () => [
      { node: <SiPython />, title: "Python", href: "https://www.python.org" },
      {
        node: <DiDjango />,
        title: "Django MVT",
        href: "https://www.djangoproject.com",
      },
      {
        node: <TbApi />,
        title: "Django DRF",
        href: "https://www.django-rest-framework.org/",
      },
      { node: <SiReact />, title: "React", href: "https://react.dev" },
      {
        node: <SiTailwindcss />,
        title: "TailwindCSS",
        href: "https://tailwindcss.com",
      },
      { node: <MdHtml />, title: "HTML", href: "https://html.com/" },
      {
        node: <SiJavascript />,
        title: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { node: <FaJava />, title: "Java", href: "https://www.java.com/en" },
      {
        node: <SiCplusplus />,
        title: "C++",
        href: "https://www.w3schools.com/cpp/",
      },
      { node: <SiC />, title: "C", href: "https://www.cprogramming.com/" },
      {
        node: <SiBootstrap />,
        title: "Bootstrap",
        href: "https://getbootstrap.com",
      },
      { node: <FaGitAlt />, title: "Git", href: "https://git-scm.com/" },
      {
        node: <BiLogoVisualStudio />,
        title: "VS Code",
        href: "https://visualstudio.microsoft.com/",
      },
      { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/" },
      {
        node: <SiPostgresql />,
        title: "PostgreSQL",
        href: "https://www.postgresql.org",
      },
      {
        node: <SiEclipseide />,
        title: "Eclipse IDE",
        href: "http://eclipseide.org/",
      },
      {
        node: <SiXampp />,
        title: "XAMPP",
        href: "https://www.apachefriends.org",
      },
      {
        node: <SiCodeblocks />,
        title: "CodeBlocks",
        href: "https://www.codeblocks.org/",
      },
      {
        node: <SiVite />,
        title: "Vite",
        href: "https://vitejs.dev/",
      },
      {
        node: <SiVercel />,
        title: "Vercel",
        href: "https://vercel.com/",
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      {
        title: "Core Expertise",
        subtitle: "Technologies I excel at",
        color: "#00FF88",
        gradient: "from-green-500 to-emerald-600",
        bgGradient: "from-green-500/10 to-emerald-600/10",
        items: [
          { icon: <SiPython />, name: "Python" },
          { icon: <SiDjango />, name: "Django" },
          { icon: <SiVite />, name: "Vite" },
          { icon: <SiReact />, name: "React" },
          { icon: <SiTailwindcss />, name: "TailwindCSS" },
          { icon: <MdHtml />, name: "HTML" },
        ],
      },
      {
        title: "Proficient With",
        subtitle: "Strong working knowledge",
        color: "#FFD700",
        gradient: "from-amber-500 to-yellow-600",
        bgGradient: "from-amber-500/10 to-yellow-600/10",
        items: [
          { icon: <SiJavascript />, name: "JavaScript" },
          { icon: <FaJava />, name: "Java" },
          { icon: <SiCplusplus />, name: "C++" },
          { icon: <SiC />, name: "C" },
          { icon: <SiBootstrap />, name: "Bootstrap" },
          { icon: <FaGitAlt />, name: "Git" },
        ],
      },
      {
        title: "Tools & Databases",
        subtitle: "Development environment & data",
        color: "#C0C0C0",
        gradient: "from-gray-400 to-gray-600",
        bgGradient: "from-gray-400/10 to-gray-600/10",
        items: [
          { icon: <BiLogoVisualStudio />, name: "VSCode" },
          { icon: <SiMysql />, name: "MySQL" },
          { icon: <SiPostgresql />, name: "PostgreSQL" },
          { icon: <SiEclipseide />, name: "EclipseIDE" },
          { icon: <SiXampp />, name: "XAMPP" },
          { icon: <SiCodeblocks />, name: "CodeBlocks" },
        ],
      },
    ],
    []
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="expertise"
      className="py-10 sm:py-14 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 bg-transparent relative overflow-hidden"
      aria-labelledby="expertise-heading"
    >
      <div className="max-w-7xl mx-auto">
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
              Technical Skills
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-4 sm:mb-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl glass-card"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-center">
              <ShinyText
                text="Technical Expertise"
                disabled={shouldReduceAnimations}
                speed={shouldReduceAnimations ? 5 : 3}
              />
            </h2>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed text-center">
              A concise overview of my technical stack and areas of proficiency
              — showcasing the technologies and tools I work with regularly.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-16 sm:w-20 md:w-24 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mx-auto mt-3 sm:mt-4 md:mt-6"
          />
        </motion.div>

        <motion.div
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden mb-8 sm:mb-12 lg:mb-16"
          aria-label="Scrolling technology stack logos"
        >
          <LogoLoop
            logos={techLogos}
            speed={shouldReduceAnimations ? 60 : 40}
            direction="left"
            logoHeight={isMobile ? 32 : 40}
            gap={isMobile ? 20 : 32}
            pauseOnHover={!isMobile}
            scaleOnHover={!isMobile}
            fadeOut
            fadeOutColor="rgba(0,0,0,1)"
            className="logoloop logoloop--scale-hover logoloop--fade gpu-accelerated"
            style={{ width: "100%" }}
          />
        </motion.div>

        {/* Skill Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xs:gap-6 sm:gap-8"
        >
          {categories.map((category, i) => (
            <motion.div key={i} variants={cardVariants} whileHover="hover">
              {/* Desktop/Laptop: ElectricBorder */}
              <div className="hidden md:block">
                <ElectricBorder
                  color={category.color}
                  speed={0.8}
                  chaos={0.1}
                  thickness={2}
                  style={{ borderRadius: 20 }}
                >
                  <div className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-transparent hover:border-accent/30 transition-transform duration-500 group hover:scale-105 overflow-hidden h-full">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 text-center mb-6 sm:mb-8">
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {category.subtitle}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 xs:gap-4 justify-items-center">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          className="flex flex-col items-center text-center p-2 w-full transition-transform duration-300 hover:scale-110"
                        >
                          <div
                            className="text-2xl sm:text-3xl mb-1"
                            style={{ color: category.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-300 leading-tight">
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ElectricBorder>
              </div>

              {/* Tablet: Medium screens */}
              <div className="hidden sm:block md:hidden">
                <div
                  className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-6 border-2 transition-transform duration-500 group hover:scale-105 overflow-hidden h-full"
                  style={{
                    borderColor: category.color,
                    boxShadow: `0 0 15px ${category.color}30`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 text-center mb-6">
                    <h3
                      className={`text-xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{category.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 justify-items-center">
                    {category.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center p-2 w-full transition-transform duration-300 hover:scale-110"
                      >
                        <div
                          className="text-2xl mb-1"
                          style={{ color: category.color }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </div>
                        <span className="text-xs text-gray-300 leading-tight">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile: Small screens */}
              <div className="block sm:hidden">
                <div
                  className="relative bg-base-200/50 backdrop-blur-md rounded-xl p-4 xs:p-5 border-2 transition-transform duration-500 group hover:scale-105 overflow-hidden h-full"
                  style={{
                    borderColor: category.color,
                    boxShadow: `0 0 10px ${category.color}20`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 text-center mb-4 xs:mb-5">
                    <h3
                      className={`text-lg xs:text-xl font-bold mb-1 xs:mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{category.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 xs:gap-3 justify-items-center">
                    {category.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center p-1 xs:p-2 w-full transition-transform duration-300 hover:scale-110"
                      >
                        <div
                          className="text-xl xs:text-2xl mb-1"
                          style={{ color: category.color }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </div>
                        <span className="text-xs text-gray-300 leading-tight">
                          {item.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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

export default Expertise;
