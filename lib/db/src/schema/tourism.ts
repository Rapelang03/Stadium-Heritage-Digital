import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tourismTable = pgTable("tourism_places", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameST: text("name_st").notNull().default(""),
  category: text("category").notNull(),
  description: text("description").notNull(),
  descriptionST: text("description_st").notNull().default(""),
  address: text("address").notNull(),
  phone: text("phone").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTourismSchema = createInsertSchema(tourismTable).omit({ id: true, createdAt: true });
export type InsertTourism = z.infer<typeof insertTourismSchema>;
export type TourismPlace = typeof tourismTable.$inferSelect;
