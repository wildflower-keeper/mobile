import {userLocationType} from '@/screens/Outing.screen';
import {weatherAxiosInstance} from './api';
import {WEATHER_API_KEY} from '@env';

const getWeather = async (userLocation: userLocationType) => {
  try {
    const {latitude, longitude} = userLocation;
    const {data} = await weatherAxiosInstance({
      method: 'GET',
      url: `/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`,
    });

    return {
      weather: data.weather[0].description,
      temp: Math.round(data.main.temp),
    };
  } catch (error) {
    throw error;
  }
};

export {getWeather};
