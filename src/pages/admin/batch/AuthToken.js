// AuthToken.js

import axios from 'axios';

// Function to set the Auth token in Axios headers
export const setAuthToken = (token) => {
  if (token) {
    // If we have the token, set it in the Authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If there's no token, delete the Authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};
