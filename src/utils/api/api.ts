import axios from 'axios';

const backendAxiosInstance = axios.create({
  baseURL: 'https://api.wildflower-gardening.com',
});

const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export {backendAxiosInstance, weatherAxiosInstance};
