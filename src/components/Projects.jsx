import { useState, useRef, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// Import project images
// --- PROJECT 1 IMAGES (ServiceEase) ---
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

// --- PROJECT 2 IMAGES (MK Auto) ---
import p2img1 from "../assets/mkauto/image.webp";
import p2img2 from "../assets/mkauto/image (1).webp";
import p2img3 from "../assets/mkauto/image (2).webp";
import p2img4 from "../assets/mkauto/image (3).webp";
import p2img5 from "../assets/mkauto/image (4).webp";
import p2img6 from "../assets/mkauto/image (5).webp";

// --- EASY TO ADD MORE PROJECTS ---
const projects = [
  {
    title: "Household Services Website (ServiceEase)",
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
      gradientFrom: "#1B1B28",
      gradientTo: "#1B1B28",
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
];

const Projects = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const carouselRefs = useRef([]);

  // Auto-scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      carouselRefs.current.forEach((carousel) => {
        if (!carousel) return;
        const scrollAmount = carousel.clientWidth;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        const newScrollLeft = carousel.scrollLeft + scrollAmount;
        carousel.scrollTo({
          left: newScrollLeft > maxScrollLeft ? 0 : newScrollLeft,
          behavior: "smooth",
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className="py-16 px-6 md:px-16 lg:px-24 text-center">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-accent">Featured Work</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <ShinyText text="Projects & Portfolio" disabled={false} speed={3} />
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
          A showcase of my professional projects demonstrating full-stack
          development capabilities, modern design principles, and real-world
          problem-solving skills.
        </p>

        <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => {
          const theme = project.theme || {};
          return (
            <ElectricBorder
              key={index}
              color={theme.borderColor || "#00FFFF"}
              thickness={2}
              speed={0.5}
              chaos={0.2}
              style={{ borderRadius: 16 }}
            >
              <div
                className={`flex flex-col md:flex-row items-center gap-8 p-6 bg-base-200 rounded-2xl shadow-lg hover:shadow-[${
                  theme.borderColor || "#00FFFF"
                }]/40 transition-all duration-300 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Carousel Container */}
                <div className="relative w-full md:w-80 lg:w-96 mx-auto">
                  <div
                    className="carousel rounded-xl overflow-hidden"
                    ref={(el) => (carouselRefs.current[index] = el)}
                  >
                    {project.images.map((img, i) => (
                      <div
                        key={i}
                        className="carousel-item relative w-full flex justify-center"
                      >
                        <img
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="w-full h-44 object-cover cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                          onClick={() => setZoomedImage(img)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={() => {
                      const carousel = carouselRefs.current[index];
                      if (!carousel) return;
                      const scrollAmount = carousel.clientWidth;
                      const maxScrollLeft =
                        carousel.scrollWidth - carousel.clientWidth;
                      const newScrollLeft = carousel.scrollLeft - scrollAmount;
                      carousel.scrollTo({
                        left: newScrollLeft < 0 ? maxScrollLeft : newScrollLeft,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => {
                      const carousel = carouselRefs.current[index];
                      if (!carousel) return;
                      const scrollAmount = carousel.clientWidth;
                      const maxScrollLeft =
                        carousel.scrollWidth - carousel.clientWidth;
                      const newScrollLeft = carousel.scrollLeft + scrollAmount;
                      carousel.scrollTo({
                        left: newScrollLeft > maxScrollLeft ? 0 : newScrollLeft,
                        behavior: "smooth",
                      });
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle"
                  >
                    ❯
                  </button>
                </div>

                {/* Text Details */}
                <div className="md:w-1/2 flex flex-col justify-between text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full text-white"
                        style={{
                          background: `linear-gradient(90deg, ${
                            theme.gradientFrom || "#00FFFF"
                          }, ${theme.gradientTo || "#0077FF"})`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-4 flex-wrap">
                    {project.frontend && (
                      <a
                        href={project.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white hover:${
                          theme.hoverText || "text-cyan-400"
                        } flex items-center gap-1`}
                      >
                        <FaGithub /> Frontend
                      </a>
                    )}
                    {project.backend && (
                      <a
                        href={project.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white hover:${
                          theme.hoverText || "text-cyan-400"
                        } flex items-center gap-1`}
                      >
                        <FaGithub /> Backend
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-white hover:${
                          theme.hoverText || "text-cyan-400"
                        } flex items-center gap-1`}
                      >
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ElectricBorder>
          );
        })}
      </div>

      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-gray-300 mb-6">
            I'm always excited to work on new projects and bring innovative
            ideas to life. Let's discuss how we can create something amazing
            together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-content font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative">
            <img
              src={zoomedImage}
              alt="Zoomed project"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl hover:text-red-500 transition"
              onClick={() => setZoomedImage(null)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
