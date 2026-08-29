// src/data/projectsData.js

// --- Assets Imports ---
import p1img1 from "../assets/awqat/image.webp";
import p1img2 from "../assets/awqat/image (1).webp";
import p1img3 from "../assets/awqat/image (2).webp";
import p1img4 from "../assets/awqat/image (3).webp";
import p1img5 from "../assets/awqat/image (4).webp";
import p1img6 from "../assets/awqat/image (5).webp";
import p1img7 from "../assets/awqat/image (6).webp";
import p1img8 from "../assets/awqat/image (7).webp";
import p1img9 from "../assets/awqat/image (8).webp";
import p1img10 from "../assets/awqat/image (9).webp";
import p1img11 from "../assets/awqat/image (10).webp";
import p1img12 from "../assets/awqat/image (11).webp";
import p1img13 from "../assets/awqat/image (12).webp";
import p1img14 from "../assets/awqat/image (13).webp";
import p1img15 from "../assets/awqat/image (14).webp";
import p1img16 from "../assets/awqat/image (15).webp";
import p1img17 from "../assets/awqat/image (16).webp";
import p1img18 from "../assets/awqat/image (17).webp";
import p1img19 from "../assets/awqat/image (18).webp";
import p1img20 from "../assets/awqat/image (19).webp";
import p1img21 from "../assets/awqat/image (20).webp";

import p2img1 from "../assets/serviceease/image1.webp";
import p2img2 from "../assets/serviceease/image2.webp";
import p2img3 from "../assets/serviceease/image3.webp";
import p2img4 from "../assets/serviceease/image4.webp";
import p2img5 from "../assets/serviceease/image5.webp";
import p2img6 from "../assets/serviceease/image6.webp";
import p2img7 from "../assets/serviceease/image7.webp";
import p2img8 from "../assets/serviceease/image8.webp";
import p2img9 from "../assets/serviceease/image9.webp";
import p2img10 from "../assets/serviceease/image10.webp";
import p2img11 from "../assets/serviceease/image11.webp";
import p2img12 from "../assets/serviceease/image12.webp";
import p2img13 from "../assets/serviceease/image13.webp";
import p2img14 from "../assets/serviceease/image14.webp";
import p2img15 from "../assets/serviceease/image15.webp";
import p2img16 from "../assets/serviceease/image16.webp";

import p3img1 from "../assets/jajitrading/image.webp";
import p3img2 from "../assets/jajitrading/image (1).webp";
import p3img3 from "../assets/jajitrading/image (2).webp";
import p3img4 from "../assets/jajitrading/image (3).webp";
import p3img5 from "../assets/jajitrading/image (4).webp";
import p3img6 from "../assets/jajitrading/image (5).webp";
import p3img7 from "../assets/jajitrading/image (6).webp";
import p3img8 from "../assets/jajitrading/image (7).webp";

import p4img1 from "../assets/mkauto/image.webp";
import p4img2 from "../assets/mkauto/image (1).webp";
import p4img3 from "../assets/mkauto/image (2).webp";
import p4img4 from "../assets/mkauto/image (3).webp";
import p4img5 from "../assets/mkauto/image (4).webp";
import p4img6 from "../assets/mkauto/image (5).webp";

import p5img1 from "../assets/eventmanager/image.webp";
import p5img2 from "../assets/eventmanager/image (1).webp";
import p5img3 from "../assets/eventmanager/image (2).webp";
import p5img4 from "../assets/eventmanager/image (3).webp";
import p5img5 from "../assets/eventmanager/image (4).webp";
import p5img6 from "../assets/eventmanager/image (5).webp";
import p5img7 from "../assets/eventmanager/image (6).webp";
import p5img8 from "../assets/eventmanager/image (7).webp";
import p5img9 from "../assets/eventmanager/image (8).webp";
import p5img10 from "../assets/eventmanager/image (9).webp";

import p6img1 from "../assets/harvestguard/image.webp";
import p6img2 from "../assets/harvestguard/image (1).webp";
import p6img3 from "../assets/harvestguard/image (2).webp";
import p6img4 from "../assets/harvestguard/image (3).webp";
import p6img5 from "../assets/harvestguard/image (4).webp";
import p6img6 from "../assets/harvestguard/image (5).webp";
import p6img7 from "../assets/harvestguard/image (6).webp";
import p6img8 from "../assets/harvestguard/image (7).webp";

