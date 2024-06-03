import axios from 'axios';

const backendAxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  withCredentials: true,
});

const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export {backendAxiosInstance, weatherAxiosInstance};
