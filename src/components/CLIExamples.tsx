import { Terminal, Copy, CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface CommandExample {
  category: string;
  description: string;
  command: string;
  expected: string;
}

const EXAMPLES: CommandExample[] = [
  // Basic Commands
  {
    category: 'Getting Started',
    description: 'Show all available commands and suites',
    command: 'help',
    expected: 'Displays SSG, CA, and File System commands'
  },
  {
    category: 'Getting Started',
    description: 'Display system information',
    command: 'neofetch',
    expected: 'Shows ASCII art with portfolio system info'
  },
  {
    category: 'Getting Started',
    description: 'About this CLI and systems',
    command: 'about',
    expected: 'Overview of SSG and CA engines'
  },

  // Static Site Generator
  {
    category: 'Static Site Generator (SSG)',
    description: 'Initialize a new project',
    command: 'ssg init',
    expected: 'Creates config files and directory structure'
  },
  {
    category: 'Static Site Generator (SSG)',
    description: 'Build site with optimizations',
    command: 'ssg build --minify --optimize',
    expected: 'Builds with CSS minification and image optimization'
  },
  {
    category: 'Static Site Generator (SSG)',
    description: 'Deploy to specific platform',
    command: 'ssg deploy --platform=netlify',
    expected: 'Deploys to Netlify with SSL configuration'
  },
  {
    category: 'Static Site Generator (SSG)',
    description: 'Performance analysis report',
    command: 'ssg analyze',
    expected: 'Shows Lighthouse scores and Core Web Vitals'
  },

  // Cellular Automata
  {
    category: 'Cellular Automata (CA)',
    description: 'Initialize grid with dimensions',
    command: 'ca grid init 1920 1080',
    expected: 'Allocates 2M cell grid with WebGPU context'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Run multiple simulation steps',
    command: 'ca grid step --count=10',
    expected: 'Executes 10 steps and shows performance metrics'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Display grid statistics',
    command: 'ca grid info',
    expected: 'Shows dimensions, active cells, stability, energy'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Load rule configuration',
    command: 'ca rule load config/ca-rules.json',
    expected: 'Compiles and loads transition rules'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Validate rule file',
    command: 'ca rule validate',
    expected: 'Checks schema, transitions, and physics params'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Inject energy at coordinates',
    command: 'ca inject 960 540 0.8',
    expected: 'Injects energy=0.8 at center with wave propagation'
  },
  {
    category: 'Cellular Automata (CA)',
    description: 'Start real-time simulation',
    command: 'ca simulate --fps=60',
    expected: 'Begins GPU compute pipeline at 60fps'
  },

  // File System
  {
    category: 'File System',
    description: 'List current directory',
    command: 'fs ls',
    expected: 'Shows files and folders in current path'
  },
  {
    category: 'File System',
    description: 'List specific directory',
    command: 'fs ls config',
    expected: 'Shows site.yaml and ca-rules.json'
  },
  {
    category: 'File System',
    description: 'View file contents',
    command: 'fs cat config/site.yaml',
    expected: 'Displays site configuration YAML'
  },
  {
    category: 'File System',
    description: 'View directory tree',
    command: 'fs tree',
    expected: 'Shows full directory structure'
  },

  // Portfolio Navigation
  {
    category: 'Portfolio Info',
    description: 'List all projects',
    command: 'project list',
    expected: 'Shows GitHub Analysis, CONSIM, WeGo Transit'
  },
];

export function CLIExamples() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const copyCommand = async (command: string, index: number) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(command);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        // Fallback: create temporary textarea and use execCommand
        const textarea = document.createElement('textarea');
        textarea.value = command;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        
        try {
          document.execCommand('copy');
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textarea);
      }
    } catch (err) {
      // Silently fail - clipboard API might be blocked
      console.log('Copy not available:', err);
      
      // Still show visual feedback even if copy fails
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);
    }
  };

  const categories = Array.from(new Set(EXAMPLES.map(e => e.category)));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="w-full bg-black/30 backdrop-blur-xl rounded-2xl border border-violet-500/20 shadow-[0_0_40px_rgba(139,0,255,0.2)]">
        <CollapsibleTrigger className="w-full p-8 text-left hover:bg-violet-500/5 transition-colors rounded-t-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-fuchsia-400" />
              <h3 className="text-2xl text-violet-300">CLI Command Examples</h3>
            </div>
            <ChevronDown 
              className={`w-6 h-6 text-violet-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-8 pb-8">
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-lg text-crimson-400 border-b border-crimson-500/30 pb-2">
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {EXAMPLES.filter(e => e.category === category).map((example, idx) => {
                      const globalIdx = EXAMPLES.indexOf(example);
                      return (
                        <div
                          key={globalIdx}
                          className="bg-black/40 rounded-lg p-4 border border-violet-500/20 hover:border-violet-500/40 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <p className="text-violet-300/80 text-sm mb-2">
                                {example.description}
                              </p>
                              <div className="flex items-center gap-2">
                                <code className="flex-1 bg-black/60 px-4 py-2 rounded text-fuchsia-400 font-mono text-sm border border-crimson-500/30">
                                  {example.command}
                                </code>
                                <button
                                  onClick={() => copyCommand(example.command, globalIdx)}
                                  className="p-2 rounded bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 transition-colors"
                                  title="Copy command"
                                >
                                  {copiedIndex === globalIdx ? (
                                    <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-violet-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-violet-300/60 pl-4 border-l-2 border-violet-500/30 mt-2">
                            Expected: {example.expected}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-violet-500/20">
              <div className="text-sm text-violet-300/70 space-y-2">
                <p className="text-fuchsia-400">💡 Pro Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-violet-300/60 pl-4">
                  <li>Use <code className="text-crimson-400 bg-black/40 px-1 rounded">Tab</code> for autocomplete</li>
                  <li>Use <code className="text-crimson-400 bg-black/40 px-1 rounded">↑/↓</code> arrows to navigate command history</li>
                  <li>Combine flags: <code className="text-fuchsia-400 bg-black/40 px-1 rounded">ssg build --minify --optimize</code></li>
                  <li>Type <code className="text-fuchsia-400 bg-black/40 px-1 rounded">clear</code> to reset the terminal</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
