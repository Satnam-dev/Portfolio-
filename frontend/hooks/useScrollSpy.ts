"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeScroll } from "@/lib/scrollManager";

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const sectionsRef = useRef<Array<{ id: string; top: number }>>([]);
  const activeRef = useRef(activeSection);
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const measure = () => {
      const ids = idsRef.current;
      sectionsRef.current = ids
        .map((href) => {
          const id = href.replace("#", "");
          const el = document.getElementById(id);
          return el ? { id: href, top: el.offsetTop } : null;
        })
        .filter((item): item is { id: string; top: number } => item !== null)
        .sort((a, b) => a.top - b.top);
    };

    const update = () => {
      const scrollPos = window.scrollY + offset;
      const sections = sectionsRef.current;
      let next = sections[0]?.id || idsRef.current[0] || "";

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].top <= scrollPos) {
          next = sections[i].id;
          break;
        }
      }

      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveSection(next);
      }
    };

    measure();
    update();

    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener("resize", onResize, { passive: true });
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
            update();
          })
        : null;

    idsRef.current.forEach((href) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) resizeObserver?.observe(el);
    });

    const unsubscribe = subscribeScroll(update);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
    };
  }, [offset]);

  return activeSection;
}
