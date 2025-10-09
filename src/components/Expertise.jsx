import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiBootstrap,
  SiEclipseide,
  SiXampp,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";
import { MdHtml } from "react-icons/md";

const categories = [
  {
    title: "Best Known",
    color: "from-green-400 via-emerald-500 to-green-700", // ✳️ Green tones
    items: [
      { icon: <SiPython />, name: "Python" },
      { icon: <SiDjango />, name: "Django" },
      { icon: <SiReact />, name: "React" },
      { icon: <SiTailwindcss />, name: "TailwindCSS" },
      { icon: <MdHtml />, name: "HTML" },
    ],
  },
  {
    title: "Comfortable With",
    color: "from-yellow-400 via-amber-500 to-yellow-700", // 🟡 Gold tones
    items: [
      { icon: <SiJavascript />, name: "JavaScript" },
      { icon: <FaJava />, name: "Java" },
      { icon: <SiCplusplus />, name: "C++" },
      { icon: <SiC />, name: "C" },
      { icon: <SiBootstrap />, name: "Bootstrap" },
    ],
  },
  {
    title: "Tools & Databases",
    color: "from-gray-300 via-gray-400 to-gray-600", // ⚙️ Silver tones
    items: [
      { icon: <BiLogoVisualStudio />, name: "VS Code" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiEclipseide />, name: "Eclipse IDE" },
    ],
  },
];

const Expertise = () => {
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24 text-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-12 rounded-full backdrop-blur-sm">
        <ShinyText text="Expertise" disabled={false} speed={3} />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-3"></span>
      </h2>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        {categories.map((category, index) => (
          <ElectricBorder
            key={index}
            color={
              category.title === "Best Known"
                ? "#00FF88" // neon green
                : category.title === "Comfortable With"
                ? "#FFD700" // gold
                : "#C0C0C0" // silver
            }
            speed={0.5}
            chaos={0.2}
            thickness={2}
            style={{ borderRadius: 16 }}
          >
            <div
              className={`bg-gradient-to-br ${category.color} p-[1px] rounded-2xl shadow-lg hover:shadow-primary/40 transition-all duration-300`}
            >
              <div className="bg-base-200 rounded-2xl p-6 h-full backdrop-blur-md">
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    category.title === "Best Known"
                      ? "text-green-400"
                      : category.title === "Comfortable With"
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                >
                  {category.title}
                </h3>
                <ul className="flex flex-wrap justify-center gap-5">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex flex-col items-center text-white hover:text-primary transition-all"
                    >
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <p className="text-sm font-medium">{item.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
