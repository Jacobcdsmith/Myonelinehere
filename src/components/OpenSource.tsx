import { Github, Star, GitFork, Code2 } from "lucide-react";

export function OpenSource() {
  const repos = [
    {
      name: "CONSIM",
      description:
        "Emergent consciousness simulator with GPU-accelerated signal analysis. Phase coherence and mutual information tracking via JAX/PyTorch.",
      language: "Python",
      stats: { stars: "—", forks: "—", issues: "Active" },
      topics: ["consciousness", "signal-processing", "jax", "pytorch", "gpu"],
      url: "https://github.com/Jacobcdsmith/CONSIM",
      highlights: [
        "20× speedup via GPU parallelization",
        "Real-time phase coherence Φ(x) computation",
        "Numba JIT for CPU fallback",
        "Modular architecture for experimentation",
      ],
    },
    {
      name: "GitHub-Language-Capstone",
      description:
        "Enterprise-grade analysis of 200k+ repositories across 12 programming languages. Interactive dashboard with 3D visualizations.",
      language: "Python/TypeScript",
      stats: { stars: "—", forks: "—", issues: "Complete" },
      topics: ["data-analysis", "jupyter", "react", "plotly", "netlify"],
      url: "https://github.com/Jacobcdsmith/GitHub-Language-Capstone",
      highlights: [
        "200k+ repository dataset",
        "Statistical correlation analysis",
        "React + Tailwind dashboard",
        "Jupyter notebooks with visualizations",
      ],
    },
    {
      name: "cellular-automata-engine",
      description:
        "High-performance Rust/WASM cellular automata with WebGPU compute shaders. 60fps at 2M+ cells with rule engine.",
      language: "Rust",
      stats: { stars: "—", forks: "—", issues: "In Development" },
      topics: ["rust", "wasm", "webgpu", "cellular-automata", "systems"],
      url: "#", // Placeholder
      highlights: [
        "Dual-buffer architecture (3-frame ring)",
        "Lock-free atomic swapping",
        "JSON → compiled rule engine",
        "O(1) spatial hash neighbor lookup",
      ],
    },
    {
      name: "mcf-framework",
      description:
        "Mean curvature flow on arbitrary manifolds with quantum (VQE) and neural (SIREN) backends. Real-time WebGPU visualization.",
      language: "Python/Rust",
      stats: { stars: "—", forks: "—", issues: "Research" },
      topics: [
        "differential-geometry",
        "quantum-computing",
        "neural-networks",
        "webgpu",
      ],
      url: "#", // Placeholder
      highlights: [
        "Variational quantum eigensolver integration",
        "Implicit neural representations (SIREN)",
        "Federated learning protocol",
        "Multi-backend (GPU/CPU/Quantum)",
      ],
    },
  ];

  const contributions = [
    {
      project: "DataCamp Community",
      role: "Course Contributor",
      description:
        "Created tutorial content for Python data analysis workflows, peer-reviewed by 500+ learners.",
    },
    {
      project: "Notion API Examples",
      role: "Documentation Contributor",
      description:
        "Contributed code samples for complex database queries and rate limiting patterns.",
    },
    {
      project: "JAX Tutorials",
      role: "Tutorial Author",
      description:
        "Wrote beginner-friendly guides for GPU acceleration with practical signal processing examples.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
          Open Source Projects
        </h2>
        <p className="text-violet-300/70 max-w-2xl mx-auto">
          Building in public: systems programming, data infrastructure, and
          research implementations with transparent documentation.
        </p>
      </div>

      <div className="space-y-6">
        {repos.map((repo, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 hover:shadow-[0_0_50px_rgba(139,0,255,0.2)] transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/20 to-crimson-600/20 border border-violet-500/30">
                <Github className="w-8 h-8 text-violet-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-violet-300/80 mb-3">
                      {repo.description}
                    </p>
                  </div>
                  {repo.url !== "#" && (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 transition-all"
                    >
                      <Code2 className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-xs text-violet-300/70">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{repo.stats.stars} stars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.stats.forks} forks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span>{repo.language}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-violet-600/20 border border-violet-500/30">
                    {repo.stats.issues}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic, topicIdx) => (
                    <span
                      key={topicIdx}
                      className="px-2 py-1 rounded bg-violet-950/50 border border-violet-500/20 text-xs text-violet-300/80"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-2">
                  {repo.highlights.map((highlight, highlightIdx) => (
                    <div
                      key={highlightIdx}
                      className="text-xs text-violet-300/70 flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
          Community Contributions
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {contributions.map((contribution, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-violet-950/50 border border-violet-500/20"
            >
              <h4 className="text-violet-200 mb-2">{contribution.project}</h4>
              <p className="text-xs text-violet-300/60 mb-3">
                {contribution.role}
              </p>
              <p className="text-sm text-violet-300/80">
                {contribution.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
          Development Principles
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm text-violet-300/80">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">
                  Document everything:
                </strong>{" "}
                README, ADRs, inline comments for future maintainers
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-crimson-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">Test rigorously:</strong>{" "}
                Unit tests, integration tests, property-based fuzzing
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-fuchsia-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">Version carefully:</strong>{" "}
                SemVer, changelogs, migration guides for breaking changes
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm text-violet-300/80">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">License clearly:</strong>{" "}
                MIT/Apache-2.0 for libraries, GPL for applications
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-crimson-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">CI/CD always:</strong>{" "}
                GitHub Actions, automated tests, build artifacts
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-fuchsia-400 flex-shrink-0" />
              <span>
                <strong className="text-violet-200">Community first:</strong>{" "}
                Responsive to issues, welcoming PRs, code of conduct
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
