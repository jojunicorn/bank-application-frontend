import axios from 'axios';

axios.interceptors.request.use(function (config) {
  config.headers['Access-Control-Allow-Origin'] = '*'; // Replace with your frontend application URL
  config.headers['Access-Control-Allow-Methods'] = '*';
  config.headers['Access-Control-Allow-Headers'] = '*';
  return config;
}, function (error) {
  return Promise.reject(error);
});

const instance = axios.create({
        baseURL: 'https://localhost:8080'
    })

export default instance;