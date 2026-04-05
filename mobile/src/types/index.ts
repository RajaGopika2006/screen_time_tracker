export type TimeRange = 'daily' | 'weekly' | 'monthly';

export interface AppUsage {
  packageName: string;
  displayName: string;
  minutes: number;
}

export interface WebsiteUsage {
  domain: string;
  minutes: number;
}

export interface UsageSnapshot {
  date: string;
  totalMinutes: number;
  apps: AppUsage[];
  websites: WebsiteUsage[];
}

export interface BlockRule {
  id: string;
  targetType: 'app' | 'website';
  targetId: string;
  dailyLimitMinutes: number;
  schedule: {
    start: string;
    end: string;
    days: number[];
  };
  mode: 'strict' | 'flexible';
}

export interface Habit {
  id: string;
  title: string;
  reminderTime?: string;
  streak: number;
  completions: string[];
}

export interface FocusSession {
  id: string;
  startedAt: string;
  durationMinutes: number;
  whitelist: string[];
  isActive: boolean;
}

export interface DashboardMetrics {
  totalTodayMinutes: number;
  topApps: AppUsage[];
  habitsCompletedToday: number;
  activeStreaks: number;
  productivityScore: number;
}
