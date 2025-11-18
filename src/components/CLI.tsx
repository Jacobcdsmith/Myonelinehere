import { useState, useEffect, useRef } from 'react';
import { Terminal, FileCode, Grid3x3, Zap, Settings, TrendingUp, Cpu, Activity, Database } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileNode[];
}

// Virtual file system
const VIRTUAL_FS: FileNode = {
  name: '/',
  type: 'directory',
  children: [
    {
      name: 'config',
      type: 'directory',
      children: [
        {
          name: 'site.yaml',
          type: 'file',
          content: `# Static Site Generator Configuration
site:
  title: "Jacob C. Smith - Portfolio"
  description: "Data Analyst & Software Developer"
  author: "Jacob C. Smith"
  theme: "cyberpunk-crimson"
  
build:
  output_dir: "dist/"
  minify_css: true
  minify_js: true
  optimize_images: true
  critical_css: true
  
seo:
  open_graph: true
  structured_data: true
  sitemap: true
  robots_txt: true`
        },
        {
          name: 'ca-rules.json',
          type: 'file',
          content: `{
  "id": "portfolio_ambient",
  "version": "1.0",
  "compute_mode": "parallel",
  "neighbor_kernel": {
    "type": "moore",
    "radius": 1
  },
  "transitions": [
    {
      "from_state": "empty",
      "to_state": "growing",
      "condition": {
        "type": "neighbor_count",
        "operator": "in_range",
        "range": [2, 3]
      },
      "energy_delta": 0.3
    }
  ],
  "physics": {
    "pressure_coefficient": 1.2,
    "wave_velocity": 2.0,
    "energy_decay": 0.98,
    "friction": 0.85
  }
}`
        },
        {
          name: 'state-snapshot.bin',
          type: 'file',
          content: '[Binary state data - 2,073,600 cells × 64 bytes/cell = 126MB]'
        }
      ]
    },
    {
      name: 'projects',
      type: 'directory',
      children: [
        {
          name: 'github-analysis.md',
          type: 'file',
          content: '# GitHub Repository Language Analysis\n\nAnalyzed 1,200 repos × 12 languages...'
        },
        {
          name: 'consim.md',
          type: 'file',
          content: '# CONSIM - Emergent Consciousness Simulator\n\nBuilt a signal‑analysis pipeline...'
        }
      ]
    }
  ]
};

// Command parser
interface ParsedCommand {
  command: string;
  subcommand?: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().split(/\s+/);
  const command = parts[0] || '';
  const rest = parts.slice(1);
  
  const flags: Record<string, string | boolean> = {};
  const args: string[] = [];
  let subcommand: string | undefined;
  
  for (let i = 0; i < rest.length; i++) {
    const part = rest[i];
    if (part.startsWith('--')) {
      const flag = part.slice(2);
      const nextPart = rest[i + 1];
      if (nextPart && !nextPart.startsWith('-')) {
        flags[flag] = nextPart;
        i++;
      } else {
        flags[flag] = true;
      }
    } else if (part.startsWith('-')) {
      flags[part.slice(1)] = true;
    } else if (!subcommand && [
      'init', 'populate', 'build', 'dev', 'deploy', 'analyze', 
      'grid', 'rule', 'inject', 'step', 'simulate', 'benchmark', 
      'profile', 'debug', 'cell', 'region', 'query', 'list', 'show', 
      'stability', 'entropy', 'performance', 'compile', 'validate', 
      'load', 'export', 'import', 'get', 'set', 'assign-rule', 'info',
      'ls', 'cat', 'tree'
    ].includes(part)) {
      subcommand = part;
    } else {
      args.push(part);
    }
  }
  
  return { command, subcommand, args, flags };
}

// File system utilities
function findFile(path: string, root: FileNode = VIRTUAL_FS): FileNode | null {
  const parts = path.split('/').filter(p => p);
  let current = root;
  
  for (const part of parts) {
    if (current.type !== 'directory' || !current.children) return null;
    const found = current.children.find(c => c.name === part);
    if (!found) return null;
    current = found;
  }
  
  return current;
}

