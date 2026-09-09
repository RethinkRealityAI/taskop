"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { home } from "@/content/site";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = reduce ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Stat({ value, suffix, label, format }: (typeof home.stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const n = useCountUp(value, inView);
  const display = format === "year" ? String(value) : n.toLocaleString();
  return (
    <div ref={ref} className="border-l border-line pl-6">
      <div className="text-display text-4xl text-ink sm:text-5xl">
        {display}
        {suffix && <span className="text-accent">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm text-ink-2">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {home.stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}
