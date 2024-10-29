import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

// Set up Axios instance with configuration
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3303/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add a request interceptor to add an auth token or handle errors globally
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");

    // Ensure headers is initialized properly as an AxiosHeaders instance
    if (!config.headers) {
      config.headers = new AxiosHeaders(); // Create a new instance of AxiosHeaders
    }

    // Set the Authorization header
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`); // Use the set method to add the Authorization header
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error) // Type the error as AxiosError
);

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default api;
