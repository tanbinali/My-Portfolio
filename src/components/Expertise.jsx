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
  SiXampp,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import { MdHtml } from "react-icons/md";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import LogoLoop from "./LogoLoop/LogoLoop";

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
    title: "VS Code",
    href: "https://visualstudio.microsoft.com/",
  },
  {
    node: <SiBootstrap />,
    title: "Bootstrap",
    href: "https://getbootstrap.com",
  },
  {
    node: <SiEclipseide />,
    title: "Eclipse IDE",
    href: "http://eclipseide.org/",
  },
  { node: <FaJava />, title: "Java", href: "https://www.java.com/en" },
  { node: <SiXampp />, title: "XAMPP", href: "https://www.apachefriends.org" },
];

const categories = [
  {
    title: "Core Expertise",
    subtitle: "Technologies I excel at",
    color: "#00FF88",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10",
    items: [
      { icon: <SiPython />, name: "Python", level: 90 },
      { icon: <SiDjango />, name: "Django", level: 85 },
      { icon: <SiReact />, name: "React", level: 80 },
      { icon: <SiTailwindcss />, name: "TailwindCSS", level: 85 },
      { icon: <MdHtml />, name: "HTML", level: 90 },
    ],
  },
  {
    title: "Proficient With",
    subtitle: "Strong working knowledge",
    color: "#FFD700",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "from-amber-500/10 to-yellow-600/10",
    items: [
      { icon: <SiJavascript />, name: "JavaScript", level: 75 },
      { icon: <FaJava />, name: "Java", level: 70 },
      { icon: <SiCplusplus />, name: "C++", level: 65 },
      { icon: <SiC />, name: "C", level: 60 },
      { icon: <SiBootstrap />, name: "Bootstrap", level: 70 },
    ],
  },
  {
    title: "Tools & Databases",
    subtitle: "Development environment & data",
    color: "#C0C0C0",
    gradient: "from-gray-400 to-gray-600",
    bgGradient: "from-gray-400/10 to-gray-600/10",
    items: [
      { icon: <BiLogoVisualStudio />, name: "VS Code", level: 95 },
      { icon: <SiMysql />, name: "MySQL", level: 75 },
      { icon: <SiPostgresql />, name: "PostgreSQL", level: 80 },
      { icon: <SiEclipseide />, name: "Eclipse IDE", level: 50 },
      { icon: <SiXampp />, name: "XAMPP", level: 50 },
    ],
  },
];

const Expertise = () => {
  return (
    <section
      id="expertise"
      className="py-20 px-6 md:px-16 lg:px-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6 mx-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accent">
              Technical Skills
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ShinyText text="Technical Expertise" disabled={false} speed={3} />
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            A comprehensive overview of my technical skills and proficiency
            levels across various programming languages, frameworks, and
            development tools.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        {/* Tech Logo Marquee */}
        <div className="relative overflow-hidden mb-20">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={56}
            gap={48}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            ariaLabel="Technology Stack"
            className="logoloop logoloop--scale-hover logoloop--fade"
            style={{ width: "100%" }}
          />
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <ElectricBorder
                color={category.color}
                speed={0.8}
                chaos={0.1}
                thickness={2}
                style={{ borderRadius: 20 }}
              >
                <div className="relative bg-base-200/50 backdrop-blur-md rounded-2xl p-8 h-full border border-base-300/50 hover:border-accent/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Header */}
                  <div className="relative z-10 text-center mb-8">
                    <h3
                      className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.subtitle}</p>
                  </div>

                  {/* Skills List */}
                  <ul className="relative z-10 space-y-4">
                    {category.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl bg-base-300/30 backdrop-blur-sm border border-base-300/50 hover:border-accent/20 transition-all duration-300 group-hover:bg-base-300/50"
                      >
                        {/* Icon */}
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                          style={{ color: category.color }}
                        >
                          {item.icon}
                        </div>

                        {/* Skill Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium text-sm truncate">
                              {item.name}
                            </span>
                            <span className="text-gray-400 text-xs font-medium">
                              {item.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-base-300 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${item.level}%`,
                                background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Category Indicator */}
                  <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: category.color }}
                  ></div>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuously Learning
            </h3>
            <p className="text-gray-300 mb-6">
              I'm constantly expanding my skill set and staying updated with the
              latest technologies and best practices in software development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Always Learning New Technologies</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Following Best Practices</span>
              </div>
            </div>
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

export default Expertise;
