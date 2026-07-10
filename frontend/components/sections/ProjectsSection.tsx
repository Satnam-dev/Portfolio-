"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <article
      ref={ref}
      className="group panel-card overflow-hidden transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30"
    >
      <div className="border-b border-border/60 p-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 p-6 pt-0">
        <div className="image-glow-border project-tilt relative mx-auto aspect-video max-w-full overflow-hidden rounded-xl bg-background/40">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={70}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveDemoUrl && (
            <Button variant="default" size="sm" asChild>
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects: initialProjects }: ProjectsSectionProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const allTechs = [
    "All",
    ...Array.from(new Set(initialProjects.flatMap((p) => p.technologies))),
  ];

  const filtered = initialProjects.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || p.technologies.includes(filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="projects" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="Portfolio"
          title="Projects"
          description="Practical applications built with modern technologies"
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-[border-color,background-color,color] duration-200",
                  filter === tech
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted hover:border-primary/50"
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted">No projects found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((project, i) => (
              <m.div
                key={project._id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
