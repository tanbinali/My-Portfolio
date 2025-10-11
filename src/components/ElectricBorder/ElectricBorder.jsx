import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./ElectricBorder.css";

const ElectricBorder = ({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 1,
  thickness = 2,
  className,
  style,
}) => {
  const instanceId = useId().replace(/[:]/g, "");
  const filterId = useMemo(
    () => `turbulent-displace-${instanceId}`,
    [instanceId]
  );
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  // Memoize core border variables for stable referential equality
  const vars = useMemo(
    () => ({
      "--electric-border-color": color,
      "--eb-border-width": `${thickness}px`,
    }),
    [color, thickness]
  );

  // Animations and SVG sync, batched into a stable callback
  const updateAnim = useCallback(() => {
    const svg = svgRef.current;
    const host = rootRef.current;
    const stroke = strokeRef.current;
    if (!svg || !host || !stroke) return;

    stroke.style.filter = `url(#${filterId})`;

    // Use layoutBox for precision, fallback to getBoundingClientRect if needed
    const width = Math.max(
      1,
      Math.round(host.clientWidth || host.getBoundingClientRect().width || 0)
    );
    const height = Math.max(
      1,
      Math.round(host.clientHeight || host.getBoundingClientRect().height || 0)
    );

    // Query all 'animate' elements for dx and dy just once
    const dyAnims = svg.querySelectorAll(
      'feOffset > animate[attributeName="dy"]'
    );
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute("values", `${height}; 0`);
      dyAnims[1].setAttribute("values", `0; -${height}`);
    }

    const dxAnims = svg.querySelectorAll(
      'feOffset > animate[attributeName="dx"]'
    );
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute("values", `${width}; 0`);
      dxAnims[1].setAttribute("values", `0; -${width}`);
    }

    // Calculate animation duration, clamp safely
    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach((a) => a.setAttribute("dur", `${dur}s`));

    // Set turbulence "chaos" effect
    const disp = svg.querySelector("feDisplacementMap");
    if (disp) disp.setAttribute("scale", String(30 * (chaos || 1)));

    // Expand filter area so the SVG does not crop
    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute("x", "-200%");
      filterEl.setAttribute("y", "-200%");
      filterEl.setAttribute("width", "500%");
      filterEl.setAttribute("height", "500%");
    }

    // Restart animation safely
    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach((a) => {
        if (typeof a.beginElement === "function") {
          try {
            a.beginElement();
          } catch (err) {
            // Browsers may not allow this after load, safe ignore
          }
        }
      });
    });
  }, [speed, chaos, filterId]);

  // Sync animation on speed/chaos changes
  useEffect(() => {
    updateAnim();
  }, [updateAnim]);

  // Attach ResizeObserver, ensure cleanup and throttle with useLayoutEffect
  useLayoutEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const ro = new window.ResizeObserver(() => updateAnim());
    ro.observe(host);
    updateAnim();
    return () => ro.disconnect();
  }, [updateAnim]);

  return (
    <div
      ref={rootRef}
      className={`electric-border ${className || ""}`}
      style={useMemo(() => ({ ...vars, ...style }), [vars, style])}
    >
      <svg ref={svgRef} className="eb-svg" aria-hidden focusable="false">
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
