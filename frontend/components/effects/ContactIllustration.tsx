"use client";

import { Calendar, Code2, Mail, MessageCircle } from "lucide-react";

const floatIcons = [
  {
    Icon: Mail,
    className:
      "contact-float contact-float-1 absolute left-[4%] top-[10%] h-12 w-12 rounded-2xl border border-primary/30 bg-surface text-primary md:h-14 md:w-14",
  },
  {
    Icon: Calendar,
    className:
      "contact-float contact-float-2 absolute right-[6%] top-[6%] h-11 w-11 rounded-full border border-accent/30 bg-surface text-accent md:h-12 md:w-12",
  },
  {
    Icon: MessageCircle,
    className:
      "contact-float contact-float-3 absolute right-[2%] top-[48%] h-12 w-12 rounded-2xl border border-primary/25 bg-surface text-primary md:h-14 md:w-14",
  },
  {
    Icon: Code2,
    className:
      "contact-float contact-float-4 absolute left-[10%] top-[52%] h-11 w-11 rounded-full border border-accent/30 bg-surface text-accent md:h-12 md:w-12",
  },
];

export function ContactIllustration() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-lg items-center justify-center py-4 md:py-8"
      aria-hidden
    >
      <div className="contact-glow absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />

      <div className="animate-fade-in relative w-full">
        <svg
          viewBox="0 0 420 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 h-auto w-full"
        >
          <ellipse
            cx="210"
            cy="300"
            rx="150"
            ry="18"
            fill="currentColor"
            className="text-primary/15"
          />

          <rect
            x="95"
            y="228"
            width="230"
            height="14"
            rx="7"
            fill="currentColor"
            className="text-border"
          />
          <rect
            x="118"
            y="242"
            width="8"
            height="42"
            rx="4"
            fill="currentColor"
            className="text-border"
          />
          <rect
            x="294"
            y="242"
            width="8"
            height="42"
            rx="4"
            fill="currentColor"
            className="text-border"
          />

          <rect
            x="168"
            y="168"
            width="108"
            height="68"
            rx="10"
            fill="currentColor"
            className="text-foreground/10"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.2"
          />
          <rect
            x="176"
            y="176"
            width="92"
            height="48"
            rx="6"
            fill="url(#screenGlow)"
          />
          <rect
            x="210"
            y="236"
            width="24"
            height="10"
            rx="3"
            fill="currentColor"
            className="text-border"
          />

          <circle cx="210" cy="198" r="3" fill="currentColor" className="text-accent" />

          <path
            d="M148 248C148 220 168 202 196 202H224C252 202 272 220 272 248V268H148V248Z"
            fill="currentColor"
            className="text-primary/25"
          />
          <circle cx="210" cy="218" r="26" fill="currentColor" className="text-primary/35" />
          <circle cx="210" cy="214" r="18" fill="currentColor" className="text-foreground/15" />

          <path
            d="M186 206C186 198 192 192 200 192H220C228 192 234 198 234 206"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="text-primary/60"
          />
          <rect
            x="192"
            y="200"
            width="36"
            height="14"
            rx="7"
            fill="currentColor"
            className="text-primary/40"
          />

          <rect
            x="248"
            y="252"
            width="52"
            height="8"
            rx="4"
            fill="currentColor"
            className="text-accent/50"
            transform="rotate(-18 248 252)"
          />
          <rect
            x="120"
            y="252"
            width="52"
            height="8"
            rx="4"
            fill="currentColor"
            className="text-accent/50"
            transform="rotate(18 120 252)"
          />

          <circle cx="88" cy="118" r="34" fill="currentColor" className="text-primary/12" />
          <circle cx="332" cy="96" r="28" fill="currentColor" className="text-accent/12" />
          <circle cx="332" cy="210" r="22" fill="currentColor" className="text-primary/10" />

          <defs>
            <linearGradient id="screenGlow" x1="176" y1="176" x2="268" y2="224">
              <stop stopColor="#818cf8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>

        {floatIcons.map(({ Icon, className }) => (
          <div
            key={className}
            className={`flex items-center justify-center shadow-md ${className}`}
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
