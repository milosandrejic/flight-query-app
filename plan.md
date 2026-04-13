# Flight Query App — Implementation Plan

## Overview

Frontend for the **flight-query-engine** backend. Chat-style natural language flight search with follow-up refinement. Built with **Next.js 16 + MUI + TypeScript**.

---

## Screens (from Figma)

1. **Main (empty state)** — Welcome hero with plane icon, title, subtitle, 3 example query buttons, and a chat input at the bottom.
2. **After initial query** — Conversation timeline (user + system messages), chat input, quick reply chips, filter bar (cabin class + sort by), and flight result cards.
3. **After follow-up** — Same as above but with additional conversation turns appended.
4. **Flight details** — Side panel (desktop) / bottom sheet (mobile) with flight route timeline, price breakdown, and baggage allowance.

---

## Backend API Endpoints

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | `/search` | `{ query: string }` | `FlightSearchResponse` (session_id, parsed_query, results[], metadata) |
| POST | `/search/follow-up/{session_id}` | `{ query: string }` | `FollowUpResponse` (same shape) |
| GET | `/flights/{offer_id}` | — | `OfferDetailsResponse` (price breakdown, slices, segments, baggage, conditions) |
| GET | `/health` | — | `{ status, service }` |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with MUI providers
│   ├── page.tsx                # Main page (single-page app)
│   └── globals.css             # Minimal CSS reset
├── components/
│   ├── Header.tsx              # Sticky top bar with logo
│   ├── BackgroundPattern.tsx   # Decorative sky/clouds/planes SVGs
│   ├── WelcomeHero.tsx         # Empty state: icon, title, example queries
│   ├── ChatInput.tsx           # Text input + send button
│   ├── ConversationTimeline.tsx# Message history with timeline dots
│   ├── QuickReplies.tsx        # Suggestion chips after results
│   ├── FilterBar.tsx           # Cabin class + sort dropdowns
│   ├── FlightCard.tsx          # Flight result card (airline, route, price)
│   ├── AirlineLogo.tsx         # Colored badge with airline code
│   ├── FlightDetailPanel.tsx   # Slide-in panel with route/price/baggage
│   ├── LoadingSkeleton.tsx     # Skeleton cards while loading
│   └── EmptyState.tsx          # "No flights found" state
├── services/
│   └── api.ts                  # API client (fetch wrapper for backend)
├── types/
│   └── index.ts                # TypeScript types matching backend schemas
└── utils/
    └── format.ts               # Date/time/price formatting helpers
```

---

## Implementation Steps

### Phase 1: Foundation
- [x] **1.1** Define TypeScript types (`types/index.ts`) matching backend API schemas
- [x] **1.2** Create API service (`services/api.ts`) — axios instance export
- [x] **1.3** Add environment config (`NEXT_PUBLIC_API_URL`)

### Phase 2: Layout & Static Components
- [x] **2.1** `Header` — sticky top bar with plane icon + "Flight Query Engine" text
- [x] **2.2** `BackgroundPattern` — decorative SVG clouds/planes/dotted paths (from Figma export)
- [x] **2.3** `WelcomeHero` — plane icon, title, subtitle, 3 clickable example queries
- [x] **2.4** `ChatInput` — text input with send button, disabled state while loading
- [x] **2.5** Wire up root `page.tsx` layout: Header + Background + WelcomeHero + ChatInput

### Phase 3: Search Flow & Results
- [x] **3.1** `ConversationTimeline` — renders user/system messages with timeline dots and timestamps
- [x] **3.2** `QuickReplies` — row of suggestion chips ("Make it cheaper", "Direct flights only", etc.)
- [x] **3.3** `FilterBar` — cabin class dropdown (left) + sort by dropdown (right)
- [x] **3.4** `AirlineLogo` — colored square badge with airline code
- [x] **3.5** `FlightCard` — airline info, departure→arrival route with duration/stops, price, date, "View details" link
- [x] **3.6** `LoadingSkeleton` — shimmer skeleton matching flight card layout
- [x] **3.7** `EmptyState` — "No flights found" with retry action
- [x] **3.8** Wire search flow in `page.tsx`: send query → show loading → display conversation + results

### Phase 4: Flight Details Panel
- [x] **4.1** `FlightDetailPanel` — slide-in from right (desktop) / bottom sheet (mobile)
- [x] **4.2** Flight route timeline with segments, layover indicators
- [x] **4.3** Price breakdown table (base fare, taxes, total)
- [x] **4.4** Baggage allowance section (carry-on + checked)
- [x] **4.5** Wire "View details" click → fetch offer details → open panel

### Phase 5: Follow-up & Polish
- [ ] **5.1** Follow-up flow: after results, user can type new query → POST to `/search/follow-up/{session_id}`
- [ ] **5.2** Quick reply chips trigger follow-up search
- [ ] **5.3** Auto-scroll to results when loaded
- [ ] **5.4** Responsive design: mobile adaptations for filter bar, cards, detail panel
- [ ] **5.5** Animations (framer-motion): fade-in for cards, slide for panel, stagger for list items

---

## Design Tokens (from Figma)

| Token | Value |
|-------|-------|
| Primary/Indigo | `#6366f1` |
| Primary hover | `#4f46e5` |
| Text primary | `#111827` |
| Text secondary | `#6b7280` |
| Text muted | `#9ca3af` |
| Border | `#e5e7eb` |
| Background | white with blue-50 → sky-50 → white gradient |
| Direct badge | green `#22c55e` |
| Stops badge | amber `#f59e0b` |
| Card radius | 16px (rounded-2xl) |
| Input radius | 12px (rounded-xl) |
| Max content width | 920px |
| Max page width | 1440px |

---

## Dependencies to Add

- `framer-motion` — animations (welcome hero, cards, panel transitions)
- `lucide-react` — icons (Plane, Send, Clock, Calendar, X, etc.)

---

## Notes

- The Figma export uses Tailwind classes — we'll convert to MUI `sx` props and MUI components where appropriate, keeping custom styling via `sx` or CSS for elements MUI doesn't cover well (background pattern, timeline).
- Single-page app (not multi-route). All state lives in `page.tsx` as client component.
- Backend runs on `localhost:8000` during development.
