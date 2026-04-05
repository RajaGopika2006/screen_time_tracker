package com.focusguard.blocking

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.view.accessibility.AccessibilityEvent

class BlockerAccessibilityService : AccessibilityService() {

    private val blockedPackages = mutableSetOf<String>()

    override fun onServiceConnected() {
        super.onServiceConnected()
    }

    fun updateBlockedTargets(targets: List<String>) {
        blockedPackages.clear()
        blockedPackages.addAll(targets)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        val pkg = event?.packageName?.toString() ?: return
        if (!blockedPackages.contains(pkg)) {
            return
        }

        val blockerIntent = Intent(this, MotivationalBlockActivity::class.java).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            putExtra("blocked_package", pkg)
        }
        startActivity(blockerIntent)
        performGlobalAction(GLOBAL_ACTION_HOME)
    }

    override fun onInterrupt() {
    }
}
