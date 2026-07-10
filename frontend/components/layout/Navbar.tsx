"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import type { PortfolioInfo } from "@/types";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { SocialCornerLinks } from "@/components/shared/SocialCornerLinks";
import { cn } from "@/lib/utils";

interface NavbarProps {
  portfolio?: PortfolioInfo | null;
}

interface MobileMenuProps extends NavbarProps {
  activeSection: string;
}

export function MobileMenu({ portfolio, activeSection }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface perf-surface lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 lg:hidden"
          >
            <nav className="mx-4 mt-24 rounded-2xl border border-border bg-surface p-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    activeSection === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex justify-center border-t border-border pt-4">
                <SocialCornerLinks portfolio={portfolio} iconSize="sm" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Navbar({ portfolio }: NavbarProps) {
  const activeSection = useScrollSpy(NAV_LINKS.map((l) => l.href));

  return (
    <>
      <div className="fixed left-4 top-4 z-50 md:left-6 md:top-6">
        <Link
          href="#home"
          aria-label="Go to home"
          className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-surface perf-surface shadow-lg transition-transform hover:scale-105 md:h-12 md:w-12"
        >
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            SK
          </span>
        </Link>
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-16 md:top-6 md:px-24 lg:px-32">
        <nav className="pointer-events-auto hidden items-center gap-0.5 rounded-full border border-border/70 bg-surface perf-surface px-2 py-1.5 shadow-lg lg:flex">
          <Link
            href="#home"
            className="rounded-full px-3 py-1.5 text-xs font-bold tracking-wide text-primary transition-colors hover:bg-primary/10"
          >
            SK
          </Link>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                activeSection === link.href
                  ? "bg-primary/15 text-primary"
                  : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle />
        </nav>
      </header>

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 md:right-6 md:top-6">
        <SocialCornerLinks portfolio={portfolio} className="hidden sm:flex" />
        <div className="lg:hidden">
          <ThemeToggle />
        </div>
        <div className="lg:hidden">
          <MobileMenu portfolio={portfolio} activeSection={activeSection} />
        </div>
      </div>
    </>
  );
}
