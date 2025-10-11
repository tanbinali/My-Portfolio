import PixelBlast from "./PixelBlast/PixelBlast";
import bg from "../assets/bg.webp";
import { useRef, useEffect, useState } from "react";
import videoWebm from "../assets/bg-video.webm";
import videoMp4 from "../assets/bg-video.mp4";
import poster from "../assets/bg.webp";

const Background = () => {
  const videoRef = useRef(null);
  const [fade, setFade] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleCanPlayThrough = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoError(true);
    };

    const handleTimeUpdate = () => {
      // Smooth fade out near the end (last 1 second)
      if (video.duration && video.currentTime >= video.duration - 1) {
        setFade(true);
      }
    };

    const handleEnded = () => {
      // Smooth restart with fade in
      video.currentTime = 0;
      video.play().catch(console.error);
      setFade(false);
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("error", handleError);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Attempt to play video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn("Autoplay prevented, will play on user interaction");
      }
    };

    playVideo();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("error", handleError);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Fallback to static background if video fails
  if (videoError) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src={bg}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0">
          <PixelBlast
            variant="circle"
            pixelSize={4}
            color="#0AFFA0"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.3}
            speed={0.4}
            edgeFade={0.3}
            transparent
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        poster={poster}
        className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
        style={{
          filter: "brightness(0.4) contrast(1.1)",
        }}
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* PixelBlast overlay */}
      <div className="absolute inset-0">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#0AFFA0"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.3}
          speed={0.4}
          edgeFade={0.3}
          transparent
        />
      </div>

      {/* Enhanced gradient overlays for depth */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(10, 255, 160, 0.1) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(10, 25, 47, 0.6) 0%, transparent 50%)",
        }}
      />

      {/* Subtle loading indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-300/20 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-400 text-sm">Loading experience...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Background;
