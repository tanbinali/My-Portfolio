"use client";

import {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import "./TextType.css";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text]
  );

  // Precompute processedText for the currentTextIndex
  const processedText = useMemo(() => {
    const val = textArray[currentTextIndex] ?? "";
    return reverseMode ? val.split("").reverse().join("") : val;
  }, [textArray, currentTextIndex, reverseMode]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = useCallback(() => {
    if (!textColors.length) return "#ffffff";
    return textColors[currentTextIndex % textColors.length];
  }, [textColors, currentTextIndex]);

  // Visibility observer (stable and only runs when startOnVisible is true)
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Cursor blinking GSAP animation
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;
    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    return () => {
      tween?.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  // Typing/deleting effect
  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const isAtTextEnd = currentCharIndex >= processedText.length;

    const doTyping = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          if (onSentenceComplete)
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex]
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    // Only trigger initial delay when starting fresh
    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(doTyping, initialDelay);
    } else {
      doTyping();
    }
    return () => clearTimeout(timeout);
  }, [
    isVisible,
    isDeleting,
    displayedText,
    currentCharIndex,
    currentTextIndex,
    processedText,
    textArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    loop,
    variableSpeed,
    onSentenceComplete,
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex] ?? "").length ||
      isDeleting);

  // Memoize the cursor node to keep it stable between renders
  const cursorNode = useMemo(
    () =>
      showCursor ? (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName} ${
            shouldHideCursor ? "text-type__cursor--hidden" : ""
          }`}
        >
          {cursorCharacter}
        </span>
      ) : null,
    [showCursor, cursorClassName, cursorCharacter, shouldHideCursor]
  );

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props,
    },
    <span
      className="text-type__content"
      style={{ color: getCurrentTextColor() }}
    >
      {displayedText}
    </span>,
    cursorNode
  );
};

export default TextType;
