"use client";

import { m } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TYPING_ROLES, SITE } from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { TypingText } from "@/components/effects/TypingText";

interface HeroSectionProps {
  portfolio?: PortfolioInfo | null;
}

export function HeroSection({ portfolio }: HeroSectionProps) {
  const mode = usePerformanceMode();
  const title =
    portfolio?.title || "Python Developer | Cloud & Cybersecurity Learner";
  const typingPhrases = portfolio?.roles?.length
    ? portfolio.roles
    : TYPING_ROLES;
  const educationLine = [
    portfolio?.education.institution || SITE.university,
    portfolio?.education.degree || "B.Tech in Computer Science Engineering",
  ].join(" · ");

  const headline = (
    <h1 className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
      Hi! I&apos;m Satnam Kumar,
    </h1>
  );

  const subtitle = (
    <p className="hero-silver text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem]">
      a {title}.
    </p>
  );

  const journey = (
    <p className="hero-muted text-base md:text-lg lg:text-xl">
      Here you&apos;ll learn about my journey as a
    </p>
  );

  const typing = (
    <p className="hero-typing min-h-[2.5rem] text-xl md:min-h-[3rem] md:text-2xl lg:text-3xl">
      <TypingText phrases={typingPhrases} />
    </p>
  );

  const location = (
    <p className="hero-location text-sm md:text-base">{educationLine}</p>
  );

  const cta = (
    <div className="pt-4 md:pt-6">
      <a href="#projects" className="hero-cta">
        Explore My Journey
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );

  const content = (
    <div className="space-y-3 md:space-y-4">
      {headline}
      {subtitle}
      {journey}
      {typing}
      {location}
      {cta}
    </div>
  );

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-28"
    >
      <div className="hero-streaks pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center md:px-6">
        {mode === "full" ? (
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3 md:space-y-4"
          >
            <m.div variants={fadeInUp}>{headline}</m.div>
            <m.div variants={fadeInUp}>{subtitle}</m.div>
            <m.div variants={fadeInUp}>{journey}</m.div>
            <m.div variants={fadeInUp}>{typing}</m.div>
            <m.div variants={fadeInUp}>{location}</m.div>
            <m.div variants={fadeInUp}>{cta}</m.div>
          </m.div>
        ) : (
          content
        )}
      </div>

      <a
        href="#projects"
        className="absolute bottom-8 text-muted hover:text-primary"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="h-6 w-6 animate-scroll-down" />
      </a>
    </section>
  );
}
