import { Router, type IRouter } from "express";
import { db, marketplacePostsTable, messagesTable, usersTable } from "@workspace/db";
import { eq, or, desc } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/marketplace", async (_req, res): Promise<void> => {
  const posts = await db.select({
    id: marketplacePostsTable.id,
    title: marketplacePostsTable.title,
    description: marketplacePostsTable.description,
    price: marketplacePostsTable.price,
    category: marketplacePostsTable.category,
    status: marketplacePostsTable.status,
    createdAt: marketplacePostsTable.createdAt,
    userId: marketplacePostsTable.userId,
    userName: usersTable.name,
    userVillage: usersTable.village,
    userWhatsapp: usersTable.whatsapp,
  }).from(marketplacePostsTable)
    .leftJoin(usersTable, eq(marketplacePostsTable.userId, usersTable.id))
    .where(eq(marketplacePostsTable.status, "active"))
    .orderBy(desc(marketplacePostsTable.createdAt));
  res.json(posts);
});

router.get("/marketplace/mine", requireAuth, async (req, res): Promise<void> => {
  const posts = await db.select().from(marketplacePostsTable)
    .where(eq(marketplacePostsTable.userId, req.session.userId!))
    .orderBy(desc(marketplacePostsTable.createdAt));
  res.json(posts);
});

router.post("/marketplace", requireAuth, async (req, res): Promise<void> => {
  const { title, description, price, category } = req.body;
  if (!title || !description || !price || !category) {
    res.status(400).json({ error: "All fields required" });
    return;
  }
  const [post] = await db.insert(marketplacePostsTable).values({
    userId: req.session.userId!,
    title,
    description,
    price,
    category,
    status: "active",
  }).returning();
  res.status(201).json(post);
});

router.patch("/marketplace/:id/close", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [post] = await db.update(marketplacePostsTable)
    .set({ status: "closed" })
    .where(eq(marketplacePostsTable.id, id))
    .returning();
  res.json(post);
});

// Messages / Inbox
router.get("/messages/inbox", requireAuth, async (req, res): Promise<void> => {
  const messages = await db.select({
    id: messagesTable.id,
    content: messagesTable.content,
    read: messagesTable.read,
    postId: messagesTable.postId,
    createdAt: messagesTable.createdAt,
    senderId: messagesTable.senderId,
    senderName: usersTable.name,
    senderWhatsapp: usersTable.whatsapp,
  }).from(messagesTable)
    .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id))
    .where(eq(messagesTable.recipientId, req.session.userId!))
    .orderBy(desc(messagesTable.createdAt));
  res.json(messages);
});

router.post("/messages", requireAuth, async (req, res): Promise<void> => {
  const { recipientId, postId, content } = req.body;
  if (!recipientId || !content) {
    res.status(400).json({ error: "Recipient and content required" });
    return;
  }
  const [msg] = await db.insert(messagesTable).values({
    senderId: req.session.userId!,
    recipientId: parseInt(recipientId, 10),
    postId: postId ? parseInt(postId, 10) : undefined,
    content,
    read: "false",
  }).returning();
  res.status(201).json(msg);
});

router.patch("/messages/:id/read", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.update(messagesTable).set({ read: "true" }).where(eq(messagesTable.id, id));
  res.json({ ok: true });
});

export default router;
