package com.focusguard.blocking

import android.app.Activity
import android.os.Bundle
import android.widget.TextView

class MotivationalBlockActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val blocked = intent.getStringExtra("blocked_package") ?: "this app"

        val message = TextView(this).apply {
            text = "FocusGuard paused $blocked.\\nTake a deep breath and continue your goals."
            textSize = 20f
            setPadding(40, 120, 40, 40)
        }

        setContentView(message)
    }
}
