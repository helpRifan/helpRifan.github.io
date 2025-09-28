// components/Typing.tsx
"use client";

import {
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  createElement
} from "react";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  cursorBlink?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const defaultProps = {
  as: "div" as ElementType,
  typingSpeed: 50,
  initialDelay: 0,
  pauseDuration: 2000,
  deletingSpeed: 30,
  loop: true,
  className: "",
  showCursor: true,
  cursorBlink: false,
  hideCursorWhileTyping: false,
  cursorCharacter: "|",
  cursorBlinkDuration: 0.5,
  cursorClassName: "",
  textColors: [] as string[],
  variableSpeed: undefined as { min: number; max: number } | undefined,
  startOnVisible: false,
  reverseMode: false
};

function commonPrefix(strings: string[]) {
  if (!strings || strings.length === 0) return "";
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    let s = strings[i];
    let j = 0;
    while (j < prefix.length && j < s.length && prefix[j] === s[j]) j++;
    prefix = prefix.slice(0, j);
    if (prefix === "") break;
  }
  return prefix;
}

type Phase = "initialDelay" | "typing" | "paused" | "deleting" | "advance" | "stopped";

export default function TextType({
  text,
  as: Component = defaultProps.as,
  typingSpeed = defaultProps.typingSpeed,
  initialDelay = defaultProps.initialDelay,
  pauseDuration = defaultProps.pauseDuration,
  deletingSpeed = defaultProps.deletingSpeed,
  loop = defaultProps.loop,
  className = defaultProps.className,
  showCursor = defaultProps.showCursor,
  cursorBlink = defaultProps.cursorBlink,
  hideCursorWhileTyping = defaultProps.hideCursorWhileTyping,
  cursorCharacter = defaultProps.cursorCharacter,
  cursorClassName = defaultProps.cursorClassName,
  cursorBlinkDuration = defaultProps.cursorBlinkDuration,
  textColors = defaultProps.textColors,
  variableSpeed = defaultProps.variableSpeed,
  onSentenceComplete,
  startOnVisible = defaultProps.startOnVisible,
  reverseMode = defaultProps.reverseMode,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // prefix & suffix
  const prefix = useMemo(() => commonPrefix(texts), [texts]);
  const suffixes = useMemo(() => texts.map((t) => (t.startsWith(prefix) ? t.slice(prefix.length) : t)), [
    texts,
    prefix
  ]);

  const [index, setIndex] = useState(0); // which suffix
  const [charCount, setCharCount] = useState(0); // characters currently shown of suffix
  const [phase, setPhase] = useState<Phase>(initialDelay > 0 ? "initialDelay" : "typing");
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const containerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [startOnVisible]);

  const randSpeed = useCallback(
    (base: number) => {
      if (!variableSpeed) return base;
      const { min, max } = variableSpeed;
      return Math.random() * (max - min) + min;
    },
    [variableSpeed]
  );

  // compute delays based on phase and settings
  useEffect(() => {
    if (!isVisible || suffixes.length === 0) return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const curSuffix = suffixes[index] ?? "";
    const typingDelay = randSpeed(typingSpeed);
    const deletingDelay = randSpeed(deletingSpeed);

    const goToNextIndex = () => {
      const next = (index + 1) % suffixes.length;
      // If not looping and we've just finished the last index, stop entirely
      if (!loop && index === suffixes.length - 1) {
        setPhase("stopped");
        return;
      }
      setIndex(next);
      setCharCount(0);
      setPhase("typing");
    };

    switch (phase) {
      case "initialDelay":
        timer = setTimeout(() => {
          if (!mountedRef.current) return;
          setPhase("typing");
        }, initialDelay);
        break;

      case "typing":
        // type next char or finish
        if (charCount < curSuffix.length) {
          timer = setTimeout(() => {
            if (!mountedRef.current) return;
            setCharCount((c) => c + 1);
          }, typingDelay);
        } else {
          // finished typing suffix
          try {
            onSentenceComplete?.(prefix + curSuffix, index);
          } catch (e) {
            /* swallow callback errors */
          }
          // If not looping and last text -> stop (leave it typed)
          if (!loop && index === suffixes.length - 1) {
            setPhase("stopped");
          } else {
            setPhase("paused");
          }
        }
        break;

      case "paused":
        timer = setTimeout(() => {
          if (!mountedRef.current) return;
          // start deleting only the suffix (down to 0)
          setPhase("deleting");
        }, pauseDuration);
        break;

      case "deleting":
        if (charCount > 0) {
          timer = setTimeout(() => {
            if (!mountedRef.current) return;
            setCharCount((c) => c - 1);
          }, deletingDelay);
        } else {
          // deleted down to prefix
          // advance to next index (or stop if not looping)
          // small delay to give natural feel
          timer = setTimeout(() => {
            if (!mountedRef.current) return;
            goToNextIndex();
          }, 120);
        }
        break;

      case "advance":
        // unused currently but kept for clarity / future hooks
        goToNextIndex();
        break;

      case "stopped":
        // do nothing
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    phase,
    charCount,
    index,
    isVisible,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    suffixes,
    loop,
    variableSpeed
  ]);

  // keep display in sync if index changes externally
  useEffect(() => {
    const cur = suffixes[index] ?? "";
    setCharCount((c) => Math.min(c, cur.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const shouldHideCursor =
    hideCursorWhileTyping && phase === "typing" && charCount < (suffixes[index] ?? "").length;

  const cursorStyle: React.CSSProperties | undefined = cursorBlink
    ? { animation: `tt-blink ${cursorBlinkDuration}s steps(1,start) infinite` }
    : undefined;

  const displaySuffix = (suffixes[index] ?? "").slice(0, charCount);
  const merged = prefix + displaySuffix;

  return createElement(
    Component,
    {
      ref: (el: any) => (containerRef.current = el),
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span style={{ color: textColors.length ? textColors[index % textColors.length] : undefined }}>
      {prefix}
      <span className="inline">{displaySuffix}</span>
    </span>,
    showCursor && !shouldHideCursor && (
      <span aria-hidden className={cursorClassName} style={cursorStyle}>
        {cursorCharacter}
        <style>{`
          @keyframes tt-blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
      </span>
    )
  );
}
