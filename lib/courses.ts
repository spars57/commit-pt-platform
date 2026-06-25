import { asc, eq, and } from "drizzle-orm";

import { courses, lessons } from "@/db/schema";
import { db } from "@/lib/db";

export async function getCourses() {
  return db.select().from(courses).orderBy(asc(courses.order));
}

export async function getCourseBySlug(slug: string) {
  const [course] = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);

  return course ?? null;
}

export async function getLessonsByCourseId(courseId: string) {
  return db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(asc(lessons.order));
}

export async function getLessonByCourseAndSlug(courseId: string, slug: string) {
  const [lesson] = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.courseId, courseId), eq(lessons.slug, slug)))
    .limit(1);

  return lesson ?? null;
}
