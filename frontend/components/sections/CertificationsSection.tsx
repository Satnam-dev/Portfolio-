"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import { BookOpen, Building2, Calendar, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Certification } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/animations/variants";

interface CertificationsSectionProps {
  certifications: Certification[];
}

const formatCertDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function CertMetaItem({
  icon: Icon,
  children,
}: {
  icon: ElementType;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-xs text-muted">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}

export function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  return (
    <section id="certifications" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="Achievements"
          title="Certifications"
          description="Professional certifications and achievements"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <motion.article
              key={cert._id}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="panel-card group flex flex-col overflow-hidden transition-colors hover:border-primary/30"
            >
              <div className="image-glow-border relative m-4 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={cert.imageUrl}
                  alt={cert.name}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                  {cert.issuer}
                </p>
                <h3 className="mt-2 text-base font-bold leading-snug">
                  {cert.name}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">
                  {cert.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {cert.course && (
                    <CertMetaItem icon={BookOpen}>
                      Course: {cert.course}
                    </CertMetaItem>
                  )}
                  {cert.startDate && cert.endDate && (
                    <CertMetaItem icon={Calendar}>
                      {formatCertDate(cert.startDate)} –{" "}
                      {formatCertDate(cert.endDate)}
                    </CertMetaItem>
                  )}
                  {cert.partner && (
                    <CertMetaItem icon={Building2}>
                      {cert.partner}
                    </CertMetaItem>
                  )}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button variant="default" size="sm" asChild>
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={cert.downloadUrl} download>
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
