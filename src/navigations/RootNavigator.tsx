import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthStore} from '@/providers/AuthProvider';

const linking = {
  prefixes: ['wildflower-keeper://'], // URL 스킴
  config: {
    screens: {
      scanresult: 'scanresult',
    },
  },
};

const RootNavigator = ({}) => {
  const {isLoggedIn} = useAuthStore();
  console.log('isLoggedIn', isLoggedIn);
  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
