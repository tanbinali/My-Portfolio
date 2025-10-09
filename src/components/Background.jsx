import PixelBlast from "./PixelBlast/PixelBlast";
import bg from "../assets/bg.webp";

const Background = () => {
  return (
    // <div
    //   style={{
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     width: "100vw",
    //     height: "100vh",
    //     zIndex: -1, // stays behind all content
    //     overflow: "hidden",
    //   }}
    // >
    //   <PixelBlast
    //     variant="circle"
    //     pixelSize={5}
    //     color="#0AFFA0"
    //     patternScale={3}
    //     patternDensity={1.2}
    //     pixelSizeJitter={0.3}
    //     speed={0.4}
    //     edgeFade={0.3}
    //     transparent
    //   />
    // </div>
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background image */}
      <img
        src={bg}
        alt="Background"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default Background;
