import { Cpu, Layers, Zap, Code } from "lucide-react";

export function CellularAutomataShowcase() {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/60 to-crimson-950/60 rounded-2xl border-2 border-violet-500/40 shadow-[0_0_60px_rgba(139,0,255,0.3)] p-10 mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600/30 to-crimson-600/30 border-2 border-violet-400/50">
          <Cpu className="w-10 h-10 text-violet-300" />
        </div>
        <div>
          <h3 className="text-3xl text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-crimson-300 bg-clip-text mb-1">
            Cellular Automata Grid Engine
          </h3>
          <p className="text-violet-300/80">
            Rust → WASM | WebGPU Compute | 60fps @ 2M+ Cells
          </p>
        </div>
      </div>

      <p className="text-violet-200/90 mb-8 leading-relaxed">
        High-performance physics substrate for emergent UI behavior. Zero-copy
        memory architecture with dual-buffer ring and lock-free atomic swapping,
        achieving sub-5ms latency for real-time interaction.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Zap,
            label: "Performance",
            specs: [
              "1920×1080 @ 60fps",
              "<5ms step latency",
              "<50MB memory",
              "Sub-frame injection",
            ],
          },
          {
            icon: Layers,
            label: "Architecture",
            specs: [
              "64-byte cell alignment",
              "3-frame ring buffer",
              "O(1) spatial hash",
              "SharedArrayBuffer",
            ],
          },
          {
            icon: Code,
            label: "Implementation",
            specs: [
              "Rust core (wasm-bindgen)",
              "WebGPU compute shaders",
              "WebGL2 fallback",
              "Rayon parallelism",
            ],
          },
          {
            icon: Cpu,
            label: "Compute",
            specs: [
              "16×16 workgroups",
              "Moore/Von Neumann",
              "Wave propagation",
              "Energy decay physics",
            ],
          },
        ].map((section, idx) => {
          const Icon = section.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-violet-950/50 border border-violet-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-violet-400" />
                <h4 className="text-violet-200">{section.label}</h4>
              </div>
              <ul className="space-y-2">
                {section.specs.map((spec, specIdx) => (
                  <li
                    key={specIdx}
                    className="text-xs text-violet-300/70 flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-xl bg-[#0a0015]/60 border border-violet-500/30">
        <h4 className="text-violet-200 mb-4">Cell State Machine Structure</h4>
        <pre className="text-xs text-violet-300/90 overflow-x-auto">
          <code>{`#[repr(C, align(16))]  // GPU-friendly alignment
struct Cell {
    position: [f32; 2],      // x, y coordinates
    energy: f32,             // 0.0 - 1.0
    state: u32,              // bitfield: [occupied:1][stable:1][type:6][reserved:24]
    influence: f32,          // radius of effect
    rule_id: u32,            // which rule set governs this cell
    pressure: f32,           // from content mass
    velocity: [f32; 2],      // for wave propagation
    _padding: [f32; 2],      // align to 64 bytes
}`}</code>
        </pre>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex-1 p-4 rounded-lg bg-violet-950/50 border border-violet-500/20">
          <div className="text-sm text-violet-300/70 mb-1">Rule Engine</div>
          <div className="text-violet-200">
            JSON → Compiled transitions with neighbor kernels
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-violet-950/50 border border-violet-500/20">
          <div className="text-sm text-violet-300/70 mb-1">Memory Model</div>
          <div className="text-violet-200">
            Zero-copy SharedArrayBuffer with atomic swaps
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-violet-950/50 border border-violet-500/20">
          <div className="text-sm text-violet-300/70 mb-1">Testing</div>
          <div className="text-violet-200">
            Property-based, fuzz, visual regression
          </div>
        </div>
      </div>
    </div>
  );
}
