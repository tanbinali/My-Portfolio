import avatar from "../assets/picture.webp";
import logo from "../assets/logo.webp";
import miniAvatar from "../assets/pfp.webp";
import resume from "../assets/Tanbin Resume.pdf";
import { FaDiscord, FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import TextType from "./TextType/TextType";
import ShinyText from "./ShinyText/ShinyText";
import React from "react";
const ProfileCard = React.lazy(() => import("./ProfileCard/ProfileCard"));

const Hero = () => {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/tanbinali",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/mdtanbinali",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaDiscord,
      href: "https://discord.com/users/570223124608450570",
      label: "Discord",
      color: "hover:text-purple-400",
    },
    {
      icon: FiMail,
      href: "mailto:tanbinali@gmail.com",
      label: "Email",
      color: "hover:text-red-400",
    },
    {
      icon: CgNotes,
      href: resume,
      label: "Resume",
      download: true,
      color: "hover:text-green-400",
    },
  ];

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-screen px-6 md:px-16 lg:px-24 py-16 lg:py-20 overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      {/* LEFT CONTENT */}
      <div className="flex-1 flex flex-col justify-center gap-8 max-w-2xl z-10 order-2 lg:order-1">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-accent">
            Available for new opportunities
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary block">Hey, I'm</span>
              <ShinyText
                text="MD. Tanbin Ali"
                disabled={false}
                speed={3}
                className="text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              />
            </h1>
          </div>

          {/* Typing Text */}
          <div className="space-y-3">
            <TextType
              as="h2"
              text={[
                "Full Stack Software Developer",
                "Django & REST API Specialist",
                "React & JavaScript Expert",
                "Problem Solver & Lifelong Learner",
                "Clean Code Advocate",
                "Tech Stack Explorer",
              ]}
              className="text-xl md:text-2xl font-semibold text-secondary rounded-full backdrop-blur-sm min-h-[2.5rem]"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              cursorBlinkDuration={0.6}
              textColors={["text-secondary"]}
            />
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-primary rounded-full" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-neutral-content leading-relaxed max-w-xl backdrop-blur-sm bg-base-200/30 rounded-2xl p-6 border border-base-300/50">
            I'm passionate about creating{" "}
            <span className="text-primary font-semibold">
              meaningful digital experiences
            </span>{" "}
            — software that feels smooth, looks great, and actually solves
            problems. I specialize in{" "}
            <span className="text-accent font-semibold">Django and React</span>{" "}
            to bring innovative ideas to life with robust, scalable solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
            >
              <span>Get In Touch</span>
              <FiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={resume}
              download
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-base-200 border border-accent text-accent font-semibold rounded-xl transition-all duration-300 hover:bg-accent hover:text-accent-content hover:border-accent hover:scale-105 transform"
            >
              <span>Download Resume</span>
              <FaDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4 pt-4">
            <p className="text-sm font-medium text-neutral-content uppercase tracking-wider">
              Connect with me
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.download ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  download={social.download || false}
                  className="group relative p-4 rounded-xl bg-base-200/50 border border-base-300 backdrop-blur-sm transition-all duration-300 hover:bg-base-300 hover:border-accent hover:scale-110 hover:shadow-lg"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors" />

                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-base-300 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-base-300 rotate-45"></div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD - Profile */}
      <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0 mb-12 lg:mb-0 z-10 order-1 lg:order-2">
        <div className="relative">
          {/* Decorative elements around profile card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50 animate-pulse-slow"></div>
          <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl"></div>

          <ProfileCard
            name="MD. Tanbin Ali"
            title="Full Stack Developer"
            handle="tanbinali"
            status="Available for Hire"
            contactText="Hire Me!"
            avatarUrl={avatar}
            iconUrl={logo}
            miniAvatarUrl={miniAvatar}
            behindGradient={`radial-gradient(circle at 50% 50%, #2ecc7133 0%, #001a1333 100%)`}
            innerGradient={`linear-gradient(145deg, #0a1a13 0%, #1f5f45 70%, #b3ffcc33 100%)`}
            showBehindGradient={true}
            enableTilt={false}
            enableMobileTilt={false}
            showUserInfo={true}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 order-3">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-neutral-content/60 uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
