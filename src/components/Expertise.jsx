import React, { useMemo } from "react";
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
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import { MdHtml } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import LogoLoop from "./LogoLoop/LogoLoop";

const Expertise = () => {
  // Container variants for staggered children
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

  const cardVariants = {
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // ✅ Hooks must be inside the component
  const techLogos = useMemo(
    () => [
      { node: <SiReact />, title: "React", href: "https://react.dev" },
      {
        node: <SiTailwindcss />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
      },
      { node: <SiPython />, title: "Python", href: "https://www.python.org" },
      {
        node: <SiDjango />,
        title: "Django",
        href: "https://www.djangoproject.com",
      },
      {
        node: <SiCplusplus />,
        title: "C++",
        href: "https://www.w3schools.com/cpp/",
      },
      { node: <SiC />, title: "C", href: "https://www.cprogramming.com/" },
      { node: <MdHtml />, title: "HTML", href: "https://html.com/" },
      {
        node: <SiJavascript />,
        title: "JavaScript",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/" },
      {
        node: <SiPostgresql />,
        title: "PostgreSQL",
        href: "https://www.postgresql.org",
      },
      {
        node: <BiLogoVisualStudio />,
        title: "VS Code",
        href: "https://visualstudio.microsoft.com/",
      },
      {
        node: <SiBootstrap />,
        title: "Bootstrap",
        href: "https://getbootstrap.com",
      },
      {
        node: <SiEclipseide />,
        title: "Eclipse IDE",
        href: "http://eclipseide.org/",
      },
      { node: <FaJava />, title: "Java", href: "https://www.java.com/en" },
      {
        node: <SiXampp />,
        title: "XAMPP",
        href: "https://www.apachefriends.org",
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
        ],
      },
    ],
    []
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="expertise"
      className="py-20 px-6 md:px-16 lg:px-24 bg-transparent relative"
      aria-labelledby="expertise-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={containerVariants} className="text-center mb-16">
          {/* Small badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Technical Skills
            </span>
          </motion.div>

          {/* Frosted container for title + description */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-6 p-6 rounded-2xl border border-base-300/50 bg-base-200/30 backdrop-blur-md"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            >
              <ShinyText
                text="Technical Expertise"
                disabled={false}
                speed={3}
              />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 leading-relaxed text-center"
            >
              A concise overview of my technical stack and areas of proficiency
              — showcasing the technologies and tools I work with regularly.
            </motion.p>
          </motion.div>
          {/* Underline */}
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Tech Logo Marquee */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden mb-20"
          aria-label="Scrolling technology stack logos"
        >
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={56}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="rgba(0,0,0,1)" // full black fade
            className="logoloop logoloop--scale-hover logoloop--fade"
            style={{ width: "100%" }}
          />
        </motion.div>

        {/* Skill Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  <div className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-8 border border-transparent hover:border-accent/30 transition-transform duration-500 group hover:scale-105 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 text-center mb-8">
                      <h3
                        className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {category.subtitle}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          className="flex flex-col items-center text-center p-2 w-full transition-transform duration-300 hover:scale-110"
                        >
                          <div
                            className="text-3xl mb-1"
                            style={{ color: category.color }}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </div>
                          <span className="text-sm text-gray-300">
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ElectricBorder>
              </div>

              {/* Mobile/Small screens: Static neon border */}
              <div className="block md:hidden">
                <div
                  className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-8 border-2 transition-transform duration-500 group hover:scale-105 overflow-hidden"
                  style={{
                    borderColor: category.color,
                    boxShadow: `0 0 10px ${category.color}`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 text-center mb-8">
                    <h3
                      className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
                    {category.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="flex flex-col items-center text-center p-2 w-full transition-transform duration-300 hover:scale-110"
                      >
                        <div
                          className="text-3xl mb-1"
                          style={{ color: category.color }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </div>
                        <span className="text-sm text-gray-300">
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
    </motion.section>
  );
};

export default Expertise;
