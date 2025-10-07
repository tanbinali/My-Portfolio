import PixelBlast from "./PixelBlast/PixelBlast";

const Background = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // stays behind all content
        overflow: "hidden",
      }}
    >
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
  );
};

export default Background;
