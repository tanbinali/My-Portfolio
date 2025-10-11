import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaDiscord,
  FaArrowRight,
} from "react-icons/fa";
import ShinyText from "./ShinyText/ShinyText";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

const contacts = [
  {
    title: "Email",
    icon: <FaEnvelope />,
    info: "tanbinali@gmail.com",
    href: "mailto:tanbinali@gmail.com",
    color: "#FFD700", // golden
    description: "Send me an email for professional inquiries",
  },
  {
    title: "WhatsApp",
    icon: <FaWhatsapp />,
    info: "+880 1882-393841",
    href: "https://wa.me/8801882393841",
    color: "#25D366", // WhatsApp green
    description: "Quick chat and instant messaging",
  },
  {
    title: "Discord",
    icon: <FaDiscord />,
    info: "@taikonotenshi",
    href: "https://discord.com/users/570223124608450570",
    color: "#7289DA", // Discord blue
    description: "Connect for collaboration and tech discussions",
  },
];

const Contacts = () => {
  return (
    <section
      id="contact"
      className="py-12 px-6 md:px-16 lg:px-24 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/50 backdrop-blur-sm border border-accent/30 max-w-max mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accent">
              Get in touch
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <ShinyText text="Let's Work Together" disabled={false} speed={3} />
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Ready to bring your ideas to life? Reach out through any of these
            channels and let's start building something amazing.
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <div key={index} className="group relative">
              <ElectricBorder
                color={contact.color}
                thickness={2}
                speed={0.5}
                chaos={0.2}
                style={{ borderRadius: 20 }}
              >
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-base-200/80 to-base-300/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-full border border-base-300/50 group-hover:border-accent/30 overflow-hidden"
                >
                  {/* Background Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${contact.color}15 0%, transparent 70%)`,
                    }}
                  ></div>

                  {/* Icon Container */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      backgroundColor: `${contact.color}15`,
                      border: `2px solid ${contact.color}30`,
                    }}
                  >
                    <div
                      className="text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ color: contact.color }}
                    >
                      {contact.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3
                      className="text-2xl font-bold mb-3 transition-colors duration-300"
                      style={{ color: contact.color }}
                    >
                      {contact.title}
                    </h3>

                    <p className="text-gray-300 text-lg font-medium mb-3">
                      {contact.info}
                    </p>

                    <p className="text-gray-400 text-sm mb-6 flex-1">
                      {contact.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3">
                      <span style={{ color: contact.color }}>Get in Touch</span>
                      <FaArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: contact.color }}
                      />
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: `0 0 0 1px ${contact.color}40`,
                    }}
                  ></div>
                </a>
              </ElectricBorder>
            </div>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-base-200/50 to-base-300/30 backdrop-blur-md rounded-2xl p-8 border border-base-300/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Preferred Communication
            </h3>
            <p className="text-gray-300 mb-6">
              For quick responses, WhatsApp and Email are your best bets. I
              typically reply within a few hours during business days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Fast Response Time</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Professional Approach</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Available for Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg mb-6">
            Have a project in mind? Let's discuss how we can work together.
          </p>
          <a
            href="mailto:tanbinali@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
          >
            <FaEnvelope className="w-5 h-5" />
            <span>Start a Conversation</span>
            <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Contacts;
