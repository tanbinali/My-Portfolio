import ShinyText from "./ShinyText/ShinyText";
import uniimage from "../assets/versity.webp";
import ElectricBorder from "./ElectricBorder/ElectricBorder";

const Education = () => {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 text-center">
      {/* === Title === */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white inline-block relative mb-12 rounded-full backdrop-blur-sm">
        <ShinyText text="Education" disabled={false} speed={3} />
        <span className="block w-24 h-1 bg-primary rounded mx-auto mt-3"></span>
      </h2>

      {/* === Education Content === */}
      <ElectricBorder
        color="#00FF88"
        speed={0.5}
        chaos={0.2}
        thickness={2}
        style={{ borderRadius: 16 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 bg-transparent backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-10 border border-green-500/30 hover:border-green-400/60 transition-all duration-300">
          {/* === Image Side === */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={uniimage}
              alt="East Delta University"
              className="rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300 w-full max-w-md object-cover"
            />
          </div>

          {/* === Text Side === */}
          <div className="w-full md:w-1/2 text-left md:text-left text-gray-200 space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gold">
              B.Sc in Computer Science & Engineering
            </h3>
            <p className="text-lg text-green-400">
              <span className="font-semibold text-gray-400">
                East Delta University
              </span>{" "}
              — Chattogram, Bangladesh
            </p>
            <p className="text-sm text-white italic">
              Duration: 2024 – 2028 (expected)
            </p>
          </div>
        </div>
      </ElectricBorder>
    </section>
  );
};

export default Education;
