"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { calmEaseCss } from "@/lib/motion";
import { useCalmMotion } from "@/lib/use-calm-motion";

interface StampInProps {
  children: ReactNode;
  className?: string;
  /** Start as soon as mounted instead of waiting for the viewport. */
  immediate?: boolean;
}

/**
 * The one orchestrated moment: a seal stamping down once. Opacity 0 to 1,
 * scale 1.06 to 1, rotation 5° to 0 on top of the seal's own 7°, 240ms, calm
 * easing, runs once. Under reduced motion it renders settled.
 */
export function StampIn({ children, className, immediate = false }: StampInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced, duration } = useCalmMotion();
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (landed || reduced) return;
    const node = ref.current;
    if (!node) return;
    if (immediate) {
      const frame = requestAnimationFrame(() => setLanded(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLanded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate, landed, reduced]);

  const settled = reduced || landed;
  const style: CSSProperties = {
    opacity: settled ? 1 : 0,
    transform: settled ? "scale(1) rotate(0deg)" : "scale(1.06) rotate(5deg)",
    transition: reduced
      ? "none"
      : `opacity ${duration.slow * 1000}ms ${calmEaseCss}, transform ${duration.slow * 1000}ms ${calmEaseCss}`,
    willChange: settled ? undefined : "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
