# SaaS User Analytics Dashboard

Front-end of a user-analytics dashboard I built for a SaaS platform: KPI cards, activity/projects charts (Recharts), and a sortable, paginated activity log with live search and date-range filtering (7/30/90 days). React 19 + TypeScript + Vite + Tailwind, light/dark mode.

Live: [dashboard.abemt.dev](https://dashboard.abemt.dev)

The production system pairs this with a Laravel REST API backend (indexed queries, sub-100ms responses, Docker-orchestrated) — this repo is the display layer with representative data.

## Run

```bash
npm install
npm run dev
```
