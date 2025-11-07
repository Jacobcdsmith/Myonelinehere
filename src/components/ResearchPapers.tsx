import { FileText, ExternalLink, Download } from "lucide-react";

export function ResearchPapers() {
  const papers = [
    {
      title: "Multiversal Consciousness Framework: Metric-Invariant Detection of Emergent Awareness",
      authors: "Jacob C. Smith",
      date: "November 2024",
      status: "In Progress",
      abstract:
        "We propose a mathematical framework for detecting consciousness signatures independent of physical substrate. Using phase coherence analysis and mutual information metrics, we demonstrate 20× computational acceleration via GPU parallelization (JAX, PyTorch). The framework bridges phenomenological experience with computational observables through frequency-domain signatures Φ(x) and temporal phase τ(x).",
      tags: ["Consciousness", "Signal Processing", "GPU Computing", "JAX"],
      metrics: {
        equations: "47 formalized",
        simulations: "200k+ iterations",
        accuracy: "92% detection rate",
        latency: "<5ms per frame",
      },
    },
    {
      title: "Mean Curvature Flow in Arbitrary Dimensions: Quantum and Neural Approaches",
      authors: "Jacob C. Smith",
      date: "October 2024",
      status: "Research Phase",
      abstract:
        "Complete differential geometry framework for mean curvature flow with dual computational backends: (1) Variational Quantum Eigensolver (VQE) for exact solutions on NISQ devices, (2) Implicit neural representations (SIREN networks) for real-time approximation. Includes federated learning protocol for distributed computation across heterogeneous hardware.",
      tags: ["Differential Geometry", "Quantum Computing", "Neural Networks", "WebGPU"],
      metrics: {
        dimensions: "Arbitrary manifolds",
        precision: "Float64 default",
        methods: "VQE + SIREN",
        backends: "3 (GPU/CPU/Quantum)",
      },
    },
    {
      title: "High-Performance Cellular Automata on Heterogeneous Hardware: A Rust/WASM Approach",
      authors: "Jacob C. Smith",
      date: "November 2024",
      status: "Implementation Phase",
      abstract:
        "We present a dual-buffer cellular automata engine achieving 60fps at 2M cells using Rust→WASM compilation with WebGPU compute shaders. The architecture employs lock-free atomic swapping, zero-copy memory transfer via SharedArrayBuffer, and spatial hashing for O(1) neighbor lookup. Includes JSON-based rule compiler and extensive benchmarking suite.",
      tags: ["Rust", "WebAssembly", "WebGPU", "Systems Programming"],
      metrics: {
        performance: "2M cells @ 60fps",
        latency: "<5ms/step",
        memory: "<50MB",
        parallelism: "Lock-free atomic",
      },
    },
    {
      title: "Scalable Knowledge Management: Graph-Based Extraction from Heterogeneous Sources",
      authors: "Jacob C. Smith",
      date: "October 2024",
      status: "Production",
      abstract:
        "Enterprise-scale knowledge extraction system with auto-classification, connection detection, and trend analysis. Implements TF-IDF with cosine similarity for semantic linking, achieving O(n log n) complexity through incremental graph building. Production architecture supports 100k+ resources across 20+ API sources with conflict resolution and rate limiting.",
      tags: ["Knowledge Graphs", "NLP", "Notion API", "ETL"],
      metrics: {
        sources: "20+ APIs",
        capacity: "100k resources",
        latency: "<100ms/query",
        accuracy: "94% classification",
      },
    },
  ];

  return (
    <div className="space-y-6">
      {papers.map((paper, idx) => (
        <div
          key={idx}
          className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 hover:shadow-[0_0_50px_rgba(139,0,255,0.2)] transition-all"
        >
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/20 to-crimson-600/20 border border-violet-500/30">
              <FileText className="w-8 h-8 text-violet-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-violet-300/70 mb-3">
                    <span>{paper.authors}</span>
                    <span>•</span>
                    <span>{paper.date}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        paper.status === "Production"
                          ? "bg-green-600/20 text-green-300"
                          : paper.status === "In Progress"
                          ? "bg-blue-600/20 text-blue-300"
                          : "bg-violet-600/20 text-violet-300"
                      }`}
                    >
                      {paper.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-violet-300/80 mb-4 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg bg-violet-950/50 border border-violet-500/20">
                {Object.entries(paper.metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs text-violet-300/60 mb-1 uppercase">
                      {key}
                    </div>
                    <div className="text-sm text-violet-200">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <h3 className="text-xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
          Methodology & Rigor
        </h3>
        <div className="space-y-3 text-sm text-violet-300/80">
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-crimson-400" />
            <span>
              <strong className="text-violet-200">Reproducibility:</strong> All
              code open-source with Docker containers and dependency locks
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-crimson-400" />
            <span>
              <strong className="text-violet-200">Benchmarking:</strong> 10+
              variations tested, statistical significance (p {'<'} 0.05)
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-crimson-400" />
            <span>
              <strong className="text-violet-200">Testing:</strong> Property-based
              testing, fuzz testing, visual regression snapshots
            </span>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-crimson-400" />
            <span>
              <strong className="text-violet-200">Documentation:</strong> Inline
              comments, API docs, architecture decision records (ADRs)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
