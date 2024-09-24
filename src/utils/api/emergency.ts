import {getAccessToken} from './auth';

const emergencyCall = async () => {
  try {
    const reqData = {
      location: {},
    };
    console.log(reqData);
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
