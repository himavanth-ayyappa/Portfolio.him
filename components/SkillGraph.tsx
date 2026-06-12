"use client";
import { useEffect, useRef } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  type Simulation,
} from "d3-force";
import { hubs, skills, crossLinks } from "@/data/skills";

type Node = {
  id: string;
  hub?: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};
type Link = { source: any; target: any; hubLink: boolean };

export default function SkillGraph() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes: Node[] = [
      ...hubs.map((h) => ({ ...h })),
      ...skills.map((s) => ({ id: s.id })),
    ];
    const links: Link[] = [
      ...skills.map((s) => ({ source: s.id, target: s.cluster!, hubLink: true })),
      ...crossLinks.map((c) => ({ ...c, hubLink: false })),
    ];
    const adj: Record<string, Set<string>> = {};
    links.forEach((l) => {
      (adj[l.source] = adj[l.source] || new Set()).add(l.target);
      (adj[l.target] = adj[l.target] || new Set()).add(l.source);
    });

    let W = 0,
      H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let hovered: Node | null = null;
    let dragging: Node | null = null;
    let sim: Simulation<Node, undefined>;

    const measure = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      W = r.width;
      H = Math.max(380, Math.min(520, r.width * 0.66));
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const focus = hovered
        ? new Set([hovered.id, ...(adj[hovered.id] || [])])
        : null;
      links.forEach((l) => {
        const on =
          focus &&
          (l.source.id === hovered!.id || l.target.id === hovered!.id);
        ctx.strokeStyle = on
          ? "#d4ff4f"
          : l.hubLink
            ? "rgba(141,141,149,0.22)"
            : "rgba(212,255,79,0.14)";
        ctx.lineWidth = on ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        ctx.stroke();
      });
      const small = W < 480;
      nodes.forEach((n) => {
        const dim = focus && !focus.has(n.id);
        const r = n.hub ? 5.5 : 3.5;
        ctx.beginPath();
        ctx.arc(n.x!, n.y!, r, 0, Math.PI * 2);
        ctx.fillStyle = n.hub
          ? dim
            ? "rgba(212,255,79,0.25)"
            : "#d4ff4f"
          : dim
            ? "rgba(242,242,240,0.18)"
            : "#c9c9d4";
        ctx.fill();
        if (hovered === n) {
          ctx.strokeStyle = "#d4ff4f";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x!, n.y!, r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (small && !n.hub && hovered !== n && !(focus && focus.has(n.id)))
          return; // declutter labels on narrow screens
        ctx.font = `${n.hub ? "500 12px" : "400 11px"} var(--font-mono), ui-monospace, monospace`;
        ctx.fillStyle = n.hub
          ? dim
            ? "rgba(212,255,79,0.3)"
            : "#d4ff4f"
          : dim
            ? "rgba(141,141,149,0.25)"
            : "#8d8d95";
        if (hovered === n || (focus && focus.has(n.id) && !n.hub))
          ctx.fillStyle = "#f2f2f0";
        ctx.fillText(n.id, n.x! + r + 5, n.y! + 4);
      });
    };

    const start = () => {
      sim = forceSimulation(nodes)
        .force(
          "link",
          forceLink(links as any)
            .id((d: any) => d.id)
            .distance((l: any) => (l.hubLink ? 52 : 95))
            .strength((l: any) => (l.hubLink ? 0.9 : 0.15))
        )
        .force(
          "charge",
          forceManyBody().strength((d: any) => (d.hub ? -420 : -110))
        )
        .force("center", forceCenter(W / 2, H / 2))
        .force("collide", forceCollide((d: any) => (d.hub ? 34 : 22)))
        .force("x", forceX(W / 2).strength(0.06))
        .force("y", forceY(H / 2).strength(0.08))
        .on("tick", draw);
      if (reduced) {
        sim.stop();
        for (let i = 0; i < 300; i++) sim.tick();
        draw();
      }
    };

    const pick = (mx: number, my: number): Node | null => {
      let best: Node | null = null;
      let bd = 18;
      for (const n of nodes) {
        const d = Math.hypot(n.x! - mx, n.y! - my);
        if (d < bd) {
          bd = d;
          best = n;
        }
      }
      return best;
    };

    const pos = (e: MouseEvent | Touch) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };

    const onMove = (e: MouseEvent) => {
      const [mx, my] = pos(e);
      if (dragging) {
        dragging.fx = mx;
        dragging.fy = my;
        if (!reduced) sim.alpha(0.3).restart();
        else {
          dragging.x = mx;
          dragging.y = my;
          draw();
        }
        return;
      }
      const h = pick(mx, my);
      if (h !== hovered) {
        hovered = h;
        canvas.style.cursor = h ? "pointer" : "grab";
        draw();
      }
    };
    const onDown = (e: MouseEvent) => {
      const [mx, my] = pos(e);
      dragging = pick(mx, my);
      if (dragging && !reduced) {
        dragging.fx = dragging.x;
        dragging.fy = dragging.y;
        sim.alphaTarget(0.25).restart();
      }
    };
    const onUp = () => {
      if (dragging) {
        dragging.fx = null;
        dragging.fy = null;
        if (!reduced) sim.alphaTarget(0);
        dragging = null;
      }
    };
    const onLeave = () => {
      if (!dragging) {
        hovered = null;
        draw();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const [mx, my] = pos(e.touches[0]);
      const n = pick(mx, my);
      hovered = n;
      draw();
    };

    const onResize = () => {
      measure();
      sim?.stop();
      start();
    };

    measure();
    start();
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      sim?.stop();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full">
      <canvas ref={ref} className="block w-full" />
    </div>
  );
}
