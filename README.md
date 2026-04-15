# Flight Query App

A chat-style natural language flight search interface. Ask for flights in plain English, refine results with follow-up questions, and view detailed itineraries — all through a conversational UI.

![Main Screen](design/screenshot/main.png)

## Features

- **Natural language search** — type queries like _"Flights from NYC to London next Friday"_
- **Follow-up refinement** — narrow results with messages like _"Make it cheaper"_ or _"Direct flights only"_
- **Quick reply chips** — one-tap suggestions after each search
- **Flight detail panel** — slide-in panel with route timeline, price breakdown, and baggage info
- **Responsive design** — adapted layouts for desktop and mobile
- **Animated UI** — smooth transitions for cards, panels, and conversation messages

| After search | Flight details |
|---|---|
| ![After query](design/screenshot/after%20intial%20query.png) | ![Flight details](design/screenshot/flight%20details.png) |

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **MUI 9** (Material UI) for component primitives
- **Motion** (Framer Motion) for animations
- **Axios** for API requests
- **Lucide React** for icons
- **TypeScript** with strict mode

## Prerequisites

- Node.js 20+
- The [flight-query-engine](https://github.com) backend running on `localhost:8000`

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API base URL |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout with MUI providers
│   ├── page.tsx                  # Main page (single-page app, all state lives here)
│   └── globals.css               # CSS reset & global styles
├── components/
│   ├── header.tsx                # Sticky top bar
│   ├── welcome-hero.tsx          # Empty state with example queries
│   ├── chat-input.tsx            # Message input + send button
│   ├── conversation-timeline.tsx # Message history with timeline dots
│   ├── quick-replies.tsx         # Suggestion chips
│   ├── filter-bar.tsx            # Cabin class + sort dropdowns
│   ├── flight-card.tsx           # Flight result card
│   ├── flight-detail-panel.tsx   # Slide-in detail panel
│   ├── airline-logo.tsx          # Colored badge with airline code
│   ├── loading-skeleton.tsx      # Shimmer skeleton cards
│   ├── empty-state.tsx           # "No flights found" state
│   └── background-pattern.tsx    # Decorative SVG background
├── services/
│   └── api.ts                    # Axios client for backend
├── types/
│   └── index.ts                  # TypeScript types matching backend schemas
└── utils/
    └── format.ts                 # Date/time/price formatting helpers
```

## Backend API

The app communicates with [flight-query-engine](https://github.com) via these endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/search` | Initial natural language flight search |
| `POST` | `/search/follow-up/{session_id}` | Refine previous search with follow-up |
| `GET` | `/flights/{offer_id}` | Get full flight offer details |
| `GET` | `/health` | Health check |
