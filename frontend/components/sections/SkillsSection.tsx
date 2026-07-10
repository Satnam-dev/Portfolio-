"use client";

import {
  Code2,
  Database,
  Globe,
  Wrench,
} from "lucide-react";
import { FALLBACK_SKILLS } from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface SkillsSectionProps {
  portfolio?: PortfolioInfo | null;
}

const categoryMeta = [
  { key: "programming" as const, label: "Programming", icon: Code2, hint: "Core languages" },
  { key: "web" as const, label: "Web", icon: Globe, hint: "Frontend & backend" },
  { key: "database" as const, label: "Database", icon: Database, hint: "Data layer" },
  { key: "tools" as const, label: "Tools", icon: Wrench, hint: "Workflow" },
];

export function SkillsSection({ portfolio }: SkillsSectionProps) {
  const skills = portfolio?.skills || FALLBACK_SKILLS;
  const allSkills = Object.entries(skills).flatMap(([category, items]) =>
    items.map((name) => ({ name, category }))
  );

  return (
    <section id="skills" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="Expertise"
          title="Skills"
          description="Technologies I've worked with"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allSkills.map(({ name, category }) => {
            const meta = categoryMeta.find((c) => c.key === category);
            const Icon = meta?.icon || Code2;

            return (
              <div
                key={`${category}-${name}`}
                className="panel-card flex items-start gap-4 p-5 transition-colors hover:border-primary/30 md:hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {meta?.hint || category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
