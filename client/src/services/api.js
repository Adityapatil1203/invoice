import axios from 'axios';

// Axios instance to handle API calls to the backend
const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // This should point to your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
