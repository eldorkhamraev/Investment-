<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Investment Project Office — Agent briefing

Investor-facing site for the Investment Project Office (Ministry of Digital Technologies, Uzbekistan). Audience: international tech companies, investors, grant partners. Goal: present opportunities, de-risk market entry, convert to introductory calls.

## Stack (as implemented)

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS v4 — tokens in `src/app/globals.css`
- next-intl — locales `en` / `ru` / `uz` (EN source of truth; RU/UZ scaffolded)
- Payload CMS v3 + **SQLite** (`DATABASE_URI=file:./ipo.db`)
- Font: **Montserrat** (latin + cyrillic) via `next/font`

## Folder map

| Path | Role |
|------|------|
| `src/app/[locale]/` | Public pages |
| `src/app/(payload)/` | `/admin` + Payload API |
| `src/components/` | UI + section components |
| `src/collections/` | Payload collections |
| `src/content/` | Structured static EN data |
| `src/lib/cms.ts` | CMS reads + empty fallbacks |
| `src/config/` | `navigation.ts`, `site.ts` |
| `src/i18n/` | Routing, navigation helpers, request config |
| `src/proxy.ts` | next-intl middleware (Next 16; not `middleware.ts`) |
| `messages/{en,ru,uz}.json` | UI copy |

## Content ownership

- **UI / marketing strings** → `messages/*.json` (add keys to all three locales)
- **Structured static data** → `src/content/*` (sectors, why, programs, FAQ, …)
- **Staff-editable** → Payload via `src/lib/cms.ts` (News, Projects, Stories, Documents, …); empty CMS → message/`content` fallbacks

## Hard rules

1. Internal links: `import { Link } from "@/i18n/navigation"` — not `next/link`
2. Visible copy: `getTranslations` / `useTranslations` — no hardcoded UI strings
3. Design tokens: use `ink`, `navy-*`, `azure-*`, `gold-*`, `paper`, `mist`, `cloud`, `line` from `globals.css` — do not invent colors
4. Reuse `Button` / `ButtonLink`, `PageHero`, `Section`, brand components — do not fork the design system
5. Prefer Server Components; `'use client'` only for interactivity
6. Do not commit `.env`, `ipo.db`, or `public/media`
7. Payload CLI (`generate:types`, `generate:importmap`) fails on Node 24 — rely on `npm run dev` for import map

Deeper guidance: `.cursor/rules/`. Product voice, banned words, and key facts: `CLAUDE.md` and `.cursor/rules/writing-and-facts.mdc`.
