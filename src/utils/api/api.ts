import axios from 'axios';

const weatherAxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export {weatherAxiosInstance};
