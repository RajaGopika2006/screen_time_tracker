import React from 'react';
import dayjs from 'dayjs';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {selectActiveFocus, useFocusStore} from '@/store/useFocusStore';

export const FocusModeScreen = () => {
  const startFocus = useFocusStore(state => state.startFocus);
  const stopFocus = useFocusStore(state => state.stopFocus);
  const active = selectActiveFocus();

  const startSession = () =>
    startFocus({
      id: `${Date.now()}`,
      startedAt: new Date().toISOString(),
      durationMinutes: 25,
      whitelist: ['com.android.dialer', 'com.android.calendar'],
      isActive: true
    });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Focus Mode</Text>
      <Text style={styles.copy}>One tap blocks all distractions except your whitelist.</Text>
      {active ? (
        <View style={styles.sessionCard}>
          <Text style={styles.sessionText}>Active session started {dayjs(active.startedAt).format('HH:mm')}</Text>
          <Pressable onPress={() => stopFocus(active.id)} style={styles.stopButton}>
            <Text style={styles.buttonText}>End Session</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={startSession} style={styles.startButton}>
          <Text style={styles.buttonText}>Start 25m Pomodoro</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0F1115', padding: 16},
  header: {color: '#EEF0F3', fontSize: 20, fontWeight: '700'},
  copy: {color: '#A8B0BD', marginTop: 8, marginBottom: 20},
  sessionCard: {backgroundColor: '#1A1E26', borderRadius: 14, padding: 14},
  sessionText: {color: '#EEF0F3', marginBottom: 12},
  startButton: {backgroundColor: '#4F7CFF', padding: 14, borderRadius: 12},
  stopButton: {backgroundColor: '#FF5C7A', padding: 14, borderRadius: 12},
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: '700'}
});
