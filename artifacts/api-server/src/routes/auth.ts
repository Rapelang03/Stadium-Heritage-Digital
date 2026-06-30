import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable, villagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth";

const router: IRouter = Router();

router.post("/auth/register", async (req, res): Promise<void> => {
  const { name, email, whatsapp, password, village, address } = req.body;
  if (!name || !email || !whatsapp || !password || !village || !address) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [user] = await db.insert(usersTable).values({
    name,
    email,
    whatsapp,
    passwordHash,
    village,
    address,
    role: "member",
  }).returning();

  req.session.userId = user.id;
  req.session.role = user.role;
  req.session.name = user.name;

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    village: user.village,
    role: user.role,
  });
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password required" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  req.session.userId = user.id;
  req.session.role = user.role;
  req.session.name = user.name;

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    village: user.village,
    role: user.role,
  });
});

router.post("/auth/logout", (req, res): void => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/auth/me", requireAuth, async (req, res): Promise<void> => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.session.userId!));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    whatsapp: user.whatsapp,
    village: user.village,
    address: user.address,
    role: user.role,
    createdAt: user.createdAt,
  });
});

export default router;
