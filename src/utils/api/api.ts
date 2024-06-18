import axios from 'axios';
import {Platform} from 'react-native';

const backendAxiosInstance = axios.create({
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8080'
      : 'http://localhost:8080',
  withCredentials: true,
});

const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export {backendAxiosInstance, weatherAxiosInstance};
