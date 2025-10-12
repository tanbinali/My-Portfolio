import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./ElectricBorder.css";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const ElectricBorder = ({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style,
}) => {
  // Stable instance id for uniquely scoped SVG filter id
  const instanceId = useId().replace(/[:]/g, "");
  const filterId = useMemo(
    () => `turbulent-displace-${instanceId}`,
    [instanceId]
  );

  // Refs to container and SVG elements
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const strokeRef = useRef(null);

  // Cache animate elements and feDisplacementMap for reuse
  const animElements = useRef({
    dyAnims: [],
    dxAnims: [],
    displacementMap: null,
    filterEl: null,
  });

  // Memoized CSS variables for border color/thickness
  const vars = useMemo(
    () => ({
      "--electric-border-color": color,
      "--eb-border-width": `${thickness}px`,
    }),
    [color, thickness]
  );

  // Initialize references to SVG anim elements after mount
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    animElements.current.dyAnims = svg.querySelectorAll(
      'feOffset > animate[attributeName="dy"]'
    );
    animElements.current.dxAnims = svg.querySelectorAll(
      'feOffset > animate[attributeName="dx"]'
    );
    animElements.current.displacementMap =
      svg.querySelector("feDisplacementMap");
    animElements.current.filterEl = svg.querySelector(
      `#${CSS.escape(filterId)}`
    );
  }, [filterId]);

  // Update animation parameters function
  const updateAnim = useCallback(() => {
    const host = rootRef.current;
    const stroke = strokeRef.current;
    const { dyAnims, dxAnims, displacementMap, filterEl } =
      animElements.current;
    if (!host || !stroke || !filterEl) return;

    stroke.style.filter = `url(#${filterId})`;

    // Compute dimensions safely, fallback to 0 if none
    const width = clamp(
      Math.round(host.clientWidth || host.getBoundingClientRect().width || 0),
      1,
      10000
    );
    const height = clamp(
      Math.round(host.clientHeight || host.getBoundingClientRect().height || 0),
      1,
      10000
    );

    // Update values of dy and dx animations if found
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute("values", `${height}; 0`);
      dyAnims[1].setAttribute("values", `0; -${height}`);
    }
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute("values", `${width}; 0`);
      dxAnims[1].setAttribute("values", `0; -${width}`);
    }

    // Clamp duration for animation speed to avoid zero or negative values
    const baseDuration = 6;
    const duration = clamp(baseDuration / (speed || 1), 0.05, 10);
    [...dyAnims, ...dxAnims].forEach((anim) =>
      anim.setAttribute("dur", `${duration}s`)
    );

    // Scale chaos effect safely (limit max scale for performance)
    if (displacementMap) {
      displacementMap.setAttribute(
        "scale",
        String(clamp(30 * (chaos || 1), 0, 100))
      );
    }

    // Set filter bounding box conservatively to avoid clipping but not excessively large
    if (filterEl) {
      filterEl.setAttribute("x", "-100%");
      filterEl.setAttribute("y", "-100%");
      filterEl.setAttribute("width", "300%");
      filterEl.setAttribute("height", "300%");
    }

    // Restart animations for smooth effect
    [...dyAnims, ...dxAnims].forEach((anim) => {
      if (typeof anim.beginElement === "function") {
        try {
          anim.beginElement();
        } catch {
          // Ignored: some browsers throw when restarting after load
        }
      }
    });
  }, [filterId, speed, chaos]);

  // Update animation on speed or chaos changes
  useEffect(() => {
    updateAnim();
  }, [updateAnim]);

  // Use ResizeObserver throttled by requestAnimationFrame to update anim on resize
  useLayoutEffect(() => {
    const host = rootRef.current;
    if (!host) return;

    let frameRequested = false;

    const onResize = () => {
      if (!frameRequested) {
        frameRequested = true;
        requestAnimationFrame(() => {
          updateAnim();
          frameRequested = false;
        });
      }
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(host);

    // Initial update
    updateAnim();

    return () => resizeObserver.disconnect();
  }, [updateAnim]);

  return (
    <div
      ref={rootRef}
      className={`electric-border ${className || ""}`}
      style={{ ...vars, ...style }}
    >
      <svg ref={svgRef} className="eb-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise1"
              seed="2"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise2"
              seed="2"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="eb-layers">
        <div ref={strokeRef} className="eb-stroke" />
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>

      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
