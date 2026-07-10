"use client";

import { m } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  GraduationCap,
  Target,
  Wrench,
} from "lucide-react";
import {
  FALLBACK_ABOUT,
  FALLBACK_SKILLS,
  FALLBACK_SOFT_SKILLS,
  FOCUS_AREAS,
  SITE,
} from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/animations/variants";

interface AboutSectionProps {
  portfolio?: PortfolioInfo | null;
}

const skillCategories = [
  { key: "programming" as const, label: "Programming Languages", icon: Code2 },
  { key: "web" as const, label: "Web Technologies", icon: Globe },
  { key: "database" as const, label: "Database", icon: Database },
  { key: "tools" as const, label: "Tools", icon: Wrench },
];

export function AboutSection({ portfolio }: AboutSectionProps) {
  const about = portfolio?.about || FALLBACK_ABOUT;
  const skills = portfolio?.skills || FALLBACK_SKILLS;
  const softSkills = portfolio?.softSkills || FALLBACK_SOFT_SKILLS;
  const stats = portfolio?.stats || {
    projectsCount: 2,
    skillsCount: 12,
    certificationsCount: 2,
  };

  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="About"
          title="About My Journey"
          description="A dedicated computer science student passionate about software development"
        />

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="panel-card mx-auto max-w-4xl p-6 md:p-10"
        >
          <m.div variants={fadeInUp} className="space-y-5">
            <h3 className="text-xl font-bold md:text-2xl">Professional Summary</h3>
            <p className="leading-relaxed text-muted">{about}</p>
          </m.div>

          <m.div
            variants={fadeInUp}
            className="mt-8 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-border/60 bg-background/30 p-5">
              <div className="mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Education</h4>
              </div>
              <p className="font-medium">
                {portfolio?.education.degree ||
                  "B.Tech in Computer Science Engineering"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {portfolio?.education.institution || SITE.university}
              </p>
              <p className="mt-1 text-sm text-muted">
                {portfolio?.education.status || "Currently in 4th Year"}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/30 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                <h4 className="font-semibold">Current Focus</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs text-accent"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </m.div>

          <m.div
            variants={fadeInUp}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-8"
          >
            <AnimatedCounter value={stats.projectsCount} label="Projects" />
            <AnimatedCounter value={stats.skillsCount} suffix="+" label="Skills" />
            <AnimatedCounter
              value={stats.certificationsCount}
              label="Certifications"
            />
          </m.div>

          <m.div
            variants={fadeInUp}
            className="mt-8 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2"
          >
            {skillCategories.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl border border-border/60 bg-background/20 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold">{label}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills[key].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </m.div>

          <m.div variants={fadeInUp} className="mt-8 border-t border-border/60 pt-8">
            <h4 className="mb-3 font-semibold">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
