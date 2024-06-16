import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import AuthSignup from '@/screens/AuthSignup.screen';
import {getUserInfo} from '@/utils/api/auth';
import useLoggedInStore from '@/stores/useLoggedIn';

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
      {isLoggedIn ? <HomeStackNavigator /> : <AuthSignup />}
    </NavigationContainer>
  );
};

export default RootNavigator;
