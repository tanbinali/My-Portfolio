import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";
const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
};

// Utility functions
const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const round = (value, precision = 3) => Number(value.toFixed(precision));

const adjust = (value, fromMin, fromMax, toMin, toMax) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// Animation and transform logic (moved outside component)
function updateCardTransform(offsetX, offsetY, card, wrap) {
  const width = card.clientWidth;
  const height = card.clientHeight;
  const percentX = clamp((100 / width) * offsetX);
  const percentY = clamp((100 / height) * offsetY);
  const centerX = percentX - 50;
  const centerY = percentY - 50;
  const properties = {
    "--pointer-x": `${percentX}%`,
    "--pointer-y": `${percentY}%`,
    "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
    "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
    "--pointer-from-center": `${clamp(
      Math.hypot(percentY - 50, percentX - 50) / 50,
      0,
      1
    )}`,
    "--pointer-from-top": `${percentY / 100}`,
    "--pointer-from-left": `${percentX / 100}`,
    "--rotate-x": `${round(-(centerX / 5))}deg`,
    "--rotate-y": `${round(centerY / 4)}deg`,
  };
  for (const [property, value] of Object.entries(properties)) {
    wrap.style.setProperty(property, value);
  }
}

function createSmoothAnimation(duration, startX, startY, card, wrap, rafIdRef) {
  const startTime = performance.now();
  const targetX = wrap.clientWidth / 2;
  const targetY = wrap.clientHeight / 2;

  function animationLoop(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = clamp(elapsed / duration);
    const easedProgress = easeInOutCubic(progress);
    const currentX = adjust(easedProgress, 0, 1, startX, targetX);
    const currentY = adjust(easedProgress, 0, 1, startY, targetY);
    updateCardTransform(currentX, currentY, card, wrap);
    if (progress < 1) {
      rafIdRef.current = requestAnimationFrame(animationLoop);
    }
  }
  rafIdRef.current = requestAnimationFrame(animationLoop);
}

const ProfileCardComponent = ({
  avatarUrl = "<Placeholder for avatar URL>",
  iconUrl = "<Placeholder for icon URL>",
  grainUrl = "<Placeholder for grain URL>",
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const rafIdRef = useRef(null);

  // Stable event handlers reference
  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !enableTilt) return;
      // Throttle using RAF if needed
      updateCardTransform(
        event.clientX - card.getBoundingClientRect().left,
        event.clientY - card.getBoundingClientRect().top,
        card,
        wrap
      );
    },
    [enableTilt]
  );

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !enableTilt) return;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    wrap.classList.add("active");
    card.classList.add("active");
  }, [enableTilt]);

  const handlePointerLeave = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !enableTilt) return;
      createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap,
        rafIdRef
      );
      wrap.classList.remove("active");
      card.classList.remove("active");
    },
    [enableTilt]
  );

  const handleDeviceOrientation = useCallback(
    (event) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !enableTilt) return;
      if (event.beta == null || event.gamma == null) return;
      updateCardTransform(
        card.clientHeight / 2 + event.gamma * mobileTiltSensitivity,
        card.clientWidth / 2 +
          (event.beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) *
            mobileTiltSensitivity,
        card,
        wrap
      );
    },
    [enableTilt, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt) return;
    // DOM refs
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    // Initial transform and animation
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    updateCardTransform(initialX, initialY, card, wrap);
    createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap,
      rafIdRef
    );

    // Add event listeners
    card.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });
    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    // Click to enable device orientation (mobile tilt)
    const enableDeviceOrientation = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      if (typeof window.DeviceMotionEvent?.requestPermission === "function") {
        window.DeviceMotionEvent.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener(
                "deviceorientation",
                handleDeviceOrientation,
                { passive: true }
              );
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation, {
          passive: true,
        });
      }
    };
    card.addEventListener("click", enableDeviceOrientation, { passive: true });

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      card.removeEventListener("click", enableDeviceOrientation);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [
    enableTilt,
    enableMobileTilt,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  // Memoized style object
  const cardStyle = useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-gradient": showBehindGradient
        ? behindGradient ?? DEFAULT_BEHIND_GRADIENT
        : "none",
      "--inner-gradient": innerGradient ?? DEFAULT_INNER_GRADIENT,
    }),
    [iconUrl, grainUrl, showBehindGradient, behindGradient, innerGradient]
  );

  const handleContactClick = useCallback(() => {
    if (onContactClick) onContactClick();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    <img
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.opacity = "0.5";
                        e.target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="pc-user-text">
                    <div className="pc-handle">@{handle}</div>
                    <div className="pc-status">{status}</div>
                  </div>
                </div>
                <button
                  className="pc-contact-btn"
                  onClick={handleContactClick}
                  style={{ pointerEvents: "auto" }}
                  type="button"
                  aria-label={`Contact ${name || "user"}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