function listDirectory(node: FileNode): React.ReactNode {
  if (node.type !== 'directory' || !node.children) {
    return <div className="text-crimson-400">Not a directory</div>;
  }
  
  return (
    <div className="space-y-1">
      {node.children.map((child, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {child.type === 'directory' ? (
            <span className="text-violet-400">📁 {child.name}/</span>
          ) : (
            <span className="text-fuchsia-400">📄 {child.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function CLI() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'system',
      output: (
        <div className="space-y-2">
          <div className="text-fuchsia-400">╔══════════════════════════════════════════════════════════════════╗</div>
          <div className="text-fuchsia-400">║   JACOB C. SMITH — ADVANCED PORTFOLIO COMMAND CENTER           ║</div>
          <div className="text-fuchsia-400">╚══════════════════════════════════════════════════════════════════╝</div>
          <div className="text-violet-300/80 text-sm mt-3">
            Systems Online: <span className="text-crimson-400">[Static Site Generator]</span> <span className="text-violet-400">[Cellular Automata Engine (Rust/WASM)]</span>
          </div>
          <div className="text-violet-300/60 text-sm">WebGPU Compute: <span className="text-fuchsia-400">ENABLED</span> | Memory: <span className="text-fuchsia-400">48MB allocated</span></div>
          <div className="text-violet-300/60 text-sm">Type <span className="text-crimson-400">help</span> for comprehensive command reference</div>
        </div>
      ),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Autocomplete
  useEffect(() => {
    const allCommands = [
      'help', 'clear', 'about', 'neofetch',
      'ssg init', 'ssg populate', 'ssg build', 'ssg dev', 'ssg deploy', 'ssg analyze',
      'ca grid init', 'ca grid step', 'ca grid info', 'ca grid export', 'ca grid import', 'ca grid query',
      'ca rule load', 'ca rule list', 'ca rule validate', 'ca rule compile',
      'ca cell set', 'ca cell get', 'ca region get', 'ca region assign-rule',
      'ca inject', 'ca simulate', 'ca benchmark', 'ca profile', 'ca debug',
      'ca query stability', 'ca query entropy', 'ca query performance',
      'fs ls', 'fs cat', 'fs tree',
      'project list', 'project show'
    ];
    
    if (input.trim()) {
      const matches = allCommands.filter(cmd => cmd.startsWith(input.trim().toLowerCase()));
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const executeCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim();
    
    if (!trimmedCmd) return;

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setCommandIndex(-1);

    const parsed = parseCommand(trimmedCmd);
    const output = processCommand(parsed);

    setHistory((prev) => [
      ...prev,
      {
        command: trimmedCmd,
        output,
        timestamp: new Date(),
      },
    ]);
  };

  const processCommand = (parsed: ParsedCommand): React.ReactNode => {
    const { command, subcommand, args, flags } = parsed;

    // Clear command
    if (command === 'clear') {
      setHistory([]);
      return null;
    }

    // Help system - EXPANDED
    if (command === 'help') {
      return (
        <div className="space-y-3">
          <div className="text-violet-400">Available Command Suites:</div>
          
          <div className="border-l-2 border-crimson-500/50 pl-4 space-y-1">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-crimson-400" />
              <span className="text-fuchsia-400">ssg</span>
              <span className="text-violet-300/60 text-sm">— Static Site Generator</span>
            </div>
            <div className="pl-6 text-xs text-violet-300/80 space-y-0.5">
              <div><span className="text-crimson-400">init</span> - Initialize new project</div>
              <div><span className="text-crimson-400">populate</span> - Load content from sources</div>
              <div><span className="text-crimson-400">build</span> [--minify] [--optimize] - Build static site</div>
              <div><span className="text-crimson-400">dev</span> - Start development server</div>
              <div><span className="text-crimson-400">deploy</span> [--platform=netlify] - Deploy to platform</div>
              <div><span className="text-crimson-400">analyze</span> - Performance analysis</div>
            </div>
          </div>

          <div className="border-l-2 border-violet-500/50 pl-4 space-y-1">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4 text-violet-400" />
              <span className="text-fuchsia-400">ca</span>
              <span className="text-violet-300/60 text-sm">— Cellular Automata Engine (Rust→WASM | WebGPU)</span>
            </div>
            <div className="pl-6 text-xs text-violet-300/80 space-y-0.5">
              <div className="text-violet-400 mt-1 flex items-center gap-1">
                <Database className="w-3 h-3" />
                <span>Grid Operations:</span>
              </div>
              <div><span className="text-crimson-400">grid init</span> [width] [height] [--gpu] - Initialize CA grid (dual-buffer)</div>
              <div><span className="text-crimson-400">grid step</span> [--count=N] [--async] - Run N simulation steps</div>
              <div><span className="text-crimson-400">grid info</span> - Display grid statistics & memory layout</div>
              <div><span className="text-crimson-400">grid export</span> [file] - Export binary state snapshot (time-travel)</div>
              <div><span className="text-crimson-400">grid import</span> [file] - Import state from snapshot</div>
              <div><span className="text-crimson-400">grid query</span> - Query grid status, changed cells & metrics</div>
              
              <div className="text-violet-400 mt-1 flex items-center gap-1">
                <Settings className="w-3 h-3" />
                <span>Rule Engine:</span>
              </div>
              <div><span className="text-crimson-400">rule load</span> [file] - Load & compile JSON→Rust transitions</div>
              <div><span className="text-crimson-400">rule validate</span> [file] - Validate rule schema & dependencies</div>
              <div><span className="text-crimson-400">rule compile</span> - Show compiled transition table</div>
              <div><span className="text-crimson-400">rule list</span> - List all loaded rules with IDs</div>
              
              <div className="text-violet-400 mt-1 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>Cell & Region Operations:</span>
              </div>
              <div><span className="text-crimson-400">cell set</span> [x] [y] [state] - Set individual cell state</div>
              <div><span className="text-crimson-400">cell get</span> [x] [y] - Get cell data (64-byte struct)</div>
              <div><span className="text-crimson-400">region get</span> [x] [y] [w] [h] - Get region as Float32Array</div>
              <div><span className="text-crimson-400">region assign-rule</span> [rule_id] [x] [y] [w] [h] - Assign rule to region</div>
              <div><span className="text-crimson-400">inject</span> [x] [y] [energy] [--radius=N] - Inject energy with wave propagation</div>
              
              <div className="text-violet-400 mt-1 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>Analysis, Debug & Performance:</span>
              </div>
              <div><span className="text-crimson-400">query stability</span> - Get stability metric (0.0=chaos, 1.0=stable)</div>
              <div><span className="text-crimson-400">query entropy</span> - Get system entropy metric</div>
              <div><span className="text-crimson-400">query performance</span> - Show frame timing & compute stats</div>
              <div><span className="text-crimson-400">benchmark</span> [--iterations=N] - Run benchmark suite (10 rule variations)</div>
              <div><span className="text-crimson-400">profile</span> [--duration=N] - Profile WebGPU compute pipeline</div>
              <div><span className="text-crimson-400">debug</span> - Show buffer states, memory layout & spatial hash</div>
              <div><span className="text-crimson-400">simulate</span> [--fps=60] [--gpu] - Start real-time simulation</div>
            </div>
          </div>

          <div className="border-l-2 border-fuchsia-500/50 pl-4 space-y-1">
            <div className="text-fuchsia-400">File System & Utilities</div>
            <div className="pl-6 text-xs text-violet-300/80 space-y-0.5">
              <div><span className="text-crimson-400">fs ls</span> [path] - List directory</div>
              <div><span className="text-crimson-400">fs cat</span> [file] - Display file contents</div>
              <div><span className="text-crimson-400">fs tree</span> - Show directory tree</div>
              <div><span className="text-crimson-400">project list</span> - List all portfolio projects</div>
              <div><span className="text-crimson-400">neofetch</span> - System information banner</div>
            </div>
          </div>
        </div>
      );
    }

    // Static Site Generator commands
    if (command === 'ssg') {
      if (!subcommand) {
        return <div className="text-crimson-400">Usage: ssg &lt;command&gt; [options]. Type 'help' for details.</div>;
      }

      switch (subcommand) {
        case 'init':
          return (
            <div className="space-y-2">
              <div className="text-violet-400">Initializing project...</div>
              <div className="text-violet-300/80 text-sm space-y-1">
                <div>✓ Created config/site.yaml</div>
                <div>✓ Created src/ directory structure</div>
                <div>✓ Created templates/ with 6 page layouts</div>
                <div>✓ Initialized Git repository</div>
                <div className="text-fuchsia-400 mt-2">Project initialized successfully!</div>
              </div>
            </div>
          );

        case 'build':
          const minify = flags.minify || flags.m;
          const optimize = flags.optimize || flags.o;
          return (
            <div className="space-y-2">
              <div className="text-violet-400">Building static site...</div>
              <div className="text-violet-300/80 text-sm space-y-1">
                <div>→ Rendering 6 pages... <span className="text-fuchsia-400">Done (412ms)</span></div>
                <div>→ Extracting critical CSS... <span className="text-fuchsia-400">Done (89ms)</span></div>
                {minify && <div>→ Minifying CSS (98.2% reduction)... <span className="text-fuchsia-400">Done</span></div>}
                {optimize && <div>→ Optimizing images... <span className="text-fuchsia-400">Done</span></div>}
                <div>→ Generating sitemap & manifest... <span className="text-fuchsia-400">Done</span></div>
                <div className="text-fuchsia-400 mt-2">
                  Build complete! Output: <span className="text-crimson-400">dist/</span>
                </div>
                <div className="text-violet-300/60 text-xs">
                  LCP: 0.8s | Total size: 124KB | Pages: 6
                </div>
              </div>
            </div>
          );

        case 'deploy':
          const platform = flags.platform || 'github-pages';
          return (
            <div className="space-y-2">
              <div className="text-violet-400">Deploying to {platform}...</div>
              <div className="text-violet-300/80 text-sm space-y-1">
                <div>→ Building production bundle...</div>
                <div>→ Running health checks...</div>
                <div>→ Uploading assets...</div>
                <div>→ Configuring SSL/TLS...</div>
                <div className="text-fuchsia-400 mt-2">
                  Deployed successfully! <span className="text-crimson-400">https://jacobcdsmith.dev</span>
                </div>
              </div>
            </div>
          );

        case 'analyze':
          return (
            <div className="space-y-2">
              <div className="text-violet-400">Performance Analysis Report:</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-crimson-400">Lighthouse Scores</div>
                  <div className="text-violet-300/80 text-xs space-y-1 mt-1">
                    <div>Performance: <span className="text-fuchsia-400">98</span></div>
                    <div>Accessibility: <span className="text-fuchsia-400">100</span></div>
                    <div>SEO: <span className="text-fuchsia-400">100</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-crimson-400">Core Web Vitals</div>
                  <div className="text-violet-300/80 text-xs space-y-1 mt-1">
                    <div>LCP: <span className="text-fuchsia-400">0.8s</span></div>
                    <div>FID: <span className="text-fuchsia-400">12ms</span></div>
                    <div>CLS: <span className="text-fuchsia-400">0.02</span></div>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return <div className="text-crimson-400">Unknown ssg command: {subcommand}</div>;
      }
    }

    // EXPANDED Cellular Automata commands
    if (command === 'ca') {
      if (!subcommand) {
        return <div className="text-crimson-400">Usage: ca &lt;command&gt; [args]. Type 'help' for comprehensive CA command reference.</div>;
      }

      // Grid operations
      if (subcommand === 'grid') {
        const gridCmd = args[0];
        switch (gridCmd) {
          case 'init':
            const width = args[1] || '1920';
            const height = args[2] || '1080';
            const useGpu = flags.gpu || true;
            const cells = parseInt(width) * parseInt(height);
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Initializing Cellular Automata Grid Engine (Rust→WASM)...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Grid dimensions: <span className="text-fuchsia-400">{width}×{height}</span> = <span className="text-crimson-400">{cells.toLocaleString()} cells</span></div>
                  <div>→ Allocating dual-buffer ring (3 frames)...</div>
                  <div className="pl-4 text-xs text-violet-300/60">
                    • Buffer A: {(cells * 64 / 1024 / 1024).toFixed(1)}MB (compute)<br/>
                    • Buffer B: {(cells * 64 / 1024 / 1024).toFixed(1)}MB (read)<br/>
                    • Buffer C: {(cells * 64 / 1024 / 1024).toFixed(1)}MB (write)
                  </div>
                  <div>→ Compiling WGSL compute shaders (16×16 workgroups)...</div>
                  <div>→ Initializing {useGpu ? 'WebGPU' : 'WebGL2'} context...</div>
                  <div>→ Building O(1) spatial hash map...</div>
                  <div>→ Configuring lock-free atomic buffer swapping...</div>
                  <div className="text-fuchsia-400 mt-2">
                    ✓ Grid initialized! Memory: <span className="text-crimson-400">{(cells * 64 * 3 / 1024 / 1024).toFixed(1)}MB</span> | Compute: <span className="text-crimson-400">{useGpu ? 'WebGPU' : 'CPU'}</span>
                  </div>
                </div>
              </div>
            );

          case 'step':
            const count = parseInt(flags.count as string) || 1;
            const async = flags.async || false;
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Running {count} simulation step{count > 1 ? 's' : ''} {async ? '(async)' : ''}...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  {[...Array(Math.min(count, 3))].map((_, i) => {
                    const changedCells = Math.floor(Math.random() * 500 + 200);
                    const stability = (0.85 + Math.random() * 0.1).toFixed(2);
                    const entropy = (0.35 + Math.random() * 0.15).toFixed(2);
                    return (
                      <div key={i}>
                        Step {i + 1}: <span className="text-crimson-400">{changedCells} cells changed</span> | 
                        Stability: <span className="text-fuchsia-400">{stability}</span> | 
                        Entropy: <span className="text-violet-400">{entropy}</span>
                      </div>
                    );
                  })}
                  {count > 3 && <div className="text-violet-300/60 text-xs">... {count - 3} more steps ...</div>}
                  <div className="text-fuchsia-400 mt-2">
                    Average: <span className="text-crimson-400">2.3ms/step</span> ({Math.floor(1000/2.3)}fps) | 
                    {async && ' Promise returned'} | 
                    Frame buffer swapped
                  </div>
                </div>
              </div>
            );

          case 'info':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Grid Statistics & Memory Layout:</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1 text-violet-300/80">
                    <div className="text-crimson-400">Grid Metrics</div>
                    <div>Dimensions: <span className="text-fuchsia-400">1920×1080</span></div>
                    <div>Total Cells: <span className="text-fuchsia-400">2,073,600</span></div>
                    <div>Active Cells: <span className="text-fuchsia-400">842,341</span> (40.6%)</div>
                    <div>Stable Cells: <span className="text-fuchsia-400">1,891,240</span> (91.2%)</div>
                    <div>Stability Score: <span className="text-fuchsia-400">0.91</span></div>
                    <div>System Entropy: <span className="text-fuchsia-400">0.38</span></div>
                  </div>
                  <div className="space-y-1 text-violet-300/80">
                    <div className="text-crimson-400">Physics & Compute</div>
                    <div>Avg Energy: <span className="text-fuchsia-400">0.34</span></div>
                    <div>Avg Pressure: <span className="text-fuchsia-400">0.67</span></div>
                    <div>Wave Velocity: <span className="text-fuchsia-400">2.0</span></div>
                    <div>Energy Decay: <span className="text-fuchsia-400">0.98</span></div>
                    <div>Friction Coeff: <span className="text-fuchsia-400">0.85</span></div>
                    <div>GPU Compute: <span className="text-fuchsia-400">WebGPU Active</span></div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-black/40 rounded border border-violet-500/20">
                  <div className="text-xs text-violet-300/60 mb-2">Cell Memory Layout (repr(C, align(16))):</div>
                  <pre className="text-xs text-fuchsia-400/80">{`struct Cell { // 64 bytes aligned
  position: [f32; 2],  // 8 bytes
  energy: f32,         // 4 bytes
  state: u32,          // 4 bytes (bitfield)
  influence: f32,      // 4 bytes
  rule_id: u32,        // 4 bytes
  pressure: f32,       // 4 bytes
  velocity: [f32; 2],  // 8 bytes
  _padding: [f32; 2],  // 8 bytes → 64 total
}`}</pre>
                </div>
              </div>
            );

          case 'export':
            const exportFile = args[1] || 'config/state-snapshot.bin';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Exporting grid state snapshot...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Serializing 2,073,600 cells × 64 bytes...</div>
                  <div>→ Computing state checksum (CRC32)...</div>
                  <div>→ Writing to: <span className="text-crimson-400">{exportFile}</span></div>
                  <div className="text-fuchsia-400 mt-2">
                    ✓ Exported 126MB binary snapshot | Checksum: <span className="text-violet-400">0xA4B91F3E</span>
                  </div>
                  <div className="text-violet-300/60 text-xs">
                    Use <span className="text-crimson-400">ca grid import</span> for time-travel debugging
                  </div>
                </div>
              </div>
            );

          case 'import':
            const importFile = args[1] || 'config/state-snapshot.bin';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Importing grid state from snapshot...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Reading: <span className="text-crimson-400">{importFile}</span></div>
                  <div>→ Validating checksum... <span className="text-fuchsia-400">PASS (0xA4B91F3E)</span></div>
                  <div>→ Deserializing 126MB → SharedArrayBuffer...</div>
                  <div>→ Restoring cell states (zero-copy)...</div>
                  <div className="text-fuchsia-400 mt-2">
                    ✓ State restored! 2,073,600 cells loaded
                  </div>
                </div>
              </div>
            );

          case 'query':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Grid Query Results:</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>Active Buffer: <span className="text-fuchsia-400">A</span> (compute) | Next: <span className="text-violet-400">B</span></div>
                  <div>Cells Changed (last step): <span className="text-crimson-400">342</span></div>
                  <div>Spatial Hash Buckets: <span className="text-fuchsia-400">1,024</span> (avg load: 2,026 cells/bucket)</div>
                  <div>Frame Time: <span className="text-fuchsia-400">2.3ms</span> | Target: <span className="text-violet-400">16.67ms (60fps)</span></div>
                  <div>GPU Utilization: <span className="text-fuchsia-400">34%</span></div>
                  <div>Memory Pressure: <span className="text-fuchsia-400">Low</span> (126MB / 2GB available)</div>
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown grid command: {gridCmd}. Try: init, step, info, export, import, query</div>;
        }
      }

      // Rule engine operations
      if (subcommand === 'rule') {
        const ruleCmd = args[0];
        switch (ruleCmd) {
          case 'load':
            const file = args[1] || 'config/ca-rules.json';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Loading rule configuration: {file}</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Parsing JSON configuration...</div>
                  <div>→ Validating transition rules (3 transitions)...</div>
                  <div>→ Compiling neighbor kernels (Moore, radius=1)...</div>
                  <div>→ Generating Rust transition functions...</div>
                  <div>→ Linking to WASM module...</div>
                  <div className="text-fuchsia-400 mt-2">
                    ✓ Rule loaded: <span className="text-crimson-400">portfolio_ambient</span> (ID: <span className="text-violet-400">0x01</span>)
                  </div>
                  <div className="text-violet-300/60 text-xs">
                    3 transitions | Moore(8) neighborhood | Parallel compute | Physics enabled
                  </div>
                </div>
              </div>
            );

          case 'validate':
            const valFile = args[1] || 'config/ca-rules.json';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Validating rule schema: {valFile}</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>✓ JSON schema valid</div>
                  <div>✓ All transitions well-formed</div>
                  <div>✓ Physics parameters in range</div>
                  <div>✓ No circular state dependencies</div>
                  <div>✓ Neighbor kernel valid (moore, radius=1)</div>
                  <div>✓ Energy delta bounds checked</div>
                  <div className="text-fuchsia-400 mt-2">Validation passed! Rule is compilable.</div>
                </div>
              </div>
            );

          case 'compile':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Compiled Transition Table:</div>
                <div className="p-3 bg-black/40 rounded border border-violet-500/20">
                  <pre className="text-xs text-violet-300/80 overflow-x-auto whitespace-pre">{`Rule: portfolio_ambient (0x01)
Compute Mode: PARALLEL
Kernel: Moore(8-neighbor, radius=1)

Transition Table:
┌─────────────────────────────────────────────────────┐
│ FROM         │ TO           │ CONDITION            │ ΔE   │
├─────────────────────────────────────────────────────┤
│ empty        │ growing      │ neighbors ∈ [2,3]    │ +0.3 │
│ occupied     │ shrinking    │ pressure > 0.8       │ -0.1 │
│ growing      │ stable       │ stable_for(10f, 0.05)│ 0.0  │
└─────────────────────────────────────────────────────┘

Physics Config:
  pressure_coefficient: 1.2
  wave_velocity: 2.0
  energy_decay: 0.98 (per frame)
  friction: 0.85`}</pre>
                </div>
              </div>
            );

          case 'list':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Loaded Rules:</div>
                <div className="space-y-2">
                  <div className="p-2 bg-black/30 rounded border border-violet-500/20 text-sm">
                    <div className="text-fuchsia-400">0x01: portfolio_ambient</div>
                    <div className="text-xs text-violet-300/60 pl-4">
                      3 transitions | Moore(8) | v1.0 | Active on 842,341 cells
                    </div>
                  </div>
                  <div className="p-2 bg-black/30 rounded border border-crimson-500/20 text-sm">
                    <div className="text-fuchsia-400">0x02: pressure_wave</div>
                    <div className="text-xs text-violet-300/60 pl-4">
                      5 transitions | Von Neumann(4) | v1.2 | Inactive
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown rule command: {ruleCmd}. Try: load, validate, compile, list</div>;
        }
      }

      // Cell operations
      if (subcommand === 'cell') {
        const cellCmd = args[0];
        switch (cellCmd) {
          case 'get':
            const getX = args[1] || '960';
            const getY = args[2] || '540';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Cell Data at ({getX}, {getY}):</div>
                <div className="p-3 bg-black/40 rounded border border-violet-500/20">
                  <pre className="text-xs text-violet-300/80">{`Cell {
  position: [${getX}.0, ${getY}.0],
  energy: 0.74,
  state: 0b00000011 (occupied=1, stable=1, type=1),
  influence: 50.0,
  rule_id: 0x01 (portfolio_ambient),
  pressure: 0.82,
  velocity: [1.2, -0.5],
  _padding: [0.0, 0.0]
}

Neighbors (Moore-8): 6 active
Last Updated: frame 1,247 (2.1s ago)`}</pre>
                </div>
              </div>
            );

          case 'set':
            const setX = args[1] || '960';
            const setY = args[2] || '540';
            const setState = args[3] || '0b00000001';
            return (
              <div className="text-violet-300/80 text-sm">
                Set cell at ({setX}, {setY}) → state={setState}
                <div className="text-fuchsia-400 text-xs mt-1">
                  ✓ Cell updated | Spatial hash refreshed | 8 neighbors notified
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown cell command: {cellCmd}. Try: get, set</div>;
        }
      }

      // Region operations
      if (subcommand === 'region') {
        const regionCmd = args[0];
        switch (regionCmd) {
          case 'get':
            const rx = args[1] || '100';
            const ry = args[2] || '100';
            const rw = args[3] || '50';
            const rh = args[4] || '50';
            const regionCells = parseInt(rw) * parseInt(rh);
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Region Data: ({rx}, {ry}) {rw}×{rh}</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Extracting {regionCells.toLocaleString()} cells...</div>
                  <div>→ Converting to Float32Array ({(regionCells * 64).toLocaleString()} bytes)...</div>
                  <div className="text-fuchsia-400 mt-2">
                    ✓ Region extracted | Active cells: {Math.floor(regionCells * 0.4)} | Avg energy: 0.62
                  </div>
                </div>
              </div>
            );

          case 'assign-rule':
            const ruleId = args[1] || '0x01';
            const arx = args[2] || '0';
            const ary = args[3] || '0';
            const arw = args[4] || '1920';
            const arh = args[5] || '1080';
            return (
              <div className="text-violet-300/80 text-sm">
                Assigning rule {ruleId} to region ({arx}, {ary}) {arw}×{arh}...
                <div className="text-fuchsia-400 text-xs mt-1">
                  ✓ {(parseInt(arw) * parseInt(arh)).toLocaleString()} cells updated | Rule engine reconfigured
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown region command: {regionCmd}. Try: get, assign-rule</div>;
        }
      }

      // Inject energy
      if (subcommand === 'inject') {
        const x = args[0] || '960';
        const y = args[1] || '540';
        const energy = args[2] || '0.8';
        const radius = flags.radius || '50';
        const affectedCells = Math.floor(Math.PI * parseInt(radius as string) ** 2);
        return (
          <div className="space-y-2">
            <div className="text-violet-400">Injecting energy at ({x}, {y})</div>
            <div className="text-violet-300/80 text-sm">
              <div>Energy: <span className="text-fuchsia-400">{energy}</span> | Radius: <span className="text-crimson-400">{radius}px</span></div>
              <div className="text-fuchsia-400 text-xs mt-1">
                ✓ Wave propagating... <span className="text-crimson-400">{affectedCells}</span> cells affected | 
                Velocity: 2.0px/frame
              </div>
            </div>
          </div>
        );
      }

      // Query operations
      if (subcommand === 'query') {
        const queryType = args[0];
        switch (queryType) {
          case 'stability':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Stability Metric:</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>Current: <span className="text-fuchsia-400">0.91</span> (Stable)</div>
                  <div>Last 10 frames: <span className="text-violet-300/60">[0.89, 0.90, 0.91, 0.92, 0.91, 0.90, 0.91, 0.92, 0.91, 0.91]</span></div>
                  <div>Trend: <span className="text-fuchsia-400">↑ Increasing</span> (+0.02 over 1s)</div>
                  <div className="text-xs text-violet-300/60 mt-2">
                    Stability: 0.0 = chaos (all cells changing), 1.0 = fully stable
                  </div>
                </div>
              </div>
            );

          case 'entropy':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">System Entropy:</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>Current: <span className="text-fuchsia-400">0.38</span></div>
                  <div>State Distribution:</div>
                  <div className="pl-4 text-xs space-y-0.5">
                    <div>Empty: <span className="text-violet-400">58.4%</span></div>
                    <div>Occupied: <span className="text-fuchsia-400">31.2%</span></div>
                    <div>Growing: <span className="text-crimson-400">8.1%</span></div>
                    <div>Stable: <span className="text-violet-400">2.3%</span></div>
                  </div>
                  <div className="text-xs text-violet-300/60 mt-2">
                    Lower entropy = more ordered/predictable system
                  </div>
                </div>
              </div>
            );

          case 'performance':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Performance Statistics:</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1 text-violet-300/80">
                    <div className="text-crimson-400">Frame Timing</div>
                    <div>Step Time: <span className="text-fuchsia-400">2.3ms</span> (avg)</div>
                    <div>Min/Max: <span className="text-violet-400">1.8ms / 4.2ms</span></div>
                    <div>Target (60fps): <span className="text-fuchsia-400">16.67ms</span></div>
                    <div>Headroom: <span className="text-fuchsia-400">+14.37ms</span> (86%)</div>
                  </div>
                  <div className="space-y-1 text-violet-300/80">
                    <div className="text-crimson-400">Compute Pipeline</div>
                    <div>GPU Utilization: <span className="text-fuchsia-400">34%</span></div>
                    <div>Workgroups: <span className="text-violet-400">7,680</span> (16×16)</div>
                    <div>Shader Invocations: <span className="text-fuchsia-400">2.07M</span></div>
                    <div>Buffer Swaps: <span className="text-violet-400">1,247</span></div>
                  </div>
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown query type: {queryType}. Try: stability, entropy, performance</div>;
        }
      }

      // Benchmark
      if (subcommand === 'benchmark') {
        const iterations = parseInt(flags.iterations as string) || 200000;
        return (
          <div className="space-y-2">
            <div className="text-violet-400">Running CA Benchmark Suite ({iterations.toLocaleString()} iterations)...</div>
            <div className="text-violet-300/80 text-sm space-y-2">
              <div>→ Testing 10 rule variations...</div>
              <div className="space-y-1 text-xs">
                <div>Moore(8) + 3 transitions: <span className="text-fuchsia-400">2.1ms/step</span> (476fps)</div>
                <div>Von Neumann(4) + 5 transitions: <span className="text-fuchsia-400">1.8ms/step</span> (555fps)</div>
                <div>Moore(16) + 8 transitions: <span className="text-fuchsia-400">3.4ms/step</span> (294fps)</div>
              </div>
              <div className="text-fuchsia-400 mt-2">
                ✓ Benchmark complete! Avg: <span className="text-crimson-400">2.4ms/step</span> | 
                GPU Speedup: <span className="text-crimson-400">~18.3×</span> vs CPU
              </div>
              <div className="text-violet-300/60 text-xs">
                All configurations meet 60fps target (16.67ms budget)
              </div>
            </div>
          </div>
        );
      }

      // Profile
      if (subcommand === 'profile') {
        const duration = parseInt(flags.duration as string) || 5;
        return (
          <div className="space-y-2">
            <div className="text-violet-400">Profiling WebGPU compute pipeline ({duration}s)...</div>
            <div className="text-violet-300/80 text-sm space-y-1">
              <div>→ Capturing GPU timeline...</div>
              <div>→ Sampling shader invocations...</div>
              <div>→ Analyzing buffer transfer overhead...</div>
              <div className="mt-2 p-3 bg-black/40 rounded border border-violet-500/20">
                <div className="text-xs space-y-1">
                  <div className="text-crimson-400">Pipeline Breakdown:</div>
                  <div>Shader Compute: <span className="text-fuchsia-400">1.8ms</span> (78%)</div>
                  <div>Buffer Transfer: <span className="text-violet-400">0.3ms</span> (13%)</div>
                  <div>CPU Overhead: <span className="text-violet-400">0.2ms</span> (9%)</div>
                  <div className="text-fuchsia-400 mt-2">Total: 2.3ms/frame</div>
                </div>
              </div>
              <div className="text-violet-300/60 text-xs">
                Bottleneck: Shader compute (opportunity for optimization)
              </div>
            </div>
          </div>
        );
      }

      // Debug
      if (subcommand === 'debug') {
        return (
          <div className="space-y-2">
            <div className="text-violet-400">CA Engine Debug Information:</div>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-black/40 rounded border border-violet-500/20">
                <div className="text-crimson-400 mb-2">Buffer States:</div>
                <div className="text-xs space-y-1 text-violet-300/80">
                  <div>Active Buffer: <span className="text-fuchsia-400">A</span> (read/compute)</div>
                  <div>Write Buffer: <span className="text-fuchsia-400">B</span> (GPU writing)</div>
                  <div>Swap Queue: <span className="text-fuchsia-400">C</span> (ready)</div>
                  <div>Lock Status: <span className="text-fuchsia-400">UNLOCKED</span> (atomic swap ready)</div>
                </div>
              </div>
              <div className="p-3 bg-black/40 rounded border border-violet-500/20">
                <div className="text-crimson-400 mb-2">Spatial Hash Map:</div>
                <div className="text-xs space-y-1 text-violet-300/80">
                  <div>Buckets: <span className="text-fuchsia-400">1,024</span> (32×32 grid)</div>
                  <div>Avg Load: <span className="text-fuchsia-400">2,026 cells/bucket</span></div>
                  <div>Max Load: <span className="text-violet-400">3,124 cells</span> (bucket 487)</div>
                  <div>Lookup Time: <span className="text-fuchsia-400">O(1)</span> avg</div>
                </div>
              </div>
              <div className="p-3 bg-black/40 rounded border border-violet-500/20">
                <div className="text-crimson-400 mb-2">WASM Memory:</div>
                <div className="text-xs space-y-1 text-violet-300/80">
                  <div>Heap Size: <span className="text-fuchsia-400">126MB</span> / 2GB limit</div>
                  <div>SharedArrayBuffer: <span className="text-fuchsia-400">ENABLED</span></div>
                  <div>Zero-copy: <span className="text-fuchsia-400">ACTIVE</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Simulate
      if (subcommand === 'simulate') {
        const fps = flags.fps || '60';
        const useGpu = flags.gpu !== false;
        return (
          <div className="space-y-2">
            <div className="text-violet-400">Starting Real-Time CA Simulation</div>
            <div className="text-violet-300/80 text-sm space-y-1">
              <div>Target FPS: <span className="text-fuchsia-400">{fps}</span></div>
              <div>Compute Mode: <span className="text-crimson-400">{useGpu ? 'WebGPU' : 'CPU (rayon)'}</span></div>
              <div>Grid: <span className="text-violet-400">1920×1080</span> (2.07M cells)</div>
              <div className="text-fuchsia-400 mt-2">
                [Simulation running... Press Ctrl+C to stop]
              </div>
              <div className="text-violet-300/60 text-xs">
                Frame 1,247 | 2.3ms/frame | Stability: 0.91 | Entropy: 0.38
              </div>
            </div>
          </div>
        );
      }

      return <div className="text-crimson-400">Unknown ca command: {subcommand}. Type 'help' for full CA command reference.</div>;
    }

    // File system commands
    if (command === 'fs') {
      if (!subcommand) {
        return <div className="text-crimson-400">Usage: fs &lt;ls|cat|tree&gt; [path]</div>;
      }

      switch (subcommand) {
        case 'ls':
          const lsPath = args[0] || currentPath;
          const lsNode = findFile(lsPath);
          if (!lsNode) {
            return <div className="text-crimson-400">Path not found: {lsPath}</div>;
          }
          return listDirectory(lsNode);

        case 'cat':
          const catPath = args[0];
          if (!catPath) {
            return <div className="text-crimson-400">Usage: fs cat &lt;file&gt;</div>;
          }
          const catNode = findFile(catPath);
          if (!catNode) {
            return <div className="text-crimson-400">File not found: {catPath}</div>;
          }
          if (catNode.type !== 'file') {
            return <div className="text-crimson-400">Not a file: {catPath}</div>;
          }
          return (
            <pre className="text-violet-300/80 text-xs overflow-x-auto whitespace-pre-wrap">
              {catNode.content}
            </pre>
          );

        case 'tree':
          return (
            <div className="text-violet-300/80 text-sm font-mono">
              <div className="text-fuchsia-400">/</div>
              <div>├── config/</div>
              <div>│   ├── site.yaml</div>
              <div>│   ├── ca-rules.json</div>
              <div>│   └── state-snapshot.bin</div>
              <div>└── projects/</div>
              <div>    ├── github-analysis.md</div>
              <div>    └── consim.md</div>
            </div>
          );

        default:
          return <div className="text-crimson-400">Unknown fs command: {subcommand}</div>;
      }
    }

    // Project commands
    if (command === 'project') {
      if (subcommand === 'list') {
        return (
          <div className="space-y-2 text-sm">
            <div className="text-violet-400">Portfolio Projects:</div>
            <div className="space-y-3">
              <div className="border-l-2 border-crimson-500/50 pl-3">
                <div className="text-fuchsia-400">GitHub Repository Language Analysis</div>
                <div className="text-violet-300/60 text-xs">1,200 repos • Interactive dashboard • Rust/TypeScript dominance</div>
              </div>
              <div className="border-l-2 border-violet-500/50 pl-3">
                <div className="text-fuchsia-400">CONSIM - Consciousness Simulator</div>
                <div className="text-violet-300/60 text-xs">GPU-accelerated • 20× speedup • PyTorch/JAX/Numba</div>
              </div>
              <div className="border-l-2 border-fuchsia-500/50 pl-3">
                <div className="text-fuchsia-400">WeGo Transit Performance Analysis</div>
                <div className="text-violet-300/60 text-xs">338K records • 79.69% on-time • Route optimization</div>
              </div>
            </div>
          </div>
        );
      }
    }

    // Original commands
    if (command === 'neofetch') {
      return (
        <div className="font-mono text-xs">
          <div className="grid grid-cols-[auto_1fr] gap-x-4">
            <div className="text-crimson-400">
              {`     ▄▄▄▄▄▄▄
    ███████████
   ▐████████████
  ▐█████▀▀██████▌
 ▐█████    ██████▌
▐██████▄▄███████▌
 ████████████████
  ▀█████████████▀`}
            </div>
            <div className="text-violet-300/80 space-y-1">
              <div><span className="text-fuchsia-400">jacob</span>@<span className="text-crimson-400">portfolio</span></div>
              <div className="border-b border-violet-500/30 pb-1"></div>
              <div><span className="text-violet-400">OS:</span> Portfolio OS v3.0</div>
              <div><span className="text-violet-400">Kernel:</span> React + TypeScript + Rust/WASM</div>
              <div><span className="text-violet-400">Shell:</span> Advanced Multi-Suite CLI</div>
              <div><span className="text-violet-400">Packages:</span> ssg, ca-engine (WebGPU), project-indexer</div>
              <div><span className="text-violet-400">Theme:</span> Cyberpunk [Crimson/Violet]</div>
              <div><span className="text-violet-400">CPU:</span> Data Analysis + Software Dev Unit</div>
              <div><span className="text-violet-400">GPU:</span> WebGPU + PyTorch Compute</div>
              <div><span className="text-violet-400">Memory:</span> 126MB CA Grid (2.07M cells)</div>
            </div>
          </div>
        </div>
      );
    }

    if (command === 'about') {
      return (
        <div className="space-y-2">
          <div className="text-fuchsia-400">Jacob C. Smith - Advanced Systems Portfolio</div>
          <div className="text-violet-300/80 text-sm">
            This CLI demonstrates two sophisticated engineering systems:
          </div>
          <div className="pl-4 space-y-2 text-sm">
            <div>
              <div className="text-crimson-400">1. Static Site Generator (Python)</div>
              <div className="text-violet-300/70 text-xs pl-4">
                7-command suite: init, populate, build, dev, deploy, analyze<br/>
                Rich terminal UI • Async architecture • Type-safe config<br/>
                Lighthouse 98/100 • LCP: 0.8s • 124KB total size
              </div>
            </div>
            <div>
              <div className="text-violet-400">2. Cellular Automata Engine (Rust→WASM + WebGPU)</div>
              <div className="text-violet-300/70 text-xs pl-4">
                2.07M cells @ 60fps • Dual-buffer ring architecture<br/>
                WebGPU compute shaders • JSON→compiled rule engine<br/>
                Zero-copy SharedArrayBuffer • O(1) spatial hash<br/>
                Sub-5ms latency • Real-time physics simulation<br/>
                Time-travel debugging • Comprehensive profiling
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback
    return <div className="text-crimson-400">Command not found: {command}. Type 'help' for comprehensive command reference.</div>;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setSuggestions([]);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = commandIndex + 1;
        if (newIndex < commandHistory.length) {
          setCommandIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="relative w-full h-[700px] bg-black/40 backdrop-blur-xl rounded-2xl border border-violet-500/30 shadow-[0_0_50px_rgba(139,0,255,0.3)] overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-violet-950/50 to-crimson-950/50 border-b border-violet-500/30">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-crimson-500 shadow-[0_0_10px_rgba(220,20,60,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,0,255,0.8)]" />
            <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(157,78,221,0.8)]" />
          </div>
          <div className="flex items-center gap-2 text-violet-300/80">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-mono">jacob@portfolio-os:~{currentPath}</span>
          </div>
        </div>
        <div className="flex gap-3 text-xs text-violet-300/60">
          <div className="flex items-center gap-1">
            <FileCode className="w-3 h-3" />
            <span>SSG</span>
          </div>
          <div className="flex items-center gap-1">
            <Grid3x3 className="w-3 h-3" />
            <span>CA (WASM)</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>WebGPU</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-fuchsia-400" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="h-[calc(100%-160px)] overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-2">
            {item.command !== 'system' && (
              <div className="flex items-center gap-2 text-violet-400 font-mono text-sm">
                <span className="text-crimson-400">➜</span>
                <span className="text-fuchsia-400">~{currentPath}</span>
                <span className="text-violet-300">{item.command}</span>
              </div>
            )}
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-[72px] left-6 right-6 bg-black/90 border border-violet-500/30 rounded-lg p-2 backdrop-blur-xl">
          <div className="text-xs text-violet-300/60 mb-1">Suggestions (press Tab):</div>
          {suggestions.map((sug, idx) => (
            <div key={idx} className="text-sm text-violet-300/80 hover:text-violet-300 cursor-pointer font-mono py-0.5">
              {sug}
            </div>
          ))}
        </div>
      )}

      {/* Terminal Input */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/60 to-transparent border-t border-violet-500/20">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-crimson-400">➜</span>
          <span className="text-fuchsia-400">~{currentPath}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-violet-300 placeholder-violet-500/40"
            placeholder="Type 'help' to begin..."
            autoFocus
          />
          <span className="w-2 h-4 bg-violet-400 animate-pulse" />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 0, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 0, 255, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 0, 255, 0.6);
        }
      `}</style>
    </div>
  );
}
