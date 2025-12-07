import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import "./ElectricBorder.css";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const ElectricBorder = memo(
  ({
    children,
    color = "#5227FF",
    speed = 1,
    chaos = 1,
    thickness = 2,
    className = "",
    style = {},
  }) => {
    const instanceId = useId().replace(/:/g, "");
    const filterId = `turbulent-displace-${instanceId}`;

    // Refs
    const rootRef = useRef(null);
    const strokeRef = useRef(null);

    // Cache references to specific SVG animate elements to avoid querySelectorAll per frame
    const animationsRef = useRef({
      v1: null, // Vertical 1
      v2: null, // Vertical 2
      h1: null, // Horizontal 1
      h2: null, // Horizontal 2
      disp: null, // Displacement Map
      filter: null, // Filter Element
    });

    const styles = useMemo(
      () => ({
        "--electric-border-color": color,
        "--eb-border-width": `${thickness}px`,
        ...style,
      }),
      [color, thickness, style]
    );

    // Capture Refs once on mount
    const handleSvgLoad = useCallback(
      (svg) => {
        if (!svg) return;
        const q = (s) => svg.querySelector(s);
        animationsRef.current = {
          v1: q("#anim-v1"),
          v2: q("#anim-v2"),
          h1: q("#anim-h1"),
          h2: q("#anim-h2"),
          disp: q("feDisplacementMap"),
          filter: q(`#${filterId}`),
        };
        // Trigger initial update immediately after ref capture
        updateAnim();
      },
      [filterId]
    );

    const updateAnim = useCallback(() => {
      const host = rootRef.current;
      const stroke = strokeRef.current;
      const anims = animationsRef.current;

      if (!host || !stroke || !anims.filter) return;

      // Apply filter ID dynamically to stroke
      stroke.style.filter = `url(#${filterId})`;

      // Get dimensions (clamped for safety)
      const { width: w, height: h } = host.getBoundingClientRect();
      const width = clamp(Math.round(w), 1, 10000);
      const height = clamp(Math.round(h), 1, 10000);

      // 1. Update Vertical Animation Bounds
      if (anims.v1 && anims.v2) {
        anims.v1.setAttribute("values", `${height}; 0`);
        anims.v2.setAttribute("values", `0; -${height}`);
      }

      // 2. Update Horizontal Animation Bounds
      if (anims.h1 && anims.h2) {
        anims.h1.setAttribute("values", `${width}; 0`);
        anims.h2.setAttribute("values", `0; -${width}`);
      }

      // 3. Update Speed (Duration)
      const baseDuration = 6;
      const duration = clamp(baseDuration / (speed || 1), 0.05, 10);
      [anims.v1, anims.v2, anims.h1, anims.h2].forEach((el) => {
        if (el) el.setAttribute("dur", `${duration}s`);
      });

      // 4. Update Chaos (Displacement Scale)
      if (anims.disp) {
        anims.disp.setAttribute(
          "scale",
          String(clamp(30 * (chaos || 1), 0, 100))
        );
      }

      // 5. Restart Animations
      [anims.v1, anims.v2, anims.h1, anims.h2].forEach((el) => {
        if (el && typeof el.beginElement === "function") {
          try {
            el.beginElement();
          } catch (e) {
            /* Safe ignore */
          }
        }
      });
    }, [speed, chaos, filterId]);

    // Resize Observer to handle container size changes
    useLayoutEffect(() => {
      const host = rootRef.current;
      if (!host) return;

      let rafId;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateAnim);
      });

      observer.observe(host);
      // Initial call
      updateAnim();

      return () => {
        observer.disconnect();
        cancelAnimationFrame(rafId);
      };
    }, [updateAnim]);

    return (
      <div
        ref={rootRef}
        className={`electric-border ${className}`}
        style={styles}
      >
        <svg
          ref={handleSvgLoad}
          className="eb-svg"
          aria-hidden="true"
          focusable="false"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              {/* OPTIMIZATION: Generate Noise Once per seed, Reuse Result */}

              {/* 1. Vertical Noise Source (Seed 1) */}
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                seed="1"
                result="noiseV"
              />
              {/* Vertical Flow A */}
              <feOffset in="noiseV" dx="0" dy="0" result="noiseV_offA">
                <animate
                  id="anim-v1"
                  attributeName="dy"
                  values="0; 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feOffset>
              {/* Vertical Flow B */}
              <feOffset in="noiseV" dx="0" dy="0" result="noiseV_offB">
                <animate
                  id="anim-v2"
                  attributeName="dy"
                  values="0; 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feOffset>

              {/* 2. Horizontal Noise Source (Seed 2) */}
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                seed="2"
                result="noiseH"
              />
              {/* Horizontal Flow A */}
              <feOffset in="noiseH" dx="0" dy="0" result="noiseH_offA">
                <animate
                  id="anim-h1"
                  attributeName="dx"
                  values="0; 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feOffset>
              {/* Horizontal Flow B */}
              <feOffset in="noiseH" dx="0" dy="0" result="noiseH_offB">
                <animate
                  id="anim-h2"
                  attributeName="dx"
                  values="0; 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feOffset>

              {/* Merge Layers */}
              <feComposite
                in="noiseV_offA"
                in2="noiseV_offB"
                operator="over"
                result="mergedV"
              />
              <feComposite
                in="noiseH_offA"
                in2="noiseH_offB"
                operator="over"
                result="mergedH"
              />

              <feBlend
                in="mergedV"
                in2="mergedH"
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
          <div
            ref={strokeRef}
            className="eb-stroke"
            style={{ willChange: "filter" }}
          />
          <div className="eb-glow-1" />
          <div className="eb-glow-2" />
          <div className="eb-background-glow" />
        </div>

        <div className="eb-content">{children}</div>
      </div>
    );
  }
);

export default ElectricBorder;
