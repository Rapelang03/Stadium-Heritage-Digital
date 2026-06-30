/**
 * Vercel Serverless Function — API entry point.
 *
 * This file imports the pre-built bundle from the api-server artifact.
 * Using a pre-built .mjs file avoids TypeScript monorepo compilation issues
 * inside Vercel’s serverless function builder.
 */
import app from "../artifacts/api-server/dist/app.mjs";
export default app;
