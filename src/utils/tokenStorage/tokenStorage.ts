import * as Keychain from 'react-native-keychain';

// 토큰 저장
const setToken = async (userName: string, token: string) => {
  try {
    await Keychain.setInternetCredentials(userName, userName, token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

// 토큰 가져오기
const getToken = async (userName: string) => {
  try {
    const credentials = await Keychain.getInternetCredentials(userName);
    if (credentials) {
      return credentials.password;
    } else {
      console.log('No token stored');
    }
  } catch (error) {
    console.error('Error retrieving token', error);
  }
};

export {setToken, getToken};
