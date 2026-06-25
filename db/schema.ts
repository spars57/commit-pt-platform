import { integer, pgTable, text, timestamp, uniqueIndex, uuid, boolean } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    discordId: text("discord_id").notNull(),
    discordUsername: text("discord_username").notNull(),
    discordAvatar: text("discord_avatar"),
    email: text("email"),
    isPremium: boolean("is_premium").default(false).notNull(),
    discordRoles: text("discord_roles").array().default([]).notNull(),
    bio: text("bio"),
    location: text("location"),
    website: text("website"),
    skills: text("skills").array().default([]).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    discordIdIdx: uniqueIndex("users_discord_id_idx").on(table.discordId),
  }),
);

export const courses = pgTable(
  "courses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    isPremium: boolean("is_premium").default(false).notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    contentMdx: text("content_mdx").notNull(),
    order: integer("order").notNull(),
    isPremium: boolean("is_premium").default(false).notNull(),
  },
  (table) => ({
    courseLessonSlugIdx: uniqueIndex("lessons_course_id_slug_idx").on(table.courseId, table.slug),
  }),
);

export const userProgress = pgTable(
  "user_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userLessonIdx: uniqueIndex("user_progress_user_id_lesson_id_idx").on(table.userId, table.lessonId),
  }),
);

export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
