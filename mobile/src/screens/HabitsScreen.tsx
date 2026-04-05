import React from 'react';
import dayjs from 'dayjs';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusStore} from '@/store/useFocusStore';

export const HabitsScreen = () => {
  const habits = useFocusStore(state => state.habits);
  const completeHabit = useFocusStore(state => state.completeHabit);
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Habit Tracking</Text>
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Add your first habit to begin.</Text>}
        renderItem={({item}) => {
          const done = item.completions.includes(today);
          return (
            <View style={styles.habitCard}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.meta}>Streak: {item.streak} days</Text>
              </View>
              <Pressable style={[styles.button, done && styles.buttonDone]} onPress={() => completeHabit(item.id, today)}>
                <Text style={styles.buttonLabel}>{done ? 'Done' : 'Complete'}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1115', padding: 16},
  header: {color: '#EEF0F3', fontSize: 20, fontWeight: '700', marginBottom: 12},
  habitCard: {
    backgroundColor: '#1A1E26',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {color: '#EEF0F3', fontWeight: '600', fontSize: 16},
  meta: {color: '#A8B0BD', marginTop: 4},
  button: {backgroundColor: '#4F7CFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8},
  buttonDone: {backgroundColor: '#2DCB9F'},
  buttonLabel: {color: '#fff', fontWeight: '600'},
  empty: {color: '#A8B0BD', marginTop: 16}
});
