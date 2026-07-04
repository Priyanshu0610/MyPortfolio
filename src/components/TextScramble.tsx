"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function TextScramble({
  text,
  className,
  speed = 30,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const [displayText, setDisplayText] = useState(() => 
    text.split("").map(c => c === " " ? " " : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("")
  );

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("");
      });

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isInView, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
