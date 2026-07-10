"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { Experience } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/animations/variants";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="Experience"
          title="My Journey"
          description="Professional training and learning experiences"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              variants={fadeInUp}
              className={`relative mb-12 flex gap-8 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden w-1/2 md:block" />

              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="panel-card group relative rounded-2xl p-6 transition-all hover:border-primary/40">
                  <div
                    className={`absolute top-6 flex h-4 w-4 items-center justify-center md:top-8 ${
                      index % 2 === 0
                        ? "md:-right-[calc(2rem+0.5rem)]"
                        : "md:-left-[calc(2rem+0.5rem)]"
                    } left-4 md:left-auto`}
                  >
                    <span
                      className={`absolute h-4 w-4 rounded-full max-md:hidden ${
                        exp.status === "current"
                          ? "motion-safe:animate-ping bg-primary/40"
                          : ""
                      }`}
                    />
                    <span
                      className={`relative h-3 w-3 rounded-full border-2 border-background ${
                        exp.status === "current" ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-2 md:justify-end">
                    {exp.status === "current" && (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                        Current
                      </Badge>
                    )}
                    {exp.currentLevel && (
                      <Badge variant="secondary">{exp.currentLevel}</Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  {exp.organization && (
                    <p className="mt-1 text-sm text-muted">{exp.organization}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>

                  {exp.images && exp.images.length > 0 && (
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {exp.images.map((image, imageIndex) => (
                        <div
                          key={image}
                          className={`image-glow-border relative overflow-hidden rounded-xl ${
                            imageIndex === 0 ? "sm:col-span-3 aspect-[16/9]" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${exp.title} - photo ${imageIndex + 1}`}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes={
                              imageIndex === 0
                                ? "(max-width: 768px) 100vw, 600px"
                                : "(max-width: 768px) 100vw, 200px"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {exp.learning.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Learning
                      </div>
                      <ul
                        className={`space-y-1.5 ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        {exp.learning.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-muted md:justify-end"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
