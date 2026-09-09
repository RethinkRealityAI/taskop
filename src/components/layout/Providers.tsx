"use client";

import { MotionConfig } from "motion/react";

/** Global motion settings: honour the OS "reduce motion" preference (transforms off, fades kept). */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
