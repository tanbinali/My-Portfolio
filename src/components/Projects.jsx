import React, { useState, useCallback, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaImages,
  FaServer,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// --- Assets Imports (Kept as is) ---
import p1img1 from "../assets/serviceease/image1.webp";
import p1img2 from "../assets/serviceease/image2.webp";
import p1img3 from "../assets/serviceease/image3.webp";
import p1img4 from "../assets/serviceease/image4.webp";
import p1img5 from "../assets/serviceease/image5.webp";
import p1img6 from "../assets/serviceease/image6.webp";
import p1img7 from "../assets/serviceease/image7.webp";
import p1img8 from "../assets/serviceease/image8.webp";
import p1img9 from "../assets/serviceease/image9.webp";
import p1img10 from "../assets/serviceease/image10.webp";
import p1img11 from "../assets/serviceease/image11.webp";
import p1img12 from "../assets/serviceease/image12.webp";
import p1img13 from "../assets/serviceease/image13.webp";
import p1img14 from "../assets/serviceease/image14.webp";
import p1img15 from "../assets/serviceease/image15.webp";
import p1img16 from "../assets/serviceease/image16.webp";

import p2img1 from "../assets/mkauto/image.webp";
import p2img2 from "../assets/mkauto/image (1).webp";
import p2img3 from "../assets/mkauto/image (2).webp";
import p2img4 from "../assets/mkauto/image (3).webp";
import p2img5 from "../assets/mkauto/image (4).webp";
import p2img6 from "../assets/mkauto/image (5).webp";

import p3img1 from "../assets/eventmanager/image.webp";
import p3img2 from "../assets/eventmanager/image (1).webp";
import p3img3 from "../assets/eventmanager/image (2).webp";
import p3img4 from "../assets/eventmanager/image (3).webp";
import p3img5 from "../assets/eventmanager/image (4).webp";
import p3img6 from "../assets/eventmanager/image (5).webp";
import p3img7 from "../assets/eventmanager/image (6).webp";
import p3img8 from "../assets/eventmanager/image (7).webp";
import p3img9 from "../assets/eventmanager/image (8).webp";
import p3img10 from "../assets/eventmanager/image (9).webp";

import p4img1 from "../assets/librarymanagerAPI/image.webp";
import p4img2 from "../assets/librarymanagerAPI/image (1).webp";
import p4img3 from "../assets/librarymanagerAPI/image (2).webp";
import p4img4 from "../assets/librarymanagerAPI/image (3).webp";

// --- Static Data ---
const PROJECTS_DATA = [
  {
    title: "Household Services Website",
    description:
      "A full-stack household services platform built with React, TailwindCSS, Django REST Framework, and PostgreSQL. Clients can browse services, add to cart, place orders with SSL Commerz payments, and leave reviews. Admins can manage users, services, categories, orders, and reviews. Includes authentication and responsive UI.",
    tech: [
      "React",
      "TailwindCSS",
      "Django",
      "Python",
      "REST API",
      "PostgreSQL",
      "HTML",
      "JavaScript",
    ],
    images: [
      p1img1,
      p1img2,
      p1img3,
      p1img4,
      p1img5,
      p1img6,
      p1img7,
      p1img8,
      p1img9,
      p1img10,
      p1img11,
      p1img12,
      p1img13,
      p1img14,
      p1img15,
      p1img16,
    ],
    frontend: "https://github.com/tanbinali/ServiceEaseClient",
    backend: "https://github.com/tanbinali/ServiceEaseProject",
    live: "https://service-ease-client.vercel.app/",
    theme: {
      borderColor: "#E5E0DC",
      gradientFrom: "#0D0D14",
      gradientTo: "#0D0D14",
      hoverText: "text-white",
    },
  },
  {
    title: "Mohammad Khan Auto Parts",
    description:
      "A professional web application developed for a real automobile parts and repair company based in Abu Dhabi. The project focuses on a modern, responsive React frontend powered by TailwindCSS, designed for smooth performance and usability. It showcases product listings, parts categories, and repair services with dynamic navigation and clean UI.",
    tech: ["React", "TailwindCSS", "HTML", "JavaScript"],
    images: [p2img1, p2img2, p2img3, p2img4, p2img5, p2img6],
    frontend: "https://github.com/tanbinali/Mohd.KhanAutoPartsClient",
    live: "https://www.mohammadkhanautoparts.com/",
    theme: {
      borderColor: "#3B82F6",
      gradientFrom: "#60A5FA",
      gradientTo: "#2563EB",
      hoverText: "text-blue-400",
    },
  },
  {
    title: "Event Manager Django",
    description:
      "A web MVT application built with Django, HTML, TailwindCSS, and PostgreSQL that enables users to create, manage, and participate in events seamlessly. Admins and organizers can easily create, update, and categorize events, while participants can explore upcoming events, RSVP with a single click, and manage their dashboard efficiently. Role-based dashboards ensure that each user sees what matters most to them, all within a modern, responsive, and user-friendly interface.",
    tech: ["TailwindCSS", "Django", "PostgreSQL", "HTML"],
    images: [
      p3img1,
      p3img2,
      p3img3,
      p3img4,
      p3img5,
      p3img6,
      p3img7,
      p3img8,
      p3img9,
      p3img10,
    ],
    backend: "https://github.com/tanbinali/event_management_django",
    live: "https://event-management-django-neon.vercel.app/",
    theme: {
      borderColor: "#10B981",
      gradientFrom: "#34D399",
      gradientTo: "#059669",
      hoverText: "text-green-400",
    },
  },
  {
    title: "Library Manager API",
    description:
      "A Django REST Framework-based Library Management System API designed to manage books, members, and borrow records efficiently. Built with secure JWT authentication and robust role-based access control to differentiate between librarians and members. Includes Swagger and ReDoc documentation, nested routing, and well-structured RESTful endpoints for seamless integration with frontend clients.",
    tech: ["Django REST Framework", "Python", "JWT", "Djoser"],
    images: [p4img1, p4img2, p4img3, p4img4],
    backend: "https://github.com/tanbinali/library_manager_api",
    live: "https://library-manager-api-alpha.vercel.app/",
    theme: {
      borderColor: "#85EA2D",
      gradientFrom: "#85EA2D",
      gradientTo: "#20232A",
      hoverText: "text-green-400",
    },
  },
];

// --- Custom Hooks ---
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
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    let timeout;
    const debouncedCheck = () => {
      clearTimeout(timeout);
      timeout = setTimeout(check, 100);
    };
    window.addEventListener("resize", debouncedCheck, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedCheck);
      clearTimeout(timeout);
    };
  }, []);
  return isMobile;
};

