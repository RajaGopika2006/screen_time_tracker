import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AnalyticsScreen} from '@/screens/AnalyticsScreen';
import {BlockingScreen} from '@/screens/BlockingScreen';
import {DashboardScreen} from '@/screens/DashboardScreen';
import {FocusModeScreen} from '@/screens/FocusModeScreen';
import {HabitsScreen} from '@/screens/HabitsScreen';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0F1115',
    card: '#1A1E26',
    text: '#EEF0F3',
    primary: '#79A2FF',
    border: '#1A1E26'
  }
};

export const AppNavigator = () => (
  <NavigationContainer theme={theme}>
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Blocking" component={BlockingScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Focus" component={FocusModeScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
