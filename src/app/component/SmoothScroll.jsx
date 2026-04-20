"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const useNativeScroll =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/agreement/") ||
    pathname?.startsWith("/client-portal/");

  useEffect(() => {
    if (useNativeScroll) return undefined;

    const lenis = new Lenis();
    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [useNativeScroll]);

  return <>{children}</>;
}
