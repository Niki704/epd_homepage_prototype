# EPD - Homepage Prototype

Frontend prototype of the Educational Publications Department (EPD, Sri Lanka)
main website homepage, built for internal stakeholder review and sign-off
before dev handoff. Visually matches the approved sibling project, the
[EPD Book Download Archive](https://epd-download-prototype.vercel.app).

See `01-design.md`, `02-features.md`, and `03-architecture.md` (project docs,
not included in this repo scaffold) for full decision history.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + CSS variables
- Framer Motion
- next-themes
- next-intl (English / Sinhala / Tamil, locale-based routing)
- Upstash Redis — the only real backend piece, used for live view/download counters

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# fill in UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) (or `/si`, `/ta`).

Without Redis credentials configured, the site still runs — the live stats
section will just show zeros until `.env.local` is filled in.

## Status

All homepage sections from `02-features.md` are scaffolded with realistic
mock/placeholder data. Known gaps before real handoff:

- Sinhala/Tamil translations in `messages/si.json` and `messages/ta.json`
  are a first-pass draft and need native-speaker review.
- Real content still pending for: Commissioner General + 2 Commissioners
  (names/photos/messages), 9 Divisions (staff names/counts), bookshop
  entries, and supplementary book entries — see the "Open Questions"
  sections in `02-features.md` and `03-architecture.md`.
- All images in `public/images/` are solid-color placeholders — swap in
  real assets before stakeholder review if possible.
- No automated tests yet.

## Folder Structure

See `03-architecture.md` §"Proposed Folder Structure" — this scaffold
follows it exactly.
