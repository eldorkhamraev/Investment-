# Investment Project Office — Cursor Rules

Canonical agent briefing: `[AGENTS.md](AGENTS.md)`. Focused Cursor rules: `[.cursor/rules/](.cursor/rules/)`.

## Project overview

Investment Project Office website for the Ministry of Digital Technologies, Republic of Uzbekistan.
Audience: international technology companies, investors, and grant partners considering market entry into Uzbekistan.
Goal: present opportunities, de-risk market entry, and convert visitors into introductory calls.

## Stack (as implemented)

- **Framework:** Next.js 16 App Router + React 19 + TypeScript
- **CMS:** Payload CMS v3
- **i18n:** next-intl — locales `en`, `ru`, `uz`
- **Database:** SQLite (`DATABASE_URI=file:./ipo.db`); Postgres is a future deploy option, not current
- **Styling:** Tailwind CSS v4 — tokens in `src/app/globals.css`
- **Font:** Montserrat (latin + cyrillic) via `next/font`



## Folder structure

- `src/app/[locale]/` — public pages (locale-aware)
- `src/app/(payload)/` — Payload admin + API
- `src/components/` — shared UI components
- `src/collections/` — Payload collections
- `src/content/` — structured static EN data
- `src/lib/cms.ts` — CMS reads with empty fallbacks
- `src/i18n/` — routing + locale-aware navigation
- `src/proxy.ts` — next-intl middleware (Next 16)
- `messages/` — `en.json` / `ru.json` / `uz.json` UI copy



## Design system — follow tokens, do not invent new values



### Colors (use Tailwind classes from `@theme`)

- **Ink / navy (dark bands):** `bg-ink`, `bg-navy-900` — heroes, dark CTA bands
- **Azure (accent):** `azure-`* — links, eyebrows, active states
- **Gold (CTA):** `gold-500` / `gold-400` — primary buttons
- **Mist / paper:** `bg-mist`, `bg-paper` — light sections and cards
- **Borders / muted text:** `border-line`, `text-slate`, `text-steel`



### Typography

- **Montserrat only** — do not add Manrope, Inter, or other Google fonts



### Spacing and layout

- Prefer existing `.container-edge` utility
- Section padding typically `py-20` / `py-24` / `md:py-28` as used in `PageHero`
- Card grids: follow existing page patterns (`grid-cols-1 md:grid-cols-3` where already established)



### Components

- Reuse `Button` / `ButtonLink` (`primary` = gold, `secondary` = azure, `on-dark` for heroes)
- Reuse `PageHero`, `Section` / `SectionHeading`, `Card`, brand marks in `components/ui/brand.tsx`
- Section labels: existing `.eyebrow` utility (azure, uppercase tracking)



## i18n rules — critical

- Every string visible to users MUST use `getTranslations` / `useTranslations` — no hardcoded English in JSX
- Add keys to ALL THREE locale files (`en.json`, `ru.json`, `uz.json`) whenever you add new copy
- Never leave a locale file missing a key that exists in another
- Internal links: `import { Link } from "@/i18n/navigation"` — not `next/link`
- Locale switcher: EN / RU / UZ in the nav, already implemented



## Payload CMS rules

- Collections live in `src/collections/`
- Always add `admin.useAsTitle` to collections
- Rich text fields use Lexical editor
- Do not modify `src/payload.config.ts` structure without checking existing plugins first
- Empty CMS → fall back to `messages` / `src/content`



## Code conventions

- TypeScript everywhere under `src/app` and `src/components` — no `any`
- Prefer async Server Components; `'use client'` only when necessary
- Use `next/image` for content images with proper `alt`
- Prefer existing deps; do not add packages without checking first
- Do not touch `next.config.ts` or Tailwind/globals theme setup unless asked



## ROLE MODEL:   
  
This website is our role model: [https://invest.gov.uz/en](https://invest.gov.uz/en)



## Page structure pattern

Each marketing page should follow this section order:

1. Hero (dark ink/navy, headline + subhead + CTA)
2. Primary content section (light / mist)
3. Supporting content / proof points (paper or mist)
4. Government programs / trust signals (if relevant)
5. CTA band (dark navy or azure, "Book an introduction")



## What NOT to do

- Do not hardcode UI text — always i18n keys
- Do not create color values outside the design tokens
- Do not invent metrics — use the key content facts below
- Do not reintroduce Events (removed from the product)



## CTA and contact info

- Primary CTA: "Book an introduction" → `/contact`
- Secondary CTA: Email [invest@digital.uz](mailto:invest@digital.uz)
- Phone: +998 71 238 41 76
- Address: Muminov 4/1, Tashkent, Uzbekistan



## Writing style — follow this for all copy



### Voice and tone

- Write like humans speak. Avoid corporate jargon and marketing fluff.
- Be confident and direct. Avoid softening phrases like "I think," "maybe," or "could."
- Use active voice instead of passive voice.
- Say what something *is* rather than what it *isn't*.
- Use contractions like "you'll," "won't," and "can't" for a warmer tone.



### Specificity and evidence

- Be specific with facts and data instead of vague superlatives.
- Back up claims with concrete metrics — use the key content facts below.
- Make content concrete and falsifiable.



### Banned words — never use these

- `innovative` → remove
- `seamless/seamlessly` → "automatic" or be specific
- `leverage` → "use"
- `utilize` → "use"
- `robust` → "strong"
- `cutting-edge` → remove or be specific
- `world-class` → remove
- `agile` → remove
- `facilitate` → "help" or "ease"
- `game-changing` → specific benefit
- `great` → remove or be specific
- `numerous` → "many"
- `modern/modernized` → remove
- `mission-critical` → "important"
- `out of the box` → remove
- `just` → remove
- `actually` → remove
- `essentially` → remove



### Banned phrases — never use these

- "I think / I believe / we believe" → state directly
- "it seems" → remove
- "We're excited to" → "We"
- "Today, we're excited to" → remove
- "The future of ___" → remove
- "We can't wait to" → remove
- "In today's fast-paced world" → remove
- "In the ever-evolving landscape of" → remove
- "it's not just [x], it's [y]" → remove



### Avoid LLM patterns

- Replace em dashes (—) with semicolons, commas, or sentence breaks.
- Don't use phrases like "Let's dive into..."
- Skip cliché intros like "In today's digital world."
- Avoid perfectly symmetrical paragraphs or lists that start with "Firstly... Secondly..."
- Avoid hedge words: "might," "perhaps," "potentially" unless uncertainty is real.
- Don't end sections with "Hope this helps!" or similar closers.
- Avoid title-case headings; prefer sentence casing.



### Punctuation

- Use Oxford commas consistently.
- Use exclamation points sparingly.
- Use periods instead of commas when possible for clarity.



## Key content facts (use these, do not invent)

- $1B+ in IT service exports (2025)
- 2,990+ IT Park member companies
- 44,000+ technology jobs
- Exports to 90 countries
- IT Park Zero Risk: 0% corporate tax, 0% VAT, 7.5% flat personal income tax
- IT-Visa: up to 3 years, for founders, investors and specialists
- Soft-Landing and One-Stop-Shop programs exist
- Japanese member companies doubled in 2025; Turkish +133%; Chinese +71%

