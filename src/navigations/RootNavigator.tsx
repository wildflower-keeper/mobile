import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import {getUserInfo} from '@/utils/api/auth';
import useLoggedInStore from '@/stores/useLoggedIn';
import AuthStackNavigator from './AuthStackNavigator';

const RootNavigator = ({}) => {
  const {isLoggedIn, setIsLoggedIn} = useLoggedInStore();

  useEffect(() => {
    const loginCheck = async () => {
      const data = await getUserInfo();
      data ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    loginCheck();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
