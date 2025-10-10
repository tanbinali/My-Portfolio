import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUniversity,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLaptopCode,
} from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import ShinyText from "./ShinyText/ShinyText";
import uniimage from "../assets/versity.webp";
import phitron from "../assets/phitron.webp";

const Education = () => {
  const educationData = [
    {
      title: "B.Sc in Computer Science & Engineering",
      university: "East Delta University",
      location: "Chattogram, Bangladesh",
      duration: "2024 – 2028 (expected)",
      image: uniimage,
      icon: <FaGraduationCap className="text-green-400" />,
    },
    {
      title: "CSE Fundamentals with Phitron",
      university: "Phitron",
      location: "Online",
      duration: "2024 – 2025",
      image: phitron,
      icon: <FaLaptopCode className="text-yellow-400" />,
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 10s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % educationData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [educationData.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % educationData.length);
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? educationData.length - 1 : prev - 1));

  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-12 rounded-full backdrop-blur-sm">
        <ShinyText
          text="Education & Certifications"
          disabled={false}
          speed={3}
        />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-3"></span>
      </h2>

      {/* Carousel Container */}
      <div className="relative max-w-5xl mx-auto h-auto">
        {/* Slides wrapper with fixed height */}
        <div className="relative h-[480px] md:h-[400px] overflow-hidden">
          {educationData.map((edu, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                i === index
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-10 z-0"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 bg-transparent backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gold hover:border-yellow-400/60 transition-all duration-300 max-w-4xl mx-auto">
                {/* Image */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                  <img
                    src={edu.image}
                    alt={edu.university}
                    className="rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300 w-full max-w-md object-cover"
                  />
                  {/* Icon overlay */}
                  <div className="absolute -top-3 -right-3 bg-gray-900/90 backdrop-blur-sm p-3 rounded-full border border-green-400/50">
                    {edu.icon}
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-left text-gray-200 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gold flex items-center gap-3">
                    <IoSchool className="text-green-400 text-2xl" />
                    {edu.title}
                  </h3>

                  <p className="text-lg text-green-400 flex items-center gap-2">
                    <FaUniversity className="text-gray-400 text-lg" />
                    <span className="font-semibold text-gray-400">
                      {edu.university}
                    </span>
                  </p>

                  <p className="text-sm text-white flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-400" />
                    {edu.location}
                  </p>

                  <p className="text-sm text-white italic flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    Duration: {edu.duration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6 bg-black/30 hover:bg-green-500/30 text-green-400 p-3 rounded-full transition z-20 backdrop-blur-sm border border-green-400/30 hover:border-green-400/60"
        >
          <FaChevronLeft className="text-lg" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6 bg-black/30 hover:bg-green-500/30 text-green-400 p-3 rounded-full transition z-20 backdrop-blur-sm border border-green-400/30 hover:border-green-400/60"
        >
          <FaChevronRight className="text-lg" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {educationData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-green-400 scale-125 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
