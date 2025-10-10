import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaDiscord } from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

const contacts = [
  {
    title: "Email",
    icon: <FaEnvelope />,
    info: "tanbinali@gmail.com",
    href: "mailto:tanbinali@gmail.com",
    color: "#FFD700", // golden
  },
  {
    title: "WhatsApp",
    icon: <FaWhatsapp />,
    info: "01882393841",
    href: "https://wa.me/8801882393841",
    color: "#25D366", // WhatsApp green
  },
  {
    title: "Discord",
    icon: <FaDiscord />,
    info: "@taikonotenshi",
    href: "https://discord.com/users/570223124608450570",
    color: "#7289DA", // Discord blue
  },
];

const Contacts = () => {
  return (
    <section id="contact" className="py-16 px-6 md:px-16 lg:px-24 text-center">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-12 rounded-full backdrop-blur-sm">
        <ShinyText text="Contact Me" disabled={false} speed={3} />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-3"></span>
      </h2>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <ElectricBorder
            key={index}
            color={contact.color}
            thickness={2}
            speed={0.5}
            chaos={0.2}
            style={{ borderRadius: 16 }}
          >
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-base-200 backdrop-blur-md shadow-lg hover:shadow-primary/40 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-3 text-white">{contact.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {contact.title}
              </h3>
              <p className="text-sm text-gray-300 truncate">{contact.info}</p>
            </a>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
};

export default Contacts;
