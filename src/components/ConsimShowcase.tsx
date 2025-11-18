import { Cpu, Layers, Zap, Code, Activity, Gauge } from "lucide-react";

export function ConsimShowcase() {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/60 to-crimson-950/60 rounded-2xl border-2 border-crimson-500/40 shadow-[0_0_60px_rgba(220,20,60,0.3)] p-10 mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gradient-to-br from-crimson-600/30 to-violet-600/30 border-2 border-crimson-400/50">
          <Activity className="w-10 h-10 text-crimson-300" />
        </div>
        <div>
          <h3 className="text-3xl text-transparent bg-gradient-to-r from-crimson-300 via-fuchsia-300 to-violet-300 bg-clip-text mb-1">
            CONSIM: High-Dimensional Spectral Analysis
          </h3>
          <p className="text-crimson-300/80">
            GPU-Accelerated | CUDA + PyTorch + JAX | ~20x Performance
          </p>
        </div>
      </div>

      <p className="text-crimson-200/90 mb-8 leading-relaxed">
        Flagship computational framework for spectral resonance analysis and phase coherence tracking on high-dimensional manifolds. 
        Multi-backend GPU acceleration achieving ~20x speedup with parallel compute architectures for research applications.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Gauge,
            label: "Performance",
            specs: [
              "~20x speedup (GPU)",
              "<5ms/frame latency",
              "Float64 precision",
              "Parallel execution",
            ],
          },
          {
            icon: Layers,
            label: "Architecture",
            specs: [
              "Multi-backend compute",
              "Neural components",
              "Gradient optimization",
              "High-dimensional",
            ],
          },
          {
            icon: Code,
            label: "Stack",
            specs: [
              "Python core",
              "NumPy + Numba JIT",
              "PyTorch + JAX",
              "CUDA kernels",
            ],
          },
          {
            icon: Cpu,
            label: "Compute Modes",
            specs: [
              "CUDA acceleration",
              "PyTorch tensors",
              "JAX JIT compile",
              "GPU parallelism",
            ],
          },
        ].map((section, idx) => {
          const Icon = section.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-crimson-950/50 border border-crimson-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-crimson-400" />
                <h4 className="text-crimson-200">{section.label}</h4>
              </div>
              <ul className="space-y-2">
                {section.specs.map((spec, specIdx) => (
                  <li
                    key={specIdx}
                    className="text-xs text-crimson-300/70 flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-crimson-400 flex-shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 rounded-xl bg-[#0a0015]/60 border border-crimson-500/30">
          <h4 className="text-crimson-200 mb-4">Core Analysis Pipeline</h4>
          <pre className="text-xs text-crimson-300/90 overflow-x-auto">
            <code>{`# Frequency signature analysis
def compute_frequency_signature(signal, manifold):
    Φ = spectral_decomposition(signal)
    ψ = project_to_manifold(Φ, manifold)
    return coherence_metric(ψ)

# Temporal phase detection
def track_phase_coherence(timeseries, window=1024):
    τ = temporal_phase_extract(timeseries, window)
    coherence = mutual_information(τ)
    return coherence_threshold(τ, threshold=0.85)`}</code>
          </pre>
        </div>

        <div className="p-6 rounded-xl bg-[#0a0015]/60 border border-crimson-500/30">
          <h4 className="text-crimson-200 mb-4">GPU Acceleration Command</h4>
          <pre className="text-xs text-crimson-300/90 overflow-x-auto">
            <code>{`$ python consim.py \\
    --gpu \\
    --backend=cuda,pytorch,jax \\
    --coherence-threshold=0.85 \\
    --parallel \\
    --performance=20x

# Benchmarking
$ pytest tests/ \\
    --benchmark \\
    --iterations=200k \\
    --gpu-accel`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h4 className="text-crimson-200">Analysis Capabilities</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Spectral Resonance",
              description: "Frequency signature analysis Φ(x) with manifold projection"
            },
            {
              title: "Phase Coherence",
              description: "Real-time temporal phase τ(x) tracking with 0.85+ threshold"
            },
            {
              title: "Mutual Information",
              description: "Cross-domain information flow with metric-invariant signatures"
            }
          ].map((capability, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-crimson-950/50 border border-crimson-500/20">
              <div className="text-sm text-crimson-300 mb-2">{capability.title}</div>
              <div className="text-xs text-crimson-300/70">{capability.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 p-4 rounded-lg bg-crimson-950/50 border border-crimson-500/20">
          <div className="text-sm text-crimson-300/70 mb-1">Research Focus</div>
          <div className="text-crimson-200">
            Consciousness detection metrics via signal analysis
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-crimson-950/50 border border-crimson-500/20">
          <div className="text-sm text-crimson-300/70 mb-1">Compute Backend</div>
          <div className="text-crimson-200">
            CUDA + PyTorch + JAX with JIT compilation
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-crimson-950/50 border border-crimson-500/20">
          <div className="text-sm text-crimson-300/70 mb-1">Performance</div>
          <div className="text-crimson-200">
            ~20x speedup with parallel GPU execution
          </div>
        </div>
      </div>
    </div>
  );
}
