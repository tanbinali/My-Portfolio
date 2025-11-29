import { useRef, useEffect, useState, useCallback } from "react";
import bg from "../assets/bg.webp";
import videoWebm from "../assets/bg-video.webm";
import videoMp4 from "../assets/bg-video.mp4";

const Background = () => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile || prefersReducedMotion) return;

    video.addEventListener("loadeddata", handleVideoLoaded);
    video.addEventListener("canplaythrough", handleVideoLoaded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setVideoLoaded(true);
      });
    }

    return () => {
      video.removeEventListener("loadeddata", handleVideoLoaded);
      video.removeEventListener("canplaythrough", handleVideoLoaded);
    };
  }, [isMobile, prefersReducedMotion, handleVideoLoaded]);

  const showVideo = !isMobile && !prefersReducedMotion;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden gpu-accelerated">
      <div
        className="absolute inset-0 bg-gradient-to-b from-base-100/20 via-transparent to-base-100/40 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {!showVideo ? (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          style={{
            filter: "brightness(0.4) contrast(1.1) saturate(1.1)",
          }}
        />
      ) : (
        <>
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              videoLoaded ? "opacity-0" : "opacity-100"
            }`}
            loading="eager"
            style={{
              filter: "brightness(0.4) contrast(1.1) saturate(1.1)",
            }}
          />
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "brightness(0.4) contrast(1.1) saturate(1.1)",
            }}
          >
            <source src={videoWebm} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        </>
      )}
    </div>
  );
};

export default Background;
