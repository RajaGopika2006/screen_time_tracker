import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({title, value, subtitle}) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1E26',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  title: {
    color: '#A8B0BD',
    fontSize: 13,
    marginBottom: 6
  },
  value: {
    color: '#EEF0F3',
    fontSize: 24,
    fontWeight: '700'
  },
  subtitle: {
    color: '#A8B0BD',
    fontSize: 12,
    marginTop: 4
  }
});
