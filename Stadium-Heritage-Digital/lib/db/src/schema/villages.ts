import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const villagesTable = sqliteTable("villages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameST: text("name_st").notNull(),
  description: text("description").notNull().default(""),
  descriptionST: text("description_st").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const insertVillageSchema = createInsertSchema(villagesTable).omit({ id: true, createdAt: true });
export type InsertVillage = z.infer<typeof insertVillageSchema>;
export type Village = typeof villagesTable.$inferSelect;
