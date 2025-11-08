import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import profileHeadshot from "figma:asset/1e42e0803e3ea034f2c4fdd694a5e0c9ef44be62.png";
import profileMulti from "figma:asset/c8ff9ce39a0fc32bb14fc831f4aa7497b6282fa6.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CLI } from "./components/CLI";
import { CLIExamples } from "./components/CLIExamples";
import { TechnicalSpecs } from "./components/TechnicalSpecs";
import { CodeSamples } from "./components/CodeSamples";
import { ResearchPapers } from "./components/ResearchPapers";
import { SystemArchitecture } from "./components/SystemArchitecture";
import { PerformanceMetrics } from "./components/PerformanceMetrics";
import { OpenSource } from "./components/OpenSource";
import { TechnicalStats } from "./components/TechnicalStats";
import { CellularAutomataShowcase } from "./components/CellularAutomataShowcase";
import { FloatingTechBadges } from "./components/FloatingTechBadges";
import { SystemMonitor } from "./components/SystemMonitor";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0015] via-[#1a0525] to-[#150010] relative overflow-hidden">
      {/* Professional Photo Showcase */}
      <div className="absolute top-0 right-0 w-[45%] h-[700px] opacity-30">
        <img
          src={profileMulti}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a0525]/60 to-[#0a0015]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0015]" />
        {/* Cyberpunk scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,0,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse" />
      </div>

      {/* Floating Tech Badges */}
      <FloatingTechBadges />

      {/* Radiating lines background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"
              style={{
                transform: `rotate(${i * 7.2}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b00ff08_1px,transparent_1px),linear-gradient(to_bottom,#dc143c08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Glow orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-pulse" />
      <div
        className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-crimson-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-24">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left lg:pr-12">
              <div className="inline-block mb-8 px-6 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-crimson-600/20 border border-violet-500/30 backdrop-blur-sm">
                <p className="text-violet-300/80">
                  Data Analyst • Software Developer • ML Researcher • Rural Tech Advocate
                </p>
              </div>
              <h1 className="text-6xl md:text-7xl bg-gradient-to-r from-violet-400 via-fuchsia-300 to-crimson-400 bg-clip-text text-transparent mb-6 pb-2">
                Jacob C. Smith
              </h1>
              <p className="text-xl text-violet-200/70 max-w-2xl mb-12 leading-relaxed">
                Bridging analytics and advanced computing from rural West Virginia.
                Over a decade of professional experience spanning team leadership (2011-2018)
                and B2B sales (2018-2024), now focused on data engineering, ML research,
                and theoretical frameworks—from enterprise dashboards to quantum formulations.
              </p>
              <div className="flex flex-wrap gap-6 text-violet-300/80">
                <a
                  href="tel:3044739980"
                  className="flex items-center gap-2 hover:text-violet-300 transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  (304) 473-9980
                </a>
                <a
                  href="mailto:jacobcsmithd@gmail.com"
                  className="flex items-center gap-2 hover:text-violet-300 transition-all hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  jacobcsmithd@gmail.com
                </a>
                <a
                  href="https://github.com/Jacobcdsmith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-violet-300 transition-all hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  github.com/Jacobcdsmith
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Buckhannon, WV
                </span>
              </div>
            </div>

            {/* Right Column - Professional Photo */}
            <div className="relative lg:block hidden">
              <div className="relative w-[380px] h-[500px] rounded-2xl overflow-hidden border-2 border-violet-500/30 shadow-[0_0_60px_rgba(139,0,255,0.4)]">
                <img
                  src={profileHeadshot}
                  alt="Jacob C. Smith - Professional Headshot"
                  className="w-full h-full object-cover"
                />
                {/* Neon border glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-crimson-600/20 via-transparent to-violet-600/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-crimson-600/10" />
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,0,255,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-fuchsia-400/60" />
                <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-crimson-400/60" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-violet-400/60" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-fuchsia-400/60" />
              </div>
              {/* Floating data points */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-600/20 rounded-full blur-xl animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-crimson-600/20 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>

        {/* Technical Stats Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
              By The Numbers
            </h2>
            <p className="text-violet-300/70 max-w-2xl mx-auto">
              Quantified impact across projects, commits, and computational performance
            </p>
          </div>
          <TechnicalStats />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="w-full mb-24">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-gradient-to-r from-violet-950/60 to-crimson-950/60 backdrop-blur-xl border border-violet-500/30 p-1.5 h-auto mb-16 mx-auto rounded-2xl gap-1">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Technical
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Code
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Research
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="opensource"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Open Source
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_25px_rgba(139,0,255,0.6)] text-violet-300/70 hover:text-violet-200 transition-all rounded-xl py-3 text-xs lg:text-sm"
            >
              Education
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Featured Work
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                From enterprise data analytics to theoretical mathematics and ML research—
                spanning knowledge systems, consciousness frameworks, and production-ready applications.
              </p>
            </div>

            {/* Cellular Automata Showcase */}
            <CellularAutomataShowcase />

            <ProjectCard
              title="GitHub Repository Language Analysis — Capstone"
              description="200k+ repository records analyzing 12 programming languages with enterprise-grade data pipeline. Built interactive React/TypeScript dashboard with Tailwind, deployed via Netlify CI/CD. Comprehensive analysis via Jupyter notebooks with 3D visualizations, correlation studies, and statistical modeling. Deliverables include PowerPoint presentation, PDF report, and production-ready web application."
              image="https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIwMjk2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              links={[
                {
                  label: "Capstone",
                  url: "https://www.notion.so/GitHub-Repository-Language-Analysis-Capstone-295336891f3680038aa3c0a8246b959b?pvs=21",
                },
                {
                  label: "Dashboard Spec",
                  url: "https://www.notion.so/GitHub-Language-Dashboard-Spec-v1-Starter-aadbf6ac2b1b42d680eedfdd0e3b47ff?pvs=21",
                },
              ]}
            />

            <ProjectCard
              title="Knowledge Management System — Notion Infrastructure"
              description="Enterprise-scale knowledge extraction system with 5 core databases (Master Resource Index, Source Tracker, Topic Taxonomy, Connection Graph, Update Pipeline). Auto-pulls from 20+ data sources including HackerNews, arXiv, GitHub, Medium. Features auto-classification, connection detection, trend analysis, and production-ready architecture supporting 10k-100k resources."
              image="https://images.unsplash.com/photo-1738082956220-a1f20a8632ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbm93bGVkZ2UlMjBncmFwaCUyMG5ldHdvcmt8ZW58MXx8fHwxNzYyMDg0MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <ProjectCard
              title="Mean Curvature Flow (MCF) Framework — Advanced Mathematics"
              description="Complete differential geometry framework with quantum computing formulations (VQE), neural network implementations (SIREN, implicit neural networks), and ML integration. Includes federated learning approaches and real-time WebGPU implementations. Bridges theoretical mathematics with practical computational applications."
              image="https://images.unsplash.com/photo-1758685734312-5134968399a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljYWwlMjBlcXVhdGlvbnMlMjBwaHlzaWNzfGVufDF8fHx8MTc2MjE1OTE0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <ProjectCard
              title="CONSIM — Multiversal Consciousness Framework"
              description="Theoretical and computational framework exploring consciousness detection metrics. Built signal-analysis pipeline surfacing latent relationships via frequency signatures Φ(x) and temporal phase τ(x). Accelerated core computations ~20× with GPU (NumPy, Numba, PyTorch, JAX). Real-time tracking of phase coherence, mutual information, and metric-invariant consciousness signatures."
              image="https://images.unsplash.com/photo-1755455840466-85747052a634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjIxNTkxNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              links={[
                {
                  label: "GitHub Repository",
                  url: "https://github.com/Jacobcdsmith/CONSIM",
                  isGithub: true,
                },
              ]}
            />

            <ProjectCard
              title="WeGo Public Transit Performance — Case Study"
              description="338,861 records across 8 routes. On‑time 79.69%, Early 2.88%, Late 17.42%. Recommendations: target bottom‑decile operators, reschedule underperforming routes, adjust Friday/late‑night windows."
              image="https://images.unsplash.com/photo-1670039765868-a9d357257559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjB0cmFuc2l0JTIwYnVzfGVufDF8fHx8MTc2MjA1MjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              links={[
                {
                  label: "Case Study",
                  url: "https://www.notion.so/WeGo-Public-Transit-Performance-Case-Study-62c5101bb9694a16847f7045b78d2d5d?pvs=21",
                },
              ]}
            />

            <ProjectCard
              title="Spotify Streaming Analytics Dashboard"
              description="Converted audio features into BI insights. Flagged high‑potential tracks using a 70% danceability heuristic and mapped artist collaboration networks."
              image="https://images.unsplash.com/photo-1650600538903-ec09f670c391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzYyMDM3MDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <ProjectCard
              title="Social Risk Assessment (prototype)"
              description="Prototyped geo‑risk mapping to prioritize interventions using open data and simple predictive features; produced choropleths and KPI summaries."
              image="https://images.unsplash.com/photo-1758873268113-326c61b29968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kJTIwbWFwJTIwZGlhZ3JhbXxlbnwxfHx8fDE3NjE5NzI1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <ProjectCard
              title="Traffic Accidents Analysis — NewForce Lab"
              description="Analyzed 200k+ public safety records to identify collision hotspots. Automated Excel Analysis ToolPak workflows; summarized high‑incidence segments."
              image="https://images.unsplash.com/photo-1724304013246-1abe63567e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc3RydWN0dXJlJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjE5NzI1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 mt-12">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Hardware Projects
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-2 border-violet-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Preloaded USB Toolkit
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Portable Linux environments with developer
                    toolchains and recovery suites.
                  </p>
                </div>
                <div className="border-l-2 border-fuchsia-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    SBC Provisioning
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Scripted compilers, SDKs, and dotfiles via
                    shell automation.
                  </p>
                </div>
                <div className="border-l-2 border-crimson-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Legacy Hardware Resurrection
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Repurposed devices with custom ROMs and
                    lightweight distros; kernel tuning for
                    performance.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Technical Specs Tab */}
          <TabsContent value="technical" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Technical Specifications
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Deep-dive into system architecture, performance characteristics, and
                implementation details across major projects.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-[1fr_300px] gap-6">
              <div className="space-y-6">
                <TechnicalSpecs />
              </div>
              <div className="lg:sticky lg:top-6 h-fit">
                <SystemMonitor />
              </div>
            </div>
          </TabsContent>

          {/* System Architecture Tab */}
          <TabsContent value="architecture" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                System Architecture
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Layer-by-layer breakdown of complex systems: data flow, component
                interaction, and computational pipelines.
              </p>
            </div>
            <SystemArchitecture />
          </TabsContent>

          {/* Code Samples Tab */}
          <TabsContent value="code" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Code Samples
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Production-quality code spanning Rust, Python, TypeScript, WGSL—from
                GPU kernels to async state management.
              </p>
            </div>
            <CodeSamples />
          </TabsContent>

          {/* Research Papers Tab */}
          <TabsContent value="research" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Research & Whitepapers
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Formal investigations into consciousness detection, differential
                geometry, and high-performance computing with rigorous methodology.
              </p>
            </div>
            <ResearchPapers />
          </TabsContent>

          {/* Performance Metrics Tab */}
          <TabsContent value="performance" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Performance & Benchmarks
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Quantified improvements with before/after metrics, optimization
                techniques, and hardware profiling results.
              </p>
            </div>
            <PerformanceMetrics />
          </TabsContent>

          {/* Open Source Tab */}
          <TabsContent value="opensource" className="space-y-8">
            <OpenSource />
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Professional Journey
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Over a decade of professional experience across
                team leadership, sales, and account management (2011-2024).
              </p>
            </div>
            <ExperienceCard
              title="Account Manager"
              company="FleetPride"
              period="Sept 2022 – Jun 2024"
              achievements={[
                "Grew territory revenue ~18% YoY by analyzing purchasing patterns and packaging segment‑specific bundles.",
                "Led region‑best gross‑profit retention via dashboard‑driven account reviews and renewal cadences.",
              ]}
            />

            <ExperienceCard
              title="Outside Sales Representative"
              company="Cole Truck Parts"
              period="Aug 2021 – Sept 2022"
              achievements={[
                "Won net‑new B2B accounts using targeted outreach informed by CRM reporting and whitespace analysis.",
              ]}
            />

            <ExperienceCard
              title="Sales Agent"
              company="U.S. Cellular"
              period="Aug 2018 – May 2020"
              achievements={[
                "Exceeded monthly targets in 12 of 14 months by matching customer needs to technical device solutions.",
              ]}
            />

            <ExperienceCard
              title="Shift and Assistant Manager"
              company="Taco Bell; Tudor's Biscuit World"
              period="2011 – 2018"
              achievements={[
                "Led teams up to 15. Managed inventory, food safety, and peak‑hour throughput; improved shift consistency and reduced waste.",
              ]}
            />
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Technical Expertise
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Production data engineering and analytics combined with emerging ML/AI capabilities—
                from enterprise BI tools to quantum computing formulations and GPU-accelerated simulations.
              </p>
            </div>

            {/* Visual Skills Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-violet-500/30 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1737505599162-d9932323a889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwbm9kZXMlMjBjb25uZWN0aW9uc3xlbnwxfHx8fDE3NjE5NzI1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Programming and Development"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-[#0a0015]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text mb-2">
                    Development
                  </h3>
                  <p className="text-violet-300/80 text-sm">
                    Python • TypeScript • React • Rust/WASM
                  </p>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-crimson-500/30 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYXBoJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjE5NzI1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Data Analysis"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-[#0a0015]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl text-transparent bg-gradient-to-r from-crimson-400 to-pink-400 bg-clip-text mb-2">
                    Data & ML
                  </h3>
                  <p className="text-violet-300/80 text-sm">
                    ETL Pipelines • BI Dashboards • PyTorch • JAX
                  </p>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden border border-fuchsia-500/30 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717667745852-a5bd6876c1de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwY29ubmVjdGlvbnMlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjE5NzI1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Infrastructure"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-[#0a0015]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text mb-2">
                    Research
                  </h3>
                  <p className="text-violet-300/80 text-sm">
                    Quantum Computing • WebGPU • Neural Networks
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Python",
                  "SQL",
                  "JavaScript/TypeScript",
                  "React",
                  "Bash",
                  "Git/GitHub",
                  "PostgreSQL",
                  "Linux",
                  "Docker",
                  "Anaconda",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(139,0,255,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-crimson-950/40 to-fuchsia-950/40 rounded-xl border border-crimson-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-crimson-400 to-fuchsia-400 bg-clip-text mb-6">
                Emerging Technologies & Research
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Machine Learning",
                  "PyTorch",
                  "JAX",
                  "Numba",
                  "AI/LLM Integration",
                  "WebGPU",
                  "Rust/WASM",
                  "Quantum Computing",
                  "Differential Geometry",
                  "Neural Networks",
                  "Federated Learning",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-crimson-600/30 to-fuchsia-600/30 border border-crimson-500/40 text-violet-200 shadow-[0_0_15px_rgba(220,20,60,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                BI and Visualization
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Power BI",
                  "Tableau",
                  "Excel (Analysis ToolPak)",
                  "Plotly",
                  "Seaborn",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-crimson-600/30 to-pink-600/30 border border-crimson-500/40 text-violet-200 shadow-[0_0_15px_rgba(220,20,60,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Data Analytics
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "ETL Pipelines",
                  "Data Wrangling",
                  "Statistical Analysis",
                  "Reporting Automation",
                  "Interactive Dashboards",
                  "Jupyter Notebooks",
                  "Pandas/NumPy",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600/30 to-purple-600/30 border border-fuchsia-500/40 text-violet-200 shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Development Environment
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "VSCode",
                  "Cursor",
                  "Jupyter",
                  "Git/GitHub Actions",
                  "Netlify CI/CD",
                  "Model Context Protocol",
                  "Ollama",
                  "ComfyUI",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 border border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(139,0,255,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Strengths
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Clear communication",
                  "Fast pattern recognition",
                  "Translating abstract ideas",
                  "Context switching",
                  "User‑centric design",
                ].map((skill, i) => (
                  <span
                    key={skill}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600/30 to-crimson-600/30 border border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(139,0,255,0.2)] hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4">
                Education & Certifications
              </h2>
              <p className="text-violet-300/70 max-w-2xl mx-auto">
                Continuous learning through formal training and
                hands-on self-study.
              </p>
            </div>
            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text">
                    NewForce Cohort 11 — Data Analytics
                  </h3>
                  <p className="text-violet-300/80 mt-2">
                    Generation West Virginia
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-violet-300/70">
                    Jul 2024 – Oct 2024
                  </p>
                  <p className="text-violet-300/60 text-sm mt-1">
                    Remote • Completed
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-violet-500/20">
                <p className="text-violet-300/70 text-sm mb-3">Intensive training in:</p>
                <div className="flex flex-wrap gap-2">
                  {["SQL", "Python", "Power BI", "Tableau", "Business Intelligence", "ETL Pipelines"].map((skill) => (
                    <span key={skill} className="text-xs px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text">
                    High School Diploma
                  </h3>
                  <p className="text-violet-300/80 mt-2">
                    Concord University‑Affiliated Program
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-violet-300/70">2011</p>
                  <p className="text-violet-300/60 text-sm mt-1">
                    Beckley, WV
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Recent Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-2 border-violet-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Data Literacy — DataCamp
                  </p>
                  <p className="text-violet-300/60 text-sm">
                    Certified Oct 28, 2024 • ID: DL0038972051530
                  </p>
                </div>
                <div className="border-l-2 border-crimson-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Python Data Associate — DataCamp
                  </p>
                  <p className="text-violet-300/60 text-sm">
                    Certified Oct 28, 2024 • ID:
                    PDA0019023690945
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8">
              <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-6">
                Self-Directed Learning
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-2 border-violet-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    DataCamp SQL & Python Tracks
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Advanced SQL, Python data science, statistical analysis, ML fundamentals
                  </p>
                </div>
                <div className="border-l-2 border-crimson-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Advanced Computing Research
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Quantum computing, differential geometry, neural networks, WebGPU
                  </p>
                </div>
                <div className="border-l-2 border-fuchsia-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    Linux Foundation & Systems
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    Bash scripting, kernel tuning, SBC optimization, containerization
                  </p>
                </div>
                <div className="border-l-2 border-violet-500 pl-6">
                  <p className="text-violet-200 mb-2">
                    AI/ML Frameworks
                  </p>
                  <p className="text-violet-300/70 text-sm">
                    PyTorch, JAX, LLM integration, Model Context Protocol, federated learning
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CLI Terminal Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl bg-gradient-to-r from-crimson-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent mb-4">
              Interactive Terminal
            </h2>
            <p className="text-violet-300/60">
              Explore my projects and experience through the
              command line — Type{" "}
              <span className="text-crimson-400 font-mono">
                help
              </span>{" "}
              to get started
            </p>
          </div>
          <CLI />

          {/* Example Commands Guide */}
          <div className="mt-12">
            <CLIExamples />
          </div>
        </div>

        {/* Footer with all evidence links */}
        <div className="mt-20 backdrop-blur-xl bg-gradient-to-r from-violet-950/40 to-crimson-950/40 rounded-2xl border border-violet-500/30 shadow-[0_0_40px_rgba(139,0,255,0.2)] p-10">
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-8 text-center">
            Evidence and References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a
              href="https://www.notion.so/GitHub-Repository-Language-Analysis-Capstone-295336891f3680038aa3c0a8246b959b?pvs=21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-violet-600/10 border border-violet-500/30 text-violet-300/80 hover:text-violet-300 hover:border-violet-400/50 transition-all hover:scale-[1.02]"
            >
              <ExternalLink className="w-5 h-5" />
              Capstone: GitHub Repository Language Analysis
            </a>
            <a
              href="https://www.notion.so/GitHub-Language-Dashboard-Spec-v1-Starter-aadbf6ac2b1b42d680eedfdd0e3b47ff?pvs=21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-violet-600/10 border border-violet-500/30 text-violet-300/80 hover:text-violet-300 hover:border-violet-400/50 transition-all hover:scale-[1.02]"
            >
              <ExternalLink className="w-5 h-5" />
              Dashboard spec and starter
            </a>
            <a
              href="https://www.notion.so/WeGo-Public-Transit-Performance-Case-Study-62c5101bb9694a16847f7045b78d2d5d?pvs=21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-violet-600/10 border border-violet-500/30 text-violet-300/80 hover:text-violet-300 hover:border-violet-400/50 transition-all hover:scale-[1.02]"
            >
              <ExternalLink className="w-5 h-5" />
              Transit case study
            </a>
            <a
              href="https://github.com/Jacobcdsmith/CONSIM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-violet-600/10 border border-violet-500/30 text-violet-300/80 hover:text-violet-300 hover:border-violet-400/50 transition-all hover:scale-[1.02]"
            >
              <Github className="w-5 h-5" />
              CONSIM repository
            </a>
          </div>
          <div className="pt-6 border-t border-violet-500/30 text-center">
            <p className="text-violet-300/60">
              Certifications: DataCamp Data Literacy (Oct 2024) • DataCamp Python Data Associate (Oct 2024)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  links,
  image,
}: {
  title: string;
  description: string;
  links?: { label: string; url: string; isGithub?: boolean }[];
  image?: string;
}) {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-2xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] overflow-hidden hover:border-violet-400/50 transition-all hover:shadow-[0_0_50px_rgba(139,0,255,0.3)] group">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-[#0a0015]/50 to-transparent" />
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-4 group-hover:scale-105 transition-transform">
          {title}
        </h3>
        <p className="text-violet-200/80 mb-6 leading-relaxed">
          {description}
        </p>
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 border border-violet-500/50 text-violet-200 hover:border-violet-400 hover:shadow-[0_0_25px_rgba(139,0,255,0.5)] transition-all hover:scale-105"
              >
                {link.isGithub ? (
                  <Github className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({
  title,
  company,
  period,
  achievements,
}: {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}) {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-2xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 hover:border-violet-400/50 transition-all hover:shadow-[0_0_40px_rgba(139,0,255,0.2)]">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h3 className="text-2xl text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
            {title}
          </h3>
          <p className="text-violet-300/80">{company}</p>
        </div>
        <p className="text-violet-300/70">{period}</p>
      </div>
      <ul className="space-y-3">
        {achievements.map((achievement, i) => (
          <li key={i} className="flex gap-4 text-violet-200/80">
            <span className="text-violet-400 mt-1.5 text-xl">
              •
            </span>
            <span className="flex-1">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}