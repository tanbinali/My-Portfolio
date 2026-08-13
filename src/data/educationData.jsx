import React from "react";
import { FaGraduationCap, FaLaptopCode, FaTrophy } from "react-icons/fa";

// Images
import uniimage from "../assets/versity.webp";
import phitron from "../assets/phitron.webp";
import eduhackfest from "../assets/eduhackfest.webp";

// --- Static Data ---
export const EDUCATION_DATA = [
  {
    title: "B.Sc in Computer Science & Engineering",
    university: "East Delta University",
    cgpa: "CGPA 3.82/4 (Currently)",
    shortName: "EDU",
    location: "Chattogram, Bangladesh",
    duration: "2024 – 2028 (expected)",
    status: "In Progress",
    image: uniimage,
    icon: <FaGraduationCap className="text-white" />,
    color: "#8B0000",
    current: true,
    details:
      "Studying core CSE subjects including C, C++, Java, Object-Oriented Programming (OOP), Data Structures, Algorithms, Operating Systems, Micro-processors, Database Systems, and Digital Logic Design (DLD). Actively participating in hackathons and practical software projects, with continuous learning planned in advanced systems, AI, and modern software engineering.",
  },
  {
    title: "CSE Fundamentals with Phitron",
    university: "Phitron",
    cgpa: "CGPA 4/4",
    shortName: "Phitron",
    location: "Online Platform",
    duration: "2024 – 2025",
    status: "Completed",
    image: phitron,
    icon: <FaLaptopCode className="text-white" />,
    color: "#010048",
    current: false,
    details:
      "Completed intensive training in C, C++, Data Structures, Algorithms, OOP, Competitive Programming (CP), HTML, CSS, Tailwind CSS, JavaScript, React, Python, SQL, and Django (MVT & REST API). Certificate ID: PHBATCH66222951006 (verifiable at phitron.io/verification).",
  },
  {
    title: "EDU Hackfest 2025",
    university: "East Delta University",
    cgpa: "Participant",
    shortName: "Hackfest",
    location: "Chattogram, Bangladesh",
    duration: "2025",
    status: "Certified",
    image: eduhackfest,
    icon: <FaTrophy className="text-white" />,
    color: "#6B21A8",
    current: false,
    details:
      "Participated in EDU Hackfest 2025 as a member of Team Jade Codex, collaborating in a team-based competitive environment. Designed and implemented innovative software solutions under strict time constraints, gaining hands-on experience in problem-solving, teamwork, and rapid prototyping. The project (HarvestGuard) developed during the hackathon is showcased in the Projects section of this portfolio.",
  },
];