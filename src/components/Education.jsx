import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUniversity,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLaptopCode,
  FaAward,
} from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
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
      color: "#10B981",
      gradient: "from-green-500 to-emerald-600",
      achievements: [
        "Focus on Software Engineering & Web Technologies",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Computer Networks & Security",
      ],
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
      color: "#F59E0B",
      gradient: "from-amber-500 to-yellow-600",
      achievements: [
        "Advanced Problem Solving Techniques",
        "Competitive Programming Fundamentals",
        "Software Development Best Practices",
        "Project-based Learning Approach",
      ],
      current: false,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [educationData.length]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % educationData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev === 0 ? educationData.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  const goToSlide = (i) => {
    if (isAnimating || i === index) return;
    setIsAnimating(true);
    setIndex(i);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const currentEdu = educationData[index];

  return (
    <section
      id="education"
      className="py-20 px-6 md:px-16 lg:px-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accent">
              Academic Journey
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ShinyText text="Education & Learning" disabled={false} speed={3} />
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            My academic background and professional certifications that form the
            foundation of my technical expertise and problem-solving abilities.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        {/* Main Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <ElectricBorder
            color={currentEdu.color}
            thickness={2}
            speed={0.8}
            chaos={0.1}
            style={{ borderRadius: 24 }}
          >
            <div className="bg-base-200/30 backdrop-blur-md rounded-3xl p-8 border border-base-300/50">
              {/* Carousel Content */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Image Section */}
                <div className="lg:w-2/5 relative">
                  <div className="relative group">
                    <img
                      src={currentEdu.image}
                      alt={currentEdu.university}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                    />

                    {/* Status Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border"
                      style={{
                        backgroundColor: `${currentEdu.color}20`,
                        borderColor: `${currentEdu.color}40`,
                        color: currentEdu.color,
                      }}
                    >
                      {currentEdu.status}
                    </div>

                    {/* Icon Overlay */}
                    <div
                      className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm border shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${currentEdu.color}20`,
                        borderColor: `${currentEdu.color}40`,
                      }}
                    >
                      {currentEdu.icon}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {currentEdu.title}
                    </h3>
                    <div
                      className="w-16 h-1 rounded-full mb-4"
                      style={{ background: currentEdu.color }}
                    ></div>
                  </div>

                  {/* University & Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-lg">
                      <FaUniversity className="text-gray-400 flex-shrink-0" />
                      <span className="text-white font-semibold">
                        {currentEdu.university}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                      <span>{currentEdu.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <FaCalendarAlt className="text-gray-400 flex-shrink-0" />
                      <span>{currentEdu.duration}</span>
                    </div>
                  </div>

                  {/* Key Focus Areas */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <FaAward className="text-yellow-400" />
                      Key Focus Areas
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentEdu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded-lg bg-base-300/30 backdrop-blur-sm"
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: currentEdu.color }}
                          ></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ElectricBorder>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-12 h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 hover:border-accent/60 hover:scale-110 flex items-center justify-center shadow-xl"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-12 h-12 bg-base-300/80 hover:bg-base-300 text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-base-400/50 hover:border-accent/60 hover:scale-110 flex items-center justify-center shadow-xl"
          >
            <FaChevronRight className="text-lg" />
          </button>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {educationData.map((edu, i) => (
              <button
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
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? "scale-125" : ""
                  }`}
                  style={{
                    backgroundColor: i === index ? edu.color : "#6B7280",
                  }}
                ></div>
                <span
                  className="text-sm font-medium hidden sm:block"
                  style={{
                    color: i === index ? edu.color : "#9CA3AF",
                  }}
                >
                  {edu.shortName}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-300">
              I believe in lifelong learning and continuously upgrading my
              skills to stay at the forefront of technology and software
              development practices.
            </p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Education;
