import GoOutRequest from '@/screens/GoOutRequest.screen';
import Home from '@/screens/Home.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

interface HomeStackNavigatorProps {}

const HomeStackNavigator = ({}: HomeStackNavigatorProps) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GoOutRequest" component={GoOutRequest} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
