# Deploying the Investment Project Office site

The site is a single Next.js 16 app that also serves the Payload CMS admin at `/admin`. Because the CMS stores content in **SQLite** and uploads to the **local filesystem** (`public/media`), it needs a host with a **persistent volume** — not plain serverless.

Two things must survive restarts:
- the database — `DATABASE_URI` (default `file:/app/data/ipo.db` in the Docker image)
- uploaded media — `public/media`

Always set a strong `PAYLOAD_SECRET` in production.

---

## Option A — Railway (recommended, easiest)

1. Sign in at <https://railway.app> with GitHub.
2. **New Project → Deploy from GitHub repo →** select `eldorkhamraev/Investment-`. Railway detects the `Dockerfile` and builds it.
3. **Variables:** add
   - `PAYLOAD_SECRET` = a long random string
   - `DATABASE_URI` = `file:/app/data/ipo.db`
4. **Volumes:** add a volume mounted at `/app/data` (for the DB). Add a second at `/app/public/media` if you want uploads to persist across deploys.
5. Deploy. Open the generated URL, then `/admin` to create the first user.
6. (Optional) add a custom domain in Settings → Networking.

## Option B — Render

Similar flow: **New → Web Service → from repo**, Docker runtime, add a **Disk** mounted at `/app/data`, set `PAYLOAD_SECRET` and `DATABASE_URI=file:/app/data/ipo.db`.

## Option C — Any Docker host / VPS

```bash
docker build -t ipo-site .
docker run -d -p 80:3000 \
  -e PAYLOAD_SECRET="a-long-random-string" \
  -e DATABASE_URI="file:/app/data/ipo.db" \
  -v ipo-data:/app/data \
  -v ipo-media:/app/public/media \
  --name ipo ipo-site
```

Put a reverse proxy (Caddy / Nginx) in front for HTTPS + your domain.

---

## If you'd rather use serverless (Vercel)

Serverless needs external state. Two changes:
1. Swap the SQLite adapter for **Postgres** (`@payloadcms/db-postgres`) in `src/payload.config.ts` and point `DATABASE_URI` at a hosted Postgres (Neon, Supabase, etc.).
2. Store uploads in **object storage** (S3/R2) via `@payloadcms/storage-s3` instead of the local disk.

Ask and this can be wired up.

---

## Making `/admin` reachable *right now* (temporary)

While a host is being chosen, you can expose the local dev server publicly from your machine:

```bash
npm run dev
# in a second terminal:
npx localtunnel --port 3000
```

This prints a public `https://…loca.lt` URL that works from anywhere while your machine and dev server stay running. Good for demos — not a permanent deployment.
