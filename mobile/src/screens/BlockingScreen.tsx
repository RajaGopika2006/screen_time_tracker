import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useFocusStore} from '@/store/useFocusStore';

export const BlockingScreen = () => {
  const rules = useFocusStore(state => state.rules);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blocking Rules</Text>
      <FlatList
        data={rules}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No blocking rules configured yet.</Text>}
        renderItem={({item}) => (
          <View style={styles.ruleCard}>
            <Text style={styles.target}>{item.targetId}</Text>
            <Text style={styles.meta}>
              {item.dailyLimitMinutes} min • {item.mode} • {item.schedule.start}-{item.schedule.end}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1115', padding: 16},
  header: {color: '#EEF0F3', fontSize: 20, fontWeight: '700', marginBottom: 12},
  ruleCard: {backgroundColor: '#1A1E26', borderRadius: 14, padding: 14, marginBottom: 10},
  target: {color: '#EEF0F3', fontWeight: '600', fontSize: 16},
  meta: {color: '#A8B0BD', marginTop: 4},
  empty: {color: '#A8B0BD', marginTop: 16}
});
