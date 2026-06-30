import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const mokhostAlertsTable = pgTable("mokhosi_alerts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().default("medium"),
  location: text("location").notNull().default(""),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMokhosiSchema = createInsertSchema(mokhostAlertsTable).omit({
  id: true, userId: true, status: true, createdAt: true,
});
export type InsertMokhosi = z.infer<typeof insertMokhosiSchema>;
export type MokhosiAlert = typeof mokhostAlertsTable.$inferSelect;
