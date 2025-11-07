export function FloatingTechBadges() {
  const badges = [
    { text: "Rust/WASM", position: "top-12 right-12", delay: "0s" },
    { text: "WebGPU", position: "top-32 right-32", delay: "0.5s" },
    { text: "JAX", position: "top-52 right-16", delay: "1s" },
    { text: "PyTorch", position: "top-72 right-28", delay: "1.5s" },
    { text: "TypeScript", position: "bottom-32 right-20", delay: "2s" },
    { text: "Notion API", position: "bottom-52 right-36", delay: "2.5s" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {badges.map((badge, idx) => (
        <div
          key={idx}
          className={`absolute ${badge.position} px-3 py-1 rounded-full bg-gradient-to-r from-violet-600/30 to-crimson-600/30 border border-violet-500/40 backdrop-blur-sm text-xs text-violet-300 animate-float`}
          style={{
            animationDelay: badge.delay,
            animationDuration: "6s",
          }}
        >
          {badge.text}
        </div>
      ))}
    </div>
  );
}
