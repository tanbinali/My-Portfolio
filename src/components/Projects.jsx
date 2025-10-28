import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaImages,
  FaServer,
} from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import { VscPreview } from "react-icons/vsc";

// Import project images
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

const Projects = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const zoomModalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const handleImageClick = useCallback((img) => setZoomedImage(img), []);
  const closeZoom = useCallback(() => setZoomedImage(null), []);

  const handleThumbnailClick = useCallback((projectIndex, imageIndex) => {
    setSelectedImageIndex((prev) => ({ ...prev, [projectIndex]: imageIndex }));
  }, []);

  const getHoverTextClass = useCallback(
    (theme) => theme?.hoverText || "text-cyan-400",
    []
  );

  // **Projects defined inside the component**
  const projects = [
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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={containerVariants} className="text-center mb-16">
          {/* Small badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Featured Work
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
              <ShinyText text="Projects Showcase" disabled={false} speed={3} />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 leading-relaxed text-center"
            >
              A showcase of my professional projects demonstrating full-stack
              development capabilities, modern design principles, and real-world
              problem-solving skills.
            </motion.p>
          </motion.div>
          {/* Underline */}
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-12 lg:gap-16"
        >
          {projects.map((project, index) => {
            const theme = project.theme || {};
            const hoverTextClass = getHoverTextClass(theme);
            const selectedIndex = selectedImageIndex[index] || 0;
            const mainImage = project.images[selectedIndex];

            return (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group"
              >
                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <ElectricBorder
                    color={theme.borderColor}
                    thickness={2}
                    speed={0.8}
                    chaos={0.1}
                    style={{ borderRadius: 20 }}
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      className={`flex flex-col xl:flex-row items-stretch gap-8 p-8 bg-base-200 rounded-2xl shadow-2xl ${
                        index % 2 !== 0 ? "xl:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Image Section */}
                      <div className="xl:w-1/2">
                        <div className="space-y-4">
                          {/* Main Image */}
                          <div className="relative rounded-xl overflow-hidden bg-base-300/20 aspect-video">
                            <motion.img
                              src={mainImage}
                              alt={`${project.title} main screenshot`}
                              className="w-full h-full object-cover cursor-zoom-in"
                              onClick={() => handleImageClick(mainImage)}
                              whileHover={{ scale: 1.03 }}
                            />
                          </div>

                          {/* Slider */}
                          {project.images.length > 1 && (
                            <motion.div className="flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 py-2">
                              {project.images.map((img, i) => (
                                <motion.img
                                  key={i}
                                  src={img}
                                  alt={`${project.title} thumbnail ${i + 1}`}
                                  className={`h-20 w-auto rounded-lg cursor-pointer flex-shrink-0 border-2 transition-all ${
                                    selectedIndex === i
                                      ? "border-white ring-2 ring-white/50"
                                      : "border-transparent hover:border-white/50"
                                  }`}
                                  onClick={() => handleThumbnailClick(index, i)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                />
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="xl:w-1/2 flex flex-col justify-between">
                        <div>
                          <motion.h3 className="text-2xl xl:text-3xl font-bold text-white mb-4">
                            {project.title}
                          </motion.h3>

                          <motion.p className="text-gray-300 mb-6 leading-relaxed">
                            {project.description}
                          </motion.p>

                          <motion.div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((tech, i) => (
                              <motion.span
                                key={i}
                                className="px-3 py-1.5 text-sm rounded-full text-white font-medium backdrop-blur-sm"
                                style={{
                                  background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                                }}
                                whileHover={{
                                  scale: 1.05,
                                  y: -2,
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                        </div>

                        <motion.div className="flex gap-4 flex-wrap">
                          {project.frontend && (
                            <motion.a
                              href={project.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn btn-outline border-2 text-white hover:${hoverTextClass.replace(
                                "text-",
                                ""
                              )} hover:border-current gap-2`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <VscPreview className="text-lg" />
                              Frontend
                            </motion.a>
                          )}
                          {project.backend && (
                            <motion.a
                              href={project.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn btn-outline border-2 text-white hover:${hoverTextClass.replace(
                                "text-",
                                ""
                              )} hover:border-current gap-2`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaServer className="text-lg" />
                              Backend
                            </motion.a>
                          )}
                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn bg-white text-gray-900 hover:bg-gray-100 gap-2 border-0 font-semibold`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaExternalLinkAlt className="text-lg" />
                              Live Demo
                            </motion.a>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </ElectricBorder>
                </div>

                {/* Mobile Layout */}
                <div className="block lg:hidden">
                  <motion.div
                    variants={cardHoverVariants}
                    className="bg-base-200 rounded-2xl shadow-2xl overflow-hidden border-2"
                    style={{ borderColor: theme.borderColor }}
                  >
                    {/* Image Section */}
                    <div className="relative">
                      <div className="relative aspect-video bg-base-300/20">
                        <motion.img
                          src={mainImage}
                          alt={`${project.title} main screenshot`}
                          className="w-full h-full object-cover"
                          onClick={() => handleImageClick(mainImage)}
                        />

                        {/* Image Info Badge */}
                        <div className="absolute top-4 right-4 bg-black/70 text-white px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1.5 shadow-md">
                          <FaImages className="text-xs" />
                          <span>{project.images.length}</span>
                          <span className="text-gray-300 font-medium ml-1">
                            • Click to zoom
                          </span>
                        </div>
                      </div>

                      {/* Mobile Thumbnail Slider */}
                      {project.images.length > 1 && (
                        <div className="p-4 overflow-x-auto flex space-x-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                          {project.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`${project.title} thumbnail ${i + 1}`}
                              className={`h-16 w-auto rounded-lg cursor-pointer flex-shrink-0 border-2 transition-all ${
                                selectedIndex === i
                                  ? "border-white"
                                  : "border-transparent hover:border-white/50"
                              }`}
                              onClick={() => handleThumbnailClick(index, i)}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{
                              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        {project.frontend && (
                          <a
                            href={project.frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline border-2 text-white gap-1.5 flex-1 sm:flex-none min-w-fit"
                          >
                            <VscPreview className="text-sm" />
                            Frontend
                          </a>
                        )}
                        {project.backend && (
                          <a
                            href={project.backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline border-2 text-white gap-1.5 flex-1 sm:flex-none min-w-fit"
                          >
                            <FaServer className="text-sm" />
                            Backend
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm bg-white text-gray-900 gap-1.5 flex-1 sm:flex-none min-w-fit border-0 font-medium"
                          >
                            <FaExternalLinkAlt className="text-sm" />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeZoom}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={zoomModalVariants}
          >
            <motion.div
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={zoomedImage}
                alt="Zoomed project screenshot"
                className="max-h-[85vh] max-w-full object-contain rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                className="absolute -top-12 right-0 text-white text-2xl hover:text-red-400 transition-colors"
                onClick={closeZoom}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;
