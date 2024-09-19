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
    const response = async () => {
      console.log('effect fn called');
      return await fetch(
        'https://api.wildflower-gardening.com/api/v1/homeless-app/homeless',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            accept: '*/*',
            'auth-token':
              'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI5IiwiaG9tZWxlc3NOYW1lIjoi7YWM7Iqk7Yq46rOE7KCVIiwiaG9tZWxlc3NJZCI6IjkiLCJzaGVsdGVySWQiOiIxIiwiaWF0IjoxNzI2NjI2NzY2fQ.DJt_NG2F0xpYd_XsLtE9Vz89YtR1N-Od6VGi_6updYw4_JEEKvQ3DXq0jdGpnQnK',
          },
        },
      );
    };

    response()
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // const loginCheck = async () => {
    //   if (isSuccess) {
    //     setIsLoggedIn(true);
    //   }
    //   if (isError) {
    //     setIsLoggedIn(false);
    //   }
    // };
    // loginCheck();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      {isLoggedIn ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
