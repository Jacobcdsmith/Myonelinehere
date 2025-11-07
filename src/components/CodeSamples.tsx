import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";

export function CodeSamples() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const samples = [
    {
      title: "Cellular Automata: Cell Memory Layout",
      language: "Rust",
      description: "GPU-aligned 64-byte cell structure for zero-copy transfer",
      code: `#[repr(C, align(16))]
struct Cell {
    position: [f32; 2],    // x, y coordinates
    energy: f32,           // 0.0 - 1.0
    state: u32,            // bitfield state machine
    influence: f32,        // radius of effect
    rule_id: u32,          // rule set governor
    pressure: f32,         // from content mass
    velocity: [f32; 2],    // wave propagation
    _padding: [f32; 2],    // align to 64 bytes
}`,
    },
    {
      title: "WebGPU Compute Shader: Cell Update Kernel",
      language: "WGSL",
      description: "Parallel cellular automata step with neighbor analysis",
      code: `@group(0) @binding(0) var<storage, read> input_cells: array<Cell>;
@group(0) @binding(1) var<storage, read_write> output_cells: array<Cell>;
@group(0) @binding(2) var<uniform> config: ComputeConfig;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let idx = global_id.y * config.grid_width + global_id.x;
    if (idx >= config.total_cells) { return; }
    
    var cell = input_cells[idx];
    var neighbors = count_neighbors(global_id.xy, &input_cells);
    
    // Apply rule transitions
    cell = apply_rules(cell, neighbors, config.rules);
    
    // Physics simulation
    cell.pressure = calculate_pressure(cell, neighbors);
    cell.velocity = update_wave(cell, neighbors, config.wave_velocity);
    cell.energy *= config.energy_decay;
    
    output_cells[idx] = cell;
}`,
    },
    {
      title: "Knowledge Graph: Connection Detection",
      language: "Python",
      description: "Graph-based algorithm for detecting semantic relationships",
      code: `def detect_connections(resources: List[Resource], 
                       threshold: float = 0.75) -> List[Connection]:
    """
    Detect semantic connections using TF-IDF + cosine similarity
    with incremental graph building for O(n log n) complexity
    """
    vectorizer = TfidfVectorizer(max_features=1000)
    vectors = vectorizer.fit_transform([r.content for r in resources])
    
    # Use sparse matrix operations for efficiency
    similarity_matrix = cosine_similarity(vectors, dense_output=False)
    
    connections = []
    for i, j in zip(*similarity_matrix.nonzero()):
        if i < j and similarity_matrix[i, j] >= threshold:
            connections.append(Connection(
                source_id=resources[i].id,
                target_id=resources[j].id,
                strength=float(similarity_matrix[i, j]),
                type=classify_connection_type(resources[i], resources[j])
            ))
    
    return connections`,
    },
    {
      title: "GPU-Accelerated Signal Analysis",
      language: "Python (JAX)",
      description: "20× speedup using JAX XLA compilation for consciousness metrics",
      code: `import jax.numpy as jnp
from jax import jit, vmap

@jit
def compute_phase_coherence(signal: jnp.ndarray, 
                            window_size: int = 256) -> float:
    """
    Compute Φ(x) phase coherence using Hilbert transform
    JIT-compiled for GPU execution
    """
    analytic = jnp.fft.hilbert(signal)
    phase = jnp.angle(analytic)
    
    # Instantaneous frequency via phase derivative
    inst_freq = jnp.diff(jnp.unwrap(phase))
    
    # Phase locking value (PLV) as coherence metric
    plv = jnp.abs(jnp.mean(jnp.exp(1j * inst_freq)))
    
    return plv

# Vectorize across multiple signals
batch_coherence = vmap(compute_phase_coherence)
results = batch_coherence(signal_batch)  # Parallel GPU execution`,
    },
    {
      title: "React: Async State Management",
      language: "TypeScript",
      description: "Custom hook for WebAssembly module lifecycle with suspense",
      code: `function useWasmModule<T>(
  wasmPath: string,
  initializer: (module: WebAssembly.Module) => T
): { module: T | null; loading: boolean; error: Error | null } {
  const [state, setState] = useState<{
    module: T | null;
    loading: boolean;
    error: Error | null;
  }>({ module: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    
    (async () => {
      try {
        const response = await fetch(wasmPath);
        const bytes = await response.arrayBuffer();
        const wasmModule = await WebAssembly.instantiate(bytes);
        
        if (!cancelled) {
          const initialized = initializer(wasmModule.instance);
          setState({ module: initialized, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ module: null, loading: false, error: error as Error });
        }
      }
    })();
    
    return () => { cancelled = true; };
  }, [wasmPath]);

  return state;
}`,
    },
  ];

  const copyToClipboard = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {samples.map((sample, idx) => (
        <div
          key={idx}
          className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] overflow-hidden"
        >
          <div className="p-6 border-b border-violet-500/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
                  {sample.title}
                </h3>
                <p className="text-sm text-violet-300/70 mb-2">
                  {sample.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300">
                  {sample.language}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(sample.code, idx)}
                className="p-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 transition-all"
                aria-label="Copy code"
              >
                {copiedIndex === idx ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-6 bg-[#0a0015]/50">
            <pre className="text-sm text-violet-200/90 overflow-x-auto">
              <code>{sample.code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
