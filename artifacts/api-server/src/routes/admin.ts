import { Router, type IRouter } from "express";
import { db, usersTable, businessesTable, eventsTable, marketplacePostsTable, mokhostAlertsTable, advertisementsTable, tourismTable, villagesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import { requireAdmin } from "../middlewares/auth";

const router: IRouter = Router();

router.get("/admin/stats", requireAdmin, async (_req, res): Promise<void> => {
  const [[{ value: userCount }], [{ value: businessCount }], [{ value: eventCount }], [{ value: alertCount }], [{ value: adCount }]] = await Promise.all([
    db.select({ value: count() }).from(usersTable),
    db.select({ value: count() }).from(businessesTable).where(eq(businessesTable.status, "pending")),
    db.select({ value: count() }).from(eventsTable).where(eq(eventsTable.status, "pending")),
    db.select({ value: count() }).from(mokhostAlertsTable).where(eq(mokhostAlertsTable.status, "pending")),
    db.select({ value: count() }).from(advertisementsTable).where(eq(advertisementsTable.status, "pending")),
  ]);
  res.json({ userCount, pendingBusinesses: businessCount, pendingEvents: eventCount, pendingAlerts: alertCount, pendingAds: adCount });
});

router.get("/admin/users", requireAdmin, async (_req, res): Promise<void> => {
  const users = await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    whatsapp: usersTable.whatsapp,
    village: usersTable.village,
    address: usersTable.address,
    role: usersTable.role,
    createdAt: usersTable.createdAt,
  }).from(usersTable).orderBy(desc(usersTable.createdAt));
  res.json(users);
});

router.patch("/admin/users/:id/role", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  const { role } = req.body;
  const [u] = await db.update(usersTable).set({ role }).where(eq(usersTable.id, id)).returning();
  res.json(u);
});

router.delete("/admin/users/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  await db.delete(usersTable).where(eq(usersTable.id, id));
  res.sendStatus(204);
});

export default router;
