import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SummaryCard} from '@/components/SummaryCard';
import {selectDashboard} from '@/store/useFocusStore';

export const DashboardScreen = () => {
  const dashboard = selectDashboard();
  const topAppNames = dashboard.topApps.map(app => app.displayName).join(', ') || 'No data yet';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FocusGuard Dashboard</Text>
      <SummaryCard title="Today's Screen Time" value={`${dashboard.totalTodayMinutes} min`} />
      <SummaryCard title="Top Apps" value={topAppNames} subtitle="Most used today" />
      <SummaryCard
        title="Habit Progress"
        value={`${dashboard.habitsCompletedToday} completed`}
        subtitle={`${dashboard.activeStreaks} active streaks`}
      />
      <SummaryCard title="Productivity Score" value={dashboard.productivityScore} subtitle="Weekly trend" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
    padding: 16
  },
  header: {
    color: '#EEF0F3',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16
  }
});
