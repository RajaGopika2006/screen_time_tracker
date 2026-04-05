import dayjs from 'dayjs';
import type {TimeRange, UsageSnapshot} from '@/types';

export const groupUsageByRange = (usage: UsageSnapshot[], range: TimeRange) => {
  const now = dayjs();
  return usage.filter(snapshot => {
    const d = dayjs(snapshot.date);
    if (range === 'daily') {
      return d.isSame(now, 'day');
    }
    if (range === 'weekly') {
      return d.isAfter(now.subtract(7, 'day'));
    }
    return d.isAfter(now.subtract(30, 'day'));
  });
};

export const buildChartSeries = (usage: UsageSnapshot[]) => ({
  labels: usage.map(u => dayjs(u.date).format('MM/DD')),
  datasets: [{data: usage.map(u => u.totalMinutes)}]
});
