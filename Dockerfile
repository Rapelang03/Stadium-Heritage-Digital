# Use the official Node.js image
FROM node:24-slim

# Install pnpm globally
RUN npm install -g pnpm@10.12.4

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json tsconfig.json ./

# Copy all packages
COPY artifacts/ ./artifacts/
COPY api/ ./api/
COPY lib/ ./lib/
COPY scripts/ ./scripts/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the project
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Start the API server
CMD ["node", "api/index.ts"]