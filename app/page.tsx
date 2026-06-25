import Link from "next/link";

import { DiscordSignInButton } from "@/components/discord-sign-in-button";

const STEPS = [
  { n: "01", title: "Fundamentos", desc: "Variáveis, tipos e o primeiro programa." },
  { n: "02", title: "Lógica", desc: "Condições, ciclos e estruturas de controlo." },
  { n: "03", title: "Funções", desc: "Reutilizar e organizar o teu código." },
  { n: "04", title: "Projeto", desc: "Aplica tudo num projeto real." },
];

export default function HomePage() {
  return (
    <div className="space-y-28 pb-28">
      {/* Hero: two columns, not centered */}
      <section className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> CommitPT Comunidade De Programação
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            O teu caminho para programar, do início ao fim.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate-400">
            Não é mais um curso solto. É um percurso estruturado — fundamentos, prática e projetos — com a comunidade a apoiar no Discord.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DiscordSignInButton />
            <Link
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              href="/roadmap"
            >
              Ver o roadmap →
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
            <span>✓ Conteúdo Prático e Interativo</span>
            <span>✓ Editor de código integrado</span>
          </div>
        </div>

        {/* Roadmap preview (roadmap.sh style) */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0e1220] p-6">
          <div className="absolute left-[35px] top-10 bottom-10 w-px bg-gradient-to-b from-indigo-500/50 to-transparent" />
          <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-500">O teu percurso</p>
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div className="relative flex items-center gap-4" key={step.n}>
                <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-indigo-500 text-white" : "bg-[#080b14] text-slate-500 ring-1 ring-white/10"}`}>
                  {i + 1}
                </div>
                <div className={`flex-1 rounded-xl border px-4 py-3 ${i === 0 ? "border-indigo-500/30 bg-indigo-500/5" : "border-white/5 bg-[#080b14]"}`}>
                  <p className={`text-sm font-semibold ${i === 0 ? "text-white" : "text-slate-400"}`}>{step.title}</p>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — three clean steps */}
      <section>
        <h2 className="text-2xl font-bold text-white">Como funciona</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3">
          {[
            { step: "1", title: "Segue o roadmap", desc: "Um caminho claro do zero ao primeiro projeto, sem te perderes." },
            { step: "2", title: "Pratica a programar", desc: "Escreve e corre código diretamente no editor da plataforma." },
            { step: "3", title: "Cresce com a comunidade", desc: "O teu cargo no Discord desbloqueia conteúdo Commit+." },
          ].map((item) => (
            <div className="bg-[#0a0d18] p-6" key={item.step}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-bold text-indigo-400">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured course */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">Começa por aqui</h2>
          <Link className="text-sm text-indigo-400 transition hover:text-indigo-300" href="/courses">Ver todos os cursos →</Link>
        </div>
        <Link
          className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e1220] transition hover:border-indigo-500/40 md:flex-row"
          href="/courses/introducao-programacao"
        >
          <div className="flex w-full items-center justify-center bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-800 p-10 md:w-64">
            <span className="text-6xl drop-shadow-lg">�</span>
          </div>
          <div className="flex-1 p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">CURSO · INICIANTE</p>
            <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-indigo-300">Introdução à Programação</h3>
            <p className="mt-2 max-w-lg text-slate-400">Aprende os fundamentos da programação em português, passo a passo, com exercícios práticos.</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Gratuito para começar</span>
              <span className="text-sm font-semibold text-indigo-400">Começar agora →</span>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
