/**
 * PROMPT: Cellular Automata Grid Engine in Rust → WASM
 * 
 * Build a high-performance grid engine that operates at 60fps with millions of cells.
 * This is the physics substrate for emergent UI behavior.
 */

// DELIVERABLE SPECIFICATION:

/*
FILE STRUCTURE:
cellular-core/
├── src/
│   ├── lib.rs              // WASM bindings
│   ├── grid.rs             // Core grid logic
│   ├── cell.rs             // Cell state machine
│   ├── rules.rs            // Rule engine
│   ├── compute.rs          // GPU shader orchestration
│   └── memory.rs           // Memory pool management
├── shaders/
│   ├── compute.wgsl        // WebGPU compute shader
│   └── fallback.glsl       // WebGL2 fallback
└── Cargo.toml

CRITICAL IMPLEMENTATION DETAILS:

1. MEMORY LAYOUT (Rust):
*/

#[repr(C, align(16))]  // GPU-friendly alignment
struct Cell {
    position: [f32; 2],      // x, y coordinates
    energy: f32,             // 0.0 - 1.0
    state: u32,              // bitfield: [occupied:1][stable:1][type:6][reserved:24]
    influence: f32,          // radius of effect
    rule_id: u32,            // which rule set governs this cell
    pressure: f32,           // from content mass
    velocity: [f32; 2],      // for wave propagation
    _padding: [f32; 2],      // align to 64 bytes
}

/*
2. DUAL-BUFFER ARCHITECTURE:
   - Use ring buffer with 3 frames: [compute, read, write]
   - Lock-free atomic swapping for thread safety
   - Zero-copy between CPU/GPU via SharedArrayBuffer
*/

#[wasm_bindgen]
pub struct CellularGrid {
    width: u32,
    height: u32,
    cell_size: f32,
    buffers: [Vec<Cell>; 2],
    active_buffer: AtomicUsize,
    gpu_compute: Option<GpuCompute>,
    rule_engine: RuleEngine,
    spatial_hash: HashMap<(i32, i32), Vec<usize>>, // for fast neighbor lookup
}

/*
3. RULE ENGINE (JSON → Compiled):
*/

{
  "id": "pressure_wave",
  "version": "1.0",
  "compute_mode": "parallel",
  "neighbor_kernel": {
    "type": "moore",  // moore (8-neighbors) or von_neumann (4-neighbors)
    "radius": 1
  },
  "transitions": [
    {
      "from_state": "empty",
      "to_state": "growing",
      "condition": {
        "type": "neighbor_count",
        "operator": "in_range",
        "range": [3, 4]
      },
      "energy_delta": 0.3
    },
    {
      "from_state": "occupied",
      "to_state": "shrinking",
      "condition": {
        "type": "pressure",
        "operator": "greater_than",
        "threshold": 0.8
      },
      "energy_delta": -0.1
    },
    {
      "from_state": "growing",
      "to_state": "stable",
      "condition": {
        "type": "stability",
        "frames": 10,
        "tolerance": 0.05
      }
    }
  ],
  "physics": {
    "pressure_coefficient": 1.2,
    "wave_velocity": 2.0,
    "energy_decay": 0.98,
    "friction": 0.85
  }
}

/*
4. WEBGPU COMPUTE SHADER (compute.wgsl):
*/

@group(0) @binding(0) var<storage, read> input_cells: array<Cell>;
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
}

/*
5. WASM API (exposed to JavaScript):
*/

#[wasm_bindgen]
impl CellularGrid {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32, cell_size: f32) -> Result<CellularGrid, JsValue>;
    
    // Core simulation
    pub fn step(&mut self) -> JsValue;  // Returns { changed_cells, stability_score }
    pub fn step_async(&mut self) -> Promise;  // For web workers
    
    // Cell manipulation
    pub fn inject_energy(&mut self, x: f32, y: f32, energy: f32, radius: f32);
    pub fn set_cell_state(&mut self, x: u32, y: u32, state: u32);
    pub fn get_region(&self, x: u32, y: u32, w: u32, h: u32) -> Float32Array;
    
    // Rule management
    pub fn load_rule(&mut self, rule_json: &str) -> Result<u32, JsValue>;
    pub fn assign_rule_to_region(&mut self, rule_id: u32, x: u32, y: u32, w: u32, h: u32);
    
    // Query/Debug
    pub fn get_stability(&self) -> f32;  // 0.0 = chaos, 1.0 = stable
    pub fn get_entropy(&self) -> f32;
    pub fn export_state(&self) -> Uint8Array;  // For time-travel debugging
    pub fn import_state(&mut self, state: &[u8]);
}

/*
PERFORMANCE TARGETS:
- 1920x1080 grid (2M cells) @ 60fps on mid-range GPU
- <5ms per step on 4-core CPU fallback
- <50MB memory footprint
- Sub-frame latency for energy injection

IMPLEMENTATION NOTES:
- Use rayon for CPU parallelism
- wgpu for cross-platform GPU compute
- wasm-bindgen for JS interop
- serde for rule serialization
- Consider SIMD intrinsics for CPU hotpaths (std::arch)

TESTING REQUIREMENTS:
- Benchmark suite with 10 rule variations
- Visual regression tests (snapshot grid states)
- Property-based testing for rule stability
- Fuzz testing for malformed rule JSON
*/

// END PART 1 SPECIFICATION