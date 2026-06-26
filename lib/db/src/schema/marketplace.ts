import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marketplacePostsTable = pgTable("marketplace_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  recipientId: integer("recipient_id").notNull(),
  postId: integer("post_id"),
  content: text("content").notNull(),
  read: text("read").notNull().default("false"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMarketplacePostSchema = createInsertSchema(marketplacePostsTable).omit({
  id: true, userId: true, status: true, createdAt: true,
});
export const insertMessageSchema = createInsertSchema(messagesTable).omit({
  id: true, senderId: true, read: true, createdAt: true,
});
export type InsertMarketplacePost = z.infer<typeof insertMarketplacePostSchema>;
export type MarketplacePost = typeof marketplacePostsTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
