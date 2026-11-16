import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export default function StudyGuide({
  currentModule,
  currentDomain,
  allModules = [],
  isRead = false,
  isBookmarked = false,
  onToggleRead,
  onToggleBookmark,
  onNavigateModule,
  onStartQuiz
}) {
  if (!currentModule) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-center text-slate-500">
        <div className="max-w-md">
          <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-base font-medium text-slate-400">
            Selecciona un módulo curricular para ver la guía de estudio Staff-Level.
          </p>
        </div>
      </div>
    );
  }

  // Encontrar índices para navegación anterior/siguiente
  const currentIndex = allModules.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 text-slate-300 leading-relaxed">
      {/* Cabecera del Módulo */}
      <div className="mb-8 pb-6 border-b border-slate-800">
        {/* Badges de Dominio y Ponderación */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800/80 font-mono">
              {currentDomain ? `${currentDomain.code} · ${currentDomain.title} (${currentDomain.weightPercentage})` : 'Google Cloud GenAI'}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Módulo {currentModule.order} de {allModules.length}
            </span>
          </div>

          {/* Botones de Acción de Cabecera */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark?.(currentModule.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                isBookmarked
                  ? 'bg-amber-950/60 border-amber-500/80 text-amber-300 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Marcar módulo como favorito / pendiente"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Marcado' : 'Guardar'}</span>
            </button>

            <button
              onClick={() => onToggleRead?.(currentModule.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                isRead
                  ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="Alternar estado de lectura del módulo"
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isRead ? 'text-emerald-400 fill-emerald-950' : ''}`} />
              <span>{isRead ? 'Leído' : 'Marcar Leído'}</span>
            </button>

            {onStartQuiz && (
              <button
                onClick={() => onStartQuiz(currentModule.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-950 transition"
                title="Practicar las preguntas de examen asociadas a este módulo"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Practicar Preguntas</span>
                <span className="sm:hidden">Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Título Principal del Módulo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mb-3">
          {currentModule.title}
        </h1>

        {/* Descripción / Abstract */}
        <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
          {currentModule.description}
        </p>

        {/* Objetivos de Aprendizaje */}
        {currentModule.learningObjectives && currentModule.learningObjectives.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold font-mono text-indigo-400 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Competencias & Objetivos de Examen</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              {currentModule.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Contenido Markdown con Formato Staff-Level */}
      <div className="markdown-body prose prose-invert prose-indigo max-w-none text-sm space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl md:text-2xl font-bold text-slate-100 mt-8 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2.5">
                <span className="w-1.5 h-5 bg-indigo-500 rounded-sm"></span>
                <span>{children}</span>
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg md:text-xl font-bold text-slate-100 mt-7 mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-sky-400 rounded-sm"></span>
                <span>{children}</span>
              </h2>
            ),
            h3: ({ children }) => {
              const textContent = React.Children.toArray(children).join('');
              const isAntipattern = textContent.includes('❌') || textContent.includes('Antipatrón');
              if (isAntipattern) {
                return (
                  <h3 className="text-sm md:text-base font-bold text-rose-300 mt-6 mb-2.5 px-3.5 py-2 rounded-lg bg-rose-950/40 border border-rose-800/60 flex items-center gap-2">
                    {children}
                  </h3>
                );
              }
              const isHeuristic = textContent.includes('💡') || textContent.includes('Regla de Oro');
              if (isHeuristic) {
                return (
                  <h3 className="text-sm md:text-base font-bold text-amber-300 mt-6 mb-2.5 px-3.5 py-2 rounded-lg bg-amber-950/30 border border-amber-800/60 flex items-center gap-2">
                    {children}
                  </h3>
                );
              }
              return (
                <h3 className="text-sm md:text-base font-semibold text-slate-200 mt-5 mb-2">
                  {children}
                </h3>
              );
            },
            p: ({ children }) => (
              <p className="text-slate-300 leading-relaxed mb-3.5">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1.5 my-3 text-slate-300 pl-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1.5 my-3 text-slate-300 pl-2">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-slate-300">
                {children}
              </li>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-5 rounded-xl border border-slate-800 bg-slate-900/60 shadow-inner">
                <table className="w-full text-xs text-left border-collapse">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-900 text-slate-200 uppercase tracking-wider font-mono text-[11px] border-b border-slate-700">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-slate-800/40 transition">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-3.5 py-2.5 font-semibold text-slate-200">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3.5 py-2 text-slate-300 whitespace-nowrap">
                {children}
              </td>
            ),
            pre: ({ children }) => <>{children}</>,
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              const isBlock = Boolean(match) || (typeof children === 'string' && children.includes('\n'));
              if (!isBlock) {
                return (
                  <code className="bg-slate-800/90 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700/60">
                    {children}
                  </code>
                );
              }
              const lang = match ? match[1].toLowerCase() : '';
              let badge = 'Modelo Mental Visual / Arquitectura';
              if (lang && lang !== 'text' && lang !== 'ascii') {
                badge = `${lang.toUpperCase()} Snippet`;
              }
              return (
                <div className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950/95 shadow-inner">
                  <div className="bg-slate-900/90 px-3.5 py-1.5 text-[11px] font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      {badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Monospace ASCII</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed select-text">
                    <code>{children}</code>
                  </pre>
                </div>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="my-4 border-l-4 border-indigo-500 bg-indigo-950/20 px-4 py-3 rounded-r-xl text-slate-300 italic text-xs leading-relaxed">
                {children}
              </blockquote>
            )
          }}
        >
          {currentModule.content}
        </ReactMarkdown>
      </div>

      {/* Pie de Navegación entre Módulos */}
      <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          {prevModule ? (
            <button
              onClick={() => onNavigateModule?.(prevModule.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-xs font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500">Módulo Anterior</div>
                <div className="font-semibold text-slate-200 truncate max-w-[180px]">
                  {prevModule.shortTitle || prevModule.title}
                </div>
              </div>
            </button>
          ) : (
            <div />
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleRead?.(currentModule.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition ${
              isRead
                ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isRead ? 'Módulo Completado (✓)' : 'Marcar como Leído'}</span>
          </button>
        </div>

        <div>
          {nextModule ? (
            <button
              onClick={() => onNavigateModule?.(nextModule.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-xs font-medium"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Siguiente Módulo</div>
                <div className="font-semibold text-slate-200 truncate max-w-[180px]">
                  {nextModule.shortTitle || nextModule.title}
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
