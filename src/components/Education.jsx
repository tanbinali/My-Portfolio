import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLaptopCode,
} from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import uniimage from "../assets/versity.webp";
import phitron from "../assets/phitron.webp";

const Education = () => {
  const educationData = [
    {
      title: "B.Sc in Computer Science & Engineering",
      university: "East Delta University",
      shortName: "EDU",
      location: "Chattogram, Bangladesh",
      duration: "2024 – 2028 (expected)",
      status: "In Progress",
      image: uniimage,
      icon: <FaGraduationCap className="text-white" />,
      color: "#8B0000",
      current: true,
    },
    {
      title: "CSE Fundamentals with Phitron",
      university: "Phitron",
      shortName: "Phitron",
      location: "Online Platform",
      duration: "2024 – 2025",
      status: "Completed",
      image: phitron,
      icon: <FaLaptopCode className="text-white" />,
      color: "#6B21A8",
      current: false,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setIndex((prev) => (prev + 1) % educationData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? educationData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (i) => {
    if (isAnimating || i === index) return;
    setIsAnimating(true);
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const currentEdu = educationData[index];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="education"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-transparent relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-4 sm:mb-6 mx-auto">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-accent">
              Academic Journey
            </span>
          </div>
          <div className="max-w-3xl mx-auto mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-base-300/50 bg-base-200/30 backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">
              <ShinyText text="Education & Learning" speed={3} />
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-center">
              A glimpse into my educational journey — where I built strong
              foundations in software engineering and computer science.
            </p>
          </div>
          <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* Desktop Electric Border */}
              <div className="hidden md:block">
                <ElectricBorder
                  color={currentEdu.color}
                  thickness={2}
                  speed={0.8}
                  chaos={0.1}
                  style={{ borderRadius: 24, overflow: "visible" }}
                >
                  <motion.div
                    className="bg-base-200/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-transparent relative z-10"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EducationCardContent edu={currentEdu} />
                  </motion.div>
                </ElectricBorder>
              </div>

              {/* Mobile static neon border */}
              <div className="block md:hidden">
                <motion.div
                  className="bg-base-200/30 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 relative z-10"
                  style={{
                    borderColor: currentEdu.color,
                    boxShadow: `0 0 15px ${currentEdu.color}`,
                  }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <EducationCardContent edu={currentEdu} />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Hidden on smallest screens, shown from sm up */}
          <motion.button
            onClick={handlePrev}
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-3 md:-left-4 lg:-left-6 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 items-center justify-center shadow-xl"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-sm md:text-base lg:text-lg" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-3 md:-right-4 lg:-right-6 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 items-center justify-center shadow-xl"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-sm md:text-base lg:text-lg" />
          </motion.button>

          {/* Mobile Navigation - Small buttons for mobile */}
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={handlePrev}
              className="w-10 h-10 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="w-10 h-10 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {educationData.map((edu, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                  i === index
                    ? "scale-105 sm:scale-110 shadow-md sm:shadow-lg"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    i === index ? `${edu.color}20` : "rgba(255,255,255,0.05)",
                  borderColor:
                    i === index ? `${edu.color}40` : "rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    i === index ? "scale-110 sm:scale-125" : ""
                  }`}
                  style={{
                    backgroundColor: i === index ? edu.color : "#6B7280",
                  }}
                />
                <span
                  className="text-xs sm:text-sm font-medium hidden xs:block"
                  style={{
                    color: i === index ? edu.color : "#9CA3AF",
                  }}
                >
                  {edu.shortName}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-base-300/50 max-w-2xl mx-auto"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              I believe in lifelong learning and continuously improving my
              skills to stay ahead in technology and software innovation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;

// Separate content component for reuse
const EducationCardContent = ({ edu }) => (
  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center">
    {/* Image */}
    <div className="w-full lg:w-2/5 relative">
      <div className="relative group">
        <motion.img
          src={edu.image}
          alt={edu.university}
          className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
        <div
          className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
          style={{
            backgroundColor: `${edu.color}20`,
            borderColor: `${edu.color}40`,
            color: edu.color,
          }}
        >
          {edu.status}
        </div>
        <div
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm border shadow-lg"
          style={{
            backgroundColor: `${edu.color}20`,
            borderColor: `${edu.color}40`,
          }}
        >
          {React.cloneElement(edu.icon, {
            className: "text-white text-sm sm:text-base lg:text-lg",
          })}
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
          {edu.title}
        </h3>
        <div
          className="w-12 sm:w-16 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4"
          style={{ background: edu.color }}
        />
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
          <MdOutlineDriveFileRenameOutline className="text-gray-400 text-sm sm:text-base" />
          <span className="text-white font-semibold">{edu.university}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
          <FaMapMarkerAlt className="text-gray-400 text-sm sm:text-base" />
          <span>{edu.location}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-gray-300 text-sm sm:text-base">
          <FaCalendarAlt className="text-gray-400 text-sm sm:text-base" />
          <span>{edu.duration}</span>
        </div>
      </div>
    </div>
  </div>
);
