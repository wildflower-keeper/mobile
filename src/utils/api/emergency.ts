import {getAccessToken} from './auth';
import {POST} from './api';

const emergencyCall = async () => {
  try {
    const reqData = {
      location: {},
    };

    const response = await POST('/api/v1/homeless-app/emergency', {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        'auth-token': await getAccessToken(),
      },
      body: JSON.stringify(reqData),
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    console.log('emergency call success??', response);
  } catch (error) {
    throw error;
  }
};

export default emergencyCall;
