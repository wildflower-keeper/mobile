import AuthHome from '@/screens/AuthHome.screen';
import AuthLogin from '@/screens/AuthLogin.screen';
import AuthSignup from '@/screens/AuthSignup.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="AuthLogin" component={AuthLogin} />
        <Stack.Screen name="AuthSignup" component={AuthSignup} />
      </Stack.Navigator>
  );
};

export default AuthStackNavigator;
