# FocusGuard Blocking Architecture

## 1. Data Sources

- **UsageStatsManager** collects app foreground usage timeline.
- **In-app browser telemetry** tracks website sessions.
- **Rule store** includes limits, schedules, and mode settings.

## 2. Evaluation Pipeline

1. Poll usage snapshots every N seconds.
2. Merge with daily aggregates in local database.
3. Evaluate each target against:
   - current schedule window,
   - daily minute threshold,
   - focus mode status and whitelist.
4. Produce action: allow, warn, or block.

## 3. Enforcement

### Strict mode

- Accessibility Service detects blocked package in foreground.
- Service launches `MotivationalBlockActivity` and sends user to Home.
- No override action is shown.

### Flexible mode

- JS layer shows warning sheet with consequences.
- User can override for a short interval (logged as breach).

## 4. Notifications

- 80% threshold warning.
- 100% threshold exceeded message.
- Habit reminder notifications from scheduled alarms.

## 5. Privacy controls

- Process only package names/domains and durations.
- Keep raw event history local unless sync enabled.
- Provide export/delete controls in settings.
