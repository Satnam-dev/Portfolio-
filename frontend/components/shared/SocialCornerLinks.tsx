"use client";

import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { SITE } from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { cn } from "@/lib/utils";

interface SocialCornerLinksProps {
  portfolio?: PortfolioInfo | null;
  className?: string;
  iconSize?: "sm" | "md";
}

export function SocialCornerLinks({
  portfolio,
  className,
  iconSize = "md",
}: SocialCornerLinksProps) {
  const github = portfolio?.socialLinks?.github || SITE.github;
  const linkedin = portfolio?.socialLinks?.linkedin || SITE.linkedin;
  const email = portfolio?.socialLinks?.email || SITE.email;
  const resume = portfolio?.resumeUrl || SITE.resumeUrl;

  const sizeClass = iconSize === "sm" ? "h-9 w-9" : "h-10 w-10 md:h-11 md:w-11";
  const iconClass = iconSize === "sm" ? "h-4 w-4" : "h-[18px] w-[18px] md:h-5 md:w-5";

  const links = [
    {
      key: "linkedin",
      href: linkedin || "#contact",
      label: linkedin ? "LinkedIn profile" : "LinkedIn — connect via contact",
      className: "border-transparent bg-[#0A66C2] text-white hover:brightness-110",
      icon: <FaLinkedin className={iconClass} />,
      external: Boolean(linkedin),
    },
    {
      key: "github",
      href: github,
      label: "GitHub profile",
      className:
        "border-transparent bg-[#24292f] text-white hover:bg-[#1b1f24]",
      icon: <FaGithub className={iconClass} />,
      external: true,
    },
    {
      key: "email",
      href: `mailto:${email}`,
      label: "Send email",
      className:
        "border border-border/60 bg-white text-[#EA4335] shadow-sm hover:bg-gray-50 dark:border-border/50 dark:bg-[#1f2937] dark:hover:bg-[#273244]",
      icon: <SiGmail className={iconClass} />,
      external: false,
    },
    {
      key: "resume",
      href: resume,
      label: "Download resume",
      className:
        "border-transparent bg-[#2563EB] text-white hover:bg-[#1d4ed8]",
      icon: <FileText className={iconClass} />,
      external: false,
      download: true,
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          download={link.download || undefined}
          aria-label={link.label}
          title={link.label}
          className={cn(
            "flex items-center justify-center rounded-xl shadow-md transition-transform hover:scale-105",
            sizeClass,
            link.className
          )}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
