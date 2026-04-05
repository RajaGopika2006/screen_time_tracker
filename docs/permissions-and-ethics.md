# Permissions & Ethics Plan

## Required Android permissions

- **PACKAGE_USAGE_STATS** (Usage Access): read app usage durations.
- **BIND_ACCESSIBILITY_SERVICE**: enforce strict app blocking.
- **SYSTEM_ALERT_WINDOW**: show motivational blocking overlay when needed.
- **POST_NOTIFICATIONS**: reminders and threshold alerts.

## User communication

- Show pre-permission explainer screens before each system prompt.
- Explain exactly what is collected: package/domain + time only.
- Provide in-app toggles to disable sync and delete data.

## Data security

- Keep auth tokens in secure storage.
- Use HTTPS for all backend sync calls.
- Store aggregate metrics by default, not raw event logs.
