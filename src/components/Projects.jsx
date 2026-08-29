import React, { useState, useCallback, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaTimes,
  FaServer,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaArrowDown,
  FaArrowUp,
  FaExpand,
} from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import { PROJECTS_DATA } from "../data/projectsData";

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

// --- Helper Components ---
const ImageCarousel = memo(
  ({ images, activeIndex, onThumbnailClick, onZoom, borderColor }) => {
    const activeImage = images[activeIndex];

    return (
      <div className="space-y-3">
        <div className="relative rounded-lg overflow-hidden bg-base-300/20 aspect-video group/img shadow-md">
          <motion.img
            src={activeImage}
            alt="Project Preview"
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={(e) => {
              e.stopPropagation();
              onZoom(images, activeIndex);
            }}
            whileHover={{ scale: 1.03 }}
            layoutId={`img-${activeImage}`}
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-medium text-white flex items-center gap-1 pointer-events-none">
            <FaExpand size={8} /> Zoom
          </div>
        </div>

        {images.length > 1 && (
          <div
            className="flex space-x-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt="thumbnail"
                className={`h-10 sm:h-12 w-auto rounded-md cursor-pointer flex-shrink-0 border-[1.5px] transition-all ${
                  i === activeIndex
                    ? "ring-1 ring-white/50"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: i === activeIndex ? borderColor : "transparent",
                }}
                onClick={() => onThumbnailClick(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

// --- Vertical Project Card ---
const VerticalProjectCard = memo(
  ({
    project,
    theme,
    activeImgIndex,
    setActiveImgIndex,
    onZoom,
    onDetails,
    isMobile,
  }) => {
    const content = (
      <div
        onClick={() => onDetails(project)}
        className="flex-1 w-full h-full flex flex-col justify-between cursor-pointer transition-colors p-5 group"
      >
        <div>
          <div className="w-full mb-4">
            <ImageCarousel
              images={project.images}
              activeIndex={activeImgIndex}
              onThumbnailClick={setActiveImgIndex}
              onZoom={onZoom}
              borderColor={theme.borderColor}
            />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-4 text-xs md:text-sm leading-snug line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] rounded-md text-gray-300 font-medium bg-base-300/80 border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] rounded-md text-gray-400 font-medium bg-base-300/80 border border-white/5">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        <div
          className="flex gap-2.5 flex-wrap mt-auto pt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onDetails(project)}
            className="btn btn-sm h-8 min-h-0 px-3 text-white border-0 shadow-md text-xs font-semibold tracking-wide flex-1"
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              color: "#ffffff",
            }}
          >
            <FaInfoCircle /> Details
          </button>

          {project.live && (
            <ProjectLink
              href={project.live}
              icon={<FaExternalLinkAlt />}
              text="Live"
              isSolid
              theme={theme}
            />
          )}
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <div
          className="flex-1 flex flex-col rounded-2xl border-2 w-full h-full overflow-hidden bg-base-200"
          style={{
            borderColor: theme.borderColor,
            boxShadow: `0 0 15px 1px ${theme.borderColor}40`,
          }}
        >
          {content}
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col w-full h-full relative [&>div]:!flex-1 [&>div]:!h-full [&>div]:flex [&>div]:flex-col [&>div>div]:!flex-1 [&>div>div]:!h-full [&>div>div]:flex [&>div>div]:flex-col">
        <ElectricBorder
          color={theme.borderColor}
          thickness={2}
          speed={0.8}
          chaos={0.1}
          className="flex-1 flex flex-col w-full h-full"
          style={{
            borderRadius: 16,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div className="flex-1 flex flex-col w-full h-full bg-base-200 rounded-2xl overflow-hidden hover:bg-base-200/80 transition-colors">
            {content}
          </div>
        </ElectricBorder>
      </div>
    );
  }
);

// --- Project Card Wrapper ---
const ProjectCard = memo(
  ({ project, index, isMobile, shouldReduceAnimations, onZoom, onDetails }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const theme = project.theme || {};

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
        layout
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={itemVariants}
        whileHover={!isMobile ? "hover" : undefined}
        className="group h-full w-full flex flex-col"
      >
        <VerticalProjectCard
          project={project}
          theme={theme}
          activeImgIndex={activeImgIndex}
          setActiveImgIndex={setActiveImgIndex}
          onZoom={onZoom}
          onDetails={onDetails}
          isMobile={isMobile}
        />
      </motion.article>
    );
  }
);

const ProjectLink = ({ href, icon, text, isSolid, theme }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn btn-sm h-8 min-h-0 px-3 ${
      isSolid
        ? "text-white border-0 shadow-md"
        : `btn-outline border-white/20 text-gray-300 hover:border-white hover:text-white hover:bg-transparent`
    } gap-2 text-xs font-medium flex-1`}
    style={
      isSolid && theme
        ? {
            background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
            color: "#ffffff",
          }
        : {}
    }
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-sm">{icon}</span> {text}
  </motion.a>
);

// --- Project Details Modal ---
const ProjectDetailsModal = memo(({ project, onClose, onZoom }) => {
  if (!project) return null;
  const theme = project.theme || {};
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="relative w-[95vw] md:w-full max-w-5xl h-[80vh] md:h-[85vh] flex flex-col pointer-events-auto"
      >
        <div
          className="w-full h-full flex flex-col relative rounded-[20px] overflow-hidden border-2 bg-base-200/90 backdrop-blur-xl"
          style={{
            borderColor: theme.borderColor,
            boxShadow: `0 0 20px 2px ${theme.borderColor}80`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/60 hover:bg-red-500/80 text-white p-2 rounded-full transition-all backdrop-blur-md z-50 border border-white/20"
          >
            <FaTimes size={18} />
          </button>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-8 scrollbar-thin scrollbar-thumb-gray-600 overscroll-contain">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-5">
                <h2 className="text-xl sm:text-3xl font-bold text-white lg:hidden mb-1 leading-tight pr-8">
                  {project.title}
                </h2>
                <ImageCarousel
                  images={project.images}
                  activeIndex={activeImgIndex}
                  onThumbnailClick={setActiveImgIndex}
                  onZoom={onZoom}
                  borderColor={theme.borderColor}
                />

                {/* Project Links (desktop) */}
                <div className="hidden lg:block bg-base-300/30 p-5 rounded-xl border border-white/5">
                  <h3 className="text-base font-bold text-white mb-3">
                    Project Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                        className="btn text-white w-full border-none shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                          color: "#ffffff",
                        }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                    <div className="flex gap-2">
                      {project.frontend && (
                        <a
                          href={project.frontend}
                          target="_blank"
                          rel="noopener"
                          className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-black w-full btn-sm h-10 flex-1"
                        >
                          <VscPreview size={18} /> Frontend
                        </a>
                      )}
                      {project.backend && (
                        <a
                          href={project.backend}
                          target="_blank"
                          rel="noopener"
                          className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-black w-full btn-sm h-10 flex-1"
                        >
                          <FaServer size={16} /> Backend
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="hidden lg:block text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h2>
                  <div
                    className="hidden lg:block h-1 w-20 rounded-full mb-5"
                    style={{ backgroundColor: theme.borderColor }}
                  />
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FaInfoCircle className="text-primary" /> About Project
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-base-300/50 border border-white/10 rounded-md text-gray-200 text-xs sm:text-sm font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="lg:hidden bg-base-300/30 p-4 rounded-xl border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-3">
                    Project Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                        className="btn text-white w-full border-none shadow-md btn-sm h-9"
                        style={{
                          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                          color: "#ffffff",
                        }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                    <div className="flex gap-2">
                      {project.frontend && (
                        <a
                          href={project.frontend}
                          target="_blank"
                          rel="noopener"
                          className="btn btn-outline border-white/30 text-white w-full btn-sm h-9 flex-1"
                        >
                          <VscPreview size={16} /> Frontend
                        </a>
                      )}
                      {project.backend && (
                        <a
                          href={project.backend}
                          target="_blank"
                          rel="noopener"
                          className="btn btn-outline border-white/30 text-white w-full btn-sm h-9 flex-1"
                        >
                          <FaServer size={14} /> Backend
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// --- ZOOM MODAL ---
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
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

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
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[70] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-7xl flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
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

        <button
          className="absolute top-4 right-4 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full transition-all backdrop-blur-sm"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
          {imageIndex + 1} / {images.length}
        </div>

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
  const [zoomData, setZoomData] = useState(null);
  const [detailsProject, setDetailsProject] = useState(null);
  const INITIAL_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  const handleZoom = useCallback((images, index) => {
    setZoomData({ images, index });
  }, []);

  const closeZoom = useCallback(() => setZoomData(null), []);

  const handleDetails = useCallback((project) => {
    setDetailsProject(project);
  }, []);

  const closeDetails = useCallback(() => setDetailsProject(null), []);

  const handleToggleView = () => {
    if (visibleCount >= PROJECTS_DATA.length) {
      setVisibleCount(INITIAL_COUNT);
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setVisibleCount((prev) => Math.min(prev + 3, PROJECTS_DATA.length));
    }
  };

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

  const visibleProjects = useMemo(
    () => PROJECTS_DATA.slice(0, visibleCount),
    [visibleCount]
  );

  const isExpanded = visibleCount >= PROJECTS_DATA.length;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="projects"
      className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
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
              A showcase of professional projects demonstrating full-stack
              development capabilities.
            </p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Projects Grid with items-stretch and auto-rows-fr */}
        <motion.div
          variants={containerVariants}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                index={index}
                project={project}
                isMobile={isMobile}
                shouldReduceAnimations={shouldReduceAnimations}
                onZoom={handleZoom}
                onDetails={handleDetails}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less Button */}
        {PROJECTS_DATA.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-12 relative z-50 w-full"
          >
            <button
              onClick={handleToggleView}
              className="group relative px-8 py-3 rounded-full bg-base-200 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer active:scale-95"
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 text-white font-medium">
                {isExpanded ? "Show Less" : "Show More Projects"}
                {isExpanded ? (
                  <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
                ) : (
                  <FaArrowDown className="group-hover:translate-y-1 transition-transform" />
                )}
              </span>
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {zoomData && (
          <ZoomModal
            images={zoomData.images}
            initialIndex={zoomData.index}
            onClose={closeZoom}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailsProject && (
          <ProjectDetailsModal
            project={detailsProject}
            onClose={closeDetails}
            onZoom={handleZoom}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;