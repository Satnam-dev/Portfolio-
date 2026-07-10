type ScrollCallback = () => void;

const callbacks = new Set<ScrollCallback>();
let ticking = false;
let initialized = false;

function flush() {
  ticking = false;
  callbacks.forEach((cb) => cb());
}

function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(flush);
  }
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

export function subscribeScroll(callback: ScrollCallback): () => void {
  init();
  callbacks.add(callback);
  callback();
  return () => {
    callbacks.delete(callback);
  };
}
