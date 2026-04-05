import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {buildChartSeries, groupUsageByRange} from '@/services/analyticsService';
import {useFocusStore} from '@/store/useFocusStore';
import type {TimeRange} from '@/types';

export const AnalyticsScreen = () => {
  const usage = useFocusStore(state => state.usage);
  const [range] = useState<TimeRange>('weekly');

  const data = useMemo(() => {
    const grouped = groupUsageByRange(usage, range);
    return buildChartSeries(grouped.length ? grouped : [{date: new Date().toISOString(), totalMinutes: 0, apps: [], websites: []}]);
  }, [range, usage]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Usage Analytics ({range})</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 24}
        height={220}
        withDots
        chartConfig={{
          backgroundGradientFrom: '#1A1E26',
          backgroundGradientTo: '#1A1E26',
          decimalPlaces: 0,
          color: opacity => `rgba(121, 162, 255, ${opacity})`,
          labelColor: () => '#A8B0BD'
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1115', padding: 12},
  header: {color: '#EEF0F3', fontSize: 20, fontWeight: '700', marginBottom: 12},
  chart: {borderRadius: 16}
});
