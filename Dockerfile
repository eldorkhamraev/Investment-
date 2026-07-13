# Investment Project Office — production image (Next.js 16 standalone + Payload)
# Debian slim (not alpine) for reliable native modules (sharp, libsql/sqlite).

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# PAYLOAD_SECRET is only needed at runtime; a placeholder keeps the build happy.
ENV PAYLOAD_SECRET=build-time-placeholder
ENV DATABASE_URI=file:/app/data/ipo.db
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Persistent data lives here — mount a volume at /app/data.
ENV DATABASE_URI=file:/app/data/ipo.db
RUN mkdir -p /app/data && chown -R node:node /app

# Standalone server + static assets + public files.
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
