# FocusGuard Step-by-Step Build Guide

## Step 1 — Bootstrap the app shell

- Create navigation with tabs: Dashboard, Analytics, Blocking, Habits, Focus.
- Add global store (`zustand`) for usage, rules, habits, and sessions.

## Step 2 — Add tracking model

- Define usage snapshot types (`AppUsage`, `WebsiteUsage`, `UsageSnapshot`).
- Add Android `UsageTracker` to read foreground activity durations.
- Feed aggregated totals into the store and dashboard cards.

## Step 3 — Implement analytics UI

- Filter snapshots by daily/weekly/monthly.
- Render chart data using `react-native-chart-kit`.
- Display top apps and total minutes.

## Step 4 — Implement blocking engine

- Define `BlockRule` with target, limit, schedule, mode.
- Evaluate against usage + current clock in `evaluateBlock`.
- Enforce with `BlockerAccessibilityService` + blocker activity in strict mode.

## Step 5 — Build habit tracker

- Let users create habits and optional reminder times.
- Track completion dates and recompute streaks daily.

## Step 6 — Focus mode and Pomodoro

- Add one-tap start for 25-minute session.
- Apply temporary block-all policy except whitelist.
- Persist session timeline for reporting.

## Step 7 — Notifications and reminders

- Habit reminders scheduled by reminder time.
- Warn at 80% usage and notify when exceeded.

## Step 8 — Backend sync and insights

- Node/Express API with Firebase Admin.
- Endpoints for usage upload, habits, sessions, and weekly AI suggestions.
- Compute productivity score and badge rewards.

## Step 9 — Security and consent

- Explain each permission with just-in-time prompts.
- Encrypt local storage for sensitive settings/tokens.
- Add data export and account deletion flow.
