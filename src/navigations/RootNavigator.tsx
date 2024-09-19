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
      ScanResult: 'ScanResult', // loading 경로가 Loading 스크린에 매핑됨
    },
  },
};

const RootNavigator = ({}) => {
  const {isLoggedIn, setIsLoggedIn} = useLoggedInStore();
  const {isSuccess, isError} = useGetUserInfo();
  useEffect(() => {
    console.log(isLoggedIn, isSuccess);
    const loginCheck = async () => {
      if (isSuccess) {
        setIsLoggedIn(true);
      }
      if (isError) {
        setIsLoggedIn(false);
      }
    };
    loginCheck();
  }, [isError, isSuccess]);

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
