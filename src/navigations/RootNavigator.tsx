import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import useLoggedInStore from '@/stores/useLoggedIn';
import AuthStackNavigator from './AuthStackNavigator';
import {useGetUserInfo} from '@/hooks/queries/useAuth';

const RootNavigator = ({}) => {
  const {isLoggedIn, setIsLoggedIn} = useLoggedInStore();
  const [_, isSuccess, isError] = useGetUserInfo();
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
  }, [isError, isSuccess]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
