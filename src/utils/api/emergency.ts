import {POST} from './api';

const emergencyCall = async () => {
  try {
    const response = await POST('/api/v1/homeless-app/emergency', {
      body: JSON.stringify({
        location: {},
      }),
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
