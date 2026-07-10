"use client";

import { m } from "framer-motion";
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

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => {
            const hasImages = Boolean(exp.images && exp.images.length > 0);
            const isAiLaunchpad = exp.title.toLowerCase().includes("ai launchpad");

            return (
              <m.div
                key={exp._id}
                variants={fadeInUp}
                className={`relative mb-12 flex flex-col gap-4 md:flex-row md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    hasImages
                      ? index % 2 === 0
                        ? "order-2 flex md:order-none md:items-start md:justify-end md:pr-12"
                        : "order-2 flex md:order-none md:items-start md:justify-start md:pl-12"
                      : "hidden md:block"
                  }`}
                >
                  {hasImages && (
                    <div
                      className={`w-full max-w-sm ${
                        isAiLaunchpad ? "md:max-w-[26rem]" : "md:max-w-[18.5rem]"
                      } ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}
                    >
                      <div className="flex flex-col gap-2.5">
                        {isAiLaunchpad ? (
                          /* AI Launchpad: code photo large on top, others larger below */
                          <>
                            <div className="group/photo overflow-hidden rounded-2xl border border-primary/35 bg-[#0b1220] shadow-[0_0_10px_color-mix(in_srgb,var(--primary)_22%,transparent),0_0_22px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-primary/55 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_36%,transparent),0_0_30px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
                              <Image
                                src={
                                  exp.images!.find((img) =>
                                    img.toLowerCase().includes("code")
                                  ) || exp.images![0]
                                }
                                alt={`${exp.title} - Python code`}
                                width={960}
                                height={600}
                                className="h-auto w-full"
                                sizes="(max-width: 768px) 90vw, 416px"
                                quality={85}
                              />
                            </div>
                            <div className="grid grid-cols-2 items-start gap-2.5">
                              {exp.images!
                                .filter((img) => !img.toLowerCase().includes("code"))
                                .map((image, imageIndex) => (
                                  <div
                                    key={image}
                                    className={`group/photo overflow-hidden rounded-xl border border-primary/35 bg-surface shadow-[0_0_10px_color-mix(in_srgb,var(--primary)_22%,transparent),0_0_22px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/55 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_36%,transparent),0_0_30px_color-mix(in_srgb,var(--accent)_22%,transparent)] ${
                                      imageIndex === 2 ? "col-span-2 mx-auto w-[70%]" : ""
                                    }`}
                                  >
                                    <Image
                                      src={image}
                                      alt={`${exp.title} - photo ${imageIndex + 1}`}
                                      width={600}
                                      height={600}
                                      className="h-auto w-full"
                                      sizes="(max-width: 768px) 45vw, 200px"
                                      quality={85}
                                    />
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : exp.images!.length >= 4 ? (
                          /* 4 photos: balanced 2×2 grid */
                          <div className="grid grid-cols-2 items-start gap-2.5">
                            {exp.images!.map((image, imageIndex) => (
                              <div
                                key={image}
                                className="group/photo overflow-hidden rounded-xl border border-primary/35 bg-surface shadow-[0_0_10px_color-mix(in_srgb,var(--primary)_22%,transparent),0_0_22px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/55 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_36%,transparent),0_0_30px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
                              >
                                <Image
                                  src={image}
                                  alt={`${exp.title} - photo ${imageIndex + 1}`}
                                  width={600}
                                  height={600}
                                  className="h-auto w-full"
                                  sizes={
                                    isAiLaunchpad
                                      ? "(max-width: 768px) 45vw, 160px"
                                      : "(max-width: 768px) 45vw, 140px"
                                  }
                                  quality={85}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {/* Main photo — full width, uncropped */}
                            <div className="group/photo overflow-hidden rounded-2xl border border-primary/35 bg-surface shadow-[0_0_10px_color-mix(in_srgb,var(--primary)_22%,transparent),0_0_22px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.015] hover:border-primary/55 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_36%,transparent),0_0_30px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
                              <Image
                                src={exp.images![0]}
                                alt={`${exp.title} - photo 1`}
                                width={960}
                                height={600}
                                className="h-auto w-full"
                                sizes={
                                  isAiLaunchpad
                                    ? "(max-width: 768px) 90vw, 336px"
                                    : "(max-width: 768px) 90vw, 296px"
                                }
                                quality={85}
                              />
                            </div>

                            {/* Secondary row — equal columns, uncropped */}
                            {exp.images!.length > 1 && (
                              <div className="grid grid-cols-2 items-start gap-2.5">
                                {exp.images!.slice(1).map((image, imageIndex) => (
                                  <div
                                    key={image}
                                    className="group/photo overflow-hidden rounded-xl border border-primary/35 bg-surface shadow-[0_0_10px_color-mix(in_srgb,var(--primary)_22%,transparent),0_0_22px_color-mix(in_srgb,var(--accent)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/55 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_36%,transparent),0_0_30px_color-mix(in_srgb,var(--accent)_22%,transparent)]"
                                  >
                                    <Image
                                      src={image}
                                      alt={`${exp.title} - photo ${imageIndex + 2}`}
                                      width={600}
                                      height={600}
                                      className="h-auto w-full"
                                      sizes={
                                        isAiLaunchpad
                                          ? "(max-width: 768px) 45vw, 160px"
                                          : "(max-width: 768px) 45vw, 140px"
                                      }
                                      quality={85}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="panel-card group relative rounded-2xl p-6 transition-[border-color] duration-300 hover:border-primary/40">
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
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
