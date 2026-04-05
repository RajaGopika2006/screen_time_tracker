package com.focusguard.bridge

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.focusguard.tracking.UsageTracker

class FocusGuardModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "FocusGuardModule"

    @ReactMethod
    fun getUsageMinutesSinceMidnight(promise: Promise) {
        try {
            val tracker = UsageTracker(reactContext)
            val now = System.currentTimeMillis()
            val midnight = now - (now % (24 * 60 * 60 * 1000))
            val usage = tracker.readForegroundUsage(midnight, now)
            val minutes = usage.sumOf { it.millis } / 60000
            promise.resolve(minutes.toInt())
        } catch (e: Exception) {
            promise.reject("USAGE_ERROR", e)
        }
    }
}
