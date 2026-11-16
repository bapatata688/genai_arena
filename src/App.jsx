import React from 'react';
import { Sparkles, BookOpen, CheckCircle2, Award, Terminal, BrainCircuit } from 'lucide-react';
import domains from './data/domains.json';

export default function App() {
  const [activeDomainId, setActiveDomainId] = React.useState('domain-1');

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shadow-sm shadow-indigo-950">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                  GENAI LEADER ARENA
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-semibold">
                  Staff Drills
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Google Cloud Certified — Generative AI Leader</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 font-mono">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>4 Dominios · 10 Módulos · 75 Preguntas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Arena Skeleton */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Domain Selector & Study Guide Skeleton */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          {/* Domain Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {domains.map((domain) => {
              const isActive = domain.id === activeDomainId;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomainId(domain.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-sm shadow-indigo-950/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono font-bold text-indigo-400">{domain.code}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {domain.weightPercentage}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{domain.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Study Guide Card Skeleton */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-200">
                  {activeDomain.code}: {activeDomain.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">{activeDomain.moduleIds.length} módulos asignados</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeDomain.description}
            </p>

            <div className="rounded-lg border border-slate-800/80 bg-slate-950/80 p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] uppercase tracking-wider text-slate-400">Modelo Mental Visual / Arquitectura</span>
              </div>
              <pre className="text-emerald-300 text-xs overflow-x-auto leading-tight">
{`┌─────────────────────────────────────────────────────────────┐
│               GENAI LEADER ARENA · 4-LAYER STACK            │
├─────────────────────────────────────────────────────────────┤
│ 4. Soluciones y Agentes: Workspace · Search & Conversation  │
│ 3. Modelos Fundacionales: Gemini 1.5/2.0 · Model Garden     │
│ 2. Plataforma & MLOps: Vertex AI · AI Studio                │
│ 1. Cómputo & Red: Cloud TPU v5p · NVIDIA H100 · Titanium    │
└─────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* Right Column: Exam Simulator Card Skeleton */}
        <aside className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-200">Simulador de Examen</h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Modo Estudio Activo
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/60">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-indigo-400">Escenario Demo</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Intermedio</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                  ¿Cuál es el patrón canónico en Google Cloud para conectar modelos Gemini con datos corporativos dinámicos garantizando citas fácticas y eliminando alucinaciones?
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded border border-emerald-500/50 bg-emerald-950/20 text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Vertex AI Search con Grounding (RAG administrado)</span>
                  </div>
                  <div className="p-2 rounded border border-slate-800/80 bg-slate-900/40 text-slate-400">
                    <span>Fine-Tuning supervisado con LoRA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-4 px-4 bg-slate-900/50 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>GenAI Leader Arena · 100% Static Zero-Server Architecture</span>
          <span className="font-mono text-[11px] text-slate-400">React 19 · Vite 8 · Tailwind v4 · Oxlint</span>
        </div>
      </footer>
    </div>
  );
}
