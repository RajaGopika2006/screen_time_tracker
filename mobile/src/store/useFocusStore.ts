import {create} from 'zustand';
import dayjs from 'dayjs';
import type {BlockRule, DashboardMetrics, FocusSession, Habit, UsageSnapshot} from '@/types';

interface FocusState {
  usage: UsageSnapshot[];
  rules: BlockRule[];
  habits: Habit[];
  sessions: FocusSession[];
  dashboard: DashboardMetrics;
  addUsage: (snapshot: UsageSnapshot) => void;
  setRules: (rules: BlockRule[]) => void;
  addHabit: (habit: Habit) => void;
  completeHabit: (habitId: string, date: string) => void;
  startFocus: (session: FocusSession) => void;
  stopFocus: (sessionId: string) => void;
}

const initialDashboard: DashboardMetrics = {
  totalTodayMinutes: 0,
  topApps: [],
  habitsCompletedToday: 0,
  activeStreaks: 0,
  productivityScore: 0
};

const calcStreak = (completions: string[]) => {
  let streak = 0;
  let cursor = dayjs();
  while (completions.includes(cursor.format('YYYY-MM-DD'))) {
    streak += 1;
    cursor = cursor.subtract(1, 'day');
  }
  return streak;
};

export const useFocusStore = create<FocusState>((set, get) => ({
  usage: [],
  rules: [],
  habits: [],
  sessions: [],
  dashboard: initialDashboard,
  addUsage: snapshot =>
    set(state => {
      const usage = [...state.usage.filter(u => u.date !== snapshot.date), snapshot];
      const topApps = [...snapshot.apps].sort((a, b) => b.minutes - a.minutes).slice(0, 3);
      const completedToday = state.habits.filter(h => h.completions.includes(snapshot.date)).length;
      const activeStreaks = state.habits.filter(h => h.streak > 0).length;
      const productivityScore = Math.max(
        0,
        Math.min(100, 100 - Math.round(snapshot.totalMinutes / 3) + completedToday * 7)
      );

      return {
        usage,
        dashboard: {
          totalTodayMinutes: snapshot.totalMinutes,
          topApps,
          habitsCompletedToday: completedToday,
          activeStreaks,
          productivityScore
        }
      };
    }),
  setRules: rules => set({rules}),
  addHabit: habit => set(state => ({habits: [...state.habits, habit]})),
  completeHabit: (habitId, date) =>
    set(state => {
      const habits = state.habits.map(habit => {
        if (habit.id !== habitId || habit.completions.includes(date)) {
          return habit;
        }
        const completions = [...habit.completions, date].sort();
        return {
          ...habit,
          completions,
          streak: calcStreak(completions)
        };
      });
      return {habits};
    }),
  startFocus: session => set(state => ({sessions: [...state.sessions, session]})),
  stopFocus: sessionId =>
    set(state => ({
      sessions: state.sessions.map(session =>
        session.id === sessionId ? {...session, isActive: false} : session
      )
    }))
}));

export const selectDashboard = () => useFocusStore.getState().dashboard;
export const selectActiveFocus = () => useFocusStore.getState().sessions.find(s => s.isActive);
