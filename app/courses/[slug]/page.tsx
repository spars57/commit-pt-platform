import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCourseBySlug, getLessonsByCourseId } from "@/lib/courses";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lessons = await getLessonsByCourseId(course.id);
  const isPremiumUser = session?.user?.isPremium ?? false;

  return (
    <div className="space-y-10 pb-16">
      {/* Header do curso com banner cozy */}
      <section className="overflow-hidden rounded-2xl border border-white/10">
        <div className="flex h-36 items-end bg-gradient-to-br from-violet-900 via-indigo-800 to-blue-900 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur-sm">🐍</div>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4 bg-[#0e1220] px-6 py-5">
          <div>
            <Link className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300" href="/courses">← Todos os cursos</Link>
            <h1 className="mt-2 text-3xl font-bold text-white">{course.title}</h1>
            <p className="mt-2 max-w-xl text-slate-400">{course.description}</p>
          </div>
          {course.isPremium
            ? <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-400">Commit+</span>
            : <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">Gratuito</span>}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Lições</h2>
        <p className="mt-1 text-sm text-slate-400">Completa as lições por ordem para desbloquear o conteúdo Commit+.</p>
        <div className="mt-5 space-y-3">
          {lessons.map((lesson) => {
            const locked = lesson.isPremium && !isPremiumUser;

            return locked ? (
              <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-[#0e1220] p-5 opacity-50" key={lesson.id}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#080b14] text-xs font-bold text-slate-600 ring-1 ring-white/5">
                  {String(lesson.order).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-400">{lesson.title}</h3>
                  <p className="text-xs text-slate-600">Bloqueado — requer cargo Commit+</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-400">Commit+</span>
              </div>
            ) : (
              <Link
                className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-[#0e1220] p-5 transition hover:border-indigo-500/40"
                href={`/courses/${course.slug}/${lesson.slug}`}
                key={lesson.id}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-400 ring-1 ring-indigo-500/20">
                  {String(lesson.order).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-indigo-300">{lesson.title}</h3>
                  <p className="text-xs text-slate-500">Clica para começar</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">Gratuito</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
