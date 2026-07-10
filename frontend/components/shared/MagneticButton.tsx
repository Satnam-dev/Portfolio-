"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  as = "button",
  href,
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const motionProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 150, damping: 15 },
    className: cn(className),
  };

  if (as === "a" && href) {
    return (
      <m.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
      >
        {children}
      </m.a>
    );
  }

  return (
    <m.button {...motionProps} onClick={onClick} type="button">
      {children}
    </m.button>
  );
}
