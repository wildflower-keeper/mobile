import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import useLoggedInStore from '@/stores/useLoggedIn';
import AuthStackNavigator from './AuthStackNavigator';
import {useGetUserInfo} from '@/hooks/queries/useAuth';

const linking = {
  prefixes: ['wildflower-keeper://'], // URL 스킴
  config: {
    screens: {
      ScanResult: 'ScanResult',
    },
  },
};

const RootNavigator = ({}) => {
  const {isLoggedIn, setIsLoggedIn} = useLoggedInStore();
  const {isSuccess, isError} = useGetUserInfo();
  useEffect(() => {
    const loginCheck = async () => {
      if (isSuccess) {
        setIsLoggedIn(true);
      }
      if (isError) {
        setIsLoggedIn(false);
      }
    };
    loginCheck();
  }, [isSuccess, isError]);

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
