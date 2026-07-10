import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
            SK
          </div>
          <h3 className="text-lg font-bold">Satnam Kumar</h3>
          <p className="mt-2 text-sm text-muted">
            Python Developer | Cloud & Cybersecurity Learner
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Connect
          </h4>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-border/70 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Satnam Kumar. Built with Next.js & Express.
      </div>
    </footer>
  );
}
