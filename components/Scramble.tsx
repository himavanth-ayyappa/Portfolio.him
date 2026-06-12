"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*<>/\\";

export default function Scramble({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const total = 26;
    const start = () => {
      const tick = () => {
        frame++;
        const reveal = Math.floor((frame / total) * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " " || text[i] === "\n") s += text[i];
          else if (i < reveal) s += text[i];
          else s += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setOut(s);
        if (frame < total) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };
    const t = setTimeout(start, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return <span className={className}>{out}</span>;
}
