# syntax=docker/dockerfile:1
# Dockerfile for deploying Stadium Heritage Digital as a single Render web
# service: builds the Vite frontend and the Express api-server, then bundles
# them into one minimal production image that serves both.

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.12.4 --activate
WORKDIR /app

# ---------------------------------------------------------------------------
# Install dependencies (full workspace, including devDependencies needed to
# build both the frontend and the api-server)
# ---------------------------------------------------------------------------
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY artifacts/stadium-area/package.json artifacts/stadium-area/package.json
COPY artifacts/api-server/package.json artifacts/api-server/package.json
COPY artifacts/mockup-sandbox/package.json artifacts/mockup-sandbox/package.json
COPY lib/api-client-react/package.json lib/api-client-react/package.json
COPY lib/api-spec/package.json lib/api-spec/package.json
COPY lib/api-zod/package.json lib/api-zod/package.json
COPY lib/db/package.json lib/db/package.json
COPY scripts/package.json scripts/package.json
RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------------------------
# Build the frontend (Vite) and the API server (esbuild bundle)
# ---------------------------------------------------------------------------
FROM deps AS build
COPY . .
ENV NODE_ENV=production
RUN pnpm --filter @workspace/stadium-area run build
RUN pnpm --filter @workspace/api-server run build
# Place the static frontend build alongside the bundled server so app.ts can
# serve it as "public" relative to its own dist directory.
RUN mkdir -p artifacts/api-server/dist/public \
 && cp -r artifacts/stadium-area/dist/public/. artifacts/api-server/dist/public/

# ---------------------------------------------------------------------------
# Minimal production image: only the bundled server + static assets
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/artifacts/api-server/dist ./dist

EXPOSE 3000
CMD ["node", "--enable-source-maps", "dist/index.mjs"]
