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
      tooltip: "LinkedIn",
      label: linkedin ? "LinkedIn profile" : "LinkedIn — connect via contact",
      className: "border-transparent bg-[#0A66C2] text-white hover:brightness-110",
      icon: <FaLinkedin className={iconClass} />,
      external: Boolean(linkedin),
      tooltipAlign: "center" as const,
    },
    {
      key: "github",
      href: github,
      tooltip: "GitHub",
      label: "GitHub profile",
      className:
        "border-transparent bg-[#24292f] text-white hover:bg-[#1b1f24]",
      icon: <FaGithub className={iconClass} />,
      external: true,
      tooltipAlign: "center" as const,
    },
    {
      key: "email",
      href: `mailto:${email}`,
      tooltip: "Gmail",
      label: "Send email",
      className:
        "border border-border/60 bg-white text-[#EA4335] shadow-sm hover:bg-gray-50 dark:border-border/50 dark:bg-[#1f2937] dark:hover:bg-[#273244]",
      icon: <SiGmail className={iconClass} />,
      external: false,
      tooltipAlign: "center" as const,
    },
    {
      key: "resume",
      href: resume,
      tooltip: "Resume",
      label: "Download resume",
      className:
        "border-transparent bg-[#2563EB] text-white hover:bg-[#1d4ed8]",
      icon: <FileText className={iconClass} />,
      external: false,
      download: true,
      tooltipAlign: "end" as const,
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
          className={cn(
            "group/social relative flex items-center justify-center rounded-xl shadow-md transition-[transform,box-shadow] duration-300 ease-out hover:scale-105 hover:shadow-[0_0_14px_color-mix(in_srgb,var(--primary)_40%,transparent),0_0_24px_color-mix(in_srgb,var(--accent)_18%,transparent)]",
            sizeClass,
            link.className
          )}
        >
          {link.icon}

          {/* Desktop / fine-pointer tooltips only */}
          <span
            className={cn(
              "pointer-events-none absolute top-full z-[60] hidden pt-2",
              "[@media(hover:hover)_and_(pointer:fine)]:block",
              link.tooltipAlign === "end"
                ? "right-0"
                : "left-1/2 -translate-x-1/2"
            )}
          >
            <span
              role="tooltip"
              className={cn(
                "relative block whitespace-nowrap rounded-md border border-primary/25 bg-surface/95 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground opacity-0 shadow-[0_8px_20px_color-mix(in_srgb,var(--background)_55%,transparent),0_0_12px_color-mix(in_srgb,var(--primary)_18%,transparent)] transition-[opacity,transform] duration-200 ease-out",
                "translate-y-1",
                "group-hover/social:translate-y-0 group-hover/social:opacity-100",
                "group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100"
              )}
            >
              {link.tooltip}
              <span
                aria-hidden
                className={cn(
                  "absolute -top-1 h-2 w-2 rotate-45 border-l border-t border-primary/25 bg-surface/95",
                  link.tooltipAlign === "end"
                    ? "right-3"
                    : "left-1/2 -translate-x-1/2"
                )}
              />
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
