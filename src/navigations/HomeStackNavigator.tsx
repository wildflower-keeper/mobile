import Home from '@/screens/Home.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

interface HomeStackNavigatorProps {}

const HomeStackNavigator = ({}: HomeStackNavigatorProps) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
