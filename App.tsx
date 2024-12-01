import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import toastConfig from '@/config/toastConfig';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/utils/api/queryClient';
import RootNavigator from '@/navigations/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import {Alert, AppRegistry} from 'react-native';
import {Text, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from '@/providers/AuthProvider';
import useMessageService from '@/hooks/useMessageService';

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;
// Register main application

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      //TODO Android 앱 splash만 작업함
      SplashScreen.hide();
    }, 1000);
  }, []);

  useMessageService();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
        <Toast config={toastConfig} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

AppRegistry.registerComponent('App', () => App);
