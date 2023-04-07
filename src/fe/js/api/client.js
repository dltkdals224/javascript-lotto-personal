import axios from 'axios';

// const BACKEND_BASE_URL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL: 'http://localhost:5000',
});

export { client };
