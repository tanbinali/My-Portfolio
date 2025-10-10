import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

// Import project images
import img1 from "../assets/serviceease/image1.webp";
import img2 from "../assets/serviceease/image2.webp";
import img3 from "../assets/serviceease/image3.webp";
import img4 from "../assets/serviceease/image4.webp";
import img5 from "../assets/serviceease/image5.webp";
import img6 from "../assets/serviceease/image6.webp";
import img7 from "../assets/serviceease/image7.webp";
import img8 from "../assets/serviceease/image8.webp";
import img9 from "../assets/serviceease/image9.webp";
import img10 from "../assets/serviceease/image10.webp";
import img11 from "../assets/serviceease/image11.webp";
import img12 from "../assets/serviceease/image12.webp";
import img13 from "../assets/serviceease/image13.webp";
import img14 from "../assets/serviceease/image14.webp";
import img15 from "../assets/serviceease/image15.webp";
import img16 from "../assets/serviceease/image16.webp";

const projects = [
  {
    title: "Household Services Website",
    description:
      "A full-stack household services platform built with React, TailwindCSS, Django REST Framework, and PostgreSQL. Clients can browse services, add to cart, place orders with SSL Commerz payments, and leave reviews. Admins can manage users, services, categories, orders, and reviews. Includes a complete login system and responsive frontend.",
    tech: [
      "React",
      "TailwindCSS",
      "Django",
      "HTML",
      "JavaScript",
      "Python",
      "REST API",
      "PostgreSQL",
    ],
    images: [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
    ],
    frontend: "https://github.com/tanbinali/ServiceEaseClient",
    backend: "https://github.com/tanbinali/ServiceEaseProject", // optional
    live: "https://service-ease-client.vercel.app/",
    color: "#00FF88",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 px-6 md:px-16 lg:px-24 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-12 rounded-full backdrop-blur-sm">
        <ShinyText text="Projects" disabled={false} speed={3} />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-3"></span>
      </h2>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <ElectricBorder
            key={index}
            color={project.color}
            thickness={2}
            speed={0.5}
            chaos={0.2}
            style={{ borderRadius: 16 }}
          >
            <div
              className={`flex flex-col md:flex-row items-center gap-8 p-6 bg-base-200 rounded-2xl shadow-lg hover:shadow-primary/40 transition-all duration-300 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex overflow-x-auto gap-4 md:w-1/2">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-60 h-40 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>

              <div className="md:w-1/2 flex flex-col justify-between">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-4 flex-wrap">
                  {project.frontend && (
                    <a
                      href={project.frontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 flex items-center gap-1"
                    >
                      <FaGithub /> Frontend
                    </a>
                  )}
                  {project.backend && (
                    <a
                      href={project.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 flex items-center gap-1"
                    >
                      <FaGithub /> Backend
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 flex items-center gap-1"
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
};

export default Projects;
