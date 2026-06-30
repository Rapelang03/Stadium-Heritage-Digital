import { Router, type IRouter } from "express";
import { db, businessesTable, usersTable, advertisementsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/businesses", async (_req, res): Promise<void> => {
  const list = await db.select({
    id: businessesTable.id,
    name: businessesTable.name,
    description: businessesTable.description,
    category: businessesTable.category,
    address: businessesTable.address,
    phone: businessesTable.phone,
    whatsapp: businessesTable.whatsapp,
    website: businessesTable.website,
    status: businessesTable.status,
    createdAt: businessesTable.createdAt,
    ownerName: usersTable.name,
  }).from(businessesTable)
    .leftJoin(usersTable, eq(businessesTable.userId, usersTable.id))
    .where(eq(businessesTable.status, "approved"))
    .orderBy(businessesTable.category, businessesTable.name);
  res.json(list);
});

router.get("/businesses/all", requireAdmin, async (_req, res): Promise<void> => {
  const list = await db.select({
    id: businessesTable.id,
    name: businessesTable.name,
    category: businessesTable.category,
    address: businessesTable.address,
    phone: businessesTable.phone,
    status: businessesTable.status,
    createdAt: businessesTable.createdAt,
    ownerName: usersTable.name,
    ownerEmail: usersTable.email,
  }).from(businessesTable)
    .leftJoin(usersTable, eq(businessesTable.userId, usersTable.id))
    .orderBy(desc(businessesTable.createdAt));
  res.json(list);
});

router.post("/businesses", requireAuth, async (req, res): Promise<void> => {
  const { name, description, category, address, phone, whatsapp, website } = req.body;
  if (!name || !description || !category || !address || !phone) {
    res.status(400).json({ error: "Required fields missing" });
    return;
  }
  const [b] = await db.insert(businessesTable).values({
    userId: req.session.userId!,
    name, description, category, address, phone,
    whatsapp: whatsapp || "",
    website: website || "",
    status: "pending",
  }).returning();
  res.status(201).json(b);
});

router.patch("/businesses/:id/status", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { status } = req.body;
  const [b] = await db.update(businessesTable).set({ status }).where(eq(businessesTable.id, id)).returning();
  res.json(b);
});

// Advertisements
router.get("/advertisements", async (_req, res): Promise<void> => {
  const ads = await db.select({
    id: advertisementsTable.id,
    title: advertisementsTable.title,
    description: advertisementsTable.description,
    contactInfo: advertisementsTable.contactInfo,
    status: advertisementsTable.status,
    createdAt: advertisementsTable.createdAt,
    ownerName: usersTable.name,
  }).from(advertisementsTable)
    .leftJoin(usersTable, eq(advertisementsTable.userId, usersTable.id))
    .where(eq(advertisementsTable.status, "approved"))
    .orderBy(desc(advertisementsTable.createdAt));
  res.json(ads);
});

router.get("/advertisements/all", requireAdmin, async (_req, res): Promise<void> => {
  const ads = await db.select({
    id: advertisementsTable.id,
    title: advertisementsTable.title,
    description: advertisementsTable.description,
    contactInfo: advertisementsTable.contactInfo,
    status: advertisementsTable.status,
    createdAt: advertisementsTable.createdAt,
    ownerName: usersTable.name,
    ownerEmail: usersTable.email,
  }).from(advertisementsTable)
    .leftJoin(usersTable, eq(advertisementsTable.userId, usersTable.id))
    .orderBy(desc(advertisementsTable.createdAt));
  res.json(ads);
});

router.post("/advertisements", requireAuth, async (req, res): Promise<void> => {
  const { title, description, contactInfo } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description required" });
    return;
  }
  const [ad] = await db.insert(advertisementsTable).values({
    userId: req.session.userId!,
    title, description,
    contactInfo: contactInfo || "",
    status: "pending",
  }).returning();
  res.status(201).json(ad);
});

router.patch("/advertisements/:id/status", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { status } = req.body;
  const [ad] = await db.update(advertisementsTable).set({ status }).where(eq(advertisementsTable.id, id)).returning();
  res.json(ad);
});

export default router;
