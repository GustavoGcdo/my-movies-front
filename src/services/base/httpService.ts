import axios from 'axios';

const HttpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default HttpService;
