import PillNav from "./PillNav/PillNav";
import logo from "../assets/logo.webp";

const Navbar = () => {
  return (
    <PillNav
      logo={logo}
      logoAlt="MD Tanbin Ali Logo"
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ]}
      activeHref="/"
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="transparent"
      pillColor="rgba(23,23,23,0.2)"
      hoveredPillTextColor="#fff"
      pillTextColor="#fff"
    />
  );
};

export default Navbar;
