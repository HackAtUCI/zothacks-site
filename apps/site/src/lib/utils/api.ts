import axios, { AxiosHeaders } from "axios";
import { cookies } from "next/headers";

const LOCAL_API_URL = "http://localhost:8000";
const SERVER_HOST = process.env.IH_BACKEND_URL;

console.log("A", SERVER_HOST);

// The Vercel Serverless Function for the API lives outside the scope of Next.js
// so the publicly deployed URL must be used instead of a rewrite
const api = axios.create({
	baseURL: SERVER_HOST ? `${SERVER_HOST}` : LOCAL_API_URL,
});

api.interceptors.request.use((config) => {
	const cookieStore = cookies();

	// Inject user's client-side cookies along with API request
	const provided = config.headers.get("Cookie");
	const newCookies = (provided ? `${provided}; ` : "") + cookieStore.toString();
	(config.headers as AxiosHeaders).set("Cookie", newCookies);
	(config.headers as AxiosHeaders).set("X-Hackathon-Name", "zothacks");
	(config.headers as AxiosHeaders).set(
		"User-Agent",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
	);

	return config;
});

export default api;
