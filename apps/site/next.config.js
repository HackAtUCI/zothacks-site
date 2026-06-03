const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "src", "lib", "styles")],
	},
	async redirects() {
		return [
			"/apply",
			"/apply-mentor",
			"/auth",
			"/feedback",
			"/feedback-form",
			"/guest-login",
			"/incident",
			"/incident-form",
			"/login",
			"/logout",
			"/mentor",
			"/portal",
		].map((source) => ({
			source,
			destination: "/",
			permanent: false,
		}));
	},
};

module.exports = nextConfig;
