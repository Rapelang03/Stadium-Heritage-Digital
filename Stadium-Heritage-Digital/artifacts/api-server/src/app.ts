import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import SqliteSessionStoreFactory from "better-sqlite3-session-store";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { sqlite } from "@workspace/db";
import router from "./routes";
import { logger } from "./lib/logger";

// In the bundled output, this file lives at artifacts/api-server/dist/index.mjs,
// so __dirname (or its bundled equivalent) resolves to artifacts/api-server/dist.
// The frontend build is copied there as "public" during the Docker/Railway build.
const currentDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.resolve(currentDir, "public");

const app: Express = express();

// Required behind a reverse proxy (Railway, Vercel, etc.) so Express trusts
// X-Forwarded-Proto and secure cookies / req.secure work correctly.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return { id: req.id, method: req.method, url: req.url?.split("?")[0] };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

const SqliteStore = SqliteSessionStoreFactory(session);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  session({
    store: new SqliteStore({ client: sqlite, expired: { clear: true, intervalMs: 15 * 60 * 1000 } }),
    secret: process.env["SESSION_SECRET"] ?? "dev-secret-change-in-prod",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Serve the built frontend (artifacts/stadium-area) if it has been copied
// alongside this server's dist output as "public". This lets a single
// process (e.g. on Render) serve both the API and the static site.
if (fs.existsSync(staticDir)) {
  app.use(
    express.static(staticDir, {
      index: false,
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  // SPA fallback: any non-API GET request that doesn't match a static file
  // falls back to index.html so client-side routing (wouter) works.
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
} else {
  logger.warn(
    { staticDir },
    "No built frontend found at startup; serving API only.",
  );
}

export default app;
