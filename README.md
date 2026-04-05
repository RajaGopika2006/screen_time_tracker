# FocusGuard

FocusGuard is an Android-first mobile app that helps users reduce distractions by combining screen-time analytics, app/website blocking, habit tracking, reminders, and focus sessions.

This repository contains:
- `mobile/`: React Native (TypeScript) app with Android native modules for usage tracking + blocking hooks.
- `backend/`: Node.js + Express + Firebase Admin API for cloud sync and insights.
- `docs/`: architecture notes and technical deep dives.

## Features Implemented

- Daily, weekly, monthly analytics for app and website usage.
- App and website limits with strict/flexible mode settings.
- Time-window schedules (e.g., block social apps during work hours).
- Habit creation, completion logs, streak tracking, and consistency reports.
- Focus mode with whitelist and timer-based sessions (Pomodoro).
- Dashboard cards for screen time, top apps, habits, and current streaks.
- Local-first persistence for offline usage.
- Reminder and threshold notification orchestration.
- Privacy-first permission onboarding and transparent disclosures.
- Bonus: productivity score, achievements, and AI recommendation endpoint.

## Project Structure

```text
.
├── mobile
│   ├── src
│   │   ├── components
│   │   ├── navigation
│   │   ├── screens
│   │   ├── services
│   │   ├── store
│   │   ├── theme
│   │   └── types
│   └── android/app/src/main/java/com/focusguard
│       ├── blocking
│       ├── bridge
│       ├── receiver
│       └── tracking
├── backend
│   └── src
│       ├── middleware
│       ├── models
│       ├── routes
│       └── services
└── docs
```

## Setup Instructions

### 1) Mobile App

1. Install React Native toolchain and Android SDK.
2. From `mobile/` install dependencies:
   - `npm install`
3. Start Metro:
   - `npm run start`
4. Run Android build:
   - `npm run android`

> Required Android permissions: Usage Access, Accessibility Service (for strict overlay/intercept), Draw over other apps (motivational blocker overlay), and Notification permission.

### 2) Backend

1. Go to `backend/`.
2. Install dependencies:
   - `npm install`
3. Create `.env` with:

```env
PORT=4000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
JWT_SECRET=change_me
```

4. Start server:
   - `npm run dev`

## How Blocking Works (Technical)

1. **Tracking layer** (Android `UsageStatsManager` + event polling):
   - Pulls foreground app events and aggregates durations.
   - Syncs to JS store every polling cycle.
2. **Policy engine** (TypeScript rules + Kotlin enforcement):
   - Evaluates limits, schedules, strict/flexible mode, and focus whitelist.
3. **Enforcement layer**:
   - Strict mode: Accessibility service intercepts app launch and redirects to blocker overlay activity/message.
   - Flexible mode: warning modal allows one-time override with reason and logs event.
4. **Website controls**:
   - In-app browser + DNS/VPN hooks (future extension) for system-wide domains.
5. **Notifications**:
   - Threshold alerts at 80/100% and over-limit reminders.

Detailed sequence diagrams: `docs/blocking-architecture.md`.

## Security & Ethics

- Local encrypted storage for sensitive preferences/tokens.
- Minimal permission scope and explicit onboarding copy.
- No selling of personal data.
- User can export/delete data.

## Future Improvements

- Full VPN-based website blocking for all browsers.
- On-device ML models for personalized recommendation timing.
- Family accountability mode and shared goals.
- Wear OS companion nudges.

