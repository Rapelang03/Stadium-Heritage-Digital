/**
 * Vercel Serverless Function — API entry point.
 *
 * Vercel does NOT call app.listen(). Instead it imports this module and calls
 * the exported default function (which is the Express app) for every request
 * that matches /api/*.
 *
 * The Express app is defined in artifacts/api-server/src/app.ts and handles
 * all routes prefixed with /api.
 */
import app from "../artifacts/api-server/src/app.js";

// Vercel expects a default export of a request handler (Express app works directly)
export default app;
