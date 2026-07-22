# PRO — maker-flow intro site

Confirmed at step ③. Language: **English primary**.

## 1. Summary

- **One-sentence goal:** Provide a public static intro site for [LJTian/maker-flow](https://github.com/LJTian/maker-flow) so visitors understand what it is, how it works, and where to start within seconds.
- **MVP scope (finishable in ~1 day):**
  - Single-page (or minimal routes) static intro: brand/product name, one-line positioning, six-step workflow overview, core value props, primary CTA to the GitHub repo
  - **English-primary** copy, plus full Chinese copy and an in-page EN / 中文 language switch (preference stored in `localStorage`)
  - Container build + static serve; `GET /health` for acceptance
  - No backend, no auth, no database
- **Out of scope:**
  - Full docs mirror / i18n framework (simple in-app dictionary + toggle is in scope)
  - Live demo, forms, email signup, analytics backend
  - Accounts, CMS, dynamic content APIs
  - Embedding this site into the `maker-flow` factory repo itself (this product stays separate; publish target chosen at step ⑥)
  - Heavy animation libraries, blog, auto-synced changelog

## 2. Business flow

1. Visitor opens the intro homepage; first viewport shows brand **maker-flow**, one-line positioning, and primary CTA (“View on GitHub” → `https://github.com/LJTian/maker-flow`).
2. Scrolling (or same-page anchors) shows: six-step pipeline summary (requirement → PRO → confirm → assemble → accept → publish), who it is for, and how it differs from scaffolding from scratch (one job per section).
3. Footer links to the repository; optional secondary link to Issues. No search, no user state.
4. Boundaries: all static assets; content unchanged on refresh; no auth; no server writes.

## 3. Data model

No persistence / no tables. Copy and links are static at build time.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| brand | string | Brand name | Fixed `maker-flow` |
| tagline | string | One-line positioning | Align with repo: Infrastructure First. Business Logic Second. |
| github_url | string | Primary repo URL | `https://github.com/LJTian/maker-flow` |
| workflow_steps | list | Six step titles + one-line each | Fixed 6 items; align with factory workflow |
| cta_primary | object | Primary button label + URL | Points to GitHub |

Process restart does not change content (static build output).

## 4. API / interface contract

Static site only. Public “interfaces” are HTTP pages and health check.

### `GET /health`

- **Request:** no body
- **Response `200`:**

```json
{ "status": "ok" }
```

- **Error codes:** connection failure if process down; otherwise 200

### `GET /`

- **Request:** no body
- **Response `200`:** HTML intro page with brand, positioning, workflow overview, primary CTA
- **Error codes:** no business 4xx; unreachable if not built/deployed

### `GET /assets/*` (build artifacts)

- **Response `200`:** JS/CSS/static assets
- **Error codes:** missing asset → `404`

No business REST API; do not require `VITE_API_BASE_URL`.

## 5. Acceptance criteria

- [ ] After `docker compose up --build`, `GET http://localhost:3000/health` returns 200 with `status=ok`
- [ ] Opening `http://localhost:3000/` shows brand **maker-flow** as a hero-level signal (recognizable without relying on nav alone)
- [ ] First viewport has one positioning line + primary CTA that opens `https://github.com/LJTian/maker-flow`
- [ ] Same page shows six-step workflow overview (requirement → PRO → confirm → assemble → accept → publish)
- [ ] No login/forms/backend API dependency; no required business-API network calls
- [ ] Readable and usable on desktop and narrow viewports (no horizontal overflow blocking the main path)
- [ ] Header language switch toggles between English and Chinese; choice persists across refresh

## 6. Template retrieval hints (confirmed direction for step ④)

- **Preferred apps:** `web-vite`
- **Preferred patterns:** none
- **Images / runtime:** Node build + Nginx static (template-owned; no maker-flow Go images)
- **Complexity clues:** no DB, no auth, low QPS, static marketing intro
