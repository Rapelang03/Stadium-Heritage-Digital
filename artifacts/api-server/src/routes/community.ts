import { Router, type IRouter } from "express";
import { db, villagesTable, tourismTable, eventsTable, mokhostAlertsTable, usersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth, requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

// Villages
router.get("/villages", async (_req, res): Promise<void> => {
  const villages = await db.select().from(villagesTable).orderBy(villagesTable.name);
  res.json(villages);
});

router.post("/villages", requireAdmin, async (req, res): Promise<void> => {
  const { name, nameST, description, descriptionST } = req.body;
  if (!name || !nameST) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const [v] = await db.insert(villagesTable).values({ name, nameST, description: description || "", descriptionST: descriptionST || "" }).returning();
  res.status(201).json(v);
});

router.delete("/villages/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(villagesTable).where(eq(villagesTable.id, id));
  res.sendStatus(204);
});

// Tourism
router.get("/tourism", async (_req, res): Promise<void> => {
  const places = await db.select().from(tourismTable).orderBy(tourismTable.category, tourismTable.name);
  res.json(places);
});

router.post("/tourism", requireAdmin, async (req, res): Promise<void> => {
  const { name, nameST, category, description, descriptionST, address, phone } = req.body;
  if (!name || !category || !description || !address) {
    res.status(400).json({ error: "Required fields missing" });
    return;
  }
  const [p] = await db.insert(tourismTable).values({ name, nameST: nameST || "", category, description, descriptionST: descriptionST || "", address, phone: phone || "" }).returning();
  res.status(201).json(p);
});

router.delete("/tourism/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(tourismTable).where(eq(tourismTable.id, id));
  res.sendStatus(204);
});

// Events
router.get("/events", async (_req, res): Promise<void> => {
  const events = await db.select({
    id: eventsTable.id,
    title: eventsTable.title,
    description: eventsTable.description,
    location: eventsTable.location,
    eventDate: eventsTable.eventDate,
    status: eventsTable.status,
    createdAt: eventsTable.createdAt,
    userId: eventsTable.userId,
    userName: usersTable.name,
  }).from(eventsTable)
    .leftJoin(usersTable, eq(eventsTable.userId, usersTable.id))
    .where(eq(eventsTable.status, "active"))
    .orderBy(desc(eventsTable.createdAt));
  res.json(events);
});

router.post("/events", requireAuth, async (req, res): Promise<void> => {
  const { title, description, location, eventDate } = req.body;
  if (!title || !description || !location || !eventDate) {
    res.status(400).json({ error: "All fields required" });
    return;
  }
  const [event] = await db.insert(eventsTable).values({
    userId: req.session.userId!,
    title,
    description,
    location,
    eventDate,
    status: req.session.role === "admin" ? "active" : "pending",
  }).returning();
  res.status(201).json(event);
});

router.patch("/events/:id/status", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { status } = req.body;
  const [e] = await db.update(eventsTable).set({ status }).where(eq(eventsTable.id, id)).returning();
  res.json(e);
});

router.delete("/events/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(eventsTable).where(eq(eventsTable.id, id));
  res.sendStatus(204);
});

// Mokhosi Alerts
router.get("/mokhosi", async (_req, res): Promise<void> => {
  const alerts = await db.select({
    id: mokhostAlertsTable.id,
    title: mokhostAlertsTable.title,
    description: mokhostAlertsTable.description,
    severity: mokhostAlertsTable.severity,
    location: mokhostAlertsTable.location,
    status: mokhostAlertsTable.status,
    createdAt: mokhostAlertsTable.createdAt,
    userId: mokhostAlertsTable.userId,
    userName: usersTable.name,
  }).from(mokhostAlertsTable)
    .leftJoin(usersTable, eq(mokhostAlertsTable.userId, usersTable.id))
    .where(eq(mokhostAlertsTable.status, "active"))
    .orderBy(desc(mokhostAlertsTable.createdAt));
  res.json(alerts);
});

router.post("/mokhosi", requireAuth, async (req, res): Promise<void> => {
  const { title, description, severity, location } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description required" });
    return;
  }
  const [alert] = await db.insert(mokhostAlertsTable).values({
    userId: req.session.userId!,
    title,
    description,
    severity: severity || "medium",
    location: location || "",
    status: req.session.role === "admin" ? "active" : "pending",
  }).returning();
  res.status(201).json(alert);
});

router.patch("/mokhosi/:id/resolve", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const [a] = await db.update(mokhostAlertsTable).set({ status: "resolved" }).where(eq(mokhostAlertsTable.id, id)).returning();
  res.json(a);
});

export default router;
