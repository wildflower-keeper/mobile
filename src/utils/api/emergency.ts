import { useAuthStore } from '@/providers/AuthProvider';
import authStore from '../tokenStorage/tokenStorage';

const emergencyCall = async () => {
  const { token } = useAuthStore();
  try {
    const reqData = {
      location: {},
    };
    const response = await POST('/api/v1/homeless-app/emergency', {
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