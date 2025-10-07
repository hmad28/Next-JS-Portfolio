// lib/db/schema.ts
import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core";

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  company: text("company").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  link: text("link"),
  tag: json("tag").$type<string[]>().notNull().default([]),
  image: text("image").notNull(),
  gallery: json("gallery").$type<string[]>().default([]),
  projectDate: timestamp("project_date").notNull(), // Tanggal pembuatan project
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type NewPortfolio = typeof portfolios.$inferInsert;
