"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type CourseCard = {
  slug: string;
  title: string;
  description: string;
  isPremium: boolean;
  category: string;
  level: "Iniciante" | "Intermédio" | "Avançado";
  theme: keyof typeof THEMES;
  isNew?: boolean;
  comingSoon?: boolean;
};

// Cozy scenes made with soft gradients (no pixel-art).
const THEMES = {
  sunset: {
    bg: "linear-gradient(180deg, #1b1635 0%, #4b2a55 45%, #b9685b 78%, #f0a868 100%)",
    sun: "radial-gradient(circle, #ffd9a0 0%, #f0a868 40%, transparent 70%)",
    sunPos: "left-1/2 top-12 -translate-x-1/2",
  },
  forest: {
    bg: "linear-gradient(180deg, #0e2a24 0%, #16463a 50%, #1f6b52 100%)",
    sun: "radial-gradient(circle, #bdf0c8 0%, #6fd49a 45%, transparent 70%)",
    sunPos: "right-10 top-10",
  },
  ocean: {
    bg: "linear-gradient(180deg, #0a1f3a 0%, #15406b 55%, #2d83a8 100%)",
    sun: "radial-gradient(circle, #cdeafe 0%, #7cc4f0 45%, transparent 70%)",
    sunPos: "left-10 top-8",
  },
  dusk: {
    bg: "linear-gradient(180deg, #16122e 0%, #2d2456 50%, #5b4b9e 100%)",
    sun: "radial-gradient(circle, #e6dcff 0%, #a78bfa 45%, transparent 70%)",
    sunPos: "right-12 top-12",
  },
  dawn: {
    bg: "linear-gradient(180deg, #2a1430 0%, #6b2f4f 50%, #d98a6a 100%)",
    sun: "radial-gradient(circle, #ffe3c2 0%, #f7b186 45%, transparent 70%)",
    sunPos: "left-1/2 top-10 -translate-x-1/2",
  },
} as const;

const LEVEL_STYLES: Record<CourseCard["level"], string> = {
  Iniciante: "text-emerald-300",
  Intermédio: "text-amber-300",
  Avançado: "text-rose-300",
};

function Banner({ theme }: { theme: keyof typeof THEMES }) {
  const t = THEMES[theme];
  return (
    <div className="relative h-36 overflow-hidden" style={{ background: t.bg }}>
      {/* Sun/moon */}
      <div className={`absolute h-20 w-20 rounded-full blur-[2px] ${t.sunPos}`} style={{ background: t.sun }} />
      {/* Soft hills/horizon */}
      <div className="absolute -bottom-8 -left-6 h-20 w-2/3 rounded-[100%] bg-black/25" />
      <div className="absolute -bottom-10 right-0 h-24 w-2/3 rounded-[100%] bg-black/30" />
      {/* Fog glow */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

export function CoursesExplorer({ courses }: { courses: CourseCard[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(() => {
    const set = new Set(courses.map((c) => c.category));
    return ["Todos", ...Array.from(set)];
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "Todos" || c.category === category;
      return matchQuery && matchCat;
    });
  }, [courses, query, category]);

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
          <input
            className="w-full rounded-xl border border-white/10 bg-[#0e1220] py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500/50"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Procurar cursos..."
            value={query}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === cat
                  ? "border-indigo-400/50 bg-indigo-500/15 text-indigo-300"
                  : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
              }`}
              key={cat}
              onClick={() => setCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-[#0e1220] p-10 text-center text-slate-500">
          Nenhum curso encontrado para &quot;{query}&quot;.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => {
            const card = (
              <div
                className={`group h-full overflow-hidden rounded-2xl border border-white/5 bg-[#0e1220] transition ${
                  course.comingSoon ? "opacity-60" : "hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-black/40"
                }`}
              >
                <div className="relative">
                  <Banner theme={course.theme} />
                  {course.isNew && !course.comingSoon && (
                    <span className="absolute right-3 top-3 rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-950 shadow">
                      Novo
                    </span>
                  )}
                  {course.comingSoon && (
                    <span className="absolute right-3 top-3 rounded-md bg-slate-700 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-300">
                      Em breve
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{course.category}</p>
                  <h3 className="mt-1 text-lg font-bold text-white group-hover:text-indigo-300">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${LEVEL_STYLES[course.level]}`}>
                      <span className="text-slate-600">▰</span> {course.level}
                    </span>
                    {course.isPremium
                      ? <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-400">Commit+</span>
                      : <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">Gratuito</span>}
                  </div>
                </div>
              </div>
            );

            return course.comingSoon ? (
              <div key={course.slug}>{card}</div>
            ) : (
              <Link href={`/courses/${course.slug}`} key={course.slug}>{card}</Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
