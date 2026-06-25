import { config } from "dotenv";

config({ path: ".env.local" });

import { eq } from "drizzle-orm";

import { courses, lessons } from "./schema";
import { db } from "../lib/db";

async function main() {
  const [course] = await db
    .insert(courses)
    .values({
      slug: "introducao-programacao",
      title: "Introdução à Programação",
      description: "Aprende os fundamentos da programação em português, passo a passo.",
      isPremium: false,
      order: 1,
    })
    .onConflictDoUpdate({
      target: courses.slug,
      set: {
        title: "Introdução à Programação",
        description: "Aprende os fundamentos da programação em português, passo a passo.",
        isPremium: false,
        order: 1,
      },
    })
    .returning();

  await db.delete(lessons).where(eq(lessons.courseId, course.id));

  await db.insert(lessons).values([
    {
      courseId: course.id,
      slug: "ola-mundo",
      title: "Olá, Mundo",
      contentMdx: "# Olá, Mundo\n\nNesta lição vais criar o teu primeiro programa e perceber como uma instrução simples produz output.",
      order: 1,
      isPremium: false,
    },
    {
      courseId: course.id,
      slug: "variaveis",
      title: "Variáveis",
      contentMdx: "# Variáveis\n\nAs variáveis guardam valores para reutilizares ao longo do programa. Esta lição aprofunda tipos, nomes e boas práticas.",
      order: 2,
      isPremium: true,
    },
    {
      courseId: course.id,
      slug: "funcoes",
      title: "Funções",
      contentMdx: "# Funções\n\nAs funções permitem organizar código em blocos reutilizáveis. Vais aprender parâmetros, retorno e composição.",
      order: 3,
      isPremium: true,
    },
  ]);

  console.log("Seed concluído: 1 curso e 3 lições criados.");
}

main().catch((error) => {
  console.error("Erro ao correr seed:", error);
  process.exit(1);
});
