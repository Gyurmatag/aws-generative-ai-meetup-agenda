import { pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: serial("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const talks = pgTable("talks", {
  id: serial("id").primaryKey(),
  time: varchar("time", { length: 50 }).notNull(),
  title: text("title").notNull(),
  speaker: text("speaker"),
  iconName: varchar("icon_name", { length: 50 }).notNull(),
  iconColor: varchar("icon_color", { length: 50 }).notNull(),
  isCurrent: boolean("is_current").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}); 