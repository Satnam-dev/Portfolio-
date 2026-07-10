"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SITE } from "@/lib/constants";

interface SocialLinksProps {
  github?: string;
  linkedin?: string | null;
  email?: string | null;
  className?: string;
}

export function SocialLinks({
  github = SITE.github,
  linkedin,
  email,
  className,
}: SocialLinksProps) {
  const links = [
    { href: github, icon: FaGithub, label: "GitHub" },
    ...(linkedin ? [{ href: linkedin, icon: FaLinkedin, label: "LinkedIn" }] : []),
    ...(email ? [{ href: `mailto:${email}`, icon: FaEnvelope, label: "Email" }] : []),
  ];

  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target={label !== "Email" ? "_blank" : undefined}
          rel={label !== "Email" ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/50 text-muted backdrop-blur-sm transition-[transform,color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 hover:border-primary/50 hover:text-primary active:scale-95"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
