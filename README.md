# Investment Project Office

Investor-facing website for the **Investment Project Office** — a structural unit of the Ministry of Digital Technologies of the Republic of Uzbekistan. It attracts foreign investment, grants and partnerships into Uzbekistan's digital sector and helps international technology companies enter the market.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **next-intl** — trilingual routing (`/en`, `/ru`, `/uz`); EN content is live, RU/UZ are scaffolded
- **Payload CMS v3** + **SQLite** — staff-editable News & Projects, admin at `/admin`
- **Montserrat** type system; azure / navy / gold brand

## Local development

```bash
npm install
printf 'PAYLOAD_SECRET=change_me\nDATABASE_URI=file:./ipo.db\n' > .env
npm run dev
```

- Site: <http://localhost:3000>
- CMS admin: <http://localhost:3000/admin>

On first run the SQLite database (`ipo.db`) is created automatically. Open `/admin`, create the first admin user, and you can start adding **News** and **Projects** (with photo uploads). Until you publish CMS content, the site shows built-in fallback content.

### Environment variables (`.env`)

| Variable | Purpose |
| --- | --- |
| `PAYLOAD_SECRET` | Long random string used to sign CMS sessions. **Change for production.** |
| `DATABASE_URI` | SQLite location, e.g. `file:./ipo.db`. Use a persistent path in production. |
| `NEXT_PUBLIC_GA_ID` | (optional) Google Analytics 4 measurement ID. |

`.env`, the database (`ipo.db`) and uploaded media (`public/media`) are **gitignored** — they are environment state, not source.

## Project structure

```
src/
  app/[locale]/        # public pages (home, about, services, projects, news, contact, privacy)
  app/(payload)/       # Payload admin + API route group (/admin, /api)
  components/          # UI + section components
  collections/         # Payload collections: News, Projects, Media, Users
  lib/cms.ts           # reads News/Projects from Payload (with fallback)
  payload.config.ts    # Payload configuration (SQLite adapter)
messages/              # en.json (source of truth) + ru.json / uz.json
public/                # images, hero video, brand assets
```

Editors' content lives in the CMS; marketing copy lives in `messages/en.json`.

## Content model (CMS)

- **News** — title, cover image, tag, date, excerpt, rich-text body, published toggle. Public at `/news` and `/news/[id]`.
- **Projects** — title, sector, status, cover image, description, order.
- **Media** — image uploads (stored under `public/media`).
- **Users** — admin logins.

> Payload's CLI commands (`generate:types`, `generate:importmap`) don't run under Node 24. The admin import map is generated automatically when the dev server runs; create users/content via the admin UI or the REST API, not the CLI.

## Deployment

The CMS uses SQLite + local file uploads, so it needs a host with a **persistent filesystem/volume** (Railway, Render, Fly.io, or a Docker VPS). Plain serverless (e.g. Vercel functions) would not persist the database or uploads without switching to Postgres + object storage.

A `Dockerfile` is included (Next.js standalone output). Mount a volume so the database and `public/media` survive restarts, and set `PAYLOAD_SECRET`. See **`DEPLOY.md`** for step-by-step notes.

## Resuming work

```bash
cd ~/investment-project-office
npm run dev
```

Or on a fresh machine:

```bash
git clone https://github.com/eldorkhamraev/Investment-.git
cd Investment-
npm install
printf 'PAYLOAD_SECRET=change_me\nDATABASE_URI=file:./ipo.db\n' > .env
npm run dev
```
