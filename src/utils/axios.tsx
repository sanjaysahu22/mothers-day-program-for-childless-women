import axios from "axios";

// Create an Axios instance with a base URL
const AxiosInstance = axios.create({
    baseURL: `https://server.sanjay23bcy51.workers.dev/api/v1`,  // Set your base URL here
    headers: {
        'Content-Type': 'application/json',
    }
});

export default AxiosInstance;
