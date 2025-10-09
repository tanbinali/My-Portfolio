import avatar from "../assets/picture.webp";
import logo from "../assets/logo.webp";
import miniAvatar from "../assets/pfp.webp";
import resume from "../assets/Tanbin Resume.pdf";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import TextType from "./TextType/TextType";
import ShinyText from "./ShinyText/ShinyText";
import React from "react";
const ProfileCard = React.lazy(() => import("./ProfileCard/ProfileCard"));

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between w-full min-h-screen px-6 md:px-16 lg:px-24 py-20 overflow-hidden bg-transparent text-base-content">
      {/* LEFT CONTENT */}
      <div className="flex-1 flex flex-col justify-center gap-8 max-w-2xl z-10">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-primary">Hey, I'm</span>
            <br />
            <ShinyText
              text="MD. Tanbin Ali"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h1>
        </div>

        <div>
          <TextType
            as="h2"
            text={[
              "Full Stack Software Developer",
              "Django & REST API Enthusiast",
              "React & JavaScript Coder",
              "Problem Solver & Lifelong Learner",
              "Passionate About Clean Code",
              "Exploring New Tech Stacks",
            ]}
            className="text-2xl md:text-3xl font-semibold mb-3 text-secondary rounded-full backdrop-blur-sm"
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            cursorBlinkDuration={0.6}
            textColors={["text-secondary"]}
          />

          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary rounded-full" />
        </div>

        <p className="text-lg md:text-xl text-neutral-content leading-relaxed max-w-lg rounded-full backdrop-blur-sm">
          {" "}
          I’m passionate about creating{" "}
          <span className="text-primary font-semibold">
            meaningful digital experiences
          </span>{" "}
          — software that feels smooth, looks great, and actually solves
          problems. I work mainly with{" "}
          <span className="text-accent font-semibold">Django and React</span> to
          bring ideas to life.{" "}
        </p>

        {/* SOCIAL LINKS */}
        <div className="flex gap-4 mt-4">
          {[
            {
              icon: FaGithub,
              href: "https://github.com/tanbinali",
              label: "GitHub",
            },
            {
              icon: FaLinkedin,
              href: "https://linkedin.com/in/mdtanbinali",
              label: "LinkedIn",
            },
            {
              icon: FaDiscord,
              href: "https://discord.com/users/570223124608450570",
              label: "Discord",
            },
            {
              icon: FiMail,
              href: "mailto:tanbinali@gmail.com",
              label: "Email",
            },
            {
              icon: CgNotes,
              href: resume,
              label: "Resume",
              download: true,
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.download ? "_self" : "_blank"}
              rel="noopener noreferrer"
              download={social.download || false}
              className="group p-3 rounded-2xl bg-base-200 border border-accent hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <social.icon className="w-6 h-6 text-accent group-hover:text-primary-content transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1 flex justify-center items-center mt-16 md:mt-0 z-10">
        <div className="relative">
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
    </section>
  );
};

export default Hero;
