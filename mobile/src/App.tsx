import React, {useEffect} from 'react';
import {AppNavigator} from '@/navigation/AppNavigator';
import {useFocusStore} from '@/store/useFocusStore';

const seed = () => {
  const store = useFocusStore.getState();
  const today = new Date().toISOString().slice(0, 10);
  store.setRules([
    {
      id: 'rule-instagram',
      targetType: 'app',
      targetId: 'com.instagram.android',
      dailyLimitMinutes: 30,
      mode: 'strict',
      schedule: {start: '09:00', end: '18:00', days: [1, 2, 3, 4, 5]}
    }
  ]);

  store.addHabit({id: 'habit-study', title: 'Study 60 minutes', reminderTime: '19:00', streak: 3, completions: [today]});

  store.addUsage({
    date: today,
    totalMinutes: 164,
    apps: [
      {packageName: 'com.instagram.android', displayName: 'Instagram', minutes: 41},
      {packageName: 'com.youtube', displayName: 'YouTube', minutes: 36},
      {packageName: 'com.whatsapp', displayName: 'WhatsApp', minutes: 24}
    ],
    websites: [
      {domain: 'instagram.com', minutes: 12},
      {domain: 'news.ycombinator.com', minutes: 8}
    ]
  });
};

const App = () => {
  useEffect(() => {
    seed();
  }, []);

  return <AppNavigator />;
};

export default App;
