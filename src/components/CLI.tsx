import { useState, useEffect, useRef } from 'react';
import { Terminal, FileCode, Grid3x3, Zap, Settings, TrendingUp } from 'lucide-react';

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
    } else if (!subcommand && ['init', 'populate', 'build', 'dev', 'deploy', 'analyze', 'grid', 'rule', 'inject', 'step'].includes(part)) {
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
          <div className="text-fuchsia-400">╔═══════════════════════════════════════════════════════════╗</div>
          <div className="text-fuchsia-400">║   JACOB C. SMITH — PORTFOLIO COMMAND CENTER              ║</div>
          <div className="text-fuchsia-400">╚═══════════════════════════════════════════════════════════╝</div>
          <div className="text-violet-300/80 text-sm mt-3">
            Systems Online: <span className="text-crimson-400">[Static Site Generator]</span> <span className="text-violet-400">[Cellular Automata Engine]</span>
          </div>
          <div className="text-violet-300/60 text-sm">Type <span className="text-crimson-400">help</span> for available commands</div>
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
      'ca grid init', 'ca grid step', 'ca grid info', 'ca grid export',
      'ca rule load', 'ca rule list', 'ca rule validate',
      'ca inject', 'ca simulate',
      'fs ls', 'fs cat', 'fs tree', 'fs edit',
      'project list', 'project show', 'skills', 'experience', 'contact'
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

    // Help system
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
              <span className="text-violet-300/60 text-sm">— Cellular Automata Engine</span>
            </div>
            <div className="pl-6 text-xs text-violet-300/80 space-y-0.5">
              <div><span className="text-crimson-400">grid init</span> [width] [height] - Create grid</div>
              <div><span className="text-crimson-400">grid step</span> [--count=10] - Run simulation steps</div>
              <div><span className="text-crimson-400">grid info</span> - Display grid statistics</div>
              <div><span className="text-crimson-400">rule load</span> [file] - Load rule configuration</div>
              <div><span className="text-crimson-400">rule validate</span> [file] - Validate rules</div>
              <div><span className="text-crimson-400">inject</span> [x] [y] [energy] - Inject energy</div>
              <div><span className="text-crimson-400">simulate</span> [--fps=60] - Start real-time sim</div>
            </div>
          </div>

          <div className="border-l-2 border-fuchsia-500/50 pl-4 space-y-1">
            <div className="text-fuchsia-400">File System & Utilities</div>
            <div className="pl-6 text-xs text-violet-300/80 space-y-0.5">
              <div><span className="text-crimson-400">fs ls</span> [path] - List directory</div>
              <div><span className="text-crimson-400">fs cat</span> [file] - Display file contents</div>
              <div><span className="text-crimson-400">fs tree</span> - Show directory tree</div>
              <div><span className="text-crimson-400">project list</span> - List all projects</div>
              <div><span className="text-crimson-400">neofetch</span> - System information</div>
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

    // Cellular Automata commands
    if (command === 'ca') {
      if (!subcommand) {
        return <div className="text-crimson-400">Usage: ca &lt;command&gt; [args]. Type 'help' for details.</div>;
      }

      if (subcommand === 'grid') {
        const gridCmd = args[0];
        switch (gridCmd) {
          case 'init':
            const width = args[1] || '1920';
            const height = args[2] || '1080';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Initializing CA Grid Engine...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Allocating dual buffers ({width}×{height} = {(parseInt(width) * parseInt(height)).toLocaleString()} cells)</div>
                  <div>→ Compiling WGSL compute shaders...</div>
                  <div>→ Initializing WebGPU context...</div>
                  <div>→ Building spatial hash map...</div>
                  <div className="text-fuchsia-400 mt-2">Grid initialized! Memory: 48MB</div>
                </div>
              </div>
            );

          case 'step':
            const count = parseInt(flags.count as string) || 1;
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Running {count} simulation step{count > 1 ? 's' : ''}...</div>
                <div className="text-violet-300/80 text-sm">
                  <div>Step 1: 342 cells changed | Stability: 0.89 | Entropy: 0.42</div>
                  {count > 1 && <div>Step {count}: 127 cells changed | Stability: 0.94 | Entropy: 0.38</div>}
                  <div className="text-fuchsia-400 mt-2">Average: 2.3ms/step ({Math.floor(1000/2.3)}fps)</div>
                </div>
              </div>
            );

          case 'info':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Grid Statistics:</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1 text-violet-300/80">
                    <div>Dimensions: <span className="text-fuchsia-400">1920×1080</span></div>
                    <div>Total Cells: <span className="text-fuchsia-400">2,073,600</span></div>
                    <div>Active Cells: <span className="text-fuchsia-400">842,341</span></div>
                    <div>Stability: <span className="text-fuchsia-400">0.91</span></div>
                  </div>
                  <div className="space-y-1 text-violet-300/80">
                    <div>Avg Energy: <span className="text-fuchsia-400">0.34</span></div>
                    <div>Avg Pressure: <span className="text-fuchsia-400">0.67</span></div>
                    <div>Wave Velocity: <span className="text-fuchsia-400">2.0</span></div>
                    <div>GPU Compute: <span className="text-fuchsia-400">Active</span></div>
                  </div>
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown grid command: {gridCmd}</div>;
        }
      }

      if (subcommand === 'rule') {
        const ruleCmd = args[0];
        switch (ruleCmd) {
          case 'load':
            const file = args[1] || 'config/ca-rules.json';
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Loading rule: {file}</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>→ Parsing JSON configuration...</div>
                  <div>→ Validating transition rules...</div>
                  <div>→ Compiling rule engine...</div>
                  <div className="text-fuchsia-400 mt-2">Rule loaded: <span className="text-crimson-400">portfolio_ambient</span></div>
                  <div className="text-violet-300/60 text-xs">3 transitions | Moore neighborhood | Parallel compute</div>
                </div>
              </div>
            );

          case 'validate':
            return (
              <div className="space-y-2">
                <div className="text-violet-400">Validating rules...</div>
                <div className="text-violet-300/80 text-sm space-y-1">
                  <div>✓ Schema valid</div>
                  <div>✓ Transitions well-formed</div>
                  <div>✓ Physics parameters in range</div>
                  <div>✓ No circular dependencies</div>
                  <div className="text-fuchsia-400 mt-2">Validation passed!</div>
                </div>
              </div>
            );

          default:
            return <div className="text-crimson-400">Unknown rule command: {ruleCmd}</div>;
        }
      }

      if (subcommand === 'inject') {
        const x = args[0] || '960';
        const y = args[1] || '540';
        const energy = args[2] || '0.8';
        return (
          <div className="text-violet-300/80 text-sm">
            Injected energy={energy} at ({x}, {y}) with radius=50
            <div className="text-fuchsia-400 text-xs mt-1">Wave propagating... 234 cells affected</div>
          </div>
        );
      }

      if (subcommand === 'simulate') {
        const fps = flags.fps || '60';
        return (
          <div className="space-y-2">
            <div className="text-violet-400">Starting real-time simulation @ {fps}fps</div>
            <div className="text-violet-300/80 text-sm">
              <div>WebGPU compute pipeline active</div>
              <div>Press Ctrl+C to stop</div>
              <div className="text-fuchsia-400 mt-2">[Simulation running...]</div>
            </div>
          </div>
        );
      }

      return <div className="text-crimson-400">Unknown ca command: {subcommand}</div>;
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
              <div>│   └── ca-rules.json</div>
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
              <div><span className="text-violet-400">Packages:</span> ssg, ca-engine, project-indexer</div>
              <div><span className="text-violet-400">Theme:</span> Cyberpunk [Crimson/Violet]</div>
              <div><span className="text-violet-400">CPU:</span> Data Analysis + Software Dev Unit</div>
              <div><span className="text-violet-400">GPU:</span> WebGPU + PyTorch Compute</div>
            </div>
          </div>
        </div>
      );
    }

    if (command === 'about') {
      return (
        <div className="space-y-2">
          <div className="text-fuchsia-400">Jacob C. Smith - Systems Portfolio</div>
          <div className="text-violet-300/80 text-sm">
            This CLI demonstrates two sophisticated systems:
          </div>
          <div className="pl-4 space-y-2 text-sm">
            <div>
              <div className="text-crimson-400">1. Static Site Generator (Python)</div>
              <div className="text-violet-300/70 text-xs pl-4">
                7-command suite: init, populate, build, dev, deploy, analyze<br/>
                Rich terminal UI • Async architecture • Type-safe config
              </div>
            </div>
            <div>
              <div className="text-violet-400">2. Cellular Automata Engine (Rust/WASM)</div>
              <div className="text-violet-300/70 text-xs pl-4">
                2M cells @ 60fps • WebGPU compute shaders • Rule engine<br/>
                Real-time physics • Emergent behavior substrate
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback
    return <div className="text-crimson-400">Command not found: {command}. Type 'help' for available commands.</div>;
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
            <span>CA</span>
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
