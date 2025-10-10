import { FaGithub, FaEnvelope, FaWhatsapp, FaDiscord } from "react-icons/fa";
import logo from "../assets/pfp.webp";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-green-700/20 text-gray-400 py-4 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="MD Tanbin Logo"
            className="h-8 w-8 rounded-md shadow-md shadow-green-500/20"
          />
          <span className="font-semibold text-green-400">MD Tanbin Ali</span>
        </div>

        {/* Center: Socials */}
        <div className="flex gap-4 text-lg">
          <a
            href="mailto:tanbinali@gmail.com"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/8801882393841"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://github.com/tanbinali"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://discord.com/users/570223124608450570"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaDiscord />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()} MD Tanbin Ali. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
