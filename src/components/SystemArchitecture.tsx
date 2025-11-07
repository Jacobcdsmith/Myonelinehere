import { Layers, Server, Workflow, GitBranch } from "lucide-react";

export function SystemArchitecture() {
  return (
    <div className="space-y-8">
      {/* Cellular Automata Architecture */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <div className="flex items-center gap-4 mb-6">
          <Layers className="w-8 h-8 text-violet-400" />
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text">
            Cellular Automata Grid Engine Architecture
          </h3>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                layer: "Frontend (TypeScript)",
                components: [
                  "React UI with Canvas rendering",
                  "WebGL2/WebGPU detection",
                  "SharedArrayBuffer setup",
                  "Web Worker orchestration",
                  "Event-driven injection API",
                ],
              },
              {
                layer: "WASM Core (Rust)",
                components: [
                  "Cell state machine (64-byte)",
                  "Dual-buffer ring (3-frame)",
                  "Rule engine (JSON → compiled)",
                  "Spatial hash (O(1) lookup)",
                  "Memory pool allocator",
                ],
              },
              {
                layer: "Compute (WebGPU/GLSL)",
                components: [
                  "Compute shaders (@workgroup 16×16)",
                  "Neighbor kernel (Moore/Von Neumann)",
                  "Physics simulation (pressure/waves)",
                  "GPU → CPU readback",
                  "WebGL2 fallback path",
                ],
              },
            ].map((layer, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-violet-950/50 border border-violet-500/20"
              >
                <h4 className="text-violet-200 mb-3">{layer.layer}</h4>
                <ul className="space-y-2">
                  {layer.components.map((component, compIdx) => (
                    <li
                      key={compIdx}
                      className="text-xs text-violet-300/70 flex items-start gap-2"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-lg bg-[#0a0015]/50 border border-violet-500/20">
            <h4 className="text-violet-200 mb-4">Data Flow Pipeline</h4>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[
                "User Input",
                "→",
                "React Handler",
                "→",
                "WASM inject_energy()",
                "→",
                "Write Buffer",
                "→",
                "GPU Compute Shader",
                "→",
                "Read Buffer",
                "→",
                "Atomic Swap",
                "→",
                "Canvas Render",
              ].map((step, idx) => (
                <span
                  key={idx}
                  className={
                    step === "→"
                      ? "text-violet-400"
                      : "px-3 py-1 rounded bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300 whitespace-nowrap"
                  }
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Management Architecture */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <div className="flex items-center gap-4 mb-6">
          <Server className="w-8 h-8 text-crimson-400" />
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-crimson-400 to-fuchsia-400 bg-clip-text">
            Knowledge Management ETL Pipeline
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-violet-200">Source Layer (20+ APIs)</h4>
            <div className="space-y-2">
              {[
                "HackerNews API (real-time polling)",
                "arXiv RSS feeds (daily digest)",
                "GitHub GraphQL (repo metadata)",
                "Medium API (article extraction)",
                "Twitter API v2 (filtered stream)",
                "Reddit API (subreddit monitoring)",
                "Notion API (bidirectional sync)",
              ].map((source, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-violet-950/50 border border-violet-500/20 text-xs text-violet-300/80"
                >
                  {source}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-violet-200">Processing Layer</h4>
            <div className="space-y-2">
              {[
                {
                  name: "Master Resource Index",
                  desc: "Primary key, deduplication",
                },
                {
                  name: "Source Tracker",
                  desc: "Rate limiting, retry logic",
                },
                {
                  name: "Topic Taxonomy",
                  desc: "Hierarchical classification",
                },
                {
                  name: "Connection Graph",
                  desc: "TF-IDF cosine similarity",
                },
                {
                  name: "Update Pipeline",
                  desc: "Conflict resolution, versioning",
                },
              ].map((db, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-violet-950/50 border border-violet-500/20"
                >
                  <div className="text-sm text-violet-200 mb-1">{db.name}</div>
                  <div className="text-xs text-violet-300/70">{db.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MCF Framework Architecture */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <div className="flex items-center gap-4 mb-6">
          <Workflow className="w-8 h-8 text-fuchsia-400" />
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text">
            Mean Curvature Flow: Computational Backends
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              backend: "Quantum (VQE)",
              specs: [
                "NISQ-ready algorithms",
                "Parameterized quantum circuits",
                "Classical optimizer (COBYLA)",
                "Qiskit/Cirq integration",
                "Noise mitigation techniques",
              ],
            },
            {
              backend: "Neural (SIREN)",
              specs: [
                "Implicit neural representation",
                "Periodic activation functions",
                "Coordinate-based MLP",
                "Level set method integration",
                "Real-time gradient computation",
              ],
            },
            {
              backend: "Classical (WebGPU)",
              specs: [
                "Finite difference methods",
                "Sparse matrix operations",
                "Multigrid solvers",
                "Adaptive time stepping",
                "CPU fallback (Eigen/BLAS)",
              ],
            },
          ].map((backend, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-violet-950/50 border border-violet-500/20"
            >
              <h4 className="text-violet-200 mb-3">{backend.backend}</h4>
              <ul className="space-y-2">
                {backend.specs.map((spec, specIdx) => (
                  <li
                    key={specIdx}
                    className="text-xs text-violet-300/70 flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-fuchsia-400 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Analysis Architecture */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
        <div className="flex items-center gap-4 mb-6">
          <GitBranch className="w-8 h-8 text-violet-400" />
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text">
            GitHub Analysis: Data → Insights Pipeline
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                stage: "1. Extraction",
                tools: ["GitHub API", "GraphQL queries", "Rate limiting", "Pagination"],
              },
              {
                stage: "2. Transform",
                tools: ["Pandas", "NumPy", "Data validation", "Type coercion"],
              },
              {
                stage: "3. Analysis",
                tools: ["Statistical tests", "Correlation", "3D visualization", "Clustering"],
              },
              {
                stage: "4. Presentation",
                tools: ["React dashboard", "Plotly charts", "Lazy loading", "Netlify deploy"],
              },
            ].map((stage, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-violet-950/50 border border-violet-500/20"
              >
                <h4 className="text-sm text-violet-200 mb-3">{stage.stage}</h4>
                <ul className="space-y-1">
                  {stage.tools.map((tool, toolIdx) => (
                    <li key={toolIdx} className="text-xs text-violet-300/70">
                      • {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
