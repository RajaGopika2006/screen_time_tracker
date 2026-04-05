# FocusGuard

FocusGuard is a complete Android-first screen-time control app with habit tracking, focus mode, and optional backend sync.

## What is included in this repo

- `mobile/` — Expo React Native app (TypeScript), ready to run after install.
- `backend/` — Node.js + Express API for analytics, habits, sessions, and recommendations.
- `docs/` — blocking architecture, build flow, and permissions/ethics guidance.

## Quick start (clone and run)

### 1) Install everything from repo root

```bash
npm run install:all
```

### 2) Run mobile app

```bash
npm run mobile:start
```

- Press `a` in Expo terminal to launch Android emulator/device.
- For native Android project generation/build, run:

```bash
npm run mobile:android
```

### 3) Run backend API

```bash
cp backend/.env.example backend/.env
npm run backend:dev
```

Health check:

```bash
curl http://localhost:4000/health
```

## Backend env setup

`backend/.env`:

```env
PORT=4000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
JWT_SECRET=change_me
```

## Core features delivered

- Screen time tracking models and analytics charts (daily/weekly/monthly).
- App/website blocking rules with strict/flexible modes and schedules.
- Habit creation, completion, streaks, and progress metrics.
- Reminder and threshold notification logic services.
- Focus mode with whitelist + Pomodoro session flow.
- Dashboard summary cards for usage, top apps, habits, streaks, and productivity score.
- Backend endpoints for sync + recommendations and badge scoring.

## How blocking works technically

1. Android usage events are read and aggregated (`UsageTracker`).
2. Policy engine checks schedule + limits + strict/flexible mode.
3. Strict mode intercepts blocked apps in accessibility service and launches motivational blocker UI.
4. Flexible mode can allow override with warning (JS workflow).

See: `docs/blocking-architecture.md` for full flow.

## Privacy and permissions

- Explicit permission disclosure for usage access, accessibility/overlay, and notifications.
- Local-first data model with optional sync.
- Data export/delete flow planned in settings architecture.

## Future improvements

- Full device-wide website blocking using VPN/DNS layer.
- On-device ML suggestions for reducing distraction windows.
- Social accountability, weekly challenges, and reward economy.
