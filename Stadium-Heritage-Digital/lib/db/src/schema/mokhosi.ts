import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mokhostAlertsTable = sqliteTable("mokhosi_alerts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().default("medium"),
  location: text("location").notNull().default(""),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const insertMokhosiSchema = createInsertSchema(mokhostAlertsTable).omit({
  id: true, userId: true, status: true, createdAt: true,
});
export type InsertMokhosi = z.infer<typeof insertMokhosiSchema>;
export type MokhosiAlert = typeof mokhostAlertsTable.$inferSelect;
