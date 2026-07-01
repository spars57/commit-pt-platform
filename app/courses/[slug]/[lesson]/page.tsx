import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { PremiumGate } from "@/components/premium-gate";
import { getCourseBySlug, getLessonByCourseAndSlug } from "@/lib/courses";

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const session = await auth();
  const { slug, lesson: lessonSlug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lesson = await getLessonByCourseAndSlug(course.id, lessonSlug);

  if (!lesson) {
    notFound();
  }

  const canRead = !lesson.isPremium || (session?.user?.isPremium ?? false);

  return (
    <div className="-mx-6 -my-10 flex min-h-[calc(100vh-64px)] flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0d18] px-6 py-3">
        <div className="flex items-center gap-3 text-sm">
          <Link className="text-slate-400 transition hover:text-white" href={`/courses/${course.slug}`}>
            ← {course.title}
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-white">{lesson.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {lesson.isPremium
            ? <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">Commit+</span>
            : <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">Gratuito</span>}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left: lesson content */}
        <div className="w-full overflow-y-auto border-r border-white/5 md:w-1/2">
          <div className="p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">Exercício {String(lesson.order).padStart(2, "0")}</p>
            <h1 className="mt-2 text-3xl font-bold text-white">{lesson.title}</h1>

            <PremiumGate isPremium={canRead}>
              <div className="prose prose-invert mt-6 max-w-none prose-headings:text-white prose-p:leading-relaxed prose-p:text-slate-300 prose-code:rounded prose-code:bg-slate-800 prose-code:px-1 prose-code:text-indigo-300 prose-li:text-slate-300">
                <MDXRemote source={lesson.contentMdx} />
              </div>
            </PremiumGate>
          </div>
        </div>

        {/* Right: code panel */}
        <div className="flex w-full flex-col bg-[#0a0d18] md:w-1/2">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <div className="rounded bg-[#1a1f35] px-3 py-1 text-xs font-semibold text-slate-300">
              📄 main.py
            </div>
          </div>
          <div className="flex-1 p-4">
            <pre className="h-64 w-full rounded-xl border border-white/5 bg-[#070a12] p-4 text-sm text-slate-500">
              <code>{`# O teu código aqui\n\nprint("Olá, mundo!")`}</code>
            </pre>
          </div>
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">Terminal</p>
              <button className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-400">
                ▶ Executar
              </button>
            </div>
            <div className="mt-3 h-24 rounded-xl border border-white/5 bg-[#070a12] p-3 text-xs text-slate-500">
              Clica em Executar para ver os resultados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
