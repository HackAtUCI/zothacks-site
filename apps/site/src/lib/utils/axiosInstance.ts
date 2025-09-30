import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
	config.headers.set("X-Hackathon-Name", "zothacks");
	return config;
});

export default axiosInstance;
