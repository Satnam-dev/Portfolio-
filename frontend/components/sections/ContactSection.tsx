"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeInUp } from "@/animations/variants";
import { ContactIllustration } from "@/components/effects/ContactIllustration";

interface ContactSectionProps {
  portfolio?: PortfolioInfo | null;
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const recipient = portfolio?.socialLinks?.email || SITE.email;
    if (recipient) {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      return;
    }
    window.open(
      `${SITE.github}?tab=projects`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="contact" className="section-shell">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          label="Get in Touch"
          title="Contact Me"
          description="Open to opportunities, collaborations, and learning experiences"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="panel-card space-y-4 p-6 md:p-8"
          >
            <h3 className="text-lg font-semibold">
              Let&apos;s connect and build something great!
            </h3>

            <div>
              <label className="mb-1.5 block text-sm text-muted">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-muted">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project or opportunity..."
                rows={4}
                required
                className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50"
              />
            </div>

            <Button type="submit" className="w-full rounded-full">
              <Send className="h-4 w-4" />
              Send Message
            </Button>

            {!portfolio?.socialLinks?.email && !SITE.email && (
              <p className="text-center text-xs text-muted">
                Messages are routed via GitHub while email is not configured.
              </p>
            )}
          </motion.form>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative hidden md:block"
          >
            <ContactIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
