import { Code, Cpu, Zap, Database } from "lucide-react";

export function TechnicalSpecs() {
  const specs = [
    {
      icon: Cpu,
      title: "Cellular Automata Grid Engine",
      subtitle: "Rust → WASM | WebGPU Compute",
      stats: [
        { label: "Performance", value: "2M cells @ 60fps" },
        { label: "Latency", value: "<5ms/step" },
        { label: "Memory", value: "<50MB footprint" },
        { label: "Architecture", value: "Dual-buffer ring" },
      ],
      details: [
        "GPU-aligned memory layout (64-byte cells)",
        "Lock-free atomic buffer swapping",
        "Zero-copy CPU↔GPU via SharedArrayBuffer",
        "Spatial hash for O(1) neighbor lookup",
        "SIMD-accelerated CPU fallback path",
      ],
    },
    {
      icon: Database,
      title: "Knowledge Management Pipeline",
      subtitle: "Enterprise ETL Architecture",
      stats: [
        { label: "Sources", value: "20+ APIs" },
        { label: "Capacity", value: "100k resources" },
        { label: "Databases", value: "5 core tables" },
        { label: "Relations", value: "Auto-detected" },
      ],
      details: [
        "Notion API orchestration with rate limiting",
        "Graph-based connection detection algorithms",
        "Topic taxonomy with hierarchical classification",
        "Real-time trend analysis pipeline",
        "Incremental update system with conflict resolution",
      ],
    },
    {
      icon: Code,
      title: "GitHub Analysis Engine",
      subtitle: "200k+ Repository Analytics",
      stats: [
        { label: "Records", value: "200k repos" },
        { label: "Languages", value: "12 tracked" },
        { label: "Metrics", value: "15+ features" },
        { label: "Visualizations", value: "3D + 2D" },
      ],
      details: [
        "Pandas/NumPy data pipeline with chunking",
        "Statistical correlation analysis (Pearson/Spearman)",
        "Interactive React dashboard with lazy loading",
        "Plotly 3D scatter with WebGL acceleration",
        "CI/CD via Netlify with automated testing",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {specs.map((spec, idx) => {
        const Icon = spec.icon;
        return (
          <div
            key={idx}
            className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 hover:shadow-[0_0_50px_rgba(139,0,255,0.2)] transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/20 to-crimson-600/20 border border-violet-500/30">
                <Icon className="w-8 h-8 text-violet-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
                  {spec.title}
                </h3>
                <p className="text-violet-300/70 mb-6">{spec.subtitle}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {spec.stats.map((stat, statIdx) => (
                    <div
                      key={statIdx}
                      className="p-3 rounded-lg bg-violet-950/50 border border-violet-500/20"
                    >
                      <div className="text-xs text-violet-300/60 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-violet-200">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {spec.details.map((detail, detailIdx) => (
                    <div
                      key={detailIdx}
                      className="flex items-start gap-3 text-sm text-violet-300/80"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-crimson-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
