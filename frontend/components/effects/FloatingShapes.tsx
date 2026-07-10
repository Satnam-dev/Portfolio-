"use client";

export function FloatingShapes() {
  const shapes = [
    { size: 80, top: "15%", left: "10%", delay: "0s", color: "primary" },
    { size: 60, top: "60%", left: "85%", delay: "1s", color: "accent" },
    { size: 100, top: "75%", left: "15%", delay: "2s", color: "primary" },
    { size: 50, top: "30%", left: "75%", delay: "0.5s", color: "accent" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="animate-float absolute rounded-full opacity-20 blur-xl"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            animationDelay: shape.delay,
            background:
              shape.color === "primary"
                ? "var(--primary)"
                : "var(--accent)",
          }}
        />
      ))}
    </div>
  );
}
