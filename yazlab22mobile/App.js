/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Type1 from './screens/type1';

const Stack = createStackNavigator();

export const mysqlConfig = {
  host: '35.246.180.71',
  user: 'root',
  password: '8Oii212iLfwr2Nik',
  database: 'yazlab_2_2'
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Tip 1" component={Type1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
