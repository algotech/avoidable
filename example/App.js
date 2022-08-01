import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  MainScreen,
  FocusBottomDistanceToBottom,
  FocusBottomContextAwareScreen,
  FocusBottomScreen,
  FocusInputContextAwareScreen,
  FocusInputScreen,
} from './src';
import {
  MAINSCREEN,
  FOCUSBOTTOMDISTANCETOBOTTOM,
  FOCUSBOTTOMCONTEXTAWARESCREEN,
  FOCUSBOTTOMSCREEN,
  FOCUSINPUTCONTEXTAWARESCREEN,
  FOCUSINPUTSCREEN,
} from './routeNames';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={MAINSCREEN}>
          <Stack.Screen
            name={MAINSCREEN}
            component={MainScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name={FOCUSBOTTOMCONTEXTAWARESCREEN}
            component={FocusBottomContextAwareScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name={FOCUSBOTTOMSCREEN}
            component={FocusBottomScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name={FOCUSINPUTCONTEXTAWARESCREEN}
            component={FocusInputContextAwareScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name={FOCUSINPUTSCREEN}
            component={FocusInputScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen
            name={FOCUSBOTTOMDISTANCETOBOTTOM}
            component={FocusBottomDistanceToBottom}
            options={{ header: () => <></> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
