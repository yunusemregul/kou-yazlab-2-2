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
import Type1 from './src/screens/type1';
import Type2 from './src/screens/type2';
import Type3 from './src/screens/type3';
import Type3Map from './src/screens/type3Map';

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
        <Stack.Screen name="Tip 2" component={Type2} />
        <Stack.Screen name="Tip 3" component={Type3} />
        <Stack.Screen name="Tip 3 Harita" component={Type3Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
