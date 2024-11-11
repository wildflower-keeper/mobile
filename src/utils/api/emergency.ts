import {getAccessToken} from './auth';
import {POST} from './api';

const emergencyCall = async () => {
  try {
    const reqData = {
      location: {},
    };
    console.log(reqData);

    const response = await POST('/api/v1/homeless-app/emergency', {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        'auth-token': await getAccessToken(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('emergency call failed');
    }

    console.log('emergency call success??', response);
  } catch (error) {
    throw error;
  }
};

export default emergencyCall;