import p7img1 from "../assets/librarymanagerAPI/image.webp";
import p7img2 from "../assets/librarymanagerAPI/image (1).webp";
import p7img3 from "../assets/librarymanagerAPI/image (2).webp";
import p7img4 from "../assets/librarymanagerAPI/image (3).webp";

// --- Static Data ---
export const PROJECTS_DATA = [
  {
    title: "AwQat Gamestore",
    shortDescription:
      "A scalable full-stack digital gaming e-commerce platform with catalog management, carts, reviews, and secure local payment integration.",
    description:
      "AwQat Gamestore started as a project for the CSE 242 course, but with the clear intention of building a fully-realized real-world product with ambitious future scaling plans. " +
      "Built in collaboration with designer and friend Avik Deb Nath who served as the partner on the project, the platform is designed to let gamers purchase in-game currencies and digital gaming services seamlessly using local payment methods. " +
      "The system features comprehensive product browsing, category filtering, studios management, real-time shopping cart workflows, and customer reviews. " +
      "The frontend is built with React, Tailwind CSS, and Vite, delivering a responsive and modern interface. " +
      "On the backend, Django REST Framework manages complex business logic, role-based permissions, and user authentication using Djoser and Simple JWT. " +
      "Secure payment processing is integrated via SSLCommerz, while PostgreSQL ensures structured and reliable data storage. " +
      "Cloudinary handles optimized image uploads, and the complete application is deployed for production use.",
    tech: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Django",
      "Python",
      "Django REST Framework",
      "Djoser",
      "Simple JWT",
      "PostgreSQL",
      "SSLCommerz",
      "Cloudinary",
      "REST API",
      "Vite",
      "Vercel",
    ],
    images: [
      p1img1, p1img2, p1img3, p1img4, p1img5, p1img6, p1img7, p1img8,
      p1img9, p1img10, p1img11, p1img12, p1img13, p1img14, p1img15, p1img16,
      p1img17, p1img18, p1img19, p1img20, p1img21,
    ],
    frontend: "https://github.com/AvikDN/AwQat-Gamestore",
    backend: "https://github.com/tanbinali/AwQatAPI",
    live: "https://awqatgamestore.vercel.app/",
    theme: {
      borderColor: "#FD5353",
      gradientFrom: "#DC2626",
      gradientTo: "#7F1D1D",
      hoverText: "text-red-400",
    },
  },
  {
    title: "ServiceEase",
    shortDescription:
      "A scalable full-stack household services marketplace with bookings, payments, real-time updates, and modern UI animations.",
    description:
      "ServiceEase is a full-featured household services marketplace designed to connect customers with trusted service providers through a smooth, secure, and scalable platform. " +
      "The system allows users to discover services by category, book professionals, manage orders, and leave reviews, all through an intuitive and responsive interface. " +
      "The frontend is built with React and optimized for performance, accessibility, and SEO using React Router, Tailwind CSS, and DaisyUI. " +
      "Framer Motion powers polished UI animations, including smooth page transitions, interactive hover effects, and a 3D flip contact card for enhanced user engagement. " +
      "On the backend, Django REST Framework handles authentication, service management, order workflows, role-based access, and complex business logic. " +
      "Secure online payments are integrated using SSL Commerz, while PostgreSQL ensures reliable and structured data storage. " +
      "Cloudinary is used for optimized image management, Supabase supports real-time notifications and updates, and Axios manages efficient API communication. " +
      "The frontend is deployed on Vercel for fast global delivery, making the platform production-ready, maintainable, and scalable for future growth.",
    tech: [
      "React",
      "React Router",
      "Tailwind CSS",
      "DaisyUI",
      "Framer Motion",
      "JavaScript",
      "Django",
      "Python",
      "Django REST Framework",
      "REST API",
      "PostgreSQL",
      "Axios",
      "Supabase",
      "Cloudinary",
      "SSL Commerz",
      "Vercel",
      "Vite",
    ],
    images: [
      p2img1, p2img2, p2img3, p2img4, p2img5, p2img6, p2img7, p2img8,
      p2img9, p2img10, p2img11, p2img12, p2img13, p2img14, p2img15, p2img16,
    ],
    frontend: "https://github.com/tanbinali/ServiceEaseClient",
    backend: "https://github.com/tanbinali/ServiceEaseProject",
    live: "https://service-ease-client.vercel.app/",
    theme: {
      borderColor: "#E5E0DC",
      gradientFrom: "#4b5563",
      gradientTo: "#1f2937",
      hoverText: "text-white",
    },
  },
  {
    title: "Jaji Trading",
    shortDescription:
      "A high-performance 24/7 emergency car battery replacement and auto spare parts service platform in Abu Dhabi.",
    description:
      "Jaji Car Battery Replacement & Auto Spare Parts Trading is a professional commercial web platform built to provide fast and reliable 24/7 mobile battery replacement across Abu Dhabi. " +
      "The application highlights emergency roadside assistance, home or parking area battery installation, and transparent service features like warranty coverage. " +
      "It features an intuitive navigation structure with dedicated sections for about, batteries, contact, and physical location mapping to drive immediate customer conversions. " +
      "The user interface is fully responsive across all devices, featuring clean typography, high-contrast action elements, and smooth interactions. " +
      "SEO best practices, meta tags, and structured configurations are implemented to optimize local search engine visibility for automotive services in the region. " +
      "Built with speed and accessibility in mind, the platform delivers a reliable, trustworthy online presence tailored for urgent automotive needs.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Figma",
      "Framer Motion",
      "Vercel",
      "Google Maps Embed",
      "HTML",
      "Vite",
      "NameCheap",
      "SEO",
    ],
    images: [p3img1, p3img2, p3img3, p3img4, p3img5, p3img6, p3img7, p3img8],
    frontend: "https://github.com/tanbinali/Jaji-Trading",
    live: "https://www.jajicarbatteryautospareparts.com/",
    theme: {
      borderColor: "#EAB308",
      gradientFrom: "#CA8A04",
      gradientTo: "#854D0E",
      hoverText: "text-yellow-400",
    },
  },
  {
    title: "Mohammad Khan Auto Parts",
    shortDescription:
      "A premium, SEO-optimized auto parts storefront with animations, product discovery, and accessibility-focused design.",
    description:
      "Mohammad Khan Auto Parts is a modern, high-performance commercial website built for a leading auto parts retailer in Abu Dhabi. " +
      "The platform showcases a wide range of car spare parts, batteries, and accessories through a clean, structured, and visually engaging interface. " +
      "It features a categorized product catalog with search functionality, interactive product galleries with modal zoom, and clear service inquiry flows to support customer engagement. " +
      "The user interface is fully responsive across desktop, tablet, and mobile devices, with smooth scroll navigation and animated sections powered by Framer Motion to enhance user experience. " +
      "SEO best practices are applied throughout the project, including meta tags, Open Graph data, Twitter Cards, and structured data to improve search engine visibility. " +
      "Additional features include an embedded Google Maps store location, business information cards with hover interactions, and accessibility-friendly design with support for Arabic search. " +
      "Built with performance and scalability in mind, the project delivers a fast, professional, and trustworthy online presence tailored to the brand’s identity.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Google Maps Embed",
      "HTML",
      "Vite",
      "NameCheap",
      "SEO",
    ],
    images: [p4img1, p4img2, p4img3, p4img4, p4img5, p4img6],
    frontend: "https://github.com/tanbinali/Mohd.KhanAutoPartsClient",
    live: "https://www.mohammadkhanautoparts.com/",
    theme: {
      borderColor: "#3B82F6",
      gradientFrom: "#2563EB",
      gradientTo: "#1E40AF",
      hoverText: "text-blue-400",
    },
  },
  {
    title: "Event Manager – Django MVT",
    shortDescription:
      "A role-based event management platform built with Django MVT, featuring RSVPs, dashboards for seperate user groups, and analytics",
    description:
      "Event Manager is a modern Django MVT web application designed to streamline the creation, management, and participation of events through structured workflows and intuitive dashboards. " +
      "The platform supports role-based access control with dedicated interfaces for Administrators, Organizers, and Participants, ensuring secure and efficient event operations. " +
      "Organizers can create, update, and categorize events, while participants can explore events and RSVP with a single click. " +
      "The backend manages complex relational data for event categorization, user roles, and participation tracking using PostgreSQL. " +
      "User authentication is handled securely, with profile management and email notifications enhancing communication and engagement. " +
      "Media assets are optimized and managed using Cloudinary, while Supabase enables real-time notifications and dynamic updates. " +
      "The frontend is styled with TailwindCSS for a clean, responsive experience, optimized for SEO and accessibility across devices. " +
      "The application is deployed with the frontend on Vercel and the backend on Render, making it scalable, maintainable, and production-ready.",
    tech: [
      "Django",
      "Python",
      "HTML",
      "JavaScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Cloudinary",
      "Supabase",
      "Email Notifications",
      "Vercel",
      "Render",
    ],
    images: [
      p5img1, p5img2, p5img3, p5img4, p5img5, p5img6, p5img7, p5img8, p5img9, p5img10,
    ],
    backend: "https://github.com/tanbinali/event_management_django",
    live: "https://event-management-django-neon.vercel.app/",
    theme: {
      borderColor: "#10B981",
      gradientFrom: "#059669",
      gradientTo: "#064e3b",
      hoverText: "text-green-400",
    },
  },
  {
    title: "HarvestGuard",
    shortDescription:
      "A farmer-centric platform to reduce food loss in Bangladesh using storytelling UI, and smart interventions.",
    description:
      "HarvestGuard is a hackathon project focused on reducing post-harvest food loss in Bangladesh, particularly for grains and staple crops such as rice. " +
      "Bangladesh loses millions of metric tonnes of food every year due to inadequate storage, poor handling practices, and inefficient transportation, resulting in severe economic loss and food insecurity. " +
      "HarvestGuard addresses this challenge by presenting a technology-driven, farmer-first solution aligned with Sustainable Development Goal (SDG) 12.3 — Responsible Consumption and Production. " +
      "The platform emphasizes a storytelling-based, mobile-first user experience that visually communicates the problem and guides users through a simple data-to-action workflow: Data → Warning → Action → Saved Food. " +
      "Accessibility is a core design consideration, with a responsive interface, large intuitive UI elements, and a Bangla-first approach with planned Bangla/English language switchability to ensure usability for rural farmers on low-cost Android devices. " +
      "Currently implemented features include a problem–solution storytelling landing experience, basic farmer onboarding, crop batch registration, and a structured foundation for future data-driven interventions. " +
      "Advanced features such as offline-first support, hyper-local Bangla weather advisories, risk forecasting, AI-based crop health scanning, smart alerts, pest identification, voice interaction, and community risk visualization are planned but not yet implemented.\n\n" +
      "This project is actively under development and should be considered a work in progress, with the foundation laid during the hackathon and continuous improvements planned post-event.\n\n" +
      "The project was built collaboratively with contributors Sadman Chowdhury and Muhammad Sharfuddin.",
    tech: [
      "React",
      "React Router",
      "Tailwind CSS",
      "DaisyUI",
      "Framer Motion",
      "JavaScript",
      "Django",
      "Python",
      "Django REST Framework",
      "REST API",
      "PostgreSQL",
      "Axios",
      "Supabase",
      "Cloudinary",
      "Vercel",
      "Vite",
    ],
    images: [
      p6img1, p6img2, p6img3, p6img4, p6img5, p6img6, p6img7, p6img8,
    ],
    frontend: "https://github.com/tanbinali/HarvestGuardClient",
    backend: "https://github.com/tanbinali/HarvestGuardAPI",
    live: "https://harvest-guard-client.vercel.app/",
    theme: {
      borderColor: "#E6F4EA",
      gradientFrom: "#14532d",
      gradientTo: "#022c22",
      hoverText: "text-green-300",
    },
  },
  {
    title: "Library Manager API",
    shortDescription:
      "A secure, role-based REST API for managing library resources with JWT authentication.",
    description:
      "Library Manager API is a robust backend system built with Django REST Framework to manage books, authors, members, and borrowing workflows for a library environment. " +
      "The API follows RESTful standards with support for filtering, pagination, throttling, and nested routing for related resources. " +
      "Authentication and authorization are handled using Djoser and Simple JWT, enabling role-based access control for librarians and members. " +
      "The system includes comprehensive API documentation using Swagger and ReDoc, optimized media storage via Cloudinary, and reliable PostgreSQL-backed data persistence. " +
      "The project emphasizes security, scalability, and maintainability, making it suitable for real-world backend systems.",
    tech: [
      "Python",
      "Django",
      "Django REST Framework",
      "Djoser",
      "Simple JWT",
      "JWT Authentication",
      "PostgreSQL",
      "Cloudinary",
      "Swagger / OpenAPI",
      "ReDoc",
      "drf-yasg",
    ],
    images: [p7img1, p7img2, p7img3, p7img4],
    backend: "https://github.com/tanbinali/library_manager_api",
    live: "https://library-manager-api-alpha.vercel.app/",
    theme: {
      borderColor: "#85EA2D",
      gradientFrom: "#65a30d",
      gradientTo: "#3f6212",
      hoverText: "text-green-400",
    },
  },
];