import React from 'react';
import AuthSignup from './src/screens/AuthSignup.screen';
import HomeStackNavigator from '@/navigations/HomeStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

const isLogin = true;
function App(): React.JSX.Element {
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
