import React, {useEffect, useState} from 'react';
import AuthSignup from './src/screens/AuthSignup.screen';
import HomeStackNavigator from '@/navigations/HomeStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {getToken} from '@/utils/tokenStorage/tokenStorage';
import getDeviceID from '@/utils/getDeviceID/getDeviceID';

function App(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    getDeviceID().then(async (result: string) => {
      const token = await getToken(result);
      if (token) {
        setIsLogin(true);
        return;
      }
      setIsLogin(false);
    });
  }, []);
  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      ) : (
        <AuthSignup />
      )}
    </>
  );
}

export default App;
