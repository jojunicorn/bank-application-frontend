import axios from 'axios';

axios.interceptors.request.use(function (config) {
  config.headers['Access-Control-Allow-Origin'] = 'https://localhost:8080'; // Replace with your frontend application URL
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  return config;
}, function (error) {
  return Promise.reject(error);
});

const instance = axios.create({
        baseURL: 'https://localhost:8080'
    })

export default instance;