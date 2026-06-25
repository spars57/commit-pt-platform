import { CoursesExplorer, type CourseCard } from "@/components/courses-explorer";
import { getCourses } from "@/lib/courses";

const THEME_CYCLE = ["sunset", "forest", "ocean", "dusk", "dawn"] as const;

const PLACEHOLDERS: CourseCard[] = [
  {
    slug: "desenvolvimento-web",
    title: "Desenvolvimento Web",
    description: "HTML, CSS e JavaScript para construíres as tuas primeiras páginas e aplicações.",
    isPremium: true,
    category: "Web",
    level: "Iniciante",
    theme: "ocean",
    comingSoon: true,
  },
  {
    slug: "python-pratico",
    title: "Python Prático",
    description: "Automatiza tarefas e explora dados com uma das linguagens mais versáteis.",
    isPremium: true,
    category: "Python",
    level: "Intermédio",
    theme: "forest",
    comingSoon: true,
  },
  {
    slug: "git-e-github",
    title: "Git & GitHub",
    description: "Controla versões do teu código e colabora como os profissionais.",
    isPremium: true,
    category: "Ferramentas",
    level: "Iniciante",
    theme: "dusk",
    comingSoon: true,
  },
];

export default async function CoursesPage() {
  const dbCourses = await getCourses();

  const real: CourseCard[] = dbCourses.map((course, i) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    isPremium: course.isPremium,
    category: "Programação",
    level: "Iniciante",
    theme: THEME_CYCLE[i % THEME_CYCLE.length],
    isNew: true,
  }));

  const all = [...real, ...PLACEHOLDERS];

  return (
    <div className="pb-24">
      <header className="mb-10">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-lg">📚</span>
          <h1 className="text-4xl font-bold text-white">Todos os cursos</h1>
        </div>
        <p className="mt-3 text-lg text-slate-400">
          Explora a biblioteca completa. Começa pelos fundamentos e segue o teu ritmo.
        </p>
      </header>

      <CoursesExplorer courses={all} />
    </div>
  );
}
