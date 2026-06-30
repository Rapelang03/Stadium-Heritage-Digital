import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

// Single self-contained SQLite database file — no external DB service,
// no DATABASE_URL, nothing to provision separately. Defaults to a file
// inside the app's own working directory; override with SQLITE_PATH if
// you want it written somewhere else (e.g. a mounted persistent disk).
const dbPath = process.env["SQLITE_PATH"] ?? path.join(process.cwd(), "data", "app.db");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export * from "./schema";
