import { useRef, useEffect, useState } from "react";
import bg from "../assets/bg.webp";
import videoWebm from "../assets/bg-video.webm";
import videoMp4 from "../assets/bg-video.mp4";
import poster from "../assets/bg.webp";

const Background = () => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Detect screen size (mobile vs desktop)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay video on desktop
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", handleLoaded);
    video.play().catch(() => {}); // silent fail if autoplay blocked

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {isMobile ? (
        // Static image for mobile
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover object-center transition-opacity duration-700"
          decoding="async"
          style={{
            filter: "brightness(0.45) contrast(1.1)",
          }}
        />
      ) : (
        // Video for desktop
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "brightness(0.45) contrast(1.1)",
          }}
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Background;
