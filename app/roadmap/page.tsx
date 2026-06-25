import Link from "next/link";

type Node = {
  title: string;
  desc: string;
  status: "done" | "current" | "locked";
  href?: string;
  tag?: string;
};

const PATH: Node[] = [
  { title: "Fundamentos", desc: "Variáveis, tipos de dados e o primeiro \"Olá, mundo\".", status: "current", href: "/courses/introducao-programacao", tag: "Gratuito" },
  { title: "Lógica e Controlo", desc: "Condições, ciclos e tomada de decisões no código.", status: "locked", tag: "Commit+" },
  { title: "Funções e Estruturas", desc: "Organizar código com funções, listas e dicionários.", status: "locked", tag: "Commit+" },
  { title: "Projeto Prático", desc: "Constrói a tua primeira aplicação do início ao fim.", status: "locked", tag: "Commit+" },
  { title: "Desenvolvimento Web", desc: "HTML, CSS, JavaScript e a tua primeira página online.", status: "locked", tag: "Em breve" },
];

const STATUS_STYLES: Record<Node["status"], { dot: string; ring: string; label: string }> = {
  done: { dot: "bg-emerald-500", ring: "ring-emerald-500/20", label: "Concluído" },
  current: { dot: "bg-indigo-500", ring: "ring-indigo-500/30", label: "A decorrer" },
  locked: { dot: "bg-slate-700", ring: "ring-white/5", label: "Bloqueado" },
};

export default function RoadmapPage() {
  return (
    <div className="pb-24">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">Percurso de aprendizagem</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Roadmap do Programador</h1>
        <p className="mt-3 text-lg text-slate-400">
          Um caminho claro do zero ao primeiro projeto. Segue os passos por ordem — cada etapa desbloqueia a seguinte.
        </p>
      </header>

      {/* Vertical trail */}
      <div className="relative mx-auto max-w-2xl">
        {/* Vertical line */}
        <div className="absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent" />

        <div className="space-y-6">
          {PATH.map((node, i) => {
            const style = STATUS_STYLES[node.status];
            const locked = node.status === "locked";
            const Card = (
              <div className={`flex-1 rounded-2xl border p-5 transition ${locked ? "border-white/5 bg-[#0a0d18] opacity-70" : "border-white/10 bg-[#0e1220] hover:border-indigo-500/40"}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`font-bold ${locked ? "text-slate-400" : "text-white"}`}>{node.title}</h3>
                  {node.tag && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      node.tag === "Gratuito" ? "bg-emerald-500/10 text-emerald-400"
                      : node.tag === "Commit+" ? "bg-amber-500/10 text-amber-400"
                      : "bg-slate-800 text-slate-500"
                    }`}>
                      {node.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-slate-400">{node.desc}</p>
                <p className="mt-3 text-xs font-medium text-slate-600">{style.label}</p>
              </div>
            );

            return (
              <div className="relative flex items-start gap-5" key={node.title}>
                {/* Node */}
                <div className={`relative z-10 mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#080b14] ring-4 ${style.ring}`}>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${style.dot}`}>
                    {node.status === "done" ? "✓" : i + 1}
                  </div>
                </div>
                {node.href && !locked ? <Link className="flex-1" href={node.href}>{Card}</Link> : Card}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-center">
        <h2 className="text-lg font-bold text-white">Desbloqueia o percurso completo</h2>
        <p className="mt-1 text-sm text-slate-400">Junta-te à comunidade Discord e obtém o cargo Commit+ para acederes a todas as etapas.</p>
        <Link className="mt-4 inline-block rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400" href="/upgrade">
          Saber mais sobre Commit+
        </Link>
      </div>
    </div>
  );
}