// --- Sub-Components ---

// 1. Desktop View
const DesktopProjectCard = memo(
  ({
    project,
    theme,
    activeImage,
    onThumbnailClick,
    onZoom,
    index,
    activeImgIndex,
  }) => {
    const isAlternate = index % 2 !== 0;

    return (
      <ElectricBorder
        color={theme.borderColor}
        thickness={2}
        speed={0.8}
        chaos={0.1}
        style={{ borderRadius: 20 }}
      >
        <div
          className={`flex flex-col xl:flex-row items-stretch gap-8 p-8 bg-base-200 rounded-2xl shadow-2xl ${
            isAlternate ? "xl:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div className="xl:w-1/2">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-base-300/20 aspect-video">
                <motion.img
                  src={activeImage}
                  alt={`${project.title} main`}
                  className="w-full h-full object-cover cursor-zoom-in"
                  // Pass all images and current index to zoom
                  onClick={() => onZoom(project.images, activeImgIndex)}
                  whileHover={{ scale: 1.03 }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 py-2">
                  {project.images.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      alt="thumbnail"
                      className={`h-20 w-auto rounded-lg cursor-pointer flex-shrink-0 border-2 transition-all ${
                        activeImage === img
                          ? "border-white ring-2 ring-white/50"
                          : "border-transparent hover:border-white/50"
                      }`}
                      onClick={() => onThumbnailClick(i)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="xl:w-1/2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-full text-white font-medium backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Links */}
            <div className="flex gap-4 flex-wrap">
              {project.frontend && (
                <ProjectLink
                  href={project.frontend}
                  icon={<VscPreview />}
                  text="Frontend"
                  hoverClass={theme.hoverText}
                />
              )}
              {project.backend && (
                <ProjectLink
                  href={project.backend}
                  icon={<FaServer />}
                  text="Backend"
                  hoverClass={theme.hoverText}
                />
              )}
              {project.live && (
                <ProjectLink
                  href={project.live}
                  icon={<FaExternalLinkAlt />}
                  text="Live Demo"
                  isSolid
                />
              )}
            </div>
          </div>
        </div>
      </ElectricBorder>
    );
  }
);

// 2. Mobile View
const MobileProjectCard = memo(
  ({
    project,
    theme,
    activeImage,
    onThumbnailClick,
    onZoom,
    variants,
    activeImgIndex,
  }) => {
    return (
      <motion.div
        variants={variants}
        className="rounded-xl sm:rounded-2xl overflow-hidden border-2 bg-white/10 backdrop-blur-md border-white/20"
        style={{ borderColor: theme.borderColor }}
      >
        <div className="relative">
          <div className="relative aspect-video bg-base-300/20">
            <img
              src={activeImage}
              alt={project.title}
              className="w-full h-full object-cover cursor-zoom-in"
              loading="lazy"
              decoding="async"
              // Pass all images and current index to zoom
              onClick={() => onZoom(project.images, activeImgIndex)}
            />
            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-lg">
              <FaImages /> <span>{project.images.length}</span>
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="p-2 overflow-x-auto flex space-x-1.5 scrollbar-thin scrollbar-track-transparent">
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={`h-12 w-auto rounded-md cursor-pointer border-2 flex-shrink-0 ${
                    activeImage === img
                      ? "border-white"
                      : "border-transparent opacity-70"
                  }`}
                  onClick={() => onThumbnailClick(i)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-[10px] rounded-full text-white font-medium"
                style={{
                  background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.frontend && (
              <ProjectLinkMobile
                href={project.frontend}
                icon={<VscPreview />}
                text="Frontend"
              />
            )}
            {project.backend && (
              <ProjectLinkMobile
                href={project.backend}
                icon={<FaServer />}
                text="Backend"
              />
            )}
            {project.live && (
              <ProjectLinkMobile
                href={project.live}
                icon={<FaExternalLinkAlt />}
                text="Live"
                isSolid
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

// 3. Project Card Wrapper
const ProjectCard = memo(
  ({ project, index, isMobile, shouldReduceAnimations, onZoom }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const handleThumbnailClick = useCallback((idx) => {
      setActiveImgIndex(idx);
    }, []);

    const theme = project.theme || {};
    const activeImage = project.images[activeImgIndex];

    const itemVariants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          y: shouldReduceAnimations ? 20 : 40,
          scale: shouldReduceAnimations ? 0.98 : 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
        hover: shouldReduceAnimations
          ? {}
          : { y: -4, transition: { duration: 0.25 } },
      }),
      [shouldReduceAnimations]
    );

    return (
      <motion.article
        variants={itemVariants}
        whileHover={!isMobile ? "hover" : undefined}
        className="group"
      >
        {isMobile ? (
          <MobileProjectCard
            project={project}
            theme={theme}
            activeImage={activeImage}
            onThumbnailClick={handleThumbnailClick}
            onZoom={onZoom}
            variants={shouldReduceAnimations ? {} : { hover: { y: -4 } }}
            activeImgIndex={activeImgIndex}
          />
        ) : (
          <DesktopProjectCard
            project={project}
            theme={theme}
            activeImage={activeImage}
            onThumbnailClick={handleThumbnailClick}
            onZoom={onZoom}
            index={index}
            activeImgIndex={activeImgIndex}
          />
        )}
      </motion.article>
    );
  }
);

const ProjectLink = ({
  href,
  icon,
  text,
  hoverClass = "text-cyan-400",
  isSolid,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      isSolid
        ? "btn bg-white text-gray-900 hover:bg-gray-100 gap-2 border-0 font-semibold"
        : `btn btn-outline border-2 text-white hover:${hoverClass.replace(
            "text-",
            ""
          )} hover:border-current gap-2`
    }
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg">{icon}</span> {text}
  </motion.a>
);

const ProjectLinkMobile = ({ href, icon, text, isSolid }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn btn-sm ${
      isSolid
        ? "bg-white text-gray-900 hover:bg-gray-100 border-0"
        : "btn-outline border text-white"
    } gap-1 flex-1 min-w-0 text-xs`}
  >
    <span className="text-sm flex-shrink-0">{icon}</span>
    <span className="truncate">{text}</span>
  </a>
);

// --- NEW ENHANCED ZOOM MODAL WITH CAROUSEL ---
const zoomVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ZoomModal = memo(({ images, initialIndex, onClose }) => {
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  // Handle wrapping indices
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate, onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Container for sliding images */}
      <div
        className="relative w-full h-full max-w-7xl flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content area
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={zoomVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute max-h-[85vh] w-auto max-w-[95vw] object-contain rounded-lg shadow-2xl touch-none cursor-grab active:cursor-grabbing"
            alt={`Project View ${imageIndex + 1}`}
          />
        </AnimatePresence>

        {/* Controls Overlay */}
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all backdrop-blur-sm"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        {/* Image Counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
          {imageIndex + 1} / {images.length}
        </div>

        {/* Navigation Buttons (Only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 sm:left-4 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm hidden sm:flex items-center justify-center group"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
            >
              <FaChevronLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <button
              className="absolute right-2 sm:right-4 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm hidden sm:flex items-center justify-center group"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
            >
              <FaChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
});

// --- Main Component ---
const Projects = () => {
  // Store full zoom state object: { images: [], index: 0 }
  const [zoomData, setZoomData] = useState(null);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  // Update handleZoom to accept images array and start index
  const handleZoom = useCallback((images, index) => {
    setZoomData({ images, index });
  }, []);

  const closeZoom = useCallback(() => setZoomData(null), []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceAnimations ? 0.1 : 0.15,
          delayChildren: 0.1,
        },
      },
    }),
    [shouldReduceAnimations]
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="projects"
      className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-6 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-accent">
              Featured Work
            </span>
          </div>

          <div className="max-w-3xl mx-auto mb-6 p-6 rounded-2xl glass-card">
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-4 text-center">
              <ShinyText
                text="Projects Showcase"
                disabled={shouldReduceAnimations}
                speed={shouldReduceAnimations ? 5 : 3}
              />
            </h2>
            <p className="text-sm sm:text-xl text-gray-300 leading-relaxed text-center">
              A showcase of my professional projects demonstrating full-stack
              development capabilities.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-12 lg:gap-16"
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              project={project}
              isMobile={isMobile}
              shouldReduceAnimations={shouldReduceAnimations}
              onZoom={handleZoom}
            />
          ))}
        </motion.div>
      </div>

      {/* Enhanced Zoom Modal */}
      <AnimatePresence>
        {zoomData && (
          <ZoomModal
            images={zoomData.images}
            initialIndex={zoomData.index}
            onClose={closeZoom}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;
