import {userLocationType} from '@/screens/Home.screen';
import {backendAxiosInstance} from './api';
import {getAccessToken} from './auth';

const emergencyCall = async (location: userLocationType) => {
  try {
    const {latitude, longitude} = location;
    const reqData = {
      location: {
        lat: latitude,
        lon: longitude,
      },
    };
    console.log(reqData, location);
    const response = await fetch(
      'https://api.wildflower-gardening.com/api/v1/homeless-app/emergency',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
          'auth-token': `${await getAccessToken()}`,
        },
        body: JSON.stringify(reqData),
      },
    );
    if (!response.ok) {
      throw new Error('emergency call failed');
    }

    console.log('emergency call success??', response);
  } catch (error) {
    throw error;
  }
};

export default emergencyCall;
