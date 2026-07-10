"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });
    tl.to(".loader-bar", {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    }).to(".loader-content", {
      opacity: 0,
      y: -20,
      duration: 0.4,
    });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          className="loader-content fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="mb-6 text-2xl font-bold gradient-text">SK</div>
          <div className="h-1 w-48 overflow-hidden rounded-full bg-border">
            <div className="loader-bar h-full w-0 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
          <p className="mt-4 text-sm text-muted">Loading portfolio...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
