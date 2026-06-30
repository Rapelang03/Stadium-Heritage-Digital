import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const villagesTable = pgTable("villages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameST: text("name_st").notNull(),
  description: text("description").notNull().default(""),
  descriptionST: text("description_st").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertVillageSchema = createInsertSchema(villagesTable).omit({ id: true, createdAt: true });
export type InsertVillage = z.infer<typeof insertVillageSchema>;
export type Village = typeof villagesTable.$inferSelect;
