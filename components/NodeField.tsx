"use client";
import { useEffect, useRef } from "react";

type N = { x: number; y: number; vx: number; vy: number };

export default function NodeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0,
      raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let nodes: N[] = [];

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((W * H) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const R = 130;
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 110 * 110) continue;
          const mx = (a.x + b.x) / 2,
            my = (a.y + b.y) / 2;
          const md = Math.hypot(mx - mouse.x, my - mouse.y);
          const near = Math.max(0, 1 - md / R);
          const base = 0.05 + (1 - d2 / (110 * 110)) * 0.06;
          if (near > 0) {
            ctx.strokeStyle = `rgba(212,255,79,${base + near * 0.5})`;
          } else {
            ctx.strokeStyle = `rgba(141,141,149,${base})`;
          }
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = Math.max(0, 1 - md / R);
        ctx.fillStyle =
          near > 0
            ? `rgba(212,255,79,${0.35 + near * 0.65})`
            : "rgba(242,242,240,0.28)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near > 0 ? 1.8 + near : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (reduced) draw();
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      if (reduced) draw();
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.parentElement!.addEventListener("mousemove", onMove);
    canvas.parentElement!.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
