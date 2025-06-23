import axios from 'axios'
import { BASE_URL } from './apiPaths.js'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const {response} = error
        // Handle common errors globally
        if (response) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                // Use history.push or a global router if you use React Router v6+
                window.location.href = '/login';
            } else if (response.status >= 500) {
                console.error('A server error occurred.');
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('Request timeout.');
          }
      
          return Promise.reject(error);
    }
)

export default axiosInstance