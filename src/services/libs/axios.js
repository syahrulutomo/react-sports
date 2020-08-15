import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'useQueryString': process.env.REACT_APP_USE_QUERY_STRING
  }
});

export default instance;
