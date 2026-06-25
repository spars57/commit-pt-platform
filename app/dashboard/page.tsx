import Link from "next/link";

import { auth } from "@/auth";
import { DiscordSignInButton } from "@/components/discord-sign-in-button";
import { getCourses } from "@/lib/courses";

export default async function DashboardPage() {
  const session = await auth();
  const courses = await getCourses();
  const isLoggedIn = !!session?.user;
  const name = session?.user?.discordUsername ?? session?.user?.name ?? null;
  const firstName = name?.split(" ")[0] ?? null;
  const avatar = session?.user?.discordAvatar ?? null;
  const isPremium = session?.user?.isPremium ?? false;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero: changes based on session */}
      {isLoggedIn ? (
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#10162a] to-[#0a0d18] p-7">
          <div className="flex items-center gap-4">
            {avatar
              ? <img alt={firstName ?? ""} className="h-14 w-14 rounded-full ring-2 ring-indigo-500/30" src={avatar} />
              : <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/20 text-2xl font-bold text-indigo-300">{firstName?.[0] ?? "?"}</div>}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Bem-vindo de volta</p>
              <h1 className="mt-1 text-2xl font-bold text-white">{firstName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isPremium
              ? <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">⭐ Commit+</span>
              : <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-400">Conta gratuita</span>}
            <Link className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400" href={`/courses/${courses[0]?.slug ?? ""}`}>
              Continuar →
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#10162a] to-[#0a0d18] p-8 text-center">
          <h1 className="text-3xl font-bold text-white">Começa a aprender hoje.</h1>
          <p className="mx-auto mt-3 max-w-md text-slate-400">
            Inicia sessão com o Discord para guardar o teu progresso e desbloquear conteúdo Commit+.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <DiscordSignInButton />
            <Link className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/5" href="/courses">
              Explorar cursos
            </Link>
          </div>
        </section>
      )}

      {/* Path */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Percurso de aprendizagem</h2>
            <p className="mt-1 text-sm text-slate-400">Segue as etapas por ordem para evoluíres.</p>
          </div>
          <Link className="text-sm text-indigo-400 transition hover:text-indigo-300" href="/roadmap">Ver roadmap →</Link>
        </div>

        <div className="relative space-y-3">
          <div className="absolute bottom-0 left-[27px] top-0 w-px bg-white/5" />
          {courses.map((course, i) => (
            <Link
              className="group relative flex items-center gap-5 rounded-2xl border border-white/5 bg-[#0e1220] p-5 transition hover:border-indigo-500/40"
              href={`/courses/${course.slug}`}
              key={course.id}
            >
              <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-[#080b14] text-slate-500 ring-1 ring-white/10"}`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Etapa {i + 1}</p>
                <h3 className="mt-0.5 font-bold text-white group-hover:text-indigo-300">{course.title}</h3>
                <p className="line-clamp-1 text-sm text-slate-400">{course.description}</p>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                {course.isPremium
                  ? <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-400">Commit+</span>
                  : <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">Gratuito</span>}
                <span className="text-slate-600 group-hover:text-indigo-400">→</span>
              </div>
            </Link>
          ))}

          {/* Locked upcoming steps */}
          {[{ title: "Desenvolvimento Web", tag: "Em breve" }, { title: "Python Avançado", tag: "Em breve" }].map((item, i) => (
            <div className="relative flex items-center gap-5 rounded-2xl border border-white/5 bg-[#0e1220] p-5 opacity-40" key={item.title}>
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#080b14] text-xs text-slate-600 ring-1 ring-white/5">
                {courses.length + i + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Etapa {courses.length + i + 1}</p>
                <h3 className="mt-0.5 font-bold text-slate-500">{item.title}</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-500">{item.tag}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
