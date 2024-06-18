import React from 'react';
import Toast from 'react-native-toast-message';
import toastConfig from '@/config/toastConfig';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/utils/api/queryClient';
import RootNavigator from '@/navigations/RootNavigator';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
