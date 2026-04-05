import type {Habit} from '@/types';

export interface ReminderJob {
  title: string;
  body: string;
  time: string;
}

export const buildHabitReminders = (habits: Habit[]): ReminderJob[] =>
  habits
    .filter(habit => habit.reminderTime)
    .map(habit => ({
      title: `Habit reminder: ${habit.title}`,
      body: 'Keep your streak alive today.',
      time: habit.reminderTime as string
    }));

export const thresholdAlert = (used: number, limit: number) => {
  const pct = Math.round((used / limit) * 100);
  if (pct >= 100) {
    return 'Limit exceeded. FocusGuard blocked this target.';
  }
  if (pct >= 80) {
    return `You are at ${pct}% of your limit.`;
  }
  return null;
};
