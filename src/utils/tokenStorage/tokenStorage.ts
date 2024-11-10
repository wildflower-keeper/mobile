import * as KeyChain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';

interface AuthStore {
  setToken: (token: string) => Promise<void>;
  getAccessToken: () => Promise<string>;
  getDeviceUniqueId: () => Promise<string>;
}

const authStore: AuthStore = {
  getDeviceUniqueId: async () => {
    return await DeviceInfo.getUniqueId();
  },

  setToken: async (token: string) => {
    try {
      const deviceId = await authStore.getDeviceUniqueId();
      await KeyChain.setInternetCredentials(deviceId, deviceId, token);
    } catch (error) {
      console.error('Error storing token', error);
    }
  },

  getAccessToken: async () => {
    try {
      const deviceId = await authStore.getDeviceUniqueId();
      const credentials = await KeyChain.getInternetCredentials(deviceId);
      console.log('credentials', credentials);
      if (credentials) {
        return credentials.password;
      } else {
        console.log('No token stored');
        return '';
      }
    } catch (error) {
      console.error('Error retrieving token', error);
      return '';
    }
  },
};

export default authStore;
