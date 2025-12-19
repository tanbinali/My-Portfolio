import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLaptopCode,
  FaSearchPlus,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// Images
import uniimage from "../assets/versity.webp";
import phitron from "../assets/phitron.webp";

// --- Static Data ---
const EDUCATION_DATA = [
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
    details:
      "Studying core CSE subjects including C, C++, Java, Object-Oriented Programming (OOP), Data Structures, Algorithms, Discrete Mathematics, Database Systems, and Digital Logic Design (DLD). Actively participating in hackathons and practical software projects, with continuous learning planned in advanced systems, AI, and modern software engineering.",
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
    details:
      "Completed intensive training in C, C++, Data Structures, Algorithms, OOP, Competitive Programming (CP), HTML, CSS, Tailwind CSS, JavaScript, React, Python, SQL, and Django (MVT & REST API). Certificate ID: PHBATCH66222951006 (verifiable at phitron.io/verification).",
  },
];


const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (dir) => ({
    x: dir < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
};

// 1. Zoom Modal
const ZoomModal = memo(({ image, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <div
      className="relative max-w-5xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        className="absolute -top-12 right-0 text-white hover:text-red-400 text-3xl transition-colors"
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTimes />
      </motion.button>
      <motion.img
        src={image}
        alt="Zoomed Education"
        className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />
    </div>
  </motion.div>
));

// Info row
const InfoRow = ({ icon: Icon, text, color = "text-gray-300" }) => (
  <div className={`flex items-center gap-3 text-base sm:text-lg ${color}`}>
    <Icon className="text-gray-400 text-base" />
    <span className="font-medium">{text}</span>
  </div>
);

// 2. Education Card Content
const EducationCardContent = memo(({ edu, onZoom }) => (
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
    {/* Image Section */}
    <div
      className="w-full lg:w-2/5 relative group cursor-zoom-in"
      onClick={() => onZoom(edu.image)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <motion.img
          src={edu.image}
          alt={edu.university}
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Zoom Overlay Hint */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <FaSearchPlus className="text-white text-3xl drop-shadow-md" />
        </div>

        {/* Status Badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border z-10"
          style={{
            backgroundColor: `${edu.color}40`,
            borderColor: `${edu.color}`,
            color: "white",
          }}
        >
          {edu.status}
        </div>

        {/* Icon Box */}
        <div
          className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border shadow-lg z-10"
          style={{
            backgroundColor: `${edu.color}40`,
            borderColor: `${edu.color}`,
          }}
        >
          {React.cloneElement(edu.icon, { className: "text-white text-lg" })}
        </div>
      </div>
    </div>

    {/* Text Content */}
    <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6">
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
          {edu.title}
        </h3>
        <div
          className="w-16 h-1 rounded-full mb-4"
          style={{ background: edu.color }}
        />
      </div>

      <div className="space-y-3">
        <InfoRow
          icon={MdOutlineDriveFileRenameOutline}
          text={edu.university}
          color="text-white"
        />
        <InfoRow icon={FaMapMarkerAlt} text={edu.location} />
        <InfoRow icon={FaCalendarAlt} text={edu.duration} />
      </div>

      {edu.details && (
        <div className="mt-3 sm:mt-4">
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {edu.details}
          </p>
        </div>
      )}
    </div>
  </div>
));

// 3. Navigation Controls
const NavButton = ({ onClick, direction, className }) => (
  <motion.button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full z-20 backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-xl ${className}`}
    whileHover={{ scale: 1.1, x: direction === "left" ? -2 : 2 }}
    whileTap={{ scale: 0.9 }}
  >
    {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
  </motion.button>
);

const NavButtonMobile = ({ onClick, icon }) => (
  <motion.button
    onClick={onClick}
    className="w-10 h-10 bg-base-300/80 hover:bg-base-300 text-white rounded-full backdrop-blur-sm border border-base-400/50 flex items-center justify-center shadow-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.button>
);

const CarouselControls = memo(({ onPrev, onNext }) => (
  <>
    {/* Desktop/Tablet */}
    <NavButton
      onClick={onPrev}
      direction="left"
      className="hidden sm:flex -left-4 lg:-left-6"
    />
    <NavButton
      onClick={onNext}
      direction="right"
      className="hidden sm:flex -right-4 lg:-right-6"
    />

    {/* Mobile */}
    <div className="flex sm:hidden justify-center gap-4 mt-6">
      <NavButtonMobile onClick={onPrev} icon={<FaChevronLeft />} />
      <NavButtonMobile onClick={onNext} icon={<FaChevronRight />} />
    </div>
  </>
));

// --- Main Component ---
const Education = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setIndex((prev) => (prev + 1) % EDUCATION_DATA.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? EDUCATION_DATA.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const goToSlide = useCallback(
    (i) => {
      if (isAnimating || i === index) return;
      setIsAnimating(true);
      setDirection(i > index ? 1 : -1);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, index]
  );

  const currentEdu = EDUCATION_DATA[index];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      id="education"
      className="py-10 sm:py-14 lg:py-20 px-3 sm:px-4 bg-transparent relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-6 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-accent">
              Academic Journey
            </span>
          </div>
          <div className="max-w-3xl mx-auto mb-6 p-6 rounded-2xl glass-card">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              <ShinyText text="Education & Certifications" speed={3} />
            </h2>
            <p className="text-gray-300 text-center text-sm sm:text-lg">
              A glimpse into my educational journey — where strong fundamentals
              in computer science and software engineering were built.
            </p>
          </div>
        </div>

        {/* Carousel Area */}
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
              {/* Desktop/Laptop with ElectricBorder */}
              <div className="hidden md:block">
                <ElectricBorder
                  color={currentEdu.color}
                  speed={0.8}
                  chaos={0.1}
                  thickness={2}
                  style={{ borderRadius: 20 }}
                >
                  <div className="bg-base-200/30 backdrop-blur-md rounded-3xl p-8 border border-transparent">
                    <EducationCardContent
                      edu={currentEdu}
                      onZoom={setZoomedImage}
                    />
                  </div>
                </ElectricBorder>
              </div>

              {/* Mobile */}
              <div className="block md:hidden">
                <div
                  className="bg-base-200/30 backdrop-blur-md rounded-2xl p-4 border-2 shadow-lg"
                  style={{
                    borderColor: currentEdu.color,
                    boxShadow: `0 0 10px ${currentEdu.color}40`,
                  }}
                >
                  <EducationCardContent
                    edu={currentEdu}
                    onZoom={setZoomedImage}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <CarouselControls onPrev={handlePrev} onNext={handleNext} />

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {EDUCATION_DATA.map((edu, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 rounded-full h-2 sm:h-3 ${
                  i === index ? "w-8 sm:w-10" : "w-2 sm:w-3"
                }`}
                style={{ backgroundColor: i === index ? edu.color : "#4B5563" }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-xl p-6 border border-base-300/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-2">
              Continuous Learning
            </h3>
            <p className="text-gray-300 text-sm">
              Always exploring new technologies, course materials, and
              certifications to stay ahead in software engineering.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <ZoomModal image={zoomedImage} onClose={() => setZoomedImage(null)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Education;
