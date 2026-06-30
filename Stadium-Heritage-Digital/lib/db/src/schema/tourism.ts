import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tourismTable = sqliteTable("tourism_places", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameST: text("name_st").notNull().default(""),
  category: text("category").notNull(),
  description: text("description").notNull(),
  descriptionST: text("description_st").notNull().default(""),
  address: text("address").notNull(),
  phone: text("phone").notNull().default(""),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
});

export const insertTourismSchema = createInsertSchema(tourismTable).omit({ id: true, createdAt: true });
export type InsertTourism = z.infer<typeof insertTourismSchema>;
export type TourismPlace = typeof tourismTable.$inferSelect;
