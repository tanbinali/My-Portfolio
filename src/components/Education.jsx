import { useState, useEffect } from "react";
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
      gradient: "from-green-600 to-green-800",
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
      gradient: "from-green-700 to-green-900",
      current: false,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);

  // Animation variants
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    }),
  };

  useEffect(() => {
    const timer = setInterval(() => handleNext(), 8000);
    return () => clearInterval(timer);
  }, [educationData.length]);

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
      className="py-20 px-6 md:px-16 lg:px-24 bg-transparent relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div variants={containerVariants} className="text-center mb-16">
          {/* Small badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Academic Journey
            </span>
          </motion.div>

          {/* Frosted container for title + description */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto mb-6 p-6 rounded-2xl border border-base-300/50 bg-base-200/30 backdrop-blur-md"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              <ShinyText text="Education & Learning" speed={3} />
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed text-center">
              A glimpse into my educational journey — where I built strong
              foundations in software engineering and computer science.
            </p>
          </motion.div>

          {/* Underline */}
          <motion.div
            variants={itemVariants}
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"
          />
        </motion.div>

        {/* Main Carousel */}
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
              <ElectricBorder
                color={currentEdu.color}
                thickness={2}
                speed={0.8}
                chaos={0.1}
                style={{ borderRadius: 24 }}
              >
                <motion.div
                  className="bg-base-200/30 backdrop-blur-md rounded-3xl p-8 border border-base-300/50"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Image */}
                    <motion.div
                      className="lg:w-2/5 relative"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <div className="relative group">
                        <motion.img
                          src={currentEdu.image}
                          alt={currentEdu.university}
                          className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.div
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
                          style={{
                            backgroundColor: `${currentEdu.color}20`,
                            borderColor: `${currentEdu.color}40`,
                            color: currentEdu.color,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                        >
                          {currentEdu.status}
                        </motion.div>

                        <motion.div
                          className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm border shadow-lg"
                          style={{
                            backgroundColor: `${currentEdu.color}20`,
                            borderColor: `${currentEdu.color}40`,
                          }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {currentEdu.icon}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="lg:w-3/5 space-y-6"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div>
                        <motion.h3
                          className="text-2xl lg:text-3xl font-bold text-white mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {currentEdu.title}
                        </motion.h3>
                        <motion.div
                          className="w-16 h-1 rounded-full mb-4"
                          style={{ background: currentEdu.color }}
                          initial={{ width: 0 }}
                          animate={{ width: 64 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </div>

                      <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-3 text-lg"
                          whileHover={{ x: 5 }}
                        >
                          <MdOutlineDriveFileRenameOutline className="text-gray-400" />
                          <span className="text-white font-semibold">
                            {currentEdu.university}
                          </span>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-3 text-gray-300"
                          whileHover={{ x: 5 }}
                        >
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>{currentEdu.location}</span>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          className="flex items-center gap-3 text-gray-300"
                          whileHover={{ x: 5 }}
                        >
                          <FaCalendarAlt className="text-gray-400" />
                          <span>{currentEdu.duration}</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </ElectricBorder>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-12 h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-lg" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-12 h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-lg" />
          </motion.button>

          {/* Dots */}
          <motion.div
            className="flex justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {educationData.map((edu, i) => (
              <motion.button
                key={i}
                onClick={() => goToSlide(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                  i === index
                    ? "scale-110 shadow-lg"
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
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? "scale-125" : ""
                  }`}
                  style={{
                    backgroundColor: i === index ? edu.color : "#6B7280",
                  }}
                  animate={
                    i === index
                      ? {
                          scale: [1, 1.2, 1],
                          transition: { duration: 2, repeat: Infinity },
                        }
                      : {}
                  }
                />
                <span
                  className="text-sm font-medium hidden sm:block"
                  style={{
                    color: i === index ? edu.color : "#9CA3AF",
                  }}
                >
                  {edu.shortName}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-300">
              I believe in lifelong learning and continuously improving my
              skills to stay ahead in technology and software innovation.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-700/5 rounded-full blur-3xl"
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
        />
      </div>
    </motion.section>
  );
};

export default Education;
