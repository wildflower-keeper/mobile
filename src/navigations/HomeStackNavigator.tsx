import Home from '@/screens/Home.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OvernightRequest from '@/screens/OvernightRequest.screen';
import FinalConfirmation from '@/screens/FinalConfirmation.screen';
import OvernightList from '@/screens/OvernightList.screen';
import ScanResult from '@/screens/ScanResult.screen';
import {UserProvider} from '@/providers/UserProvider';

interface HomeStackNavigatorProps {}

export type HomeStackParamList = {
  Home: undefined;
  OvernightRequest: undefined;
  FinalConfirmation: undefined;
  OvernightList: undefined;
  scanresult: undefined;
};

const HomeStackNavigator = ({}: HomeStackNavigatorProps) => {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OvernightRequest" component={OvernightRequest} />
        <Stack.Screen name="FinalConfirmation" component={FinalConfirmation} />
        <Stack.Screen name="OvernightList" component={OvernightList} />
        <Stack.Screen name="scanresult" component={ScanResult} />
      </Stack.Navigator>
    </UserProvider>
  );
};

export default HomeStackNavigator;
