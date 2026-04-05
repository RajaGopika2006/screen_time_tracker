package com.focusguard.tracking

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context

class UsageTracker(private val context: Context) {

    data class AppUsage(val packageName: String, val millis: Long)

    fun readForegroundUsage(startMillis: Long, endMillis: Long): List<AppUsage> {
        val manager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val events = manager.queryEvents(startMillis, endMillis)
        val totals = mutableMapOf<String, Long>()

        var lastPackage: String? = null
        var lastTimestamp = startMillis
        val event = UsageEvents.Event()

        while (events.hasNextEvent()) {
            events.getNextEvent(event)
            if (event.eventType == UsageEvents.Event.ACTIVITY_RESUMED) {
                lastPackage = event.packageName
                lastTimestamp = event.timeStamp
            }
            if (event.eventType == UsageEvents.Event.ACTIVITY_PAUSED && lastPackage == event.packageName) {
                val delta = event.timeStamp - lastTimestamp
                totals[event.packageName] = (totals[event.packageName] ?: 0L) + delta
            }
        }

        return totals.map { AppUsage(it.key, it.value) }
    }
}
