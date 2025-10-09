import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiCplusplus,
  SiC,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiBootstrap,
  SiEclipseide,
} from "react-icons/si";
import LogoLoop from "./LogoLoop/LogoLoop";
import { BiLogoVisualStudio } from "react-icons/bi";
import ShinyText from "./ShinyText/ShinyText";
import { MdHtml } from "react-icons/md";
import { FaJava } from "react-icons/fa";

// Tech logos using React Icons
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  {
    node: <SiDjango />,
    title: "Django",
    href: "https://www.djangoproject.com",
  },
  {
    node: <SiCplusplus />,
    title: "C++",
    href: "https://www.w3schools.com/cpp/",
  },
  { node: <SiC />, title: "C", href: "https://www.cprogramming.com/" },
  { node: <MdHtml />, title: "HTML", href: "https://html.com/" },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com/" },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    node: <BiLogoVisualStudio />,
    title: "Visual Studio",
    href: "https://visualstudio.microsoft.com/",
  },
  {
    node: <SiBootstrap />,
    title: "Bootstrap",
    href: "https://getbootstrap.com",
  },
  {
    node: <SiEclipseide />,
    title: "Eclipseide",
    href: "http://eclipseide.org/",
  },
  {
    node: <FaJava />,
    title: "Java",
    href: "https://www.java.com/en",
  },
];

// Optional: Image logos for anything not available in react-icons
const imageLogos = [
  // Add logos here if needed, e.g.,
  // { src: "/logos/other.png", alt: "Other Tool", href: "https://example.com" },
];

const TechStack = ({ useImages = false }) => {
  const logos = useImages
    ? imageLogos.map((logo) => ({
        node: <img src={logo.src} alt={logo.alt} className="h-12" />,
        title: logo.alt,
        href: logo.href,
      }))
    : techLogos;

  return (
    <div className="w-full text-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-8 rounded-full backdrop-blur-sm">
        <ShinyText
          text="Tech Stack"
          disabled={false}
          speed={3}
          className="custom-class"
        />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-2"></span>
      </h2>

      {/* Logo Loop */}
      <div className="relative overflow-hidden">
        <LogoLoop
          logos={logos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          ariaLabel="TechStack"
          className="logoloop logoloop--scale-hover logoloop--fade "
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default TechStack;
